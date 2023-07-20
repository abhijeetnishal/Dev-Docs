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

### warning: prop `classname` did not match. server error on browser
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
2. Simply go to above website select demo on the top.
3. Select the desired sliding according to your need.
4. Then select the framework in which you use.
5. For react, First install swiper using command: npm install swiper
6. After selecting the slider, click on react symbol in main website, it will open the file which shows that how it is created then simply copy paste the code accordingly.
7. Refer the doteye-website repo of mine, go to src-> components -> Slider.jsx or Testimonials.jsx to undestand better.
8. To style the pagination part change default styles using style attribute:
```js
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        //change the default style a/c to need
        style={{
          "--swiper-pagination-color": "#ff7c08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px"
        }}
        //similarly find styles for other such as navigation.
      >
        <SwiperSlide><SliderCard/></SwiperSlide>
        <SwiperSlide><SliderCardReverse/></SwiperSlide>
        <SwiperSlide><Slider2Card/></SwiperSlide>
        <SwiperSlide><SliderCard2Reverse/></SwiperSlide>
    </Swiper>
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
          }
          //reset the message to an empty string to again show notification 
          //due message in dependency array
          setMessage('');
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

```