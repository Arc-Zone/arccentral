const btn = document.getElementById('btn');
let randomImg = document.getElementById('random-img');
let agentName = document.getElementById('agent-name');

// Liste des agents
const agents = [
  "Astra", "Brimstone", "Harbor", "Omen", "Viper",
  "Iso", "Jett", "Neon", "Phoenix", "Raze",
  "Reyna", "Yoru", "Breach", "Fade", "Gekko",
  "Kayo", "Skye", "Sova", "Chamber", "Cypher",
  "Deadlock", "Killjoy", "Sage", "Tejo", "Walay"
];

btn.addEventListener('click', function () {
  // Reset affichage
  randomImg.innerHTML = "";
  agentName.innerHTML = "";

  // Tableau pour indices déjà utilisés
  let usedIndices = [];

  for (let i = 0; i < 5; i++) {
    let randomIndex;

    // Générer un indice unique
    do {
      randomIndex = Math.floor(Math.random() * agents.length);
    } while (usedIndices.includes(randomIndex));

    usedIndices.push(randomIndex);

    // Récupérer nom agent
    const nameAgent = agents[randomIndex];

    // Affichage du nom
    const agentText = document.createElement('p');
    agentText.textContent = nameAgent;
    agentName.appendChild(agentText);

    // Affichage de l’image
    const agentImg = document.createElement('img');
    agentImg.setAttribute('src', `/img/agent/${randomIndex + 1}.webp`);
    agentImg.setAttribute('width', "120px");
    agentImg.style.margin = "5px";
    randomImg.appendChild(agentImg);
  }
});
