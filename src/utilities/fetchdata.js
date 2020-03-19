const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// xmlhttprequest es un protocolo para comunicarse con una API


// haciendo un fetch con promesas y ES6+
const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        // Establece a xhttp como instancia del xmlhttprequest
        const xhttp = new XMLHttpRequest();
        // Abre la conexion
        xhttp.open('GET', url_api, true);
        // onreadystatechange se encarga de ejecutar la funcion dada cuando el state de la solicitud xhtpp cambia
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4) {
            // readyState === 4 proviene de la numeracion a los estados de una peticion, siendo 4 el estado completado
            // si la peticion esta finalizada, ahora comprueba que el codigo final haya sido 200 (con un turnery en vez de un if), que indica que fue exitosa
            (xhttp.status === 200) ? resolve (JSON.parse(xhttp.responseText)) : reject(new Error('Error', url_api))             
            }
        })
    })
    xhttp.send();
}

// exportamos fetchdata para usarlo en donde sea necesario
module.exports = fetchData;