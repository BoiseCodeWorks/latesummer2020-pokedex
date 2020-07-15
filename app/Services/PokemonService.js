import _store from "../store.js";
import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
const _pokeApi = axios.create({
    baseURL: "//pokeapi.co/api/v2/",
    timeout: 3000
})

// NOTE this collection is unique per user name
// @ts-ignore
const _bcwApi = axios.create({
    baseURL: "//bcw-sandbox.herokuapp.com/api/darryl",
    timeout: 3000
})


class PokemonService {
    constructor() {
        this.getWildPokemon()
        this.getMyPokemon()
        this.getPokemonInfo("mewtwo")
    }

    releasePokemon(pokemonId) {
        _bcwApi.delete("pokemon/" + pokemonId).then(res => {
            console.log(res.data);
            store.commit("myPokemon", store.State.myPokemon.filter(p => p._id != pokemonId))
        }).catch(err => console.error(err))
    }

    catchPokemon() {
        _bcwApi.post("pokemon", _store.State.activePokemon).then(res => {
            console.log(res.data);
            this.getMyPokemon()
        }).catch(err => console.error(err))
    }

    getMyPokemon() {
        _bcwApi.get("pokemon").then(res => {
            // console.log(res.data.data);
            store.commit("myPokemon", res.data.data.map(rawPokemonData => new Pokemon(rawPokemonData)))
        }).catch(err => console.error(err))
    }

    getPokemonInfo(pokemonName) {
        _pokeApi.get("pokemon/" + pokemonName).then(res => {
            store.commit("activePokemon", new Pokemon(res.data))
            // console.log(res.data);
        }).catch(err => console.error(err))
    }

    getWildPokemon() {
        _pokeApi.get("pokemon?limit=964").then(res => {
            // console.log(res);
            _store.commit("wildPokemon", res.data.results.map(rawPokemonData => rawPokemonData.name))
        }).catch(err => console.error(err))
    }
}

const SERVICE = new PokemonService();
export default SERVICE;
