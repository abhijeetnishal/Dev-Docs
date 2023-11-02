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

### API call URLs:
- use relative url's instead of full ( like http://localhost:3000/api/auth or https://myapp.vercel.app/api/auth ), use this /api/auth/

### Production build issue(vercel)
- use component name i.e. when creating component name should be Page.ts not page.ts which is created by default.
- sometimes changes of file name in development doesn't changes at github as it takes previous commit name so it's necessary to change the file on github else in production it throws error.

### image in nextjs
```tsx
//src={profileIcon.src} -> this is for image present in asset/public folder
//src={image} -> this is for image string get from session
<figure className='flex items-center'>
  {
      image? (<img className='h-[30px] w-[30px] border rounded-2xl' src={image} alt='' />) 
      : (<img className='h-[30px] w-[30px]' src={profileIcon.src} alt='' />)
  }
</figure>
```

### Disable right click
- The contextmenu event fires when the user attempts to open a context menu. This event is typically triggered by clicking the right mouse button, or by pressing the context menu key.
```js
    window.document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
```

### Search functionality using query params
```js
const ResourceListWrapper = (props) => {
  const router = useRouter();

  //State for checking search bar is active or not
  const [isResourceSearching, setIsResourceSearching] = useState(false);
  //State for resource search input text
  const [ resourceSearchText, setResourceSearchText ] = useState("");

  //Resource search route
  useEffect(()=>{
    const delayDebounceFn = setTimeout(()=>{
      if(isResourceSearching){
        router.replace(
          resourceSearchText && resourceSearchText !== ""
          ?
          `/manage/resources?query=${resourceSearchText}&page=1`
          :
          `/manage/resources?page=1`
        )
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [resourceSearchText])

  useEffect(() => {
    const { query, page } = router.query;

    let queryPage = page ? parseInt(page) : 1;
    setActivePage(queryPage);

    //API
    getResourcesApi(
      () => () =>
        AdminService.getManageResources(
          query,
          (queryPage - 1) * limit,
          limit,
          type,
          token
        )
    );
  }, [router.query]);

  //Function for setting resource search text
  const onChangeQuery = (event)=>{
    if(!isResourceSearching)
      setIsResourceSearching(true);
    setResourceSearchText(event.target.value);
  }

  return (
    {/* Search input component */}
    <SearchInput 
      placeholder="Search resources"
      onSearchChange={onChangeQuery}
      value={resourceSearchText}
    />
  )
```

### getServerSideProps
- You should use getServerSideProps only if you need to render a page whose data must be fetched at request time. 
- getServerSideProps only runs on server-side and never runs on the browser. If a page uses getServerSideProps, then:
  - When you request this page directly, getServerSideProps runs at request time, and this page will be pre-rendered with the returned props
  - When you request this page on client-side page transitions through next/link or next/router, Next.js sends an API request to the server, which runs getServerSideProps

### Upload profile Image Functionality using base64 encoding and storing directly into DB:
- In client component(Frontend) add file upload functionality:
```tsx
const Page = (props: Props) => {
    const [selectedImage, setSelectedImage] = useState(null);

    function convertToBase64(file: any){
      return new Promise((resolve, reject)=>{
        const fileReader = new FileReader();

        //used to read the contents of the file as a Data URL. 
        //Data URLs are URLs that include the data itself (Base64-encoded) instead of referencing external resources.
        fileReader.readAsDataURL(file);

        //onload event is triggered when the reading operation is successful.
        fileReader.onload = ()=>{
          resolve(fileReader.result)
        };
        //onerror event is triggered if there's an error during the reading operation.
        fileReader.onerror = (error)=>{
          reject(error)
        }
      })
    }

    const handleFileUpload = async (e: any)=>{
        //to prevent the default behavior of the event
        e.preventDefault();
        const file = e.target.files[0];
        //converts the file to a Base64-encoded string.
        const base64: any  = await convertToBase64(file);
        
        setSelectedImage(base64);
    }

    async function updateProfilePicture(){
        const response = await fetch('/api/auth/profile/update-profile-details',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                image: selectedImage
            })
        });

        const data = await response.json();
        //console.log(data);
        setSelectedImage(data.image);
    }
    
    // const removeProfilePicture = async()=>{
    //     const response = await fetch('/api/auth/profile/update-profile-picture', {
    //         method: 'POST',
    //         headers: {
    //             'content-type' : 'application/json'
    //         },
    //         body: JSON.stringify({
    //             image: null
    //         })
    //     });

    //     const data = await response.json();
    //     setSelectedImage(data.image);

    return (
      <section className='w-full h-1/3 flex flex-row justify-center'>
        <figure className='flex items-center justify-center'>
            {   
                selectedImage ? (<img className='h-[80px] w-[80px] rounded-[60px] border-[2px] border-gray-400' src={selectedImage} />) 
                :
                userImage ? (<img className='h-[80px] w-[80px] rounded-[60px]' src={userImage} />) 
                :
                (<img className='h-[80px] w-[80px]' src={profileIcon.src} alt='' />)
            }
        </figure>
        {/* remove image functionality */}
        {
            selectedImage ?
            (
                <button onClick={()=>{ setSelectedImage(null); }} className="ml-[-15px] mt-[10px] inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-700 transition-colors duration-150 bg-gray-200 rounded-full focus:shadow-outline hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            )
            :
            (
                null
            )
        }
      </section>
      {/* file upload using input field and conditional button change */}
      <section className='flex justify-center'>
        <input
            id='upload'
            type="file"
            name="myImage"
            className='hidden'
            onChange={handleFileUpload}
        />
        {
            selectedImage ?
            (
                <button onClick={updateProfilePicture} className='flex justify-center items-center cursor-pointer w-[150px] h-[30px] bg-amber-500 rounded-[6px] shadow border border-amber-500 text-white text-[16px] font-normal font-poppins'>
                    Update
                </button>
            )
            :
            (
                <label htmlFor="upload" className='flex justify-center items-center cursor-pointer w-[150px] h-[30px] bg-amber-500 rounded-[6px] shadow border border-amber-500 text-white text-[16px] font-normal font-poppins'>
                    Upload new photo
                </label>
            )
        }
      </section>
    )
}
```
- Now selectedImage will get base64 incoded data which is stored in database using API.

### Uplaod image using AWS S3
- Uplaod image from client using API which upload image to S3 and then store object URL in DB.
- After uploading image is rendered using presigned URL from object URL
- Implementation:
```tsx
const Page = (props: Props) => {
const [userImage, setUserImage] = useState<string>('');
const [userImageObjectURL, setUserImageObjectURL] = useState<string>('');
const [selectedImage, setSelectedImage] = useState<any>(null);
//get user details
    useEffect(()=>{
        async function getProfileData(){
            const response = await fetch('/api/auth/profile/get-profile-details',{
                method: 'GET',
                headers: {
                    'content-type' : 'application/json'
                } 
            })

            const data = await response.json();
            setUserFirstName(data.firstName);
            setUserLastName(data.lastName);
            setUserEmail(data.email);
            setUserImageObjectURL(data.image);
            setUserPhone(data.phone);
            setUserCity(data.city);
        }
        getProfileData()
    }, []);

    //presigned URL for image
    useEffect(()=>{
        async function fetchImage(){
            if(userImageObjectURL){
                const response = await fetch('/api/auth/get-presigned-url', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        objectUrl: userImageObjectURL
                    })
                });

                const data = await response.json();
                setUserImage(data.preSignedUrl);
                //console.log(imageUrl);
            }
        }
        fetchImage();
    })

    return (
      <section className='w-full h-1/3 flex flex-row justify-center'>
        <figure className='flex items-center justify-center'>
            {   
                selectedImage ? (<img className='h-[80px] w-[80px] rounded-[60px] border-[2px] border-gray-400' src={URL.createObjectURL(selectedImage)} />) 
                :
                userImage ? (<img className='h-[80px] w-[80px] rounded-[60px]' src={userImage} />) 
                :
                (<img className='h-[80px] w-[80px]' src={profileIcon.src} alt='' />)
            }
        </figure>
        {
            selectedImage ?
            (
                <button onClick={()=>{ setSelectedImage(null); }} className="ml-[-15px] mt-[10px] inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-700 transition-colors duration-150 bg-gray-200 rounded-full focus:shadow-outline hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            )
            :
            (
                null
            )
        }
    </section>

    <section className='flex justify-center'>
    <input
        id='upload'
        type="file"
        name="myImage"
        accept="image/*"
        className='hidden'
        onChange={handleFileUpload}
    />
    {
        selectedImage ?
        (
            <button onClick={()=>{updateProfilePicture(selectedImage)}} className='flex justify-center items-center cursor-pointer w-[150px] h-[30px] bg-amber-500 rounded-[6px] shadow border border-amber-500 text-white text-[16px] font-normal font-poppins'>
                Update
            </button>
        )
        :
        (
            <label htmlFor="upload" className='flex justify-center items-center cursor-pointer w-[150px] h-[30px] bg-amber-500 rounded-[6px] shadow border border-amber-500 text-white text-[16px] font-normal font-poppins'>
                Upload new photo
            </label>
        )
        }
    </section>
    )
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

### Cookies in client side:
- Visit this site https://www.npmjs.com/package/cookies-next

### Error: Text content does not match server-rendered HTML.
```tsx
    const [hydration, setHydration] = useState(false);

    useEffect(()=>{
        setHydration(true);
    })

    //add where error is occured
    <h3 className='text-xl font-Noto_Serif font-semibold'>
        {  
            hydration && userName? userName : 'loading...'
        }
    </h3>
```

### TypeError: Cannot read properties of undefined (reading 'headers') at eval
- Always return the NextResponse like: return NextResponse.json({message: 'user data'}, {status: 200});

### warning: prop ```classname``` did not match. server error on browser
- Add this code to next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
```

### Get current date:
```tsx
import React from 'react'

const formatDate = (date: Date): string => {
    const options: any = { month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(date);
  
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
  
    return `${day}${suffix} ${formattedDate}`;
};

const CurrentDate = () => {
    const currentDate = formatDate(new Date());

  return (
    <main>
        {
            currentDate
        }
    </main>
  )
}

export default CurrentDate
```

### Get current routes name:
- To get current route name of client and to use in layout.
```tsx
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    //get current to route to render on dashboard header
    const router = usePathname();
    const dashboardType = router.split("/").slice(2).join("/");
    return (
      <section className='w-full flex flex-row'>
        {/* Include shared UI here e.g. a header or sidebar */}
        <DashboardSidebar />
        <section className='w-[calc(100%-216px)] flex flex-col'>
          <header className='p-[5px]'>
              <DashboardHeader category={dashboardType} />
          </header>
          <nav className='p-[5px]'>
              <DashboardNavbar totalFootfalls={21} groupFootfalls={4} individualFootfalls={9} averageDwellTime={27.57} maxVisitorsPerHour={2520} />
          </nav>
          {children}
        </section>
      </section>
    )
  }
```

### Set active button:
- Get cuurent route name using above function
- use condition inside classname:
```tsx
<Link href='/auth/dashboard/store-data' className={`${dashboardType === 'store-data' ? 'bg-orange-200' : 'bg-white'} relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-orange-500 pr-6`}>
    <span className="inline-flex justify-center items-center ml-4">
        <img className='w-5 h-5' src={storeIcon.src} alt="" />
    </span>
    <span className="ml-2 text-sm tracking-wide truncate">Store Data</span>
</Link>
```

### Render Video:
- Run command: npm i react-player
- Create a component named LiveVideo.tsx
```tsx
  'use client'
  import React from 'react';
  import ReactPlayer from 'react-player';

  const LiveVideo = ()=>{
      return(
          <ReactPlayer url='/assets/Heat_Map.mp4' playing loop width={450} height={500} />
      )
  }

  export default LiveVideo;
```
- Use this component in main component to render:
```tsx
  {
      hydration && <LiveVideo />
  }
```

### Mobile responsive navbar (Hamburger Button)
- Content will be shown when button is clicked and disappear when button is clicked again. But the problem is when we click button inside content, the content will be still appear but navigated to respective page(remember dashboard screen of doteye).
- To handle this problem we need global state(as data need to pass from child to parent) which can be done using context API. create a context in context folder.
```tsx
  import { createContext } from "react";

  //this context store the state of dashboard sidenavbar button click
  //using this we can get the state of button click globally
  const dashboardSideNavButtonClickContext = createContext({});

  export default dashboardSideNavButtonClickContext;
```
- This can be done using context API as we need to update data from child to parent component as we need to update the hamBtnClick state. For that we need to create a global context in layout.tsx and wrap components.
```tsx
function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    //This component has a state variable called "dasboardType", which is initially set to an empty string.
    //defined a function called setDasboardType that can be used to update the value of dasboardType.
    const [dasboardType, setDasboardType] = useState('Dashboard');
    const [isDashboardBtnClicked, setIsDashboardBtnClicked] = useState(false);
    
    return (
      //we can pass as many value as we need
      <dashboardTypeContext.Provider value={{dasboardType, setDasboardType, isDashboardBtnClicked, setIsDashboardBtnClicked}} >
        <main className='w-full h-full flex flex-row'>
            {/* Include shared UI here e.g. a header or sidebar */}
            <DashboardSidebar/>
        </main>
      </dashboardTypeContext.Provider>
    )
}
```

- Create a hamburger button which is visible only on small devices(some breakpoints like xs, sm(tailwind)).
```tsx
  const DashboardHeader = (props: Props) => {
    //consume context
    const { isDashboardBtnClicked, setIsDashboardBtnClicked } = useContext(dashboardTypeContext) as any;

    function setBtnClickState(){
        setIsDashboardBtnClicked(!isDashboardBtnClicked);
    }
    return(
      <section className='flex xl:hidden lg:hidden md:hidden sm:flex xs:flex pr-[10px]'>
          <button onClick={setBtnClickState} >
              <img src={hamBtn.src} className='w-[35px] h-[25px]' alt='network error'/>
          </button>
          <DashboardSidebar />
      </section>
    )
  }
```

- consume state in required component and change the value using function.
```tsx
function DashboardSidebar() {
    //consume context
    const { setDasboardType } = useContext(dashboardTypeContext) as any; 
    const { isDashboardBtnClicked ,setIsDashboardBtnClicked } = useContext(dashboardTypeContext) as any;
  return(
    <aside className={`${isDashboardBtnClicked ? 'flex xl:hidden lg:hidden md:hidden sm:flex xs:flex fixed top-0 left-0 z-10 transform transition-transform duration-300 ease-in-out w-[216px]' : 'flex xl:flex lg:flex md:flex sm:hidden xs:hidden'}`}>
    {/*main content*/}
      <button onClick={()=> { setDasboardType('Dashboard'); setIsDashboardBtnClicked(false)}} className='hover:shadow-[1px_1px_0px_1.5px_rgba(250,_140,_40,_1.5)]'>
        <Link href='/auth/dashboard' className='h-[60px] pl-[55px] mt-[12px] flex items-center'>
            Dashboard
        </Link>
      </button>
    </aside>
  )
}
```

### Simple Modal container
-  Create a Calendar with Modal and closes on clicking on screen outside the container
- run command: npm i react-calendar
```tsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardNavbar = (props: Props) => {
    const [isCalendarBtnClicked, setIsCalendarBtnClicked] = useState(false);

    const calendarBtnClickFunc = ()=>{
        setIsCalendarBtnClicked(!isCalendarBtnClicked);
    }
   
      return(
        <section>
        {
            isCalendarBtnClicked ? 
            (
                <section className='fixed w-fit inset-0 z-10'>
                    <section className='fixed top-[40px] transform translate-x-1/2 translate-y-1/2 flex bg-white shadow-lg rounded-2xl'>
                        <Calendar />
                    </section>
                </section>
            ) :
            (
                <section>
                </section>
            )
        }
        </section>
      )

}
```

### Protect Route
- To protect a route in Next.js the general logic is:
  1. Check if a user is authenticated
  2. If they are authenticated, fetch data and render the page
  3. If they are not authenticated, redirect the user to the login page or return an "unauthorized" response
- Create a route(server - api/auth/is-authenticated) which checks the user is authenticated or not using cookies/token.
- Create a protectRoute component at client:
```tsx
  'use client'
  import { useRouter } from 'next/navigation';
  import React, { useEffect } from 'react';

  const IsAuthenticated = (Component: any) => {
    const WrappedComponent = (props: any) => {
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
            router.push('/login');
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

    return WrappedComponent;
  };

  export default IsAuthenticated;
```
- use this component as a higher order component to protect page during export:
  ```tsx
  export default IsAuthenticated(page)
  ```


### Creating a slider(carousel) for testimonial cards:
1. We can easily create a sliding cards with autoplay using swiper, visit: https://swiperjs.com/ to know more about this.
2. Simply go to above website select demo from resources on the top.
3. Select the desired sliding according to your need.
4. Then select the framework in which you use.
5. For react, First install swiper using command: npm install swiper
6. After selecting the slider, click on react symbol in main website, it will open the file which shows that how it is created then simply copy paste the code accordingly.
7. Refer the doteye-website repo of mine, go to src-> components -> Slider.jsx or Testimonials.jsx to undestand better.
8. To style the pagination part change default styles using style attribute:
```tsx
  // Import Swiper React components
  import { Swiper, SwiperSlide } from "swiper/react";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  // import required modules
  import  { Autoplay } from "swiper/modules";
  import { Navigation, Pagination } from 'swiper/modules';

  const Testimonials = () => {
    return (  
      <Swiper
            slidesPerView={1}
            spaceBetween={1}
            centeredSlides={true}
            autoplay={{
                delay: 7500,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            style={{
                "--swiper-navigation-color": "#ff7c08",
                "--swiper-navigation-size": "14px"
            } as React.CSSProperties}
        >
            <SwiperSlide>
            </SwiperSlide>
      </Swiper>
    )
  }
```

### React Notification message
- Run command: npm i react-toastify
- Add the following code:
  ```tsx
  "use client"
  import React, { useEffect, useState } from 'react'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const page = () => {
      const [message, setMessage] = useState('');

          useEffect(() => {
            if(statusCode === 200){
                toast.success(message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            else if(message) {
              toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
              });
              //reset the message to an empty string
              setMessage('');
            }
        }, [message]);
        //useEffect executed when message changes their value.

    return (
      <main className='flex flex-col h-[calc(100vh-20px-40px)]'>
          <ToastContainer autoClose={3000} />
      </main>
    )
  }

  export default page
  ```
- To get the example code visit: https://github.com/abhijeetnishal/DoteyeProject/blob/master/src/app/register/page.tsx

- To understand methods and custom setting visit: https://fkhadra.github.io/react-toastify/autoClose


### Chart.js for creating charts or graphs
1. About:
  - why Chart.js: Among many charting libraries for JavaScript application developers, Chart.js is currently the most popular one according to GitHub stars (~60,000) and npm downloads (~2,400,000 weekly).
  - Feature: Chart.js provides a set of frequently used chart types, plugins, and customization options.By default, Chart.js charts are responsive and take the whole enclosing container. In addition to a reasonable set of built-in chart types, you can use additional community-maintained chart types. visit: https://github.com/chartjs/awesome#charts
  - Integration: Chart.js comes with built-in TypeScript typings and is compatible with all popular JavaScript frameworks including React, Vue, Svelte, and Angular.
  - Performance: Chart.js is very well suited for large datasets. Such datasets can be efficiently ingested using the internal format so you can skip data parsing and normalization.

2. Installation:
- Run command: npm i chart.js

3. Bar Graph:
  1. Bar graph component:
  ```tsx
    'use client'
    import { useEffect, useRef } from 'react';
    import Chart from 'chart.js/auto';
    import{ ChartConfiguration } from 'chart.js';

    //type declaration for props
    type BarChartProps = {
      data: number[];
      labels: string[];
      colors: string[];
    }

    //define chart variable with type Chart
    let chart: Chart; 

    //bar chart main component
    const BarChart: React.FC<BarChartProps> = ({ data, labels, colors }) => {
      //This means that canvasRef will be used to reference an HTML <canvas> element.
      const canvasRef = useRef<HTMLCanvasElement>(null);

      useEffect(() => {
        //checks that the referenced canvas element exists in the DOM. 
        if(canvasRef.current) {
          //retrieves the 2D rendering context of the canvas element using the getContext method.
          const ctx = canvasRef.current.getContext('2d');
          
          if(ctx) {
            //create a linear gradient color
            let linearGradient = ctx.createLinearGradient(0, 0, 0, 400);
            linearGradient.addColorStop(0, '#FA8C28'); // Starting color
            linearGradient.addColorStop(1, 'rgba(250, 140, 40, 0.28)'); // Ending color
            
            //configuration for bar chart
            const configuration: ChartConfiguration = {
                //define type of chart
                type: 'bar',
                data: {
                  //x-axis data such as India, US, Uk, etc
                  labels,
                  datasets: [
                    {
                      label: 'Area visitors count',
                      //data of labels which is x-axis like 20, 43, 32, etc
                      data,
                      //CSS of bar
                      backgroundColor: colors,
                      borderWidth: 1,
                      barThickness: 18,
                      borderRadius: 60,
                    },
                  ],
                },
                options: {
                  //hide labels inside datasets
                  plugins: {
                    legend: {
                      display: false, // Hide the legend
                    },
                  },
                  responsive: true,
                  scales: {
                      x: {
                        
                          grid: {
                              //x-axis line will not displayed
                              display: false
                          }
                      },
                      y: {
                          beginAtZero: true,
                          grid: {
                              display: false
                          }
                      }
                  }
                },
              }
              //fixes canvas is already in use error
              if(chart) {
                chart.destroy();
                chart = new Chart(ctx, configuration);
              } 
              else {
                chart = new Chart(ctx, configuration);
              }
          }
        }
      }, [data, labels]);

      return(
        <canvas ref={canvasRef}></canvas>
      );
    };

    export default BarChart;
  ```
  2. Import the bar graph  by passing data as props from this component:
  ```tsx
    import BarChart from '../components/charts/BarChart'

    export default function Home() {
      //data to pass through props
      const data = [10, 30, 40, 60, 20];
      const labels = ['Bags', 'Sandals', 'Drinks', 'Shoes', 'Vegetables'];
      const colors = ['rgba(186, 237, 189, 1)', 'rgba(198, 199, 248, 1)', 'rgba(84, 209, 77, 1)', 'rgba(149, 164, 252, 1)']

      return (
        <main className='w-[600px] h-[330px] ml-[50px]'>
          <BarChart data={data} labels={labels} colors={colors} />
        </main>
      )
    }
  ```
4. Doughnut Chart
```tsx
const DonotChart: React.FC<DonotChartProps> = ({data, labels, colors})=>{

    const donotChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(donotChartRef.current){
            const donotContext = donotChartRef.current.getContext('2d');

            if(donotContext){
                const configuration: ChartConfiguration = {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [
                          {
                            //data of labels which is x-axis like 20, 43, 32, etc
                            data,
                            //CSS of bar
                            backgroundColor: colors,
                            borderRadius: 5,
                            barPercentage: 0
                          },
                        ],
                      },
                      
                      options: {
                        responsive: true,
                      },
                };

                if(chart){
                    chart.destroy();
                    chart = new Chart( donotContext, configuration);
                }
                else{
                    chart = new Chart( donotContext, configuration);
                }
            };
        }
    }, [data, labels, colors])

    return (
        <canvas ref={donotChartRef}></canvas>
    )
}
```
5. Radar Chart:
```tsx
  'use client'
  import { ChartConfiguration } from 'chart.js';
  import Chart from 'chart.js/auto'
  import React, { useEffect, useRef } from 'react'

  type RadarChartProps = {
      data: any,
      labels: string[],
  }

  let chart: Chart;

  const RadarChart: React.FC<RadarChartProps> = ({ data, labels }) => {

      const radarChartRef = useRef<HTMLCanvasElement>(null);

      useEffect(()=>{
          if(radarChartRef.current){
              const ctx = radarChartRef.current.getContext('2d');

              if(ctx){
                  const configuration: ChartConfiguration = {
                      type: 'radar',
                      data: {
                              //x-axis data such as India, US, Uk, etc
                              labels: labels,
                              datasets: data,
                          },
                          options: {
                              responsive: true,
                              // Move the legend to the right
                              plugins: {
                                  legend: {
                                  position: 'right',
                                  },
                              },
                              maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
                              layout: {
                                  padding: {
                                      top: 5, // Adjust the top padding to your liking
                                      right: 0, // Adjust the right padding to your liking
                                      bottom: 5, // Adjust the bottom padding to your liking
                                      left: 0, // Adjust the left padding to your liking
                                  },
                              },
                            },
                          };
                      if(chart){
                          chart.destroy();
                          chart = new Chart(ctx, configuration);
                      }
                      else{
                          chart = new Chart(ctx, configuration);
                      }
                  }
              }
          }
      , [data, labels]);

    return (
      <canvas ref={radarChartRef}></canvas>
    )
  }

  export default RadarChart
```