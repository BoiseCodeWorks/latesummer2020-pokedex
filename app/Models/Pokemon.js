// NOTE API SCHEMA
// "types": [],
//     "_id": "5e84d408c35b3c0017c445d9",
//         "name": "bulbasaur",
//             "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
//                 "weight": "69",
//                     "user": "darryl",

export default class Pokemon {
    constructor(data) {
        this._id = data._id
        this.name = data.name
        this.img = data.img || data.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
        this.weight = data.weight
        this.types = data.types
        this.user = data.user || null
    }

    get Template() {
        let template = /*html*/ `
        <div class="border border-dark rounded shadow text-center mt-3">
            <h3 class="text-capitalize">${this.name}</h3>
            <img src="${this.img}" alt="">
            <h3>Weight: ${this.weight}</h3>
            <h5>Types:</h5>
            `
        this.types.forEach(t => template += `<p class="text-capitalize">${t.type.name}</p>`)
        if (this.user) {
            template += `
            <button class="btn btn-danger my-0 rounded-0 btn-block btn-sm" onclick="app.pokemonController.releasePokemon('${this._id}')">Release</button>
        </div>`
        }
        else {
            template += `
            <button class="btn btn-success rounded-0 my-0 btn-block btn-sm" onclick="app.pokemonController.catchPokemon()">Catch</button>
            </div>`
        }

        return template
    }

    static generateWildPokemonTemplate(name) {
        return `<button class="btn btn-info btn-block btn-lg text-capitalize" onclick="app.pokemonController.getPokemonInfo('${name}')">${name}</button>`
    }
}