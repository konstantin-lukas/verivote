import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ObjectId } from "bson";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

import { getIpAddress, makeBSONSerializable } from "@/utils/server";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));

describe("utils/server", () => {
    describe("getUserIdentifier", () => {
        let getUserIdentifier: () => Promise<string | null>;
        let getServerSession: () => Promise<string | null>;
        beforeEach(async () => {
            jest.resetModules();
            ({ getUserIdentifier } = await import("@/utils/server"));
            ({ getServerSession } = await import("next-auth"));
        });
        test("should return null if there is no session", async () => {
            (getServerSession as jest.Mock).mockReturnValue(Promise.resolve(null));
            expect(await getUserIdentifier()).toBeNull();
        });
        test("should return null if the user identifier doesn't end with a valid suffix", async () => {
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { email: "test@test.com" } })),
            );
            expect(await getUserIdentifier()).toBeNull();
        });
        test("should use the username if there is no email and returns null if there is no valid suffix", async () => {
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { name: "michael" } })),
            );
            expect(await getUserIdentifier()).toBeNull();
        });
        test("should return the user identifier if there is a valid identifier in the email field", async () => {
            const identifier = "test@test.comkeycloak";
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { email: identifier } })),
            );
            expect(await getUserIdentifier()).toStrictEqual(identifier);
        });
        test("should return the user identifier if there is a valid identifier in the name field and none in the email field", async () => {
            const identifier = "michaelkeycloak";
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { name: identifier } })),
            );
            expect(await getUserIdentifier()).toStrictEqual(identifier);
        });
    });
    describe("makeBSONSerializable", () => {
        const id = "a3f9b7c2e4d8a1f5c9b60213";
        test("should replace the _id field with the id field", async () => {
            const someObj = { _id: new ObjectId(id), other: "eels" };
            expect(someObj).not.toHaveProperty("id");
            expect(someObj).toHaveProperty("_id");
            expect(someObj).toHaveProperty("other");
            const serializableObj = makeBSONSerializable(someObj);
            expect(serializableObj).toHaveProperty("id");
            expect(serializableObj).not.toHaveProperty("_id");
            expect(serializableObj).toHaveProperty("other");
        });
        test("should convert the ID to a string", async () => {
            const someObj = { _id: new ObjectId(id), other: "eels" };
            expect(typeof someObj._id).toBe("object");
            const serializableObj = makeBSONSerializable(someObj);
            expect(typeof serializableObj.id).toBe("string");
        });
    });
    describe("getIpAddress", () => {
        const OLD_ENV = process.env;
        beforeEach(() => {
            jest.resetModules();
            process.env = { ...OLD_ENV };
        });

        test("should use the X-Real-IP as first option", async () => {
            const mockHeaders = {
                get: (header: string) => (header === "X-Real-IP" ? "192.168.0.1" : "192.168.0.2"),
            } as unknown as ReadonlyHeaders;
            const mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBe("192.168.0.1");
        });
        test("should only use the last IP from the X-Forwarded-For header", async () => {
            let mockHeaders = {
                get: (header: string) => (header === "X-Forwarded-For" ? "192.168.0.1,192.168.0.2,192.168.0.3" : null),
            } as unknown as ReadonlyHeaders;
            let mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBe("192.168.0.3");

            mockHeaders = {
                get: (header: string) => (header === "X-Forwarded-For" ? "192.168.0.1" : null),
            } as unknown as ReadonlyHeaders;
            mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBe("192.168.0.1");

            mockHeaders = {
                get: (header: string) => (header === "X-Forwarded-For" ? "" : null),
            } as unknown as ReadonlyHeaders;
            mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBeNull();
        });
        test("should strip IPv6 mapped addresses", async () => {
            const mockHeaders = {
                get: () => "::ffff:192.168.0.1",
            } as unknown as ReadonlyHeaders;
            const mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBe("192.168.0.1");
        });
        test("should convert ::1 to 127.0.0.1", async () => {
            const mockHeaders = {
                get: () => "::1",
            } as unknown as ReadonlyHeaders;
            const mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBe("127.0.0.1");
        });
        test("should reject loopback ip addresses in production", async () => {
            process.env.APP_ENV = "production";
            const mockHeaders = {
                get: () => "::1",
            } as unknown as ReadonlyHeaders;
            const mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBeNull();
        });
        test("should reject loopback ip addresses in production", async () => {
            process.env.APP_ENV = "production";
            const mockHeaders = {
                get: () => "127.0.0.1",
            } as unknown as ReadonlyHeaders;
            const mockGetHeaders = async () => mockHeaders;
            expect(await getIpAddress(mockGetHeaders)).toBeNull();
        });
    });
});
