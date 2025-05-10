import { beforeEach, describe, expect, jest, test } from "@jest/globals";

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
        test("returns null if there is no session", async () => {
            (getServerSession as jest.Mock).mockReturnValue(Promise.resolve(null));
            expect(await getUserIdentifier()).toBeNull();
        });
        test("returns null if the user identifier doesn't end with a valid suffix", async () => {
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { email: "test@test.com" } })),
            );
            expect(await getUserIdentifier()).toBeNull();
        });
        test("uses the username if there is no email and returns null if there is no valid suffix", async () => {
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { name: "michael" } })),
            );
            expect(await getUserIdentifier()).toBeNull();
        });
        test("returns the user identifier if there is a valid identifier in the email field", async () => {
            const identifier = "test@test.comkeycloak";
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { email: identifier } })),
            );
            expect(await getUserIdentifier()).toStrictEqual(identifier);
        });
        test("returns the user identifier if there is a valid identifier in the name field and none in the email field", async () => {
            const identifier = "michaelkeycloak";
            (getServerSession as jest.Mock).mockReturnValue(
                Promise.resolve(Promise.resolve({ user: { name: identifier } })),
            );
            expect(await getUserIdentifier()).toStrictEqual(identifier);
        });
    });
});
