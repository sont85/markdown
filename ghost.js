var marked = require('marked'),
    http = require("http"),
    fs = require("fs");

// console.log(marked('I am using __markdown__.'));

http.createServer(responseHandler).listen(process.env.port);

function responseHandler(req, res) {
  var markedBinding = ""
  if (req.url.match("fav")) {
    res.end("");
    return;
  }
  res.writeHead(200, {"Content-Type": "text/html"});
  if (req.url === "/") {
    fs.readFile("index.html", "utf8", function(err,data) {
      res.end(data);
    });
  } else if (req.url.match("/markdown/")) {
    var markedText = req.url.replace("/markdown/", "")
    markedText = marked(decodeURIComponent(markedText));
    console.log(markedText)
    res.end(markedText)
  } else {
    res.end()
  }

};
