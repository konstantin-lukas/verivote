<br>
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
<br>
Verivote is a free open source website that offers a hands-on approach for educating people about
alternative voting systems. You are welcome to deploy this website yourself or fork it and make it your own.


# General Information 


## Architecture
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
would like to use and make sure it is registered in `@/app/api/auth/[...nextauth]/route.ts`. Since the login page has
custom styling, you will also need to add a button for each provider you use. You can add this buttons in 
`@/app/(auth)/signin/page.tsx`.You can find more information about providers [here](https://next-auth.js.org/configuration/providers/oauth#built-in-providers).