Pokémon SPA
Projectbeschrijving
Dit project is een Single Page Application (SPA) waarin gebruikers de eerste 151 Pokémon kunnen bekijken, zoeken, details kunnen zien en favorieten kunnen beheren. De app haalt data op via de PokéAPI en slaat favorieten lokaal op.

Functionaliteiten
Lijst met 151 Pokémon met naam, afbeelding, type en ID (regels 15-60)

Zoekfunctie om Pokémon te filteren (regels 181-196)

Detailpagina met uitgebreide informatie over een Pokémon (regels 62-93)

Favorieten toevoegen en verwijderen, opgeslagen in localStorage (regels 97-141)

Routing op basis van URL hash (regels 95-118)

Responsive design detectie (regels 143-157)

Gebruikte API's
PokéAPI: https://pokeapi.co/api/v2/pokemon (voor alle Pokémon data)

Implementatie van technische vereisten met bijbehorende lijnen
Routing (regels 95-118):
De router() functie checkt de URL hash en laadt de juiste pagina (home, pokemons, favorites of pokemon details).

Pokémon lijst ophalen en tonen (regels 15-60):
In de functie pokemons wordt met fetch de lijst opgehaald en wordt via Promise.all gedetailleerde data per Pokémon opgehaald. Daarna wordt de HTML opgebouwd inclusief een zoekbalk.

Zoekfunctie (regels 181-196):
De myFunction() filtert de weergegeven Pokémon in de lijst door de naam en type te vergelijken met de ingevoerde tekst in het zoekveld.

Pokémon detailpagina (regels 62-93):
loadPokemonDetail(name) haalt data van één Pokémon op en toont details, plus een knop om toe te voegen aan favorieten.

Favorietenbeheer (regels 97-141):

getFavorites() en saveFavorites() lezen en schrijven favorieten in localStorage.

addFavorite(pokemon) voegt een Pokémon toe als deze nog niet favoriet is en toont een melding.

removeFavorite(name) verwijdert een Pokémon en herlaadt de favorietenpagina.

In de favorites() functie (regels 63-95) wordt de lijst met favorieten getoond en worden eventlisteners aan verwijderknoppen gekoppeld.

Responsiviteit detectie (regels 143-157):
Detectie van schermbreedte met window.matchMedia en logging of de layout mobiel of desktop is.

Installatiehandleiding
Clone de repository:
git clone https://github.com/Lukasehb/my-Web-Advanced-Project.git

Ga naar de projectmap:
cd my-Web-Advanced-Project

Installeer dependencies:
npm install

Start de ontwikkelserver:
npm run dev

Open je browser op het aangegeven adres, meestal http://localhost:3000

Voor productie:
npm run build en daarna npm run preview


Gebruikte bronnen
PokéAPI (https://pokeapi.co/)

MDN Web Docs (https://developer.mozilla.org)

Vite (https://vitejs.dev/)

OpenAI ChatGPT voor codeadvies en uitleg

help with startup of project:
https://chatgpt.com/share/682c62a1-11cc-800b-8251-548893e3a033

check voor de opdracht:
https://chatgpt.com/share/682c6150-864c-800b-b4ad-18fbd0b727e1

GitHub Repository
De broncode is te vinden op:
https://github.com/Lukasehb/my-Web-Advanced-Project

De repository bevat meerdere commits, waarbij functies en features per onderdeel en regelmatig zijn toegevoegd en aangepast.

Werkende Demo
Volg de installatiehandleiding om de app lokaal te draaien. Alle functionaliteiten zoals zoeken, favorieten beheren en details bekijken zijn werkend.

