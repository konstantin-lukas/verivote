import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ObjectId } from "bson";

import { makeBSONSerializable } from "@/utils/server";

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
});
