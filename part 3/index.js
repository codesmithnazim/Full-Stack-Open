console.log("hello world");
import http from "http";
const PORT= 30018
// Create a local server to receive data from
const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    }),
  );
});

app.listen(`${PORT}`);
console.log(`Your app server is runing on port ${PORT}`)
