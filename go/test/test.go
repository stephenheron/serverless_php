package main

import (
	"fmt"

	php "github.com/deuill/go-php"
)

func main() {
	engine, _ := php.New()
	context, _ := engine.NewContext()

	val, _ := context.Eval("return 'Hello World';")
	fmt.Printf("%s", val.Interface())
	// Prints 'Hello World' back to the user.

	engine.Destroy()
}
