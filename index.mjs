import "dotenv/config";
import pkg from "nunjucks";
import cookieParser from "cookie-parser";
import auth from "./backend-src/middleware/auth.mjs";
import authRoutes from "./backend-src/routes/auth.mjs";
import noteRoutes from "./backend-src/routes/notes.mjs";
import express, { static as serveStatic } from "express";
import errorHandler from "./backend-src/middleware/errorHandler.mjs";

const { configure } = pkg;

const port = process.env.PORT || 3000;

const app = express();

configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(serveStatic("public"));
app.use(cookieParser());
app.use("/notes", noteRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  const { errorStatus } = req.query;

  if (req.cookies["sessionId"]) {
    return res.redirect("/dashboard");
  }

  let errorMessage = false;

  switch (errorStatus) {
    case "400":
    case "404":
      errorMessage = "Wrong username or password";
      break;
    case "409":
      errorMessage = "Username already exists";
      break;
  }

  res.render("index", {
    authError: errorMessage,
  });
});

app.get("/dashboard", auth(), (req, res) => {
  const { username } = req.user;

  res.render("dashboard", { username });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`   Listening on http://localhost:${port}`);
});
