import _pokemonService from "../Services/PokemonService.js";
import _store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

//Private
function _drawWildPokemon() {
  let template = ""
  // _store.State.wildPokemon.forEach(p => template += `<button class="btn btn-info btn-block btn-lg">${p}</button>`)
  _store.State.wildPokemon.forEach(pokemonName => template += Pokemon.generateWildPokemonTemplate(pokemonName))
  document.getElementById("wild-pokemon").innerHTML = template
}

function _drawMyPokemon() {
  let template = ""
  // _store.State.wildPokemon.forEach(p => template += `<button class="btn btn-info btn-block btn-lg">${p}</button>`)
  _store.State.myPokemon.forEach(pokemon => template += pokemon.Template)
  document.getElementById("my-pokemon").innerHTML = template
}

function _drawActivePokemon() {
  document.getElementById("active-pokemon").innerHTML = _store.State.activePokemon.Template
}

//Public
export default class PokemonController {
  constructor() {
    _store.subscribe("wildPokemon", _drawWildPokemon);
    _store.subscribe("activePokemon", _drawActivePokemon)
    _store.subscribe("myPokemon", _drawMyPokemon)
  }

  getPokemonInfo(pokemonName) {
    _pokemonService.getPokemonInfo(pokemonName)
  }

  catchPokemon() {
    _pokemonService.catchPokemon()
  }

  releasePokemon(pokemonId) {
    _pokemonService.releasePokemon(pokemonId)
  }
}
