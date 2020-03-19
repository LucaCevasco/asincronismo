const somethingWillHappen = () => {
    // se crea la promesa. esta puede tener 3 estados, en curso, resuelta, o rechazada
    return new Promise((resolve, reject) => {
        // se pasa una condicion, si se cumple, la promesa se resolvera y dara una respuesta
        // esta es el parametro entre parentesis en resolve, si no, es rechazada y devuelve un error.
        if(true) {
            resolve('resuelto!!');
        } else {
            reject('Rechazado');
        }
    })
}

// se llama a la promesa, y como la condicion se cumple ( es true) devuelve una respuesta
// .then es un metodo donde se ordena que ejecutar cuando se resuelva la promesa, utilizando a response como parametro
// .catch es utilizado para manejar el error en caso de que la promesa sea rechazada
somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.error(err))


const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if(true) {
        // da la response del resolve con un delay de 200ms (2s), 
            setTimeout(() => {
                resolve('true');
            },2000)
        } else {
        // es de utilidad usar new Error para debuggear mas facilmente y saber en que seccion de nuestro codigo esta el error
            const error = new Error('rechazado');
            reject(error);
        }
    })
}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Al tener distintas promesas, se puede utilizar Promise.all para ejecutar varias promesas que sean pasadas como valor.
// primero ejecuta las promesas en el orden que fueron pasadas, y luego responde con una respuesta del .all (array en este caso)
Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log('array')
    })
    .catch(err => {
        console.error(err);
    })
