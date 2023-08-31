// on selectionne le form par un sélecteur CSS
const form = document.querySelector('form')
// et l'input text du code postal par sa classe
const inputCodePostal = document.querySelector(".codepostal")

const inputText = document.createElement("p")

const result = document.querySelector(".result");


// 3 DIFFERENTES MANIÈRES : 
//      submit : lorsque l'utilisateur submit le form (eventListener sur le form)
//      focusout : lorsque l'utilisateur clique en dehors du form (eventListener sur le form ou l'input au choix)
//      input : lorsque l'utilisateur écris dans l'input inputCodePostal (eventListener sur le form ou l'input mais l'input me semble)

// form.addEventListener("focusout", (event) => {
    // form.addEventListener("submit", (event) => {
inputCodePostal.addEventListener("input", () => {
    // on preventDefault() la fonction de base du submit (recharge la page, etc)
    // event.preventDefault();

    // à chaque event (input/focusout/submit selon la méthode), on appelle getInfosAPI en passant en paramètre le 
    // contenu de notre input si l'input est de 5 (code postal Français) alors go
    if(inputCodePostal.value.length == 5) {
        getInfosAPI(inputCodePostal);
    } else {
        result.innerHTML = ""
    }

    inputText.innerText = inputCodePostal
    
})

function getInfosAPI(inputCodePostal) {

    // Pour récupérer la valeur de l'input du form, input.value (après l'avoir sélectionner au préalable)
    fetch("https://geo.api.gouv.fr/communes?codePostal=" + inputCodePostal.value + "&fields=nom,code,codesPostaux,population")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        const result = document.querySelector(".result")

        // à chaque "submit" on vide la div result pour que le dernier résultat s'efface pour laisser place au nouveau
        result.innerHTML = ""


        // on créer une constante "ville" qui sera un élément "p" donc <p>
        const ville = document.createElement("p");
        // on ajoute du code HTML a notre élément ville avec innerHTML = ""
        ville.innerHTML = "Nom : " + data[0].nom;
        // puis on "appendChild()" ville sur result c'est-à-dire qu'on l'ajoute ville à la fin de l'élément result
        result.appendChild(ville);


        // on créer une constante "code"
        const code = document.createElement("p");
        // on ajoute du code HTML a notre élément <p> ville avec innerHTML = ""
        code.innerHTML = "Code INSEE : " + data[0].code;
        // on l'ajoute à la fin de "result"
        result.appendChild(code);


        const titreSelect = document.createElement("p")
        titreSelect.innerHTML = "Codes postaux associé : "
        result.appendChild(titreSelect)
        // on créer une constante "codePostaux" qui sera une select list avec chaque code postal de la ville
        const codePostaux = document.createElement("select");
        // on fait un foreach car l'élément codesPostaux qu'on récupère est un tableau
        data[0].codesPostaux.forEach((codePostal) => {
            // pour chaque élément du tableau codesPostaux (qu'on appelle codePostal), on créer une constante "codePostal"
            const codePostalOption = document.createElement("option");

            // on ajoute donc le texte (codePostal) à notre élément codePostal qui est une balise <option>
            // textContent pour ajouter le texte entre <option> et </option>
            codePostalOption.textContent = codePostal + " " + data[0].nom;
            // chaque codePostal = <option>codePostal</option>
            // puis on ajoute chaque codePostal à la fin de la select list codePostaux
            codePostaux.appendChild(codePostalOption);
        });
        // et enfin on on ajoute codePostaux à la fin de l'élément result
        result.appendChild(codePostaux);


        // création de l'élément <p> de population
        const population = document.createElement("p");
        // ajout du texte dans la balise <p>
        population.innerHTML = "Population : " + data[0].population + " habitants";
        // ajout de notre nouvel élément <p>data[0].population</p> à l'élément result 
        result.appendChild(population);
    })
    .catch((error) => console.log(error));
}
