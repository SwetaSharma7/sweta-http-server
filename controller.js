const http = require("http");
const uuid = require("uuid");

const server = http.createServer((req, res) => {
  const url = req.url.split("/");

  if (req.method === "GET") {
    handleGetRequest(url, res);
  } else {
    sendNotFoundResponse(res);
  }
});

function handleGetRequest(url, res) {
  if (url.length === 2 && url[0] === "" && url[1] === "") {
    sendTextResponse(res, "Hello this is Sweta");
  } else if (url.length === 2 && url[1] === "html") {
    sendHtmlResponse(res);
  } else if (url.length === 2 && url[1] === "json") {
    sendJsonResponse(res);
  } else if (url.length === 2 && url[1] === "uuid") {
    sendUuidResponse(res);
  } else if (url.length === 3 && url[1] === "status") {
    sendStatusResponse(res, url[2]);
  } else if (url.length === 3 && url[1] === "delay") {
    handleDelayResponse(res, url[2]);
  } else {
    sendNotFoundResponse(res);
  }
}

function sendTextResponse(res, message) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(message);
  res.end();
}

function sendHtmlResponse(res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
          <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
          <p> - Martin Fowler</p>
      </body>
    </html>`);
  res.end();
}

function sendJsonResponse(res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      slideshow: {
        author: "Yours Truly",
        date: "date of publication",
        slides: [
          {
            title: "Wake up to WonderWidgets!",
            type: "all",
          },
          {
            items: ["Why <em>WonderWidgets</em> are great", "Who <em>buys</em> WonderWidgets"],
            title: "Overview",
            type: "all",
          },
        ],
        title: "Sample Slide Show",
      },
    })
  );
  res.end();
}

function sendUuidResponse(res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ uudi: uuid.v4() }));
  res.end();
}

function sendStatusResponse(res, statusCode) {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.write("This is the response page with different status code");
  res.end();
}

function handleDelayResponse(res, seconds) {
  setTimeout(() => {
    sendTextResponse(res, "This will come after some delay");
  }, seconds * 1000);
}

function sendNotFoundResponse(res) {
  res.writeHead(404);
  res.write("Page Not Found");
  res.end();
}

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
