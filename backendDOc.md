### REST API
-  In REST API route naming conventions, it is generally recommended to use nouns to represent resources and verbs to represent actions on those resources.
- However, there can be exceptions when using verbs as part of a compound term to convey a specific action or operation. In the case of "send-code," it can be considered acceptable if it represents the action of sending a verification code or password reset code via email or other means.

### Access Token and Refresh Token in oAuth2.0:
- Generated during login route and userId will be used as a payload of jwt.
- We can use access token for short time while refresh token for longer time.
- Since access token expiration time is less so we need refresh token to refresh the access token i.e. we again sign the access token after verifing the refresh token so to create a new access token after expiring to give extra security (a/c to oAth2.0).
- For verification, userId and refreshing the access token, we use cookies(local storage).
- Refresh token code:
```ts
    try{
        //get the refresh token
        const refreshToken = req.cookies.get('refresh_token')?.value as string;
        if(refreshToken){
            //verify the refreah token 
            const isRefreshTokenVerified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

            if(isRefreshTokenVerified){
                //Get the user id from cookies
                const userId = req.cookies.get('user_id')?.value as string;

                //Refresh the access token 
                const newAccessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '15m'});
                
                //update the access token cookie
                const response = NextResponse.json({message: 'access token refreshed'}, {status: 200});
                response.cookies.set(
                    {
                        name: 'access_token',
                        value: newAccessToken,
                        maxAge: 24 * 60* 60
                    }
                );

                return response;
            }
            else{
                return NextResponse.json({message: 'Refresh token not verified'}, {status: 401})
            }
        }
        else{
            return NextResponse.json({message: 'User not authenticated'}, {status: 401})
        }
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
```
- Clear all related cookies during logout to remove all data.

### Get Secret key
- https://randomkeygen.com/

### httpOnly in server
- The "HttpOnly" attribute is a flag that can be set when creating a cookie in web applications. When this attribute is set, it instructs the web browser that the cookie should not be accessible through client-side scripting languages such as JavaScript.
- By setting the HttpOnly flag, the cookie becomes restricted to being transmitted only via HTTP or HTTPS requests, preventing access from other methods like JavaScript's Document.cookie property. This helps protect against cross-site scripting (XSS) attacks, where an attacker tries to inject malicious scripts into a website to steal sensitive information, such as session cookies.
- visit this to understand better: https://javascript.plainenglish.io/next-js-secure-authentication-using-http-only-cookie-graphql-or-rest-a4ef94cec9e8

### Reset password(my-approach)
1. First verify the email i.e. account registered or not.
2. If email doesn't exist return email not registered.
3. If email verified means it is registered in DB then I follow these steps:
     1. Send verification code to registered email.
     2. Ask user to enter code send to their email.
     3. Verify the code enter by user with the code you sent.
     4. If code doesn't matches then return enter valid code .
     5. If code matches then ask user to enter new password and new confirm password.
     6. Finally update the hashed password  in DB.

### Random number generator:
    ```js
    import { getDigitalCode } from 'node-verification-code'

    //generate random verification code
    const verificationCode = getDigitalCode(8).toString();
    ```

### Email Sending through gmail api
- visit: https://www.labnol.org/google-api-service-account-220405
- For google api visit: https://console.cloud.google.com/projectselector2/apis/library/gmail.googleapis.com?supportedpurview=project&authuser=1

### Sending Email using AWS SES
- visit:
    - https://www.freecodecamp.org/news/set-up-aws-simple-email-service/
    - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html

### Create a google credentials(client_id and client_secret)
- First go to https://console.cloud.google.com/projectcreate?previousPage=%2Fapis%2Fcredentials%3Fcloudshell%3Dtrue%26project%3Ddouble-genius-390404&organizationId=0&cloudshell=true to create a project if not created.
- Enter project name and organisation and click on create.
- Click on APIs & Services from side navbar.
- Now enable gmail API by clicking on Enable APIs & services and click on +ENABLEAPI, it will open all google apps, then select Gmail API and click enable.
- In API & Services, click on Credentials and then click on + CREATE CREDENTIALS and select OAuth client ID and create a Oauth Client ID.
- Enter necessary details.
- Select application type and enter Authorized JavaScript origins, Authorized redirect URIs.
- Click on create, after creating it will give Client ID and Client Secret, add to .env file