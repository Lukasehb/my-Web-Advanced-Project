"use strict";
const routes = {
  home: () => {
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
  pokemons: async () => {
    const app = document.getElementById('app');
    app.innerHTML = '<h1>Loading Pokémons...</h1>';

    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const pokemons = data.results;

      let html = '<h1>Pokémons</h1>';
      html += '<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for a pokémon/type..">';
      html += '<ul id="pokeUL">';

      const detailedPokemons = await Promise.all(
        pokemons.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      detailedPokemons.forEach(pokemon => {
        const types = pokemon.types.map(t => t.type.name).join(', ');
        html += `
          <li>
            <a href="#pokemon-${pokemon.name}">
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <strong>${pokemon.name}</strong><br>
              <small>Type: ${types}\n</small>
              <small>pokémonnummer: ${pokemon.id}</small>
            </a>
          </li>`;
      });

      html += '</ul>';
      app.innerHTML = html;

    } catch (error) {
      app.innerHTML = '<p>Error loading Pokémons.</p>';
      console.error(error);
    }
  },

  favorites:() => {
    const app = document.getElementById('app');
    const favorites = getFavorites();
    let html = '<h1>Loading favorite pokémons...</h1>';
    html += '<p><a href="#pokemons">← Back to the pokémonlist</a></p>';
    try {
      let html = '<h1>My Favorite Pokémons</h1>';
          app.innerHTML = html;
       if (favorites.length === 0) {
      html += ' <div class="bottom-section"><p>No favorites yet. <a href="#pokemons">Go catch some!!</p>      </div>';
      
      app.innerHTML = html;
      return;
    } else {
      html += '<ul>';
      favorites.forEach(pokemon => {
        html += `
          <li>
            <img src="${pokemon.sprite}" alt="${pokemon.name}"> <div class="pokémonfav">${pokemon.name}test<div>
  
          <button onclick="removeFavorite('${pokemon.name}')">Remove from favorites</button>
          </li>`;
      });
      html += '</ul>';
      app.innerHTML = html;
    }
    } catch (error) {
      app.innerHTML = '<p>Error loading favorite Pokémons.</p>';
      console.error(error);
    }
  }
};

async function loadPokemonDetail(name) {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Loading Pokémon details...</h1>';

  try {
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
    <button onclick='addFavorite(${JSON.stringify({
      name: pokemon.name,
      sprite: pokemon.sprites.front_default
    })})'>Add to favorite</button>
    <p><a href="#pokemons">← Back to list</a></p>
  `;
  } catch (error) {
    app.innerHTML = '<p>Pokémon not found.</p>';
    console.error(error);
  }
}

function router() {
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


function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("pokeUL");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addFavorite(pokemon) {
  const favorites = getFavorites();
  if (!favorites.some(p => p.name === pokemon.name)) {
    favorites.push(pokemon);
    saveFavorites(favorites);
    favorite.textContent = "added to favorites"
  } else {
    favorite.textContent = "This pokémon is already in your favorites"
  }
}

function removeFavorite(name) {
  const favorites = getFavorites().filter(p => p.name !== name);
  saveFavorites(favorites);
  routes.favorites();
  setTimeout(() => {
    window.location.hash = "favorites";
  }, 0);
}
