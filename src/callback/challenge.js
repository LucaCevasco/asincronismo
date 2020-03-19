const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// xmlhttprequest es un protocolo para comunicarse con una API
const API = 'https://rickandmortyapi.com/api/character/';

// se inicia la funcion, como primer parametro, la url de donde saca informacion
// su segundo parametro es un callback que permitira retornar una funcion para ejecutarse cuando termine la anterior, formando un loop
function fetchData(url_api, callback) {
    // Establece a xhttp como instancia del xmlhttprequest
    let xhttp = new XMLHttpRequest();
    // Abre la conexion
    xhttp.open('GET', url_api, true);
    // onreadystatechange se encarga de ejecutar la funcion dada cuando el state de la solicitud xhtpp cambia
    xhttp.onreadystatechange = function(event) {
        if(xhttp.readyState === 4) {
            // readyState === 4 proviene de la numeracion a los estados de una peticion, siendo 4 el estado completado
            // https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
            if(xhttp.status === 200){
                // si todo salio bien, manda los datos a la funcion callback que es escrita abajo
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                // si el codigo del status devuelve 200, la comunicacion fue exitosa, si es otro codigo, no fue exitosa
                const error = new Error('Error' + url_api);
                 // en el callback, el primer parametro va para el error si existe, y el segundo para la respuesta si existe
                return callback(error, null);
            }
        }
    }

    xhttp.send();
}

fetchData(API, function(error1, data1) {
    if(error1) return console.error(error);
    // Luego de dar un return en caso de error, se continua volviendo a llamar a la funcion (el segundo parametro es el callback al cual se le pasan los datos)
    // con la url de la api, mas el id del resultado dado, la url_api pasa a ser rickandmortyapi.com/api/character/1, dando nuevos datos
    fetchData(API + data1.results[0].id, function(error2, data2) { 
        if(error2) return console.error(error2);
        //devuelta pasa otro parametro, para generar datos distintos, se va adentrando en la dimension de la API, siempre siendo este parametro un url para la conexion
        fetchData(data2.origin.url, function (error3, data3) {
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        }) 

    })
})