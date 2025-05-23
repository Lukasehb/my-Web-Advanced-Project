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

Open je browser op het aangegeven adres, meestal http://localhost:5173

Voor productie:
npm run build en daarna npm run preview


Gebruikte bronnen
PokéAPI (https://pokeapi.co/)

W3sschool (https://www.w3schools.com/howto/howto_js_filter_lists.asp)

Stackoverflow (https://stackoverflow.com/questions/11323813/how-to-outline-text-in-html-css)

Vite (https://vitejs.dev/)

OpenAI ChatGPT voor codeadvies en uitleg

help with startup of project:
https://chatgpt.com/share/682c62a1-11cc-800b-8251-548893e3a033

help met gsm versie:
https://chatgpt.com/share/682c69be-9af0-800b-8f3d-1e62fc976b30

check voor de opdracht:
https://chatgpt.com/share/682c6150-864c-800b-b4ad-18fbd0b727e1

GitHub Repository
De broncode is te vinden op:
https://github.com/Lukasehb/my-Web-Advanced-Project

Screenshots 
homepage
![image](https://github.com/user-attachments/assets/f9a32692-b2ca-4846-82f9-0ec21ced43bf)

pokemonpage
![image](https://github.com/user-attachments/assets/3ca7c9df-5e3d-4d9e-9f62-951b9cfa26b7)

pokemonpage met zoekfilter
![image](https://github.com/user-attachments/assets/d4eee056-7d63-4a83-8fb6-38bf477fcdec)
![image](https://github.com/user-attachments/assets/8cba60b2-c143-4420-8a2a-558caa5cd782)
![image](https://github.com/user-attachments/assets/5dfde8ef-a6ed-4c96-83f4-ca77b522cd75)

pagina van de pokemon zelf
![image](https://github.com/user-attachments/assets/55d68c8e-71e1-42b2-bcc5-9c1f3e6c5100)

toegevoegd aan favorite
![image](https://github.com/user-attachments/assets/458fc1f8-4091-4fe1-8701-874ac299a670)
![image](https://github.com/user-attachments/assets/c62433a0-399b-4a6c-80d0-a2ed827e4ddd)

favoritepage
![image](https://github.com/user-attachments/assets/932d25b8-2587-4f2f-a7e2-8412479f20b2)
verwijderd van favorite
![image](https://github.com/user-attachments/assets/ed5daf5e-efe6-45d0-b20f-1dfe719eef90)
lege favoritepage
![image](https://github.com/user-attachments/assets/02961846-d4e2-4c43-bc54-211edf4099e1)


