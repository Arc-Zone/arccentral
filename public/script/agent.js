const btn = document.getElementById('btn');
const grid = document.getElementById('random-img');

// Liste des agents (ordre aligné sur tes fichiers 1.webp → 25.webp)
const agentNames = [
  "Astra","Brimstone","Harbor","Omen","Viper",
  "Iso","Jett","Neon","Phoenix","Raze",
  "Reyna","Yoru","Breach","Fade","Gekko",
  "KAY/O","Skye","Sova","Chamber","Cypher",
  "Deadlock","Killjoy","Sage","Clove","Walay"
];

btn.addEventListener('click', () => {
  grid.innerHTML = "";

  const used = new Set();
  while (used.size < 5) {
    used.add(Math.floor(Math.random() * agentNames.length));
  }

  [...used].forEach(idx => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-2'; // responsive 2/row mobile, 3 tablet, 5 desktop

    col.innerHTML = `
      <div class="card h-100 border-0 shadow-sm text-center" style="background:#1a1f29; color:white;">
        <img src="/img/agent/${idx + 1}.webp" class="card-img-top p-2" alt="${agentNames[idx]}" 
             style="height:120px; object-fit:contain; border-radius:8px; background:#0f1923;">
        <div class="card-body p-2">
          <h6 class="card-title fw-bold" style="color:#ff4655;">${agentNames[idx]}</h6>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
});
