/**
* Funciona perfecto!
*/
function filterCards(filter, value){
 fetch("https://rickandmortyapi.com/api/character/?" + filter + "=" + value)
  .then((response) => {
      // Toma la respuesta de la promesa y le da formato json
      return response.json();
  })
  .then((data) => {
      /**
       * Toma la propiedad 'results' del json y los envia a la
       * funcion createCharacters() generar las tarjetas de los personajes.
       */
      createCharacters(data.results);

      /**
       * Toma la propiedad 'info' del json que contiene las url de
       * la paginacion y los envia a setPagination()
       */
      setPagination(data.info);
     
  })

}




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
       * Toma la propiedad 'results' del json y los envia a la
       * funcion createCharacters() generar las tarjetas de los personajes.
       */
      createCharacters(data.results);

      /**
       * Toma la propiedad 'info' del json que contiene las url de
       * la paginacion y los envia a setPagination()
       */
      setPagination(data.info);

  })
}



/**
 * Recibe las URL de la paginacion, y establece los atributos
 * "value" de los <button> "prev" y "next" con este valor.
 * Que luego con el evento "onclick" envian dicha url a la
 * funcion fetchData() para generar nuevos personajes.
 *
 * @param object pagination Objeto que contiene las URLs
 */
function setPagination(pagination){
  // Estabece los contenedores para los botones
  let $prev = document.getElementById("prev-page");
  let $next = document.getElementById("next-page");
  
  // CANTIDAD DE RESULTADOS
  let cantResults = document.getElementById("cant-resultados").innerHTML =  pagination.count;

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
    // Establece el contenedor para los personajes
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
                <p class="status">Estado: ${personajes[i].status}</p>
              </div>
            </article>
        `;

        // Agrega la clase "isDead" a <article> si el personaje esta muerto
        let $deadStatus = document.getElementsByClassName("ficha");
        if(personajes[i].status == "Dead"){
          $deadStatus[i].classList.add("isDead");
          //$deadStatus[i].getElementsByClassName('status')[0].innerHTML = "&#9760;";
        }

    }
}



/**
 * NO IMPLEMENTADA AUN
 * Con cada click en la foto del personaje, obtiene su ID
 * y hace una consulta por ese personaje.
 */
function getSingleCharacter(id){
  fetch("https://rickandmortyapi.com/api/character/"+id)
  .then((response) => {
      // Toma la respuesta de la promesa y le da formato json
      return response.json();
  })
  .then((data) => {
    //console.log(data);
  })

}



/**
* NO IMPLEMENTADA AUN
* Locations
*/
// fetch("https://rickandmortyapi.com/api/location")
// .then((response) => {
//     // Toma la respuesta de la promesa y le da formato json
//     return response.json();
// })
// .then((data) => {
//     // Toma el json y lo envia a una funcion
//     createLocactions(data.results);
// })

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
* NO IMPLEMENTADA AUN
* Episodes
*/
// fetch("https://rickandmortyapi.com/api/episode")
// .then((response) => {
//     // Toma la respuesta de la promesa y le da formato json
//     return response.json();
// })
// .then((data) => {
//     // Toma el json y lo envia a una funcion
//     createEpisodes(data.results);
// })

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
