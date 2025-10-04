const db = require('../models/database.js')

async function home(req, res) {
  try {
    // Exemple de requête
    const [rows] = await db.query("SELECT * FROM post");

    // Tu passes tes données à ta vue
    res.render("home.ejs", { posts: rows });
  } catch (err) {
    console.error("❌ Erreur DB dans home():", err.message);
    // Tu affiches quand même la page au lieu de crash
    res.render("home.ejs", { posts: [] });
  }
}

module.exports = { home };



async function guides (req , res){
    let [lastedGuidesRows , lastedGuidesFields] = await db.query(`SELECT * FROM post `)
    let [maps] = await db.query(`SELECT * FROM maps`)
    let [agents] = await db.query(`SELECT agents.*, 
                                                        agent_roles.role AS role_name
                                                        FROM agents
                                                        JOIN agent_roles ON agents.agent_role = agent_roles.role_id;`)
    res.render('guides.ejs' ,{ guides : lastedGuidesRows , maps:maps , agents: agents})
}

async function map (req, res){
    const id = req.params.id
    let [map] = await db.query(`SELECT * FROM maps WHERE id = ? ` , [id])
     let [agents] = await db.query(`SELECT agents.*, 
                                                        agent_roles.role AS role_name
                                                        FROM agents
                                                        JOIN agent_roles ON agents.agent_role = agent_roles.role_id;`)
    res.render('map.ejs' , {map:map[0] , agents:agents})
}



async function containPost (req, res)  {
  const postId = req.params.id;

  try {
    const [rows] = await db.query("SELECT * FROM post WHERE id = ?", [postId]);

    if (rows.length === 0) {
      return res.status(404).render("404", { message: "Post introuvable 🚫" });
    }

    const post = rows[0];

    if (post.deleted_at) {
      return res.status(404).render("404", { message: "Ce post a été supprimé 🗑️" });
    }

    // ✅ Un seul render
    return res.render("containPost.ejs", { post });
    // ⚠️ pas besoin de .ejs dans le nom si ton moteur est bien set sur ejs
  } catch (err) {
    console.error(err);
    return res.status(500).render("500", { message: "Erreur serveur ⚡" });
  }
}


async function postPerMap(req, res) {
    const { mapId, agentId } = req.params;

  console.log("Map ID reçu :", mapId);
  console.log("Agent ID reçu :", agentId);

  const [rows] = await db.query(`
    SELECT 
      post.id,
      post.title,
      post.description,
      post.img,
      post.type,
      post.date,
      agents.agent_name,
      agents.agent_img,
      maps.map_name,
      maps.map_img,
      agent_roles.role AS agent_role_name
    FROM post
    JOIN agents ON post.agent_id = agents.id
    JOIN maps ON post.map_id = maps.id
    JOIN agent_roles ON agents.agent_role = agent_roles.role_id
    WHERE post.map_id = ? AND post.agent_id = ?
    ORDER BY post.date DESC
  `, [mapId, agentId]);

  if (rows.length === 0) {
    return res.render('postPerMap.ejs', { posts: [], mapId, agentId });
  }

    res.render('postPerMap.ejs', { posts: rows, mapId, agentId });

}


function apropos (req , res){
  res.render('apropos.ejs')
}

function tools (req , res){
  res.render('tools.ejs')
}


function randomTeam (req , res){
  res.render('randomTeam.ejs')
}

function randomWaypoint (req ,res){
  res.render('randomWaypoint.ejs')
}

function notFound (req ,res){
  res.render('notFound.ejs')
}
module.exports.containPost = containPost
module.exports.home = home
module.exports.guides = guides
module.exports.map = map
module.exports.postPerMap = postPerMap
module.exports.apropos = apropos
module.exports.tools = tools
module.exports.randomTeam = randomTeam
module.exports.randomWaypoint = randomWaypoint
module.exports.notFound = notFound