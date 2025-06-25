package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "pong")
	})

	port := ":8080"
	fmt.Println("Backend running on http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
