export const AuthProvider =
    process.env.APP_ENV === "production"
        ? {
              DISCORD: "discord",
              GITHUB: "github",
              REDDIT: "reddit",
          }
        : {
              KEYCLOAK: "keycloak",
          };

export type AuthProvider = typeof AuthProvider;
