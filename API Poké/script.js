const form = document.querySelector("form")
const input = document.querySelector(".nbPokemons")
const result = document.querySelector(".result")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    getPokemons(input.value);
    result.innerHTML = ""
})


function getPokemons(input) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit="+input+"&offset=0")
    .then((response) => response.json())
    .then((data) => {    
        // container creation
        const pokemons = document.createElement("div")
        pokemons.classList.add("pokemons")
        result.appendChild(pokemons)
        
        // ForEach --------------------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------
        data.results.forEach((pokemon, index) => {

            const pokemonInfos = document.createElement("div")
            pokemonInfos.classList.add("pokemonInfos")

            const infos = document.createElement("div")
            infos.classList.add("infos")
            pokemonInfos.appendChild(infos)



            // id (format: #000)
            const id = document.createElement("p")
            id.classList.add("id")
            id.innerHTML = formatID(index)
            infos.appendChild(id)


            // name
            const name = document.createElement("p")
            name.classList.add("name")
            name.innerHTML = ucFirst(pokemon.name)
            infos.appendChild(name)

            // type & img
            fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon.name)
            .then((response) => response.json())
            .then((data) => {
                
                // type
                const type = document.createElement("p")
                type.classList.add("type")
                type.innerHTML = data.types[0].type.name
                infos.appendChild(type)


                // img
                const img = document.createElement("img")
                img.classList.add("img")
                img.src = data.sprites.front_default
                pokemonInfos.appendChild(img)

                // background-color to div
                pokemonInfos.classList.add(data.types[0].type.name)
            })

            // add card to container
            pokemons.appendChild(pokemonInfos)
        })
        // ----------------------------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------

    })
    .catch((error) => console.log(error));
}

function formatID(id) {
    return '#' + id.toString().padStart(3, '0');
}

function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
