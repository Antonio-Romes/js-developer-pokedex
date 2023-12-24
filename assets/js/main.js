const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton') 
const modalPokemon = document.getElementById('modal-pokemon') 

const maxRecords = 151
const limit = 10
let offset = 0;
let countCard = 0;
let evolutionPokemon = 0;
function convertPokemonToLi(pokemon) {
    if((countCard % 3) == 0){
        evolutionPokemon +=1;
    }
    countCard+= 1;
    return `
        <li class="pokemon ${pokemon.type}" evolutionPokemon=${evolutionPokemon} onclick="openModal(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function mountPokemonModal (cardPokemon){
    return`<header class="modal-pokemon-header ${getTypePokemon(cardPokemon)}">
    <h2 class="modal-title">${getNamePokemon(cardPokemon)}</h2>
        </header>

        <div class="modal-pokemon-img">
            <img src="${getImgPokemon(cardPokemon)}" alt="" srcset="">
        </div>
        ${mountLiModal(cardPokemon)} 
    
    </div>`;
}

function openModal(event){
    modal.style.display = "block";
    modalPokemon.innerHTML = mountPokemonModal(event); 
}

function getNamePokemon(cardPokemon){
    return cardPokemon.children[1].innerHTML;
}

function getImgPokemon(cardPokemon){
    return cardPokemon.children[2].children[1].src;
}
 

function mountLiModal(cardPokemon){
    let typeList = cardPokemon.children[2].children[0].outerText.replace('\n','-').split("-")
      let newHtml = '<ol class="modal-pokemon-types" id="modal-pokemon-types">'
     
      newHtml += typeList.map((type) => `<li class='${type}'>${type}</li>`).join('');
      newHtml += '</ol>' 
return newHtml;
}

function getTypePokemon(cardPokemon){
     let typeList = cardPokemon.children[2].children[0].outerText.replace('\n','-').split("-")
    return typeList[0];
}
 

function loadPokemonItens(offset, limit) { 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }) 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    } 
})




var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0]; 

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}