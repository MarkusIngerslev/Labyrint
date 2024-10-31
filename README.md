# Theseus' Labyrint

Mening med dette mini projekt er at både lave et program som kan lave en labyrint, men også et program som kan løse en labyrint.

De to dele af projektet kan findes i henholdsvis [labyrint generator](./Labyrint%20generator/) og [labyrint solver](./Labyrint%20solver/).

## Labyrint solver

#### Algoritme brug

Jeg har brugt **Depth-First Search (DFS) algoritmen med backtracking**. Denne algoritme udforsker så langt som muligt langs hver rute, før den backtracker, hvilket gør den effektiv til at finde en rute fra start til mål i labyrinten.

#### Rekursion, stack eller kombination?

Jeg har brugt en kombination af rekursion og en stack klasse. `visitCell` funktionen er rekursiv og besøger celler ved at kalde sig selv. Samtidig bruger jeg en custom `Stack` klasse fra filen `stack.js` til at gemme ruten. Hver gang en celle besøges, bliver den pushet til stacken. Hvis algoritmen rammer en blindgyde, popper den celler fra stacken for at backtracke.

#### Håndtering af backtracking

Jeg viser backtracking i labyrinten. Når algoritmen backtracker fra en blindgyde, markeres disse celler med en anden farve (i dette tilfælde violet) for at indikere de stier, der blev udforsket men ikke førte til målet. Den endelige rute fra start til slut vises med en gul farve. Dette giver en visuel repræsentation af både den succesfulde rute og de områder, hvor algoritmen måtte backtracke.



#### Beregning af ruten

Jeg beregner ruten i ét hug. Hele ruten fra start til mål bliver beregnet på én gang under udførelsen af DFS-algoritmen. Når ruden er fundet, bliver den vist på labyrinten med det samme uden nogen animation.

#### Andet relevant information om koden

**Status håndtering:**
 Jeg bruger et statusobjekt `{goalReached: false}` til at holde styr på, om målet er nået. Dette forhindre ydeligere rekursive kald, når ruten til målet er fundet, hvilket optimerer algoritmen.

**Retningsrækkefølge:**
Jeg benytter fast retningsrækkefølge til at bestemme orden af hvilken nabo der bliver *"besøgt"* først `["east", "south", "west", "north"]`. Jeg har dog også tilføjet en funktion der gør det muligt at blande retningsrækkefølgende ved hvert *"besøg"* gennem funktion `shuffleDirections(directions)`. Lige nu så står denne funktion udmarkeret, men når den bliver aktiveret, så blander den rækkerfølgende af de 4 tidligere retninger ved hvert nyt besøg en celle laver. 

## Labyrint generator