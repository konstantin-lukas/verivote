import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/manage", "/create", "/account"] };

export default withAuth({
    pages: {
        signIn: "/auth/signin",
    },
});
