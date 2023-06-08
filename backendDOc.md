### oath2.0
- OAuth 2.0, which stands for “Open Authorization”, is a standard designed to allow a website or application to access resources hosted by other web apps on behalf of a user.
- OAuth 2.0 is an authorization protocol and NOT an authentication protocol. As such, it is designed primarily as a means of granting access to a set of resources, for example, remote APIs or user data.
- OAuth 2.0 uses Access Tokens. An Access Token is a piece of data that represents the authorization to access resources on behalf of the end-user. OAuth 2.0 doesn’t define a specific format for Access Tokens. However, in some contexts, the JSON Web Token (JWT) format is often used. This enables token issuers to include data in the token itself. Also, for security reasons, Access Tokens may have an expiration date.
- 

### Access token and refresh token using oath2.0 standard:
- The OAuth 2 Authorization server may not directly return an Access Token after the Resource Owner has authorized access. Instead, and for better security, an Authorization Code may be returned, which is then exchanged for an Access Token. In addition, the Authorization server may also issue a Refresh Token with the Access Token. Unlike Access Tokens, Refresh Tokens normally have long expiry times and may be exchanged for new Access Tokens when the latter expires. Because Refresh Tokens have these properties, they have to be stored securely by clients.
- In the world of OAuth 2.0, an access token and a refresh token are both important components used for secure authorization and access to resources.
- An access token is like a key that grants you access to certain resources or data on a system. It acts as a temporary authorization token that verifies your identity and permissions. Imagine it as a digital pass that allows you to enter specific areas or use certain services. When you make a request to access a protected resource, you present this access token, and if it's valid and has the necessary permissions, you're granted access.
- Now, access tokens have a limited lifespan for security reasons. They typically expire after a short period, like an hour or a day. That's where the refresh token comes into play.
- A refresh token is also a key, but its purpose is slightly different. It's used to obtain a new access token when the current one expires. So, if your access token is about to expire, you can present the refresh token to the authorization server, and it will issue you a fresh access token without the need for re-authentication. Think of it as getting a new pass to keep accessing the same areas or services.
- The advantage of this approach is that you don't need to enter your credentials (username and password) every time you need a new access token. The refresh token is a longer-lived token that is securely stored on the client side, and it helps maintain a smoother user experience by automating the token renewal process.

### How Does OAuth 2.0 Work?
- At the most basic level, before OAuth 2.0 can be used, the Client must acquire its own credentials, a _client id _ and client secret, from the Authorization Server in order to identify and authenticate itself when requesting an Access Token.
- Using OAuth 2.0, access requests are initiated by the Client, e.g., a mobile app, website, smart TV app, desktop application, etc. The token request, exchange, and response follow this general flow:
    1. The Client requests authorization (authorization request) from the Authorization server, supplying the client id and secret to as identification; it also provides the scopes and an endpoint URI (redirect URI) to send the Access Token or the Authorization Code to.
    2. The Authorization server authenticates the Client and verifies that the requested scopes are permitted.
    3. The Resource owner interacts with the Authorization server to grant access.
    4. The Authorization server redirects back to the Client with either an Authorization Code or Access Token, depending on the grant type, as it will be explained in the next section. A Refresh Token may also be returned.
    5. With the Access Token, the Client requests access to the resource from the Resource server.
- Visit this site to know more https://auth0.com/intro-to-iam/what-is-oauth-2
