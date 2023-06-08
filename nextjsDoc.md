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
