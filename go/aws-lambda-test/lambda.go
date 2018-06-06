package main

import (
        "context"
        "github.com/aws/aws-lambda-go/lambda"
        php "github.com/deuill/go-php"
)

type Response struct {
        UserId string `json:"userId"`
}

var phpContext *php.Context

func init() {
        engine,_ := php.New()
        localContext, _ := engine.NewContext()
        phpContext = localContext
        phpContext.Exec("UserFetcher.php")
}

func HandleRequest(ctx context.Context) (Response, error) {
        val, _ := phpContext.Eval("$userFetcher = new UserFetcher(); return $userFetcher->getNearestUserId();")
        return Response{UserId: val.String()}, nil
}

func main() {
        lambda.Start(HandleRequest)
}
