### About Nextjs
- Next.js is a flexible React framework that gives you building blocks to create fast web applications. 
- By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.
- Building Blocks of a Web Application:
    - User Interface - how users will consume and interact with your application.
    - Routing - how users navigate between different parts of your application.
    - Data Fetching - where your data lives and how to get it.
    - Rendering - when and where you render static or dynamic content.
    - Integrations - what third-party services you use (CMS, auth, payments, etc) and how you connect to them.
    - Infrastructure - where you deploy, store, and run your application code (Serverless, CDN, Edge, etc).
    - Performance - how to optimize your application for end-users.
    - Scalability - how your application adapts as your team, data, and traffic grow.
    - Developer Experience - your team’s experience building and maintaining your application.
- What is React? 
    - React is a JavaScript library for building interactive user interfaces.
    - By user interfaces, we mean the elements that users see and interact with on-screen. see image.png
    - By library, we mean React provides helpful functions to build UI, but leaves it up to the developer where to use those functions in their application.
- You can use React to build your UI, then incrementally adopt Next.js features to solve common application requirements such as routing, data fetching, integrations - all while improving the developer and end-user experience.

### Rendering User Interfaces
- To understand how React works, we first need a basic understanding of how browsers interpret your code to create interactive user interfaces (UI).
- When a user visits a web page, the server returns an HTML file to the browser that may look like this: see image-1.png
- The browser then reads the HTML and constructs the Document Object Model (DOM).
- The DOM is an object representation of the HTML elements. It acts as a bridge between your code and the user interface, and has a tree-like structure with parent and child relationships. see image-2
- visit: https://nextjs.org/learn/foundations/from-javascript-to-react/updating-ui-with-javascript to understand DOM.

### React
- To use React in your project, you can load two React scripts from an external website called unpkg.com:
    - nreact is the core React library.
    - react-dom provides DOM-specific methods that enable you to use React with the DOM.
- Instead of directly manipulating the DOM with plain JavaScript, you can use the ReactDOM.render() method from react-dom to tell React to render our `<h1>` title inside our #app element.
- There are three core concepts of React that you'll need to be familiar with to start building React applications. These are:
    1. Components
    2. Props
    3. State

### Nextjs
- Next.js handles much of these code transformations and underlying infrastructure to make it easier for your application to go to production. This is made possible because Next.js has a compiler written in Rust.
- Minification is the process of removing unnecessary code formatting and comments without changing the code’s functionality. The goal is to improve the application’s performance by decreasing file sizes.
- Bundling is the process of resolving the web of dependencies and merging (or ‘packaging’) the files (or modules) into optimized bundles for the browser, with the goal of reducing the number of requests for files when a user visits a web page. see image-4
- Developers usually split their applications into multiple pages that can be accessed from different URLs. Each of these pages becomes a unique entry point into the application. Code-splitting is the process of splitting the application’s bundle into smaller chunks required by each entry point. The goal is to improve the application's initial load time by only loading the code required to run that page.
- Next.js has built-in support for code splitting. Each file inside your pages/ directory will be automatically code split into its own JavaScript bundle during the build step.
- Build time (or build step) is the name given to a series of steps that prepare your application code for production. Runtime (or request time) refers to the period of time when your application runs in response to a user’s request, after your application has been built and deployed.
- client refers to the browser on a user’s device that sends a request to a server for your application code. It then turns the response it receives from the server into an interface the user can interact with.
- Server refers to the computer in a data center that stores your application code, receives requests from a client, does some computation, and sends back an appropriate response.

### Nextjs Rendering
- Process to convert the code you write in React into the HTML representation of your UI. This process is called rendering.
- With Next.js, three types of rendering methods are available: Server-Side Rendering, Static Site Generation, and Client-Side Rendering.
- Server-Side Rendering and Static Site Generation are also referred to as Pre-Rendering because the fetching of external data and transformation of React components into HTML happens before the result is sent to the client.
- In a standard React application, the browser receives an empty HTML shell from the server along with the JavaScript instructions to construct the UI. This is called client-side rendering because the initial rendering work happens on the user's device.
- In contrast, Next.js pre-renders every page by default. Pre-rendering means the HTML is generated in advance, on a server, instead of having it all done by JavaScript on the user's device.
- visit to understand more: https://nextjs.org/learn/foundations/how-nextjs-works/rendering
- With server-side rendering, the HTML of the page is generated on a server for each request. The generated HTML, JSON data, and JavaScript instructions to make the page interactive are then sent to the client.
- On the client, the HTML is used to show a fast non-interactive page, while React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This process is called hydration.
- With Static Site Generation, the HTML is generated on the server, but unlike server-side rendering, there is no server at runtime. Instead, content is generated once, at build time, when the application is deployed, and the HTML is stored in a CDN and re-used for each request.

### Layouts
- A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be nested.
- You can define a layout by default exporting a React component from a layout.js file. The component should accept a children prop that will be populated with a child layout (if it exists) or a child page during rendering.
- Let's consider we have a Dashboard(DotEYE project) which contains various components and some components are same in every page when we click button on specific component(like store data, visitors data, etc) only one component(dynamic) changes. This can be done using layout of nextjs.
- To do this create a layout.tsx in dashboard directory:
```tsx
    export default function DashboardLayout({
    children, // will be a page or nested layout
    }: {
    children: React.ReactNode
    }) {
    //here children is prop name which is component 
    return (
        <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>
    
        {children}
        </section>
    )
    }
```
- Now create a page.tsx file inside dashboard folder and that file will be act as children prop as a component.
- Finally create routes and other things inside dashboard folder same as we do in Root layout as it acts as nested layout.
- For more details, visit: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts

### References
- https://nextjs.org/learn/foundations/about-nextjs

