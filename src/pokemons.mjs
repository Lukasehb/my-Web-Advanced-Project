"use strict";
const routes = {
  home: () => {
    document.getElementById('app').innerHTML = `
      <h1>Home</h1>
      <p>Welcome to the Pokémon SPA!</p>
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
      html += '<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for a pokémon..">';
      html += '<ul id="pokeUL">';
  
      // Fetch all details in parallel for performance
      const detailedPokemons = await Promise.all(
        pokemons.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
  
      // Build HTML with images
      detailedPokemons.forEach(pokemon => {
        html += `
          <li>
            <a href="#pokemon-${pokemon.name}">
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              ${pokemon.name}
            </a>
          </li>`;
      });
  
      html += '</ul>';
      app.innerHTML = html;
  
    } catch (error) {
      app.innerHTML = '<p>Error loading Pokémons.</p>';
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

    app.innerHTML = `
      <h1>${pokemon.name}</h1>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <a href="#pokemons">← Back to list</a>
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
window.addEventListener('load', router);

function myFunction() { // https://www.w3schools.com/howto/howto_js_filter_lists.asp
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
