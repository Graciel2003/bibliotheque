let bibliotheque = []
function Livre(titre, auteur, annees, pages, statut) {
    this.id = crypto.randomUUID()
    this.titre = titre
    this.auteur = auteur
    this.annees = annees
    this.pages = pages
    this.statut = statut
}
Livre.prototype.changerStatut = function(){
    if(this.statut === "lu"){
        this.statut = "non-lu"
    }else{
        this.statut = "lu"
    }
}
function ajouterLivre(titre, auteur, annees, pages, statut) {
    const nouveauLivre = new Livre(titre, auteur, annees, pages, statut)
    bibliotheque.push(nouveauLivre)
    console.log("Livre ajouter")
}
ajouterLivre("Les Miserables", "Victor Hugo", 1862, 200)
ajouterLivre("L'Etranger", "Albert Camus", 1942, 150)
ajouterLivre("Le petit Prince", "Antoine de Saint-Exupéry", 1943, 200)
console.log("Bibliothèque complet :", bibliotheque)

function afficherLivre() {
    const container = document.getElementById("listes-livres")
    container.innerHTML = " "
    bibliotheque.forEach((livre) => {
        const div = document.createElement("div")
        div.classList.add("livre")
        div.innerHTML = `
            <h3>${livre.titre}</h3>
            <p><strong></strong>Auteur : ${livre.auteur}</p>
            <p><strong></strong>Année : ${livre.annees}</p>
            <p><strong></strong>Pages : ${livre.pages}</p>
            <p><strong></strong>Statut : ${livre.statut}</p>
            <p><small>ID : ${livre.id}</small></p>
            <button class="modifier-statut" data-id="${livre.id}">
            Changer le statut
            </button>
            <button class="supprimer" data-id="${livre.id}">
            Supprimer
            </button>
        `
        container.appendChild(div)
    })
    attacherSuppressionLivres()
}
afficherLivre()

function attacherSuppressionLivres() {
    document.getElementById("listes-livres").addEventListener("click", function(event){
        if(event.target.classList.contains("supprimer")){
            supprimerLivre(event.target.dataset.id)
        }
        if(event.target.classList.contains("modifier-statut")){
            modificationStatut(event.target.dataset.id)
        }
    })
}

/* la fonction supprimerLivre */
function supprimerLivre(id) {
    bibliotheque = bibliotheque.filter(livre => livre.id !== id)
    afficherLivre()
}


/* Gestion de la modale */
const modale = document.getElementById("modal")
const btn_nouveau = document.getElementById("btn-nouveau")
const btn_fermer = document.getElementById("fermer")
btn_nouveau.addEventListener("click", function () {
    modale.classList.remove("hidden")
})
btn_fermer.addEventListener("click", function () {
    modale.classList.add("hidden")
})

/* Gestion du formulaire */
const form = document.getElementById("form-livre")
form.addEventListener("submit", function (event) {
    event.preventDefault()
    const titre = document.getElementById("titre").value
    const auteur = document.getElementById("auteur").value
    const annee = document.getElementById("annees").value
    const pages = document.getElementById("pages").value
    const statut = document.getElementById("statut").value
    ajouterLivre(titre, auteur, annee, pages, statut)
    afficherLivre()
    form.reset()
    modale.classList.add("hidden")
})

/* fonction de modification de statut */
function modificationStatut(id){
    const livre = bibliotheque.find(livre => livre.id === id)
    if(livre){
        livre.changerStatut()
    }
    afficherLivre()
}