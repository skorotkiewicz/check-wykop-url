import restify from "restify";
import corsMiddleware from "restify-cors-middleware2";
import { CheckURL, checkValidHostname } from "./utils.js";

const server = restify.createServer({
  name: "Wykop CheckURL existence",
  version: "1.0.0",
});

const cors = corsMiddleware({ origins: ["*"] });

server.use(cors.actual);
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
      res.status(check.exists ? 200 : 404);
      return res.send(check);
    } else {
      res.status(406);
      return res.send("Not valid URL");
    }
  } catch (_) {
    res.status(406);
    res.send("Not valid URL");
  }

  return next();
});

server.listen(process.env.PORT || 8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
