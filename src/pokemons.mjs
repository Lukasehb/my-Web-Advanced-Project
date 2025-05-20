"use strict";
const routes = {  //routes zoals gezien in de voor laatste les van web-advanced
  home: () => { //home page met links naar de andere pagina's
    document.getElementById('app').innerHTML = `
      <div class="top-section">
        <h1>Home</h1>
      </div>
      <div class="bottom-section">
        <p>Welcome to the Pokémon SPA!</p>
          <p><a href="#pokemons">View Pokémons</a> | <a href="#favorites">View Favorites</a></p>
      </div>
    `;
  },
  pokemons: async () => { //pokemon page waar de api gebruikt word om de naam,id,types en word opgrevraagd om getoond te worden aan de gebruiker
    const app = document.getElementById('app');
    app.innerHTML = '<h1>Loading Pokémons...</h1>';

    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); //hier word de api opgehaald first gen van pokemon
      const data = await response.json();
      const pokemons = data.results;

      let html = '<h1>Pokémons</h1>';
      html += '<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for a pokémon/type..">'; // de search filter bron is vermeld van waar deze komt
      html += '<ul id="pokeUL">';

      const detailedPokemons = await Promise.all(
        pokemons.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      detailedPokemons.forEach(pokemon => { // voor elke pokemon voort hij dit uit dus 151 keer
        const types = pokemon.types.map(t => t.type.name).join(', ');
        html += `
          <li> zet elke pokemon in een lijst
            <a href="#pokemon-${pokemon.name}">
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <strong>${pokemon.name}</strong><br>
              <small>Type: ${types}\n</small>
              <small>pokémonnummer: ${pokemon.id}</small>
            </a>
          </li>`;//de naam, sprite, type en id komt in een list pokemons zijn klikbaar als op pokemon klick resultaat is (http://localhost:5173/#pokemon-ivysaur)
      });

      html += '</ul>';
      app.innerHTML = html;

    } catch (error) { // indien dat er fout is met de pokemon api aan te roepen vangt hij deze fout op
      app.innerHTML = '<p>Error loading Pokémons.</p>';
      console.error(error);
    }
  },

  favorites:() => {// de pagina favorite zodat gebruiker favorite kan toevoegen
    const app = document.getElementById('app');
    const favorites = getFavorites();
    let html = '<h1>Loading favorite pokémons...</h1>';
    html += '<p><a href="#pokemons">← Back to the pokémonlist</a></p>';
    try {
      let html = '<h1>My Favorite Pokémons</h1>';
          app.innerHTML = html;
       if (favorites.length === 0) {
      html += ' <div class="bottom-section"><p>No favorites yet. <a href="#pokemons">Go catch some!!</p></div>'; //als er nog geen fouten zijn geeft een link van de pokemon pagina
      
      app.innerHTML = html;
      return;
    } else {
      html += '<ul>';
      favorites.forEach(pokemon => { //net zoals pokemon pagina een lijst met pokemons dat zijn toegevoegd aan de favorite
        //enkel sprite en naam van de pokemon
        html += `
          <li>
            <img src="${pokemon.sprite}" alt="${pokemon.name}"> 
            <div class="pokémonfav">${pokemon.name}<div>
  
          <button class="remove-fav-btn" data-name="${pokemon.name}">Remove from favorites</button>
          </li>`;
      });
      html += '</ul>';
      app.innerHTML = html;
      //verwijderknop om de pokemons te verwijderen van de lijst
      document.querySelectorAll('.remove-fav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const name = e.target.getAttribute('data-name');
          removeFavorite(name);
        });
      });
    }
    } catch (error) {
      app.innerHTML = '<p>Error loading favorite Pokémons.</p>';
      console.error(error);
    }
  }
};

async function loadPokemonDetail(name) {//pokemon word geklikt en deze pagina word opgeroepen
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Loading Pokémon details...</h1>';

  try { // haalt de api nog een keer op voor alles plus het gewicht en hoogte van pokemon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await response.json();
    const types = pokemon.types.map(t => t.type.name).join(', ');

    app.innerHTML = `
    <h1>${pokemon.name}</h1>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Type:</strong> ${types}</p>
    <p>pokémonnummer: ${pokemon.id}<p>
    <div class="bottom-section">
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p id="favorite"> <p>
          </div>
  <button id="addFavoriteBtn">Add to favorite</button>
  <p><a href="#pokemons">← Back to list</a></p>
  `;
  //favorite knop om de sprite en naam door te sturen naar de favorite
  document.getElementById('addFavoriteBtn').addEventListener('click', () => {
    addFavorite({
      name: pokemon.name,
      sprite: pokemon.sprites.front_default
    });
  });

  //zelfde voor pokemon
  } catch (error) {
    app.innerHTML = '<p>Pokémon not found.</p>';
    console.error(error);
  }
}

function router() {// de router van de pagina
  const hash = window.location.hash.substring(1) || 'home';

  if (routes[hash]) {
    routes[hash]();
  } else if (hash.startsWith('pokemon-')) {
    const name = hash.replace('pokemon-', '');
    loadPokemonDetail(name);
  } else {
    document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
  }
}

window.addEventListener('hashchange', router);


window.myFunction = function() { // de zoekfunctie bron vermeld in readme
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("pokeUL");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    var txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function getFavorites() { // getter voor de favorites
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {// oplsaan van de favorites
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addFavorite(pokemon) {// favorite toevoegen 
  const favorite = document.getElementById('favorite');
  const favorites = getFavorites();
  if (!favorites.some(p => p.name === pokemon.name)) {
    favorites.push(pokemon);
    saveFavorites(favorites);
    favorite.textContent = "added to favorites"
  } else {
    favorite.textContent = "This pokémon is already in your favorites"
  }
}

function removeFavorite(name) {// verwijderen van de favorite
  const favorites = getFavorites().filter(p => p.name !== name);
  saveFavorites(favorites);
  routes.favorites();
  
}

const mobile = window.matchMedia('(max-width: 768px)');

function handleResize(e) {
  if (e.matches) {
    console.log('Mobile layout');
  } else {
    console.log('Desktop layout');
  }
}

mobile.addEventListener('change', handleResize);
handleResize(mobile);
