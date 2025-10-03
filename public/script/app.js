const btn = document.getElementById('btn');
let randomImg = document.getElementById('random-img');
let waypontName = document.getElementById("waypont-name")


btn.addEventListener('click', function () {
    // Effacer les images précédentes
    randomImg.innerHTML = '';

    
let namewaypont = ""
    let indexImageActuel = Math.floor(Math.random() * 19) + 1;  
    if(indexImageActuel === 1 ){
        namewaypont = "Frenzy"
    }else if (indexImageActuel === 2 ){
        namewaypont = "Classic"
    }else if (indexImageActuel === 3 ){
        namewaypont = "Shorty"
    }else if (indexImageActuel === 4 ){
        namewaypont = "Ghost"
    }else if (indexImageActuel === 5 ){
        namewaypont = "Sherrif"
    }else if (indexImageActuel === 6 ){
        namewaypont = "Stinger"
    }else if (indexImageActuel === 7 ){
        namewaypont = "Spectre"
    }else if (indexImageActuel === 8 ){
        namewaypont = "Bucky"
    }else if (indexImageActuel === 9 ){
        namewaypont = "Judge"
    }else if (indexImageActuel === 10 ){
        namewaypont = "Bulldog"
    }else if (indexImageActuel === 11){
        namewaypont = "Guardian"
    }else if (indexImageActuel === 12 ){
        namewaypont = "Phantom"
    }else if (indexImageActuel === 13 ){
        namewaypont = "Vandal"
    }else if (indexImageActuel === 14 ){
        namewaypont = "Marshall"
    }else if (indexImageActuel === 15 ){
        namewaypont = "Outllaw"
    }else if (indexImageActuel === 16 ){
        namewaypont = "Operator"
    }else if (indexImageActuel === 17 ){
        namewaypont = "Ares"
    }else if (indexImageActuel === 18 ){
        namewaypont = "Odin"
    }else if (indexImageActuel === 19 ){
        namewaypont = "Cut"
    }
    // Créer un nouvel élément image
    let img = document.createElement("img");
    
    waypontName.innerHTML = ``
    let waypont = document.createElement('p')
    waypont.innerHTML = ` <p class="waypont-name"> ${namewaypont} </p>` 
    waypontName.appendChild(waypont)


    // Définir l'attribut source en fonction de l'index actuel
    img.setAttribute('src', `img/waypont/${indexImageActuel}.webp`);
    img.setAttribute('width' , "400px" )
    // Ajouter l'image au conteneur
    randomImg.appendChild(img);
    
});
