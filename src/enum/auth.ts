export const AuthProvider =
    process.env.APP_ENV === "production"
        ? {
              DISCORD: "discord",
              GITHUB: "github",
              REDDIT: "reddit",
              TWITCH: "twitch",
          }
        : {
              KEYCLOAK: "keycloak",
          };

export type AuthProvider = typeof AuthProvider;
