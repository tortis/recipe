package main

import (
	"flag"
	"log"
	"net/http"
)

var port *int

func init() {
	port = flag.Int("port", 80, "Port the web server will run on.")
}

type LoggerHandler struct {
	h http.Handler
}

func StaticLoggerHandler(dir string) *LoggerHandler {
	return &LoggerHandler{
		h: http.FileServer(http.Dir("public")),
	}
}

func (lh *LoggerHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Println("Serving request for " + r.URL.String())
	lh.h.ServeHTTP(w, r)
}

func main() {
	flag.Parse()
	http.Handle("/", StaticLoggerHandler("public"))
	log.Printf("Starting server on port %d.\n", *port)
	log.Fatal(http.ListenAndServe(":80", nil))
}
