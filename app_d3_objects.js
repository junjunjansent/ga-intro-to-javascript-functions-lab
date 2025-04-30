// doing this in js because i dont know how to compile everything in Typescript (some help or advice would be good)
const pokemon = require("./data_d3.js");

const game = {
  party: [],
  gyms: [
    { location: "Pewter City", completed: false, difficulty: 1 },
    { location: "Cerulean City", completed: false, difficulty: 2 },
    { location: "Vermilion City", completed: false, difficulty: 3 },
    { location: "Celadon City", completed: false, difficulty: 4 },
    { location: "Fuchsia City", completed: false, difficulty: 5 },
    { location: "Saffron City", completed: false, difficulty: 6 },
    { location: "Cinnabar Island", completed: false, difficulty: 7 },
    { location: "Viridian City", completed: false, difficulty: 8 },
  ],
  items: [
    { name: "potion", quantity: 4 },
    { name: "pokeball", quantity: 8 },
    { name: "rare candy", quantity: 99 },
  ],
};

// console.dir(pokemon, { maxArrayLength: null });

/* ---------------------------------------------------------------------- */
// Log JUST the name of the Pokemon with the number 59 using the index of the Pokemon in the array.
console.log("Exercise 1 Results:", pokemon[58].name);

/* ---------------------------------------------------------------------- */
console.log("Exercise 2: Consoled out");
// console.log(game);

/* ----------------------------------------------------------------------
Exercise 3
1. Add a new property to the `game` object. Let's call it "difficulty".
2. Choose a value for "difficulty" that you think fits the game. Ex: "Easy", "Med" or "Hard". How would you assign it?


Solve Exercise 3 here:
*/

game.difficulty = "Med";
console.log("Exercise 3 Result: Difficulty is " + game.difficulty);

/* ----------------------------------------------------------------------
Exercise 4
1. Select a starter Pokémon from the `pokemon` array. Remember, a starter Pokémon's `starter` property is true.
2. Add this Pokémon to the `game.party` array. Which array method will you use to add them?


Solve Exercise 4 here:
*/

// remember pokemon is an array
const starterPokemons = pokemon.filter((p) => p.starter === true); // note i use () for condition, i can also use {} but need return to do the filtering
game.party.push(starterPokemons[0]);

console.log(
  "Exercise 4 Result: Chosen starter pokemon is " + starterPokemons[0].name
);

/* ----------------------------------------------------------------------
Exercise 5
1. Choose three more Pokémon from the `pokemon` array and add them to your party.
2. Consider different attributes like 'type' or 'HP' for your selection. Which array method will you use to add them?

Solve Exercise 5 here:
*/

// choose unique pokemons with different type and HP
// assume all should be starters
let pokemon0 = starterPokemons[0]; // all references to bulbasaur
let pokemon1 = starterPokemons.find(
  (p) => p.type !== pokemon0.type && p.hp !== pokemon0.hp
);
let pokemon2 = starterPokemons.find(
  (p) =>
    p.type !== pokemon0.type && p.hp !== pokemon0.hp && p.type !== pokemon1.type
);
let pokemon3 = starterPokemons.find(
  (p) =>
    p.type !== pokemon0.type &&
    p.hp !== pokemon0.hp &&
    p.type !== pokemon1.type &&
    p.type !== pokemon2.type
);

// game.party is an array
game.party.push(pokemon1, pokemon2, pokemon3);
// i want list of pokemon names, can acutally use map function though
const partyPokemonsNames = [];
for (const p of game.party) {
  partyPokemonsNames.push(p["name"]);
}

console.log(
  "Exercise 5 Result: Party pokemons in game are " +
    partyPokemonsNames.join(", ")
);

/* ----------------------------------------------------------------------
Exercise 6
1. Set the `completed` property to true for gyms with a difficulty below 3.
2. Think about how you'd loop through the `gyms` array to check and update the `completed` property.

Solve Exercise 6 here:
*/

// game.gym is a list of objects
for (const g of game.gyms) {
  g.completed = g.difficulty < 3;
}

console.log("Exercise 6 Completed");

/* ----------------------------------------------------------------------
Exercise 7
1. Evolve the starter Pokémon you added to your party earlier. Each starter Pokémon evolves into a specific one.
2. How would you replace the current starter Pokémon in your party with its evolved form?

Hint: 
  - Pokemon 1: Bulbasaur evolves into Pokemon 2: Ivysaur
  - Pokemon 4: Charmander evolves into Pokemon 5: Charmeleon
  - Pokemon 7: Squirtle evolves into Pokemon 8: Wartortle
  - Pokemon 25: Pikachu evolves into Pokemon 26: Raichu

More Hints: The existing starter Pokemon will be *replaced* in your party with the Pokemon it evolved into. When working with an array of objects, the splice() array method is ideal for replacing one element with another. 

Solve Exercise 7 here:
*/

// im assuming pokemon evolves from pokemon 1 to pokemon 2 (idk how this pokemon database works lol)
// game.party is the list of pokemon i need to evolve, create new party first so as to not affect for loop
const evolvedPartyPokemons = [];
const evolvedPartyPokemonsNames = [];
let i = 0;
for (const p of game.party) {
  // find number of each pokemon, get that number i
  // replace game.party pokemon with pokemon[i] // because pokemon numebrs start from 1
  i = p["number"];
  evolvedPartyPokemons.push(pokemon[i]);
  evolvedPartyPokemonsNames.push(pokemon[i].name);
}

game.party = evolvedPartyPokemons;

console.log(
  "Exercise 7 Result: New party pokemons in game are " +
    evolvedPartyPokemonsNames.join(", ")
);

/* ----------------------------------------------------------------------
Exercise 8
1. Print the name of each Pokémon in your party.
2. Consider using a loop or an array method to access each Pokémon's name.

Solve Exercise 8 here:
*/

console.log(
  "Exercise 8 Result: (Done in Exercise 7) New party pokemons in game are " +
    evolvedPartyPokemonsNames.join(", ")
);

/* ----------------------------------------------------------------------
Exercise 9
1. Can you print out all the starter Pokémon from the `pokemon` array?
2. Think about how you can identify a starter Pokémon and then log their names.


Solve Exercise 9 here:
*/

// use starterPokemons as defined in Exercise 4
const starterPokemonsNames = starterPokemons.map((p) => {
  return p.name;
});

console.log(
  "Exercise 9 Result: (Built upon from Exercise 4) All avail starter pokemons are " +
    starterPokemonsNames.join(", ")
);

/* ----------------------------------------------------------------------
Exercise 10
Create a method called `catchPokemon` and add it to the `game` object. You should not need to edit the original game object directly. This method should:
  - Accept an object as a parameter called `pokemonObj`
  - Add the `pokemonObj` to the `game.party` array.
  - not return anything

After writing this method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.

Solve Exercise 10 here:
*/

game.catchPokemon = (pokemonObj) => {
  game.party.push(pokemonObj);
};

// define and catch newPokemon
const newPokemon0 = pokemon[53]; // psyduck
game.catchPokemon(newPokemon0);

console.log(
  "Exercise 10 Result: Latest caught pokemon is " +
    game.party[game.party.length - 1].name
);

/* ----------------------------------------------------------------------
Exercise 11
1. Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify it so that it also decreases the number of pokeballs in your inventory each time you catch a Pokémon.
2. How will you find and update the quantity of pokeballs in the `game.items` array?

Tips:
For this exercise, it's okay to have a negative number of pokeballs.
After updating the method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.
Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 11 here:
*/
const pokeballObj = game.items.find((p) => p.name === "pokeball");

game.catchPokemon11 = (pokemonObj) => {
  game.party.push(pokemonObj);
  pokeballObj.quantity -= 1;
};

// define and catch newPokemon
const newPokemon1 = pokemon[150]; // mew
game.catchPokemon11(newPokemon1);

console.log(
  `Exercise 11 Result: Latest caught pokemon is ${
    game.party[game.party.length - 1].name
  } and new pokeball quantity is ${pokeballObj.quantity}`
);

/* ----------------------------------------------------------------------
Exercise 12
1. Similar to Exercise 6, now complete gyms with a difficulty below 6. How will you approach this?
 (change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 12 here:
*/

for (const g of game.gyms) {
  g.completed = g.difficulty < 6;
}

console.log("Exercise 12 Completed");

/* ----------------------------------------------------------------------
Exercise 13
1. Create a `gymStatus` method in `game` to tally completed and incomplete gyms.
2. How will you iterate through the `gyms` array and update the tally? Remember to log the final tally.

This method should:
  - Not accept any arguments.
  - Initially create a constant `gymTally`, which is an object that has two 
    properties: `completed` and `incomplete`, both of which are initially set to 0.
  - Iterate through the objects in the `game.gyms` array and update the 
    properties on `gymTally` as follows: 
    - `completed` should count how many gyms in the array have a value of `true` 
      for their `completed` property. 
    - `incomplete` should count how many gyms in the array have a value of 
      `false` for their `completed` property.
  - Log the value of `gymTally`.
  - The method should not return anything.

For example, if five gym objects have a value of `true` on their `completed` property and three gym objects have a value of `false` on their `completed` property, the logged value would be: `{ completed: 5, incomplete: 3 }`.

Solve Exercise 13 here:
*/

game.gymStatus = () => {
  const gymTally = {
    completed: 0,
    incomplete: 0,
  };

  for (const g of game.gyms) {
    if (g.completed) {
      gymTally.completed += 1;
    } else {
      gymTally.incomplete += 1;
    }
  }

  console.log(gymTally);
};

console.log("Exercise 13 Completed");
game.gymStatus();

/* ----------------------------------------------------------------------
Exercise 14
1. Add a `partyCount` method to `game` that counts the number of Pokémon in your party.

This method should:
  - Not accept any arguments.
  - Count the number of Pokemon in the party.
  - return the found number of Pokemon in the party.

Solve Exercise 14 here:
*/

game.partyCount = () => {
  return game.party.length;
};

console.log(`Exercise 14 Result: Game party count is ${game.partyCount()}`);

/* ----------------------------------------------------------------------
Exercise 15
1. Now, complete gyms with a difficulty below 8. Reflect on how this is similar to or different from the previous gym exercises.
(change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 15 here:
*/

for (const g of game.gyms) {
  g.completed = g.difficulty < 8;
}

// doesnt seem too much different from previous gym exercises, im just still looping through all gyms, i could consider filtering out only those with incomplete status, but then both methods would still have O(n) complexity, so the method above seems suitable
console.log("Exercise 15 Completed");
game.gymStatus();

/* ----------------------------------------------------------------------
Exercise 16
1. Log the entire `game` object to the console. Take a moment to review the changes you've made throughout the exercises.


Solve Exercise 16 here:
*/
console.log("Exercise 16 Completed");
// console.log(game);

/* ----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
-------------------------------LEVEL UP-------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
---------------------------------------------------------------------- */

/* ----------------------------------------------------------------------
Exercise 17
1. Arrange the Pokémon in `game.party` by their HP. The one with the highest HP should come first.
2. You'll need to use the `.sort()` method. How does the compare function work in sorting numbers?


Solve Exercise 17 here:
*/

game.party.sort((a, b) => a.hp - b.hp);
// console.log(game.party);
console.log("Exercise 17 Completed");

/* ----------------------------------------------------------------------
Exercise 18
Add a new property to the `game` object called `collection` and initialize its value to an empty array.

Copy the `catchPokemon` method you wrote in Exercise Twelve and paste it below. Modify it so that:
  - Ensure that no more than six Pokemon can be in the party at any time. 
    Excess Pokemon should be placed in the `game.collection` array.
  - It's up to you how to distribute Pokemon in a situation where more than six 
    would be placed into the `game.party` array.

Again, for this exercise, it's okay to have a negative number of pokeballs.

After updating the method, use it by calling it and passing in a pokemon object of your choice from the `pokemon` data to catch it.

Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 18 here:
*/

game.collection = [];

game.catchPokemon18 = (pokemonObj) => {
  game.party.push(pokemonObj);
  // defined already -- const pokeballObj = game.items.find((p) => p.name === "pokeball");
  pokeballObj.quantity -= 1;

  while (game.partyCount() > 6) {
    game.party.sort((a, b) => a.hp - b.hp);
    game.collection.push(game.party.pop()); // sends highest hp pokemon to collection
  }
};

// define and catch newPokemon
const newPokemon2 = pokemon[49]; // diglet
game.catchPokemon18(newPokemon2);

console.log(
  `\n Exercise 18 Result: New pokeball quantity is ${pokeballObj.quantity} 
   Party contains [ ${game.party.map((p) => p.name).join(", ")} ] 
   Collection contains [ ${game.collection.map((p) => p.name).join(", ")} ]`
);

/* ----------------------------------------------------------------------
Exercise 19
Copy the `catchPokemon` method that you just wrote above, and paste it below. The time has come to make it so that we cannot catch a Pokemon when we do not have any pokeballs to catch it with. 

Modify the method so that if there are no pokeballs a message will be displayed that there are not enough pokeballs to catch the desired Pokemon.

Also, ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 19 here:
*/

game.catchPokemon19 = (...pokemonObjs) => {
  for (const p of pokemonObjs) {
    if (pokeballObj.quantity > 0) {
      game.party.push(p);
      // defined already -- const pokeballObj = game.items.find((p) => p.name === "pokeball");
      pokeballObj.quantity -= 1;
    } else {
      console.log(
        `${p.name} was not caught! No pokeballs left lah, go find more balls first please.`
      );
    }
  }

  // sort by hp
  game.party.sort((a, b) => a.hp - b.hp);

  while (game.partyCount() > 6) {
    game.collection.push(game.party.pop()); // sends highest hp pokemon to collection
  }
};

// define and catch newPokemon
const newPokemon3 = pokemon[40]; // zubat
const newPokemon4 = pokemon[66],
  newPokemon5 = pokemon[67],
  newPokemon6 = pokemon[68],
  newPokemon7 = pokemon[69],
  newPokemon8 = pokemon[70],
  newPokemon9 = pokemon[71],
  newPokemon10 = pokemon[72];
game.catchPokemon19(
  newPokemon3,
  newPokemon4,
  newPokemon5,
  newPokemon6,
  newPokemon7,
  newPokemon8,
  newPokemon9,
  newPokemon10
);

console.log(
  `\n Exercise 19 Result: 
  After adding 8 more Pokemon to try  
  New pokeball quantity is ${pokeballObj.quantity} 
   Party contains [ ${game.party.map((p) => p.name).join(", ")} ]  
   Collection contains [ ${game.collection.map((p) => p.name).join(", ")} ]`
);

/* ----------------------------------------------------------------------
Exercise 20
Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify is so that you can just pass in the name of a Pokemon instead of an entire object, and the method will look up the Pokemon from the data set for you.

The string passed in should be allowed to be any case (for example, if the string 'PiKacHU' is passed to the function, it should match to 'Pikachu' in the data set). 

If there is not a match, then return a string noting that the selected Pokemon does not exist. Ensure you do not decrement the pokeball count if an invalid Pokemon name is passed in, and also ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 20 here:
*/

game.catchPokemon20 = (...pokemonNameList) => {
  for (let pName of pokemonNameList) {
    // clean pokemonName for searching
    pName = pName.charAt(0).toUpperCase() + pName.slice(1).toLowerCase();

    // use pokemonName to find index in pokemon and call the full pokemon
    let p_index = pokemon.map((i) => i.name).indexOf(pName);
    if (p_index === -1) {
      console.log(`${pName} does not seem to exist.`);
      continue;
    }

    // if pokemon exists
    let p = pokemon[p_index];
    if (pokeballObj.quantity > 0) {
      game.party.push(p);
      // defined already -- const pokeballObj = game.items.find((p) => p.name === "pokeball");
      pokeballObj.quantity -= 1;
    } else {
      console.log(
        `${p.name} was not caught! No pokeballs left lah, go find more balls first please.`
      );
    }
  }

  // sort by hp
  game.party.sort((a, b) => a.hp - b.hp);

  while (game.partyCount() > 6) {
    game.collection.push(game.party.pop()); // sends highest hp pokemon to collection
  }
};

// add more poke balls
pokeballObj.quantity += 2;

// define and catch newPokemon
// const newPokemonName0 = pokemon[80].name, // MAGNEmiTe
//   newPokemonName1 = pokemon[81].name, // MagNETOn
//   newPokemonName2 = pokemon[82].name; // fARfETch'd
//   newPokemonName3 = pokemon[83].name; // fARfETch'd

const newPokemonNameList = ["MAGNEmiTe", "MagNEeeeeTOn", "fARfETch'd", "DodUO"];
game.catchPokemon20(...newPokemonNameList);
console.log(
  `\n Exercise 20 Result:
     After adding 2 more balls to try and including 4 more pokemon (1 wrong name)
     New pokeball quantity is ${pokeballObj.quantity} 
     Party contains [ ${game.party.map((p) => p.name).join(", ")} ]  
     Collection contains [ ${game.collection.map((p) => p.name).join(", ")} ]`
);

/* ----------------------------------------------------------------------
Exercise 21
Dynamically construct an object with the existing `pokemon` data sorted by the different pokemon types. The object will have this structure:

{
  grass: [
    { number: 1, name: 'Bulbasaur', type: 'grass', hp: 45, starter: true },
    { number: 2, name: 'Ivysaur', type: 'grass', hp: 60, starter: false },
    { number: 3, name: 'Venusaur', type: 'grass', hp: 80, starter: false },
    * more grass type Pokemon objects...
  ],
  fire: [
    { number: 4, name: 'Charmander', type: 'fire', hp: 39, starter: true },
    * more fire type Pokemon objects...
  ],
  water: [
    * water type Pokemon objects...
  ],
  * etc... until there is an array for every Pokemon type!
}

Log the object when it's constructed.

Solve Exercise 21 here:
*/

// i want to get this object by only running through the pokemon list ONCE

const pokemonByType = {};
for (const p of pokemon) {
  // if given p.type is not inside pokemonByType, pokemonByType[p.type] = undefined
  if (pokemonByType[p.type] === undefined) {
    pokemonByType[p.type] = [];
    pokemonByType[p.type].push(p);
  } else {
    pokemonByType[p.type].push(p);
  }
}

let totalPokemon = 0;
for (const key in pokemonByType) {
  if (Object.prototype.hasOwnProperty.call(pokemonByType, key)) {
    const typeList_i = pokemonByType[key];
    totalPokemon += typeList_i.length;
  }
}

console.dir(pokemonByType, { maxArrayLength: null });
console.log(
  "\n Exercise 21 Completed. But double checking work. \n Total number of pokemon in pokemonByType is " +
    totalPokemon
);
