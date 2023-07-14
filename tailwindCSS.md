### Tailwind CSS
1. Before jumping into Tailwind CSS, let's understand what Atomic CSS is. "Atomic CSS is the approach to CSS architecture that favours small, single-purpose classes with names based on visual function." <br>
It's kinda like making classes that are supposed to achieve a single purpose. e.g. -> let's make a bg-blue class with the following CSS:
    ```css
    .bg-blue {
        background-color: rgb(81, 191, 255);
    }
    ```
    Now if we add this class to a h1 tag, it will get a background of blue.
    ```css
    <div><h1 class="bg-blue">Hello world!</h1></div>
    ```
- Now imagine writing such useful single-purpose CSS rules and keeping them all in a global CSS file. I know it's a one-time investment but think of this – you can now use these single-purpose helper classes from anywhere you want.
- You just need your HTML file to consume that global CSS file, and that's it. You can now also use combinations of these helper classes in a single HTML tag.
- And that's where Tailwind CSS comes in. The concept of Atomic CSS is not new but Tailwind CSS takes it to another level.
<br>
<br>

2. Tailwind CSS, as per their own website is a "utility-first CSS framework" which provides several of these opinionated, single-purpose utility classes that you can use directly inside your markup to design an element. <br>
<b>Tailwind is a CSS framework that provides us with single-purpose utility classes which are opinionated for the most part, and which help us design our web pages from right inside our markup or .js/.jsx/.ts/.tsx files.</b> <br>
Some of the utility classes:
    - flex: Used to apply Flexbox to a div
    - items-center: to apply the CSS property align-items: center; to a div

- we do not have to write these utility classes ourselves and keep them in any global CSS file. We directly get them from Tailwind.
- You can get a list of all the utility classes Tailwind has to offer from the documentation page.
- Also if you are working in VS Code, you can install an extension called Tailwind CSS IntelliSense and it will give you auto-suggestions as you keep typing the utility classes.

<br>
<br>

3. Using the same variant of a particular utility class at different areas in the UI also ensures uniformity across the whole application and results in a better UX. 
- But in case you need some really customised value for any particular style, you can get that by adding a customized theme in the tailwind.config.js:
    ```css
    module.exports = {
        theme: {
            extend: {
                boxShadow: {
                    '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
                }
            }
        },
        screens: {
            //adding breakpoint for (min-width: 300px)
            'xsm': '300px',
            // => @media (min-width: 300px) { ... }
        },
    }
    ```
- you can also use an arbitrary value inside square brackets [] like the following:
    ```css
    <div class="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
    // Rest of your code goes here
    </div>
    ```

### Setup Tailwind CSS
- Go to official documentation or some blogs to setup tailwind css according to framework or library.

### Important styles
- To give padding to every devices (responsive design) use: 
    ```cs
    <div className='w-full px-[440px] sm:px-[100px] md:px-[140px] lg:px-[300px] xl:px-[420px] 2xl:px-[560px]'>
    ```

### How to Add new Font
- visit: https://blog.logrocket.com/how-to-use-custom-fonts-tailwind-css/

### calc in tailwind
- h-[calc(100vh-50px)]

### Reference:
 https://www.freecodecamp.org/news/what-is-tailwind-css-a-beginners-guide/