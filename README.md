<br>
<br>
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="static/verivote_logo_dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="static/verivote_logo.svg">
    <img src="static/verivote_logo.svg" alt="" width="50%" height="50%">
  </picture>
</div>
<br>
<br>
Verivote is a free open source website that offers a hands-on approach for educating people about
alternative voting systems. You are welcome to deploy this website yourself or fork it and make it your own.

# OAuth

For testing the project comes with a containerized KeyCloak that is only used for development and tests.
For production, you can choose which OAuth providers you want to use. The login credentials for KeyCloak are "user" and
"password".

To use an OAuth provider, you need to register the app in the developer portal of each provider you
would like to use and make sure it is registered in `@/app/auth/[...nextauth]/route.ts`. Since the login page has
custom styling, you will also need to add a button for each provider you use. You can add these buttons in
`@/app/auth/signin/page.tsx`.You can find more information about providers
[here](https://next-auth.js.org/configuration/providers/oauth#built-in-providers).
Providers require you to specify an Authorization callback URL like `http://localhost:3000/auth/callback/github`.
Make sure to replace `http://localhost:3000` with the origin of your deployed website and `github` with the respective
provider.

One important notice about adding more providers: By default the project comes with support for Discord, GitHub and Reddit.
Reddit unlike the other two doesn't provide you with the user email address. That's why the backend uses the Reddit
username instead as a unique identifier. The name is only used as a fallback and assumed to be unique. If you add a new
provider that doesn't provide the user email, please edit the backend code so that you use a unique identifier that
cannot overlap with a Reddit username. To avoid collision between people with the same username on different provider's
websites, each user identifier is suffixed with the name of the provider.

# Environment Variables
Please make sure you override all environment variables you need inside a `.env.local`. For the database password, 
change `MONGODB_PASSWORD`. Also put the same password in the first line of `@/database/init.d/mongo-init.js`. In 
`@/docker-compose.yml`, please set `MONGO_INITDB_ROOT_PASSWORD` to a different but equally strong password. This just 
ensures that the root user of the MongoDB instance is secured. The app doesn't actually use the root user. But if you 
intend to make your database directly reachable from the outside, a strong root password is essential.


# Docker Containers
The project comes with a docker compose config to run the database, tests, and KeyCloak in a container. Please note that
the KeyCloak is not intended for production.

To run tests inside the Playwright container with the use, you can just run `npm run e2e`. You might have to run
`xhost +local:docker` on your host machine to allow docker to open a window.

If you're running a reverse proxy like Nginx, consider turning of proxy buffering as this may affect
the performance of streaming components in Next.js.