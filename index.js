import restify from "restify";
import { CheckURL, checkValidHostname } from "./utils.js";

const server = restify.createServer({
  name: "Wykop CheckURL existence",
  version: "1.0.0",
});

server.use(restify.plugins.queryParser());

server.get("/", async (_req, res, next) => {
  res.send("Usage: GET /check/?url=<URL>");

  return next();
});

server.get("/check/:url", async (req, res, next) => {
  try {
    const valid = await checkValidHostname(req.query.url);

    if (valid) {
      const check = await CheckURL(req.query.url);
      return res.send(check);
    } else {
      return res.send("Not valid URL");
    }
  } catch (_) {
    res.send("Not valid URL");
  }

  return next();
});

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
