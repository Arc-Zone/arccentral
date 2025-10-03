require("dotenv").config();
const express = require('express');
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const routes = require('./routes/routes.js'); // <- récupère directement un Router

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

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

// rendre la session dispo dans tes vues
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ✅ ici ton router marche direct
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
