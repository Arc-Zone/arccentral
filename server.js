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

if (require.main === module) {
  // ✅ Local mode (ex: "node server.js")
  const port = process.env.PORT || 3000;
  app.listen(port, "passenger", () => {
    console.log(`🚀 Server running locally on port ${port}`);
  });
} else {
  // ✅ Production mode (géré par Passenger)
  module.exports = app;
}

module.exports = app;
