const express = require("express")
const homeController = require('../controllers/home.js')
const adminController = require('../controllers/admin.js')

const router = express.Router()

// Middlewares directement dans routes.js
function connected(req, res, next) {
  if (req.session && req.session.connected) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

function isAdmin(req, res, next) {
  if (
    req.session &&
    req.session.connected &&
    req.session.user &&
    req.session.user.admin === 1
  ) {
    return next();
  } else {
    return res.redirect("/");
  }
}


router.get('/', homeController.home)
router.get('/guides' , homeController.guides)
router.get('/maps/:id' , homeController.map)
router.get('/posts/:id', homeController.containPost);
router.get('/posts/map/:mapId/agent/:agentId', homeController.postPerMap);
router.get('/tools' , homeController.tools)
router.get('/apropos' , homeController.apropos)
router.get('/random-team' , homeController.randomTeam)
router.get('/random-waypoint' , homeController.randomWaypoint)
router.get('/admin' , isAdmin , adminController.getAdmin)
router.get('/admin/posts/new' , isAdmin , adminController.newAdminPost)
router.get('/admin/posts/edit/:id' , isAdmin , adminController.editAdminPost)
router.get('/singup', isAdmin , adminController.singup)
router.get('/login'   , adminController.login)
router.get('/singin' , isAdmin , adminController.singin)
router.post('/register', isAdmin , adminController.singinPost)
router.post('/login' , adminController.auth)
router.post('/admin/posts/delete/:id' ,isAdmin , adminController.deletePost)
router.post('/admin/add/posts' , isAdmin , adminController.addPost)
router.post('/admin/posts/edit/:id' , isAdmin , adminController.editPost )
router.get('*', homeController.notFound);


module.exports = router;
