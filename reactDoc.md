### Lazy Loading in React:
- In React, lazy loading refers to a technique where you delay the loading of certain components or resources until they are actually needed.
- Normally, when a React application is loaded, all the components and resources are loaded upfront, which can increase the initial loading time and consume unnecessary resources. This can slow down the initial loading time of your application, especially if you have many components or if some components are large.
- Lazy loading helps improve performance by splitting your application into smaller chunks and loading them on-demand.
- Imagine you have a web page with multiple sections, and each section has its own component. With lazy loading, instead of loading all the components when the page loads, you can load only the components that are visible on the screen. As the user scrolls down the page and new components become visible, those components are loaded on-demand.

### Fix react-scripts error:
1. If error due to network(slow network), then run command: 
```bash
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000
```
2. Deleting node_modules folder and reinstalling will also help.

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