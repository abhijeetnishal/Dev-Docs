### Go Syntax
A Go file consists of the following parts:
1. Package declaration
2. Import packages
3. Functions
4. Statements and expressions

### Get started
    ```go
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, World!")
    }
    ```
- In this code, we:
    - Declare a main package (a package is a way to group functions, and it's made up of all the files in the same directory).
    - Import the popular fmt package, which contains functions for formatting text, including printing to the console. This package is one of the standard library packages you got when you installed Go.
    - Implement a main function to print a message to the console. A main function executes by default when you run the main package.

### Go variables
- In Go, there are different types of variables, for example:
    - int- stores integers (whole numbers), such as 123 or -123
    - float32- stores floating point numbers, with decimals, such as 19.99 or -19.99
    - string - stores text, such as "Hello World". String values are surrounded by double quotes
    - bool- stores values with two states: true or false

- In Go, there are two ways to declare a variable:
    1. With the var keyword: <br>
    var variablename type = value, e.g.-> var b, c int = 1, 2. <br>
    Note: You always have to specify either type or value (or both).
    2. With the := sign: variablename := value, e.g.->x := 2 //type is inferred<br>
    Note: In this case, the type of the variable is inferred from the value (means that the compiler decides the type of the variable, based on the value).
- var can be used inside and outside of functions but := Can only be used inside functions
- var: Variable declaration and value assignment can be done separately	:= Variable declaration and value assignment cannot be done separately (must be done in the same line)

### Conditional statements
```go
package main

import (
    "fmt"
)

func main() {
    x := 100

    if x == 50 {
        fmt.Println("Germany")
    } else if x == 100 {
        fmt.Println("Japan")
    } else {
        fmt.Println("Canada")
    }
}
```

### Loops
```go
    for {
        fmt.Println("loop")
        break
    }

    for n := 0; n <= 5; n++ {
        if n%2 == 0 {
            continue
        }
        fmt.Println(n)
    }
```
- Range is used with For Loops to iterate over each element in arrays, strings and other data structures .
    ```go
    nums := []int{2, 3, 4}
    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }
    ```

### Functions
- Basic function:
    ```go
    package main

    import "fmt"

    // Function with int as return type
    func add(x int, y int) int {
        total := 0
        total = x + y
        return total
    }

    func main() {
        // Accepting return value in varaible
        sum := add(20, 30)
        fmt.Println(sum)
    }
    ```
- Visit to know more: https://www.golangprograms.com/go-language/functions.html

### Go Custom Package
- So far, we have been using packages that are already defined inside the Go library. However, Go programming allows us to create our own custom packages and use them just like the predefined packages.
- Create Custom Package:
1. To create a custom package, we first need to create a new file and declare the package. For example,
    ```go
    // declare package
    package calculator
    Now, we can create functions inside the file. For example,

    package calculator

    // create add function
    func Add(n1, n2 int) int {
    return n1 + n2
    }

    // create subtract function
    func Subtract(n1, n2 int) int {
    return n1 - n2
    }
    ```
    In the above example, we have created a custom package named calculator. Inside the package, we have defined two functions: Add() and Subtract().

    Note: This file doesn't contain the main package. Hence, the Go compiler doesn't consider this as an executable program and it is created for the sole purpose of sharing and reusing.

2. Importing Custom Package:
    Now, we can import the custom package in our main file.
    ```go
    package main 

    // import the custom package calculator
    import (
    "fmt"
    "Packages/calculator"
    )

    func main() {

    number1 := 9
    number2 := 5

    // use the add function of calculator package
    fmt.Println(calculator.Add(number1, number2))

    // use the subtract function of calculator package
    fmt.Println(calculator.Subtract(number1, number2))

    }
    ```
    Here, we have successfully imported the calculator package in our program and used its functions.

    Note: We have used Packages/calculator as the name of the package. This is because the calculator package is present inside the Packages folder and we are providing the path to that package from the location of the main file.

### Type-Casting
```go
    var s string = "42"
    v, _ := strconv.Atoi(s)       // convert string to int
        
    fmt.Println(v)    // 42
        
    var i int = 42
    str := strconv.Itoa(i)        // convert int to string
        
    fmt.Println(str) // 42
```

### Type-Inference
- Type inference allows us to declare and initialize multiple variables of different data types in a single line.
```go
package main
import "fmt"
func main() {
	// Multiple variable declarations with inferred types
    var firstName, lastName, age, salary = "John", "Maxwell", 28, 50000.0

    fmt.Printf("firstName: %T, lastName: %T, age: %T, salary: %T\n", 
        firstName, lastName, age, salary)
}
```

### References
- https://www.golangprograms.com/
