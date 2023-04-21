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


//fetch => función nativa de js, que nos permite realizar peticiones HTTP de forma asincrónica
/*
fetch("https://rickandmortyapi.com/api/character")
  .then((response) => {
    //de JSON a dato manipulable (objeto o array)
    return response.json();
  })
  .then((data) => {
    const personajes = data.results;
    const $contenedor = document.getElementById("contenedor-personajes");

    console.log(personajes[0]);

    for (let i = 0; i < personajes.length; i++) {
      $contenedor.innerHTML += `
      <div class="tarja">
        <img src="${personajes[i].image}">
        <p class="nombre-personaje">${personajes[i].name}</p>
        <p>${personajes[i].gender}</p>
        <p>${personajes[i].species}</p>
        <p>${personajes[i].status}</p>
        <p>${personajes[i].location.name}</p>
        <p>${personajes[i].origin.name}</p>
      </div>
      `;
    }
  });
*/

/**
* Characters
*/
// fetch("https://rickandmortyapi.com/api/character/")
// .then((response) => {
//     // Toma la respuesta de la promesa y le da formato json
//     return response.json();
// })
// .then((data) => {
//     // Toma el la priedad results del json  y la envia a una funcion
//     createCharacters(data.results);
//
//     // Pagination
//     let prev = document.getElementById("prev-page");
//     let next = document.getElementById("next-page");
//
//     prev.setAttribute("value", data.info.prev);
//     next.setAttribute("value", data.info.next);
// })




/**
 * Llama al funcion fetchData() por primera vez para generar los
 * primeros 20 personajes.
 */
fetchData("https://rickandmortyapi.com/api/character/");



/**
 * Recibe por parametro la URL para hacer la solicitud.
 * La primera vez que es invocada, genera los primeros 20 personajes.
 * Luego es invocada desde los <button> de "prev" y "next" y recibe
 * la url con los 20 personajes anteriores o siguientes de la paginacion
 *
 * @param url del endpoint
 */
function fetchData(url){
  fetch(url)
  .then((response) => {
      // Toma la respuesta de la promesa y le da formato json
      return response.json();
  })
  .then((data) => {
      /**
       * Toma el la propiedad results del json y los envia a la
       * funcion createCharacters() generar las tarjetas de los personajes.
       */
      createCharacters(data.results);

      /**
       * Toma la propiedad info del json que contiene las url de
       * la paginacion y los envia a setPagination()
       */
      setPagination(data.info);

  })
}



/**
 * Recibe las URL de la paginacion, y establece los atributos
 * "value" de los <button> "PREV" y "NEXT" con este valor
 * Que luego con el evento "onclick" envian dicha url a la
 * funcion fetchData() para generar nuevos personajes.
 *
 * @param object pagination Objeto que contiene las URLs
 */
function setPagination(pagination){
  // Estabece los contenedores para los botones
  let $prev = document.getElementById("prev-page");
  let $next = document.getElementById("next-page");

  // Establece al tributo "value" con la URL correspndiente
  $prev.setAttribute("value", pagination.prev);
  $next.setAttribute("value", pagination.next);

  // Habilita / deshabilita los botones si no hay mas resultados
  if($prev.value == "null"){
    $prev.setAttribute("disabled", true);
  }else{
    $prev.removeAttribute("disabled", true);
  }
  if($next.value == "null"){
    $next.setAttribute("disabled", true);
  }
  else{
    $next.removeAttribute("disabled", true);
  }
  // Redirige a la seccion personajes con cada click, excepto en la carga inicial.
  if($prev.value !== "null") {
    const seccion = document.getElementById("personajes");
    seccion.scrollIntoView({ behavior: "smooth" });
  }

}

/**
 * Recibe el objeto que contiene la informacion de los personajes
 * y genera las tarjetas para cada uno.
 *
 * @param object personajes Objeto que contiene info de los personajes
 */
function createCharacters(personajes){
    // Estableve el contenedor para los personajes
    const $contenedor = document.getElementById("personajes");

    // Vacia el contenedor para generar nuevos resultados en la paginacion
    $contenedor.innerHTML = "";

    // Genera el contenido para las tarjetas
    for(let i = 0; i < personajes.length; i++){
        $contenedor.innerHTML += `
            <article class="ficha border-transparent">
              <figure class="foto-personaje">
                <img
                  src="${personajes[i].image}"
                  alt="${personajes[i].name}"
                  onclick="getSingleCharacter(${personajes[i].id})"
                >
                <figcaption>${personajes[i].name}</figcaption>
              </figure>
              <div class="info-personaje">
                <h3 class="nombre"></h3>
                <p class="genero">Genero: ${personajes[i].gender}</p>
                <p class="especie">Especie: ${personajes[i].species}</p>
                <p class="status"><span class="dead-circle"></span>Estado: ${personajes[i].status}</p>
              </div>
            </article>
        `;

        // Agrega la clase "isDead" a <article> si el personaje esta muerto
        let $deadStatus = document.getElementsByClassName("ficha");
        if(personajes[i].status == "Dead"){
          $deadStatus[i].classList.add("isDead");
        }

    }
}



function getSingleCharacter(id){
  fetch("https://rickandmortyapi.com/api/character/"+id)
  .then((response) => {
      // Toma la respuesta de la promesa y le da formato json
      return response.json();
  })
  .then((data) => {
    console.log(data);

  })

}





/**
* Locations
*/
fetch("https://rickandmortyapi.com/api/location")
.then((response) => {
    // Toma la respuesta de la promesa y le da formato json
    return response.json();
})
.then((data) => {
    // Toma el json y lo envia a una funcion
    createLocactions(data.results);
})

function createLocactions(locations){
    const $contenedor = document.getElementById("locaciones");
    
    // for(let i = 0; i < locations.length; i++){
    //     $contenedor.innerHTML += `
    //         <article class="ficha">
    //           <!--figure class="foto-personaje">
    //             <img src="${locations[i].image}" alt="${locations[i].name}">
    //             <figcaption></figcaption>
    //           </figure-->
    //           <div class="info-personaje">
    //             <h3 class="nombre">${locations[i].name}</h3>
    //             <p class="type">Type: ${locations[i].type}</p>
    //             <p class="dimension">Dimension: ${locations[i].dimension}</p>
    //           </div>
    //         </article>
    //     `;
    // }
}




/**
* Episodes
*/
fetch("https://rickandmortyapi.com/api/episode")
.then((response) => {
    // Toma la respuesta de la promesa y le da formato json
    return response.json();
})
.then((data) => {
    // Toma el json y lo envia a una funcion
    createEpisodes(data.results);
})

function createEpisodes(episodes){
    const $contenedor = document.getElementById("episodios");
    
    // for(let i = 0; i < episodes.length; i++){
    //     $contenedor.innerHTML += `
    //         <article class="ficha">
    //           <!--figure class="foto-personaje">
    //             <img src="" alt="">
    //             <figcaption></figcaption>
    //           </figure-->
    //           <div class="info-personaje">
    //             <h3 class="nombre">${episodes[i].name}</h3>
    //             <p class="episode">Episodio: ${episodes[i].episode}</p>
    //             <p class="air-date">Emision: ${episodes[i].air_date}</p>
    //           </div>
    //         </article>
    //     `;
    // }
}
