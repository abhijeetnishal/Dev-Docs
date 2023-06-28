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

### Show/Hide password in input field
    ```tsx
    "use client"
    import React, { useState } from 'react'
    import eye from '../../../public/eye-image.png';
    import cutEye from '../../../public/cut-eye-image.png';
    import Image from 'next/image';

    const page = () =>{
        //create states for different buttons e.g.- password, confirmpassword, etc
        const [isPasswordEyeBtnClicked, setIsPasswordEyeBtnClicked] = useState(false);
        const [isConfirmPasswordEyeBtnClicked, setIsConfirmPasswordEyeBtnClicked] = useState(false);

        //create on click function for password to change states of password when eye button is clicked
        const onPasswordEyeBtnClickFunc = ()=>{
            setIsPasswordEyeBtnClicked(!isPasswordEyeBtnClicked);
        }

        //create on click function for confirm password to change states of confirm password when eye button is clicked
        const onConfirmPasswordEyeBtnClickFunc = ()=>{
            setIsConfirmPasswordEyeBtnClicked(!isConfirmPasswordEyeBtnClicked);
        }

        /*
        Steps for show or hide password
        1. In input field add: placeholder='Password' type={isPasswordEyeBtnClicked? 'text' : 'password'} it will check if btn is clicked then display password text, else display type: password 
        2. In button add: onClick={onPasswordEyeBtnClickFunc} or onClick={onConfirmPasswordEyeBtnClickFunc} a/c to need
        3. Inside Button add:
            <button onClick={onPasswordEyeBtnClickFunc}>
                {
                    isPasswordEyeBtnClicked ? (<Image src={cutEye} alt='' className="min-w-0 relative w-6" /> )
                    : (<Image src={eye} alt='' className="min-w-0 relative w-6"/> )
                }
            </button>
            This will check if btn is clicked then show eye btn else show cuteye btn
        */
        return (
            <section className='flex flex-row justify-center items-center w-[370px] h-[54px] border-solid border-[#e0e5f2] outline-none shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] bg-white pl-[6px] relative h-12 items-start border rounded-lg whitespace-nowrap font-medium text-[#908a8a]'>
                <input placeholder='Password' type={isPasswordEyeBtnClicked? 'text' : 'password'} value={password} onChange={(event)=>{setPassword(event.target.value)}} className='w-[320px] h-[52px] outline-none' />
                <button onClick={onPasswordEyeBtnClickFunc}>
                    {
                        isPasswordEyeBtnClicked ? (<Image src={cutEye} alt='' className="min-w-0 relative w-6" /> )
                        : (<Image src={eye} alt='' className="min-w-0 relative w-6"/> )
                    }
                </button>
            </section>
            <section className='flex flex-row justify-center items-center w-[370px] h-[54px] border-solid border-[#e0e5f2] outline-none shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] bg-white pl-[6px] relative h-12 items-start border rounded-lg whitespace-nowrap font-medium text-[#908a8a]'>
                <input placeholder='Confirm Password' type={isConfirmPasswordEyeBtnClicked? 'text' : 'password'} value={confirmPassword} onChange={(event)=>{setConfirmPassword(event.target.value)}} className='w-[320px] h-[52px] outline-none' />
                <button onClick={onConfirmPasswordEyeBtnClickFunc}>
                    {
                        isConfirmPasswordEyeBtnClicked ? (<Image src={cutEye} alt='' className="min-w-0 relative w-6" /> )
                        : (<Image src={eye} alt='' className="min-w-0 relative w-6"/> )
                    }
                </button>
            </section>
        )
    }
    ```

### TypeError: Cannot read properties of undefined (reading 'headers') at eval
- Always return the NextResponse like: return NextResponse.json({message: 'user data'}, {status: 200});

### Protect Route
- To protect a route in Next.js the general logic is:
  1. Check if a user is authenticated
  2. If they are authenticated, fetch data and render the page
  3. If they are not authenticated, redirect the user to the login page or return an "unauthorized" response
- Create a route(server - api/auth/is-authenticated) which checks the user is authenticated or not using cookies/token.
- Create a protectRoute component at client:
  ```tsx
  import { useRouter } from 'next/navigation';
  import React, { useEffect } from 'react';

  const isAuthenticated = (Component: any) => {
    return (props: any) => {
      const router = useRouter();

      const checkAuthentication = async () => {
        const response = await fetch('http://localhost:3000/api/auth/is-authenticated', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
        });

        const isAuth = response.ok;
        return isAuth;
      };

      useEffect(() => {
        const fetchData = async () => {
          const isAuth = await checkAuthentication();
          if (!isAuth) {
            router.push('/login'); // Redirect to login page if not authenticated
          }
        };

        fetchData();
      }, []);

      if (!Component) {
        return null;
      } else {
        return <Component {...props} />;
      }
    };
  };

  export default isAuthenticated;
  ```
- use this component as a higher order component to protect page during export:
  ```tsx
  export default IsAuthenticated(page)
  ```

