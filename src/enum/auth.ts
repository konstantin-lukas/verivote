export const AuthProvider =
    process.env.NODE_ENV === "production"
        ? {
              DISCORD: "discord",
              GITHUB: "github",
              REDDIT: "reddit",
          }
        : {
              KEYCLOAK: "keycloak",
          };

export type AuthProvider = typeof AuthProvider;
