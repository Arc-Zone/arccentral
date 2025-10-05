const fs = require("fs");
const path = require("path");

// Rediriger les erreurs serveur vers un fichier
const logPath = path.join(__dirname, "tmp", "error.log");
const logStream = fs.createWriteStream(logPath, { flags: "a" });
process.stdout.write = process.stderr.write = logStream.write.bind(logStream);

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

// Rendre la session dispo dans toutes les vues
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ✅ Routes
app.use("/", routes);

// ✅ Démarrage : Passenger fournit PORT (production), sinon fallback local
if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

module.exports = app;
