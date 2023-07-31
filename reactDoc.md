### useState
-  In React, useState is a hook that allows you to add state to your functional components. State is a way to store and manage data that can change over time in your component.

### useEffect in React
- Certainly! useEffect is a hook provided by React that allows you to perform side effects in functional components. It is similar to the lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.
- Using the effect:
  - Inside your component, you call useEffect and pass in the effect function as the first argument.
  - The second argument to useEffect is an array of dependencies. These dependencies determine when the effect should run.
  - If the dependency array is empty, the effect will run only once when the component mounts. If the array contains values, the effect will run whenever any of those values change.
- e.g.
  ```tsx
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
  ```
### useRef hook in react
-  It allows you to access and manipulate DOM elements directly.


### Lazy Loading in React:
- In React, lazy loading refers to a technique where you delay the loading of certain components or resources until they are actually needed. Note that lazy loading can be used not only for components but also for other assets such as images or data. 
- Normally, when a React application is loaded, all the components and resources are loaded upfront, which can increase the initial loading time and consume unnecessary resources. This can slow down the initial loading time of your application, especially if you have many components or if some components are large.
- Lazy loading helps improve performance by splitting your application into smaller chunks and loading them on-demand.
- Imagine you have a web page with multiple sections, and each section has its own component. With lazy loading, instead of loading all the components when the page loads, you can load only the components that are visible on the screen. As the user scrolls down the page and new components become visible, those components are loaded on-demand.
- To implement lazy loading in React, you can use the dynamic import function along with React's lazy and Suspense components. Here's an example:
```jsx
import React, { lazy, Suspense } from 'react';

// Create a lazy-loaded component using React.lazy
const LazyComponent = lazy(() => import('./LazyComponent'));

const MyComponent = () => {
  return (
    <div>
      {/* Use Suspense to handle the loading state */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Render the lazy-loaded component */}
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default MyComponent;
```
- In this example, we have a component called LazyComponent that will be loaded lazily. It is created using the React.lazy function, which takes a function that returns a dynamic import statement. The dynamic import statement specifies the module to be loaded when the component is actually needed.
- Within the MyComponent component, we wrap the LazyComponent inside a Suspense component. The Suspense component takes a fallback prop, which specifies the content to be rendered while the lazy component is loading. In this case, we're displaying a simple "Loading..." message.
- When LazyComponent is rendered, React will automatically load the component and replace the fallback content once it's ready.


### Fix react-scripts error:
1. If error due to network(slow network), then run command: 
```bash
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000
```
2. Deleting node_modules folder and reinstalling will also help.


### Creating a slider(carousel) for testimonial cards:
1. We can easily create a sliding cards with autoplay using swiper, visit: https://swiperjs.com/ to know more about this.
2. Simply go to above website select demo from resources on the top.
3. Select the desired sliding according to your need.
4. Then select the framework in which you use.
5. For react, First install swiper using command: npm install swiper
6. After selecting the slider, click on react symbol in main website, it will open the file which shows that how it is created then simply copy paste the code accordingly.
7. Refer the doteye-website repo of mine, go to src-> components -> Slider.jsx or Testimonials.jsx to undestand better.
8. To style the pagination part change default styles using style attribute:
```js
  // Import Swiper React components
  import { Swiper, SwiperSlide } from "swiper/react";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  // import required modules
  import { Autoplay, Pagination } from "swiper";

  const Testimonials = () => {
    return (  
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{
          "--swiper-pagination-color": "#ff7c08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px"
        }}
      >
        <SwiperSlide><SliderCard/></SwiperSlide>
        <SwiperSlide><SliderCardReverse/></SwiperSlide>
        <SwiperSlide><Slider2Card/></SwiperSlide>
        <SwiperSlide><SliderCard2Reverse/></SwiperSlide>
    </Swiper>
    )
  }
```

### Context API
- https://www.freecodecamp.org/news/context-api-in-react/
