const db = require('../models/database.js')
const bcrypt = require("bcrypt");

async function getAdmin (req , res){
    let [rows] = await db.query(`SELECT * FROM post`)
    res.render('admin.ejs' , { posts:rows})
}


async function newAdminPost(req, res) {
  try {
    const [agents] = await db.query(`SELECT id, agent_name FROM agents ORDER BY agent_name`);
    const [maps]   = await db.query(`SELECT id, map_name FROM maps ORDER BY map_name`);

    res.render('newAddPostAdmin.ejs', { agents, maps });
  } catch (err) {
    console.error('Erreur affichage form:', err);
    res.status(500).send('Erreur serveur');
  }
}
module.exports.newAdminPost = newAdminPost;

async function editAdminPost(req, res) {
  const id = req.params.id;

  // Récupère le post + son agent + sa map
  let [rowsPost] = await db.query(
    `SELECT post.*, 
            agents.agent_name, 
            maps.map_name
     FROM post
     JOIN agents ON post.agent_id = agents.id
     JOIN maps ON post.map_id = maps.id
     WHERE post.id = ?`,
    [id]
  );

  if (rowsPost.length === 0) {
    return res.status(404).send("Post non trouvé");
  }

  // Récupère toutes les maps et agents pour les selects
  const [agents] = await db.query(`SELECT id, agent_name FROM agents ORDER BY agent_name`);
  const [maps] = await db.query(`SELECT id, map_name FROM maps ORDER BY map_name`);

  res.render("adminEditPost.ejs", {
    post: rowsPost[0],
    agents,
    maps
  });
}

async function login(req , res) {
    res.render('login.ejs')
}

async function singin(req , res) {
    res.render('singin.ejs')
}
async function singinPost(req , res) {
    const saltRound = 10 
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    const sql = `INSERT INTO user (email , password , pseudo) values(?,?,?)`

    bcrypt.hash(password , saltRound , async (err , hash) =>{
        try{

            let [userRows]  = db.query(sql, [email, hash , username])
            if (userRows.email > 0) {
                    return res.redirect("/");
                } else {
                    res.redirect("/singin");
                }
                res.redirect("/");
        }catch{
        console.error("Erreur lors de l'inscription :", err);
        res.redirect("/singin");
        }
    })
}

async function auth(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM user WHERE email = ? AND admin = 1`;
    let [users] = await db.query(sql, [email]);

    if (users.length === 0) {
      // Aucun utilisateur admin trouvé
      return res.redirect("/login?error=invalid");
    }

    const user = users[0]; // On prend le premier résultat

    // Vérification du mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.redirect("/login?error=password");
    }

    // ✅ Connexion réussie
    req.session.connected = true;
    req.session.user = {
      id: user.id,
      email: user.email,
      pseudo: user.pseudo,
      admin: user.admin // ⚠️ cohérent avec ta BDD
    };

    if (user.admin === 1) {
      req.session.isAdmin = true;
      return res.redirect("/admin");
    }

    return res.redirect("/");

  } catch (err) {
    console.error("Erreur auth:", err);
    return res.redirect("/login?error=server");
  }
}

function singup (req ,res){
      if (req.session) {
    req.session.destroy((err) => {
      res.redirect("/");
      return;
    });
  } else {
    res.redirect("/");
  }
}

async function deletePost (req , res){
    const id = req.params.id
    let [rows] = await db.query(`DELETE  FROM post WHERE id = ? `, [id])

    res.redirect('/admin')
  }

  async function addPost(req ,res) {
    const title = req.body.title
    const type = req.body.type
    const description = req.body.description
    const content = req.body.content
    const img = req.body.img
    const video_url =req.body.video_url
    const agent_id = req.body.agent_id
    const map_id = req.body.map_id
    const sql = `INSERT INTO post (title , content , img , type , video_url , description , agent_id , map_id)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    let [rows] = await db.query(sql , [title ,content , img , type , video_url,description , agent_id , map_id ])
    res.redirect('/admin')
  }

  async function editPost (req , res){
    const id = req.params.id
    const title = req.body.title
    const type = req.body.type
    const description = req.body.description
    const content = req.body.content
    const img = req.body.img
    const video_url =req.body.video_url
    const agent_id = req.body.agent_id
    const map_id = req.body.map_id
     const sql = `
      UPDATE post  SET title = ?, 
                                content = ?, 
                                img = ?, 
                                type = ?, 
                                video_url = ?, 
                                description = ?, 
                                agent_id = ?, 
                                map_id = ?
                            WHERE id = ?
    `
  let [rows] = await db.query(sql , [title ,content , img , type , video_url,description , agent_id , map_id,id ])
    res.redirect('/admin')
  }

module.exports.getAdmin = getAdmin
module.exports.newAdminPost = newAdminPost
module.exports.editAdminPost = editAdminPost
module.exports.login = login
module.exports.singin = singin
module.exports.singinPost = singinPost
module.exports.auth = auth
module.exports.singup = singup
module.exports.deletePost = deletePost
module.exports.addPost = addPost
module.exports.editPost = editPost