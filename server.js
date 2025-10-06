const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const routes = require("./routes/routes.js");

const app = express();

// ===== MIDDLEWARES =====
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// ===== SESSIONS =====
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

// ===== ROUTES =====
app.use("/", routes);

// ===== DÉMARRAGE =====
// Passenger (production) n’a pas besoin d’app.listen().
// Mais en mode local (node server.js), oui.
if (require.main === module) {
  const port = process.env.PORT || 4000; // port libre pour tests SSH
  app.listen(port, () => console.log(`🚀 App running locally on port ${port}`));
} else {
  module.exports = app;
}
