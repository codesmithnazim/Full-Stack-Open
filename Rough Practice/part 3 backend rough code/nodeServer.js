console.log("hello world");
import http from "http";
const PORT = 30018;
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
// Create a local server to receive data from
let app = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      "This server can server you only with notes \nFor getting notes go to http://localhost:3001/notes",
    );
  } else if (req.url === "/notes") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: notes,
      }),
    );
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Sorry! Server can't serve you because you did something wrong");
  }
});


// Just for proving that we can not make more than one server, always the last server will be execuated and the above rest of the servers will be ignored 
app = http.createServer((req, res) => {
  if (req.url === "/notes") {
    (res.writeHead(200, { "Content-Type": "application/json" }),
      res.end(
        JSON.stringify({
          data: notes,
        }),
      ));
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Sorry! Server can't serve you because you did something wrong");
  }
});

app.listen(`${PORT}`);
console.log(`Your app server is runing on port ${PORT}`);
