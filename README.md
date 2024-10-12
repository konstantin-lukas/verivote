<br>
<br>
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/verivote_logo_dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/verivote_logo.svg">
    <img src="public/verivote_logo.svg" alt="" width="50%" height="50%">
  </picture>
</div>
<br>
<br>
Verivote is a free open source website that offers a hands-on approach for educating people about
alternative voting systems. You are welcome to deploy this website yourself or fork it and make it your own.


# General Information 


## Example Architecture
![alt text](architecture.svg)
The above is an example architecture. You can of course deploy the project however you like.
Using the provided Docker compose config is just a quick way to get the project set up and just requires connecting the
frontend and backend containers to your http(s) port for instance by using Nginx. It is strongly
recommended to enforce https. You can look up `certbot` for easily managing free TLS certificates.


## Authorization
This project uses OAuth to sign in user and issues encrypted JSON Web Tokens (JWE) stored as HTTP only cookies for 
authorization. The Next.js app issues the tokens and the backend consuming them has to share the same secret.
Otherwise, the backend won't be able to decrypt the tokens. If you are new to IT-security and are currently working on 
another project, know that it is not recommended to use this approach in projects that handle sensitive data. JWTs come
with some downsides. For instance, you are not able to sign out users from the server. All you can do is include an
expiry date in the JWT but if someone's token gets stolen that wouldn't help.

This site doesn't need any user information on the client-side which is why none is sent to the client. If someone
steals a user's JWT, they won't be able to access your user information (Name, Email) because it is not exposed to the
frontend or by the API and can't be read from the JWT because it is encrypted.


## Legal Notices
The included legal notices serve as placeholders. You are solely responsible for providing a proper
legal notice and privacy policy for your jurisdiction.


# Deploying the app yourself

## Setting Up OAuth
To use an OAuth provider, you need to register the app in the developer portal of each provider you
would like to use and make sure it is registered in `@/app/auth/[...nextauth]/route.ts`. Since the login page has
custom styling, you will also need to add a button for each provider you use. You can add this buttons in 
`@/app/auth/signin/page.tsx`.You can find more information about providers 
[here](https://next-auth.js.org/configuration/providers/oauth#built-in-providers).
Providers require you to specify an Authorization callback URL like `http://localhost:3000/auth/callback/github`.
Make sure to replace `http://localhost:3000` with the origin of your deployed website and `github` with the respective
provider.

## Environment Variables
To deploy the project successfully you need to set all environment variables correctly. Here's an explanation of all
environment variables that need to be set. The environment variables are shared by the frontend and backend by default.
If you write your own backend, make sure to share the same secret for JWTs. If you add more OAuth providers, you may
want to define your own environment variables and use them in your code.
The frontend and backend try to read from `.env.local` by default, so create that file and add these variables:

```javascript
// SERVER SIDE ENVIRONMENT VARIABLES

// This is the ID from the GitHub developer portal used for OAuth
GITHUB_ID=""
// This is the secret from the GitHub developer portal used for OAuth
GITHUB_SECRET=""
// This is the ID from the Discord developer portal used for OAuth
DISCORD_ID=""
// This is the secret from the Discord developer portal used for OAuth
DISCORD_SECRET=""
// This is the secret used for JWT encryption/decryption used by both the Next server and the backend server
NEXTAUTH_SECRET=""
// Use your own origin here but make sure to keep the auth
NEXTAUTH_URL="http://localhost:3000/auth"
// The origins to allow for CORS on the backend
CORS_ALLOW_ORIGIN="http://localhost:3000"
// This specifies were to reach MongoDB from the backend. Includes credentials and DB name
MONGODB_URI="mongodb://user:pass@localhost:27017/?authSource=verivote"


// PUBLIC ENVIRONMENT VARIABLES

// The origin where the backend server is reachable
NEXT_PUBLIC_API_ORIGIN="http://localhost:4000/api"
// The amount of poll options you want to allow users to create
NEXT_PUBLIC_MAX_OPTIONS_PER_POLL="20"
// The origin where the next server is reachable
NEXT_PUBLIC_ORIGIN="http://localhost:3000"



// ENV VARS PREFIXED WITH "LEGAL" ARE NOT NECESSARY IF YOU DECIDE TO IMPLEMENT YOUR OWN LEGAL PAGES

// This is used in the example legal pages - The person responsible for the site (free format)
LEGAL_RESPONSIBLE_ENTITY=""
// This is used in the example legal pages - The street name of the person responsible for the site (free format)
LEGAL_STREET=""
// This is used in the example legal pages - The zip code and city of the person responsible for the site (free format)
LEGAL_ZIP_AND_CITY=""
// This is used in the example legal pages - The phone number of the person responsible for the site (free format)
LEGAL_PHONE=""
// This is used in the example legal pages - The email address of the person responsible for the site (free format)
LEGAL_EMAIL=""
```

## Manual Deployment
If you don't want to use the provided docker config for deploying the project, here's a list of steps to take
to get the website up and running.

### Database
You need to set up a mongo database for verivote and create a user with the permissions.
```bash
> use verivote
> db.createCollection("polls")
> db.createRole({ 
    role: "verivoteRole", 
    privileges: [
      {
        resource: { db: "verivote", collection: "poll" }, 
        actions: [ "find", "update", "insert", "remove" ] 
      }
    ],
    roles:[]
})
> db.createUser({
    user: "verivoteUser",
    pwd: passwordPrompt(),
    roles: [{ role: "verivoteRole", db: "verivote" }]
})
```