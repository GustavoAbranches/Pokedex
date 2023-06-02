const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status == 200) {
    const data = await APIResponse.json()

    return data
  }
}

const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]

    // Limpa os tipos anteriores
    const typesContainer = document.querySelector('.pokemon_types')
    typesContainer.innerHTML = ''

    // Exibe os tipos do Pokémon
  data.types.forEach((typeSlot, index) => {
  const typeElement = document.createElement('span');
  typeElement.classList.add('pokemon_type');
  typeElement.classList.add(typeSlot.type.name);

  typeElement.innerHTML = typeSlot.type.name;

  typesContainer.appendChild(typeElement);

  // Adiciona vírgula após o primeiro tipo
  if (index === 0 && data.types.length > 1) {
    const commaElement = document.createElement('span');
    commaElement.innerHTML = ', ';
    typesContainer.appendChild(commaElement);
  }

  
});

    input.value = ''

    searchPokemon = data.id
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found :c'
    pokemonNumber.innerHTML = ''
  }

  
}

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', event => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', event => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
