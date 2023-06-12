### Creating API routes in nextjs using MongoDB:
1. Install mongoose using npm i mongoose.
2. create a folder called models in app directory and create a file called dbconnection.ts and add code to connect db (see dbConnection.ts for reference)
3. create a user schema in file called userModel (see userModel.ts for reference)
4. Now DB and Schema part is completed, now create an api route in nextjs using api routing(create a folder name api inside this folder create another folder auth and inside auth folder create folder like register and login and inside these folders create a file route.ts) refer api folder to understand better.
5. Now inside route.ts file write code for register and login as we do in auth controller file in express. (see route.ts file of register or login to understand some code changes in nextjs)
6. Test API routes using postman by using http methods and correct url (api/auth/register) as we created api route using nextjs api routing method. We can use this routes in frontend also using http://localhost:3000/api/auth/login

### Cookies in nextjs:
1. Set cookie:
```js
    //Set json response first
    const response = NextResponse.json({ message: 'user logged successful',  newUser}, { status: 200 });

    //Then set a cookie
    response.cookies.set({
        name: 'jwt',
        value: accessToken,
        httpOnly: true,
        maxAge: 60 * 60,
    });

    return response;
```

2. Get cookie:
```js
    const token = req.cookies.get('jwt')?.value as string;
```

3. Delete cookie:
```js
let response = NextResponse.json('user logged out');
response.cookies.delete('jwt');
```

### Logout Functionality in nextjs:
```js
//logout functionality
import { NextResponse } from "next/server";
//api route: http://localhost:3000/api/auth/logout
export async function POST() {
    let response = NextResponse.json('user logged out');
    //delete cookie
    response.cookies.delete('jwt');
    return response;
}
```

### NextAuth.js in Nextjs 13
1. Setup of nextAuth.js:
    - For authentication, we’ll use the credential provider, which requires a username or email and a password. First, we’ll validate and authenticate the credentials included in the request body against our database.
    - Once we’ve authenticated the user, we’ll explore different methods for retrieving and modifying session information, as well as how to protect private routes in your application.
    - After setting up nextjs project, install nextAuth using command: npm install next-auth.
    - Initially, we defined and exported the NextAuth options in the src/app/api/auth/[…nextauth]/route.ts file. However, some users encountered export errors when running the code. To address this issue, we can define and export the NextAuth options in a separate file, such as the lib/auth.ts file.
    - To implement this solution, navigate to the src directory and create a new folder called lib. Inside the lib folder, create a file named auth.ts and copy the following NextAuth configuration code into it.
    - src/lib/auth.ts:
        ```ts
        import type { NextAuthOptions } from "next-auth";
        import CredentialsProvider from "next-auth/providers/credentials";

        export const authOptions: NextAuthOptions = {
        session: {
            strategy: "jwt",
        },
        providers: [
            CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                label: "Email",
                type: "email",
                placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = { id: "1", name: "Admin", email: "admin@admin.com" };
                return user;
            },
            }),
        ],
        };
        ```
    - The above code demonstrates the process of setting up authentication in a Next.js 13 app using the NextAuth library. We first imported the CredentialsProvider module, which we’ll use for validation. Then, we defined an object called ‘authOptions‘ that contains the configuration for our authentication process.
    - In the credentials key of the CredentialsProvider() method, we listed the email and password fields, which will be available on the sign-in form. For the authorization step, we’re currently using a simple mock implementation that returns a fixed user object.

2. The next step is to create an API route that can handle authentication requests from NextAuth. We’ll use the NextAuth() method to create an API handler and then export it as GET and POST functions for use in our application.
    - To get started, navigate to the api directory within the src/app folder. Within the api directory, create a new folder called auth. Inside the ‘auth‘ folder, create a folder named […nextauth]. Finally, create a new file named route.ts within the […nextauth] folder and add the code provided below.
        ```ts
        //src/app/api/auth/[…nextauth]/route.ts
        import { authOptions } from "@/lib/auth";
        import NextAuth from "next-auth";

        const handler = NextAuth(authOptions);
        export { handler as GET, handler as POST };

        ```

3. Before testing the authentication flow, we need to configure the required environment variables for NextAuth to function properly. These variables include a secret for JWT encryption and the root URL of your application.
    - To set these variables, create a .env file in the root directory and add the following environment variables to it. 
        ```js
        NEXTAUTH_SECRET=my_ultra_secure_nextauth_secret
        NEXTAUTH_URL=http://localhost:3000
        ```
    - You can start the development server to build the project and visit http://localhost:3000/ to access the application. From the home page, you can click on the “sign in” button. If you are correctly redirected to the default NextAuth sign-in page, you are ready to proceed.
    - Now that authentication is complete, we need a way to access the session data to make use of it. There are three locations where we can obtain the session data. The first is server-side in a React server component, the second is also server-side in any API route, and the last is on the client-side. This implies that two of the places are server-side, while one is client-side.

4. Get the Session in a Server Component
- This can be done by calling the getServerSession function and providing the ‘authOptions‘ object that was exported from the lib/auth.ts file during the NextAuth setup.
- To know more about how to create a session on different locations, visit: https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?ez_vid=qYWsIiWrPiu#ezoic-pub-video-placeholder-107

5. Get the Session in a Client Component
- For this, NextAuth requires a session provider to be set up on the client-side. Once the provider is in place and wraps around your application, you can use a client-side hook called useSession to obtain the session information.
- Since the client can’t decode the JSON Web Token (JWT) on its own, the useSession hook makes an HTTP request to the server to retrieve the session information. The server decodes the JWT and sends it back, and NextAuth stores the session data in the provider, which the useSession hook can then access.
- To create the session provider, simply create a providers.tsx file in the “src/app” directory and add the following code.
```tsx
//src/app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

```
- After creating the session provider, wrap it around {children} in the src/app/layout.tsx file so that all client-side components can access the session data. Here’s the code you can use:
```tsx
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
```
- To retrieve the session data and display it on the client-side. First, navigate to the ‘components‘ directory and create a new file named user.component.tsx. Then, paste the following code into the new file.
```tsx
//src/components/user.component.tsx
"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};
```