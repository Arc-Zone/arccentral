console.log("🚀 server.js loaded");

try {
  require("dotenv").config();
} catch (e) {
  console.log("⚠️ Pas de .env trouvé, on utilise les variables d'environnement du serveur.");
}

const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const routes = require("./routes/routes.js");

const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Session
app.use(
  session({
    store: new FileStore({}),
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 // 1h
    }
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/", routes);

// ❌ ne démarre rien ici
module.exports = app;
