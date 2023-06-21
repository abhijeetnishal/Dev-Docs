### Nextjs redirect
```js
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  if(response.ok){
      // Redirect to another page
      router.push('/login');
  }
}
```

### Creating API routes in nextjs using MongoDB:
1. Install mongoose using npm i mongoose.
2. create a folder called models in app directory and create a file called dbconnection.ts and add code to connect db (see dbConnection.ts for reference)
3. create a user schema in file called userModel (see userModel.ts for reference)
4. Now DB and Schema part is completed, now create an api route in nextjs using api routing(create a folder name api inside this folder create another folder auth and inside auth folder create folder like register and login and inside these folders create a file route.ts) refer api folder to understand better.
5. Now inside route.ts file write code for register and login as we do in auth controller file in express. (see route.ts file of register or login to understand some code changes in nextjs)
6. Test API routes using postman by using http methods and correct url (api/auth/register) as we created api route using nextjs api routing method. We can use this routes in frontend also using http://localhost:3000/api/auth/login

### TypeError: Cannot read properties of undefined (reading 'headers') at eval
- Always return the NextResponse like: return NextResponse.json({message: 'user data'}, {status: 200});

### Cookies in nextjs:
1. Set cookie:
```js
    //Set json response first
    const response = NextResponse.json({ message: 'user logged successful',  newUser}, { status: 200 });

    //Then set cookie for access token
    response.cookies.set({
        name: 'access_token',
        value: accessToken,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 24 * 60 * 60,
        path: "/",
    });

    //Then set cookie for refresh token
    response.cookies.set({
        name: 'refresh_token',
        value: refreshToken,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 24 * 60 * 60,
        path: "/",
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
    //delete cookies
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
}
```

### Google Login in NextJs
- Install next-auth using command: 
  ```ts  
  npm i next-auth
  ```
- Create a folder named 'lib' in 'src' directory and inside 'lib' folder create a file name auth.ts and add below code:
  ```ts
  import dbConnection from "@/app/api/models/dbConnection";
  import user from "@/app/api/models/userModel";
  import NextAuth from "next-auth";
  import type { NextAuthOptions } from "next-auth";
  import GoogleProvider from "next-auth/providers/google";
  import bcrypt from 'bcrypt'

  export const authOptions: NextAuthOptions = {

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ]
  }

  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };
  ```
- Create a folder named '[...nextauth]' in 'src/api/auth' and inside this folder create a file called route.ts and add following code:
  ```ts
  import { authOptions } from "@/lib/auth";
  import NextAuth from "next-auth";

  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };
  ````
-  After that create a frontend for login-page with google:
```ts
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const page = () => {

const searchParams = useSearchParams();
const callbackUrl = searchParams.get("callbackUrl") || "/auth/user";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("google", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl,
      });

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <main className='flex flex-col justify-center items-center h-[calc(100vh-20px-40px)]'>
        <header className='font-bold'>
            Login
        </header>
        <section className='pt-[20px]'>
            <button onClick={ onSubmit } className='w-[150px] border-2 rounded-md bg-blue-400'>Google Login</button>
        </section>
    </main>
  )
}
```

- Add below code in layout.tsx:
```tsx
'use client'

<body className={inter.className}>
  <SessionProvider>
    <Header />
      {children}
    <Footer />
  </SessionProvider>
</body>
```

- Create a logout for user page:
```tsx
import { useSession, signOut } from "next-auth/react"
//logout
<button onClick={ ()=>{ signOut({ callbackUrl: 'http://localhost:3000/' }); } } className='w-[150px] border-2 rounded-md bg-blue-400'>Logout</button>

//session
const { data: session } = useSession();

<div>
      {
      session && session.user ? (
      <section className='pt-[20px]'>
        
      </section>
      ) : 
      (
        <p>You need to sign in to access</p>
      )
      }
    </div>
```