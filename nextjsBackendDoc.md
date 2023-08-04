### Connect mongoDB:
- create a folder named lib insidesrc directory and inside this folder create a file named dbConnection.ts 
```ts
  //dbConnection.ts file

  //Mongoose is an object data modeling (ODM) library for MongoDB and Node.js.
  import mongoose, { ConnectOptions } from "mongoose";
  
  //import url from .env file
  const uri = process.env.MONGODB_URI as string;

  //these are options to ensure that the connection is done properly
  const options = {
    useUnifiedTopology: true as boolean,
    useNewUrlParser: true as boolean,
  }

  //create a dbConnection promise
  let dbConnection: Promise<mongoose.Connection>;

  if(process.env.NODE_ENV === 'development') {
      // In development mode, if the Mongoose connection is not ready,
      // create a new connection and store the promise for future reuse.
      if (!mongoose.connection.readyState) {
          dbConnection = mongoose.connect(uri, options as ConnectOptions).then(() => mongoose.connection);
      } 
      // If the Mongoose connection is already established, reuse it.
      else {
          dbConnection = Promise.resolve(mongoose.connection);
          console.log('MongoDB successfully connected');
      }
  } 
  else {
      // In production mode, create a new Mongoose connection.
      dbConnection = mongoose.connect(uri, options as ConnectOptions).then(() => mongoose.connection);
  }

  export default dbConnection;
```

- use this connection in other files to connect MongoDB
```ts
  //connect DB
  await dbConnection;
```

### Create schema inside another schema(MongoDB):
```ts
  import mongoose, { Schema } from "mongoose";

  //transaction schema which we use in another schema as list
  const transactionSchema = new Schema({
      time_stamps:{
          type: String,
          default: null
      },
      visitor_area_data: {
          type: Schema.Types.Mixed,
          default: null
      },
      visitor_time_data: {
          type: Schema.Types.Mixed,
          default: null
      },
      total_footfalls_data: {
          type: Object,
          default: null
      },
      dashboard_image: {
          type: String,
          default: null
      },
      video_url: {
          type: String,
          default: null
      },
  });

  //create schema for dashboard
  const dashboardSchema = new mongoose.Schema({
      transaction:[transactionSchema],
      //unique and 6 digit(like url-shortener shortId)
      camera_id: {
          type: String,
          default: null
      },
      user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
      }
  }, { timestamps: true });

  const dashboard = mongoose.models.Dashboard || mongoose.model("Dashboard", dashboardSchema);

  export default dashboard;
```

### Creating API routes in next.js using MongoDB:
1. Install mongoose using npm i mongoose.
2. create a folder called models in app directory and create a file called dbconnection.ts and add code to connect db (see dbConnection.ts for reference)
3. create a user schema in file called userModel (see userModel.ts for reference)
4. Now DB and Schema part is completed, now create an api route in nextjs using api routing(create a folder name api inside this folder create another folder auth and inside auth folder create folder like register and login and inside these folders create a file route.ts) refer api folder to understand better.
5. Now inside route.ts file write code for register and login as we do in auth controller file in express. (see route.ts file of register or login to understand some code changes in nextjs)
6. Test API routes using postman by using http methods and correct url (api/auth/register) as we created api route using nextjs api routing method. We can use this routes in frontend also using http://localhost:3000/api/auth/login

### Connect SQLite
- create a file named sqlConnect.ts in folder models.
```ts
  //import the sqlite3 module
  import sqlite3 from 'sqlite3'

  //create a function to connect sqlite
  const connectSqlite = async ()=>{
      //the execution mode is set to verbose to produce long stack traces
      const sqlite = sqlite3.verbose();

      //create a database instanace for sqlite
      //create a file with name otp.db in project root folder
      let db = new sqlite.Database('./otp.db', (error) => {
        if(error) {
          console.error(error.message);
        }
        console.log('Connected to SQLite');
      });

      return db;
  }

  //export the method
  export default connectSqlite
```

### Create schema in SQLite
```ts
  //create schema by hitting endpoint once: /api/password-reset/create-schema 
  import connectSqlite from "@/models/sqliteConnect";
  import { NextResponse } from "next/server";

  export async function POST(){
      //get database instance
      const db = await connectSqlite();

      //create a Promise schema which store the response
      const schema = await new Promise((resolve, reject)=>{
          //create table named otp_schema with column -> email, otp and expiration_time
          db.run('CREATE TABLE otp_schema (email TEXT PRIMARY KEY, otp TEXT, expiration_time INTEGER)', (error)=> {
              if(!error) 
                  resolve('otp_schema created successfully');
              else 
                  resolve(error.message);  
          });
      });

      return NextResponse.json({ message: schema }, {status: 200});    
  }
```

### Insert and get Data in SQLite:
```ts
  //get sqlite DB instance
  const db = await connectSqlite();

  //insert email, otp and expiration_time into sqlite DB
  db.run('INSERT INTO otp_schema (email, otp, expiration_time) VALUES (?, ?, ?)', [email, verificationCode, expiration_time], function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Data inserted successfully.');
    }
  });

  //get the verification code send from server through cookies
  const row = await new Promise((resolve, reject) => {
      db.get('SELECT otp FROM otpschema WHERE email = ?', [email], (error, row: {otp: string}) => {
        if(error) {
          resolve(error);
        } 
        else {
          resolve(row?.otp);
        }
      });
  });
  
  const serverVerificationCode = row;
```

### How to upload video to AWS S3 programmatically
- Visit: https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/

### How to generate presigned url from S3
- Install required modules: npm i @aws-sdk/s3-request-presigner @aws-sdk/url-parser @aws-sdk/protocol-http @aws-sdk/hash-node @aws-sdk/util-format-url
- Create an endpoint get-presigned-url
- Add below code to route.ts
```ts
  import { NextRequest, NextResponse } from "next/server";
  import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
  import { parseUrl } from "@aws-sdk/url-parser";
  import { HttpRequest } from "@aws-sdk/protocol-http";
  import { Hash } from "@aws-sdk/hash-node";
  import { formatUrl } from "@aws-sdk/util-format-url";

  export async function POST(req: NextRequest){
      try{
          //get object S3 Object Url from client
          const { objectUrl } = await req.json();

          //creating a new instance of the S3RequestPresigner used for generating presigned URLs.
          const presigner = new S3RequestPresigner({
              //AWS credentials required to sign the request
              credentials:{
                  accessKeyId: process.env.accessKeyId as string,
                  secretAccessKey: process.env.secretAccessKey as string
              },
              //The AWS region where the S3 bucket and object reside
              region: process.env.region as string,
              //custom hash function used for signing the request
              sha256: Hash.bind(null, "sha256"),
          });
      
          //takes an S3 object URL, which is then parsed using the `parseUrl` function
          const s3ObjectUrl = parseUrl(objectUrl);
          
          // create a GET request from S3 url.
          const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
          const preSignedUrl = formatUrl(url);
      
          return NextResponse.json({preSignedUrl}, {status: 200});
      }
      catch(error){
          return NextResponse.json({message: 'internal server error: '+ error}, {status: 500});
      }
  }
```
- Send object id from postman or client after uploading to S3 to generate Presigned url.
- Call the get-presigned-url endpoint and pass the objectUrl received from database which is stored earlier in client to get video or image url.

### How to receive form data (postman)
```ts
  const formData = await req.formData();
  const total_footfalls_data = formData.get('total_footfalls_data');
  const visitor_area_data = formData.get('visitor_area_data');
```

### Cookies in nextjs:
1. Set cookie:

```js
//Set json response first
const response = NextResponse.json(
  { message: "user logged successful", newUser },
  { status: 200 }
);

//Then set cookie for access token
response.cookies.set({
  name: "access_token",
  value: accessToken,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV !== "development",
  maxAge: 24 * 60 * 60,
  path: "/",
});

//Then set cookie for refresh token
response.cookies.set({
  name: "refresh_token",
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
let response = NextResponse.json("user logged out");
response.cookies.delete("jwt");
```

### Access Token and Refresh Token in oAuth2.0:
- Generated during login route and userId will be used as a payload of jwt. 
- We can use access token for short time while refresh token for longer time. 
- Since access token expiration time is less so we need refresh token to refresh the access token i.e. we again sign the access token after verifing the refresh token so to create a new access token after expiring to give extra security (a/c to oAth2.0).
- For verification, userId and refreshing the access token, we use cookies(local storage).
- Refresh token code:

```ts
  try {
    //get the refresh token
    const refreshToken = req.cookies.get("refresh_token")?.value as string;
    if (refreshToken) {
      //verify the refreah token
      const isRefreshTokenVerified = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      );

      if (isRefreshTokenVerified) {
        //Get the user id from cookies
        const userId = req.cookies.get("user_id")?.value as string;

        //Refresh the access token
        const newAccessToken = jwt.sign(
          { userId },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" }
        );

        //update the access token cookie
        const response = NextResponse.json(
          { message: "access token refreshed" },
          { status: 200 }
        );
        response.cookies.set({
          name: "access_token",
          value: newAccessToken,
          maxAge: 24 * 60 * 60,
        });

        return response;
      } else {
        return NextResponse.json(
          { message: "Refresh token not verified" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
```
- Clear all related cookies during logout to remove all data.

### Logout Functionality in nextjs:
```js
//logout functionality
import { NextResponse } from "next/server";
//api route: http://localhost:3000/api/auth/logout
export async function POST() {
  let response = NextResponse.json("user logged out");
  //delete cookies
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  return response;
}
```

### Google Login in NextJs
- Visit this site to understand some methods of nextAuth.js: https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?ez_vid=qYWsIiWrPiu#ezoic-pub-video-placeholder-107
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
  import bcrypt from "bcrypt";

  export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
  };

  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };
```

- Create a folder named '[...nextauth]' in 'src/api/auth' and inside this folder create a file called route.ts and add following code:

```ts
  import { authOptions } from "@/lib/auth";
  import NextAuth from "next-auth";

  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };
```

- After that create a frontend for login-page with google:
```ts
  import { useRouter, useSearchParams } from "next/navigation";
  import { signIn } from "next-auth/react";

  const page = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/auth";

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await signIn("google", {
          redirect: false,
          email: email,
          password: password,
          callbackUrl,
        });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <main className="flex flex-col justify-center items-center h-[calc(100vh-20px-40px)]">
        <header className="font-bold">Login</header>
        <section className="pt-[20px]">
          <button
            onClick={onSubmit}
            className="w-[150px] border-2 rounded-md bg-blue-400"
          >
            Google Login
          </button>
        </section>
      </main>
    );
  };
```

- Create a backend for checking user is registered or not(using email) with route: /api/auth/google/is-registered. Get email address using server session of nextauth.js
```ts
  //get session data in api route(server)
  const session = await getServerSession(authOptions);

  //get email through session
  const email = session?.user?.email as string;

  //get name through session
  const fullName = session?.user?.name as string;

  //get image through session
  const image = session?.user?.image as string;
```

- create a redirection page where we check the user is registered with google or not.
- Make that page hidden to not show that page and directly redirect to required page.
```tsx
  'use client'
  import { useRouter } from 'next/navigation'
  import React, { useEffect } from 'react'

  const page = () => {
      const router = useRouter();
      useEffect(()=>{
          const fetchData = async () => {
              // get the data from the api
              const response = await fetch('http://localhost:3000/api/auth/google/is-registered');

              //check email already registered or not
              if(response.ok){
                  const response = await fetch('http://localhost:3000/api/auth/google/session',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if(response.ok){
                    //redirect to user page
                    router.push('/auth/user');
                }
              }
              else{
                  //redirect to google register page
                  router.push('/register/google');
              }
          }

          // call the function
          fetchData();
          // make sure to catch any error
          .catch(console.error);
          //eslint-disable-next-line
      }, [])

    return (
      //making display: none (which is hidden in tailwind) to not display that page and directly redirect to
      <div className='hidden'>
          Processing...
      </div>
    )
  }

  export default page
```

- If user is not registered redirect to another page(route) to get details (name,password, etc) and create a backend route to register and save user to DB and finally hit the login endpoint of backend(using email and password) and redirect to auth/user.
```tsx
  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await fetch(
      "http://localhost:3000/api/auth/google/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();
    setIsLoading(false);
    setMessage(data.message);

    if (response.ok) {
      //login the user
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        router.push("/auth/user");
      }
    }
  };
```

- If user is registered already then sign the token and create a cookie using backend endpoint and finally redirect to auth/user.

- Create a logout for user page:
```tsx
  import { useSession, signOut } from "next-auth/react";
  //logout
  <button
    onClick={() => {
      signOut({ callbackUrl: "http://localhost:3000/" });
    }}
    className="w-[150px] border-2 rounded-md bg-blue-400"
  >
    Logout
  </button>;
```

- Add below code in layout.tsx to use session:
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
