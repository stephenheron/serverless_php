package main

import (
	php "github.com/deuill/go-php"
)

func main() {
	engine, _ := php.New()
	context, _ := engine.NewContext()

        context.Exec("UserFetcher.php")
        val, _ := context.Eval("$userFetcher = new UserFetcher(); return $userFetcher->getNearestUserId();")
        val.String()
}
