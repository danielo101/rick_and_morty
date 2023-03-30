/*

https://rickandmortyapi.com/api
{
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
}


CHARACTERS
There is a total of 826 characters sorted by id.


Get all characters
https://rickandmortyapi.com/api/character

Get a single character
https://rickandmortyapi.com/api/character/2

Get multiple characters
https://rickandmortyapi.com/api/character/1,183

Filter characters
https://rickandmortyapi.com/api/character/?name=rick&status=alive
Available parameters:
name: filter by the given name.
status: filter by the given status (alive, dead or unknown).
species: filter by the given species.
type: filter by the given type.
gender: filter by the given gender (female, male, genderless or unknown).



LOCATION
There is a total of 126 locations sorted by id

Get all locations
https://rickandmortyapi.com/api/location

Get a single location
https://rickandmortyapi.com/api/location/3

Get multiple locations
https://rickandmortyapi.com/api/location/3,21


Filter locations
Available parameters:
name: filter by the given name.
type: filter by the given type.
dimension: filter by the given dimension.



EPISODES
There is a total of 51 episodes sorted by id (which is of course the order of the episodes)

Get all episodes
https://rickandmortyapi.com/api/episode


Get a single episode
https://rickandmortyapi.com/api/episode/28  

Get multiple episodes
https://rickandmortyapi.com/api/episode/10,28

Filter episodes
Available parameters:
name: filter by the given name.
episode: filter by the given episode code.

*/



function getData () {
  fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
		//console.log(Object.keys(data));
		//console.log(Object.values(data));
		//console.log(Object.entries(data));

		createCharacter(data);
		
  })
}

getData();

function createCharacter(data){
  //console.log(data);
}

