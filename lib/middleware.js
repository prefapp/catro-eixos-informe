const CargadorInformes = require("./sistema/cargador_informes");
const ProcesadorInformes = require("./procesador_informes");

const {Tarea} = require("catro-eixos-js");

module.exports = function(refProcesador, opciones = {}){

  if(!refProcesador)
    throw new Error(`[CATRO-EIXOS-INFORMES][Falta referencia a procesador]`);

  if(!opciones.rutaInformes)
    throw new Error(`[CATRO-EIXOS-INFORMES][Falta ruta al directorio de informes]`);

  return cargarInformes(opciones.rutaInformes) 

    .then(({resultados}) => {

      return new ProcesadorInformes(resultados.informes) 
   
    })

    .then((procesadorInformes) => {

      return procesadorInformes

          .iniciar(refProcesador);

    })
    
    .catch((err) => {

      throw `[INFORMES_MIDDLEWARE][INICIAR][${err}]` 

    })
}

function cargarInformes(rutaInformes){

  return new CargadorInformes(

    new Tarea("cargador_informes", {

      rutaInformes: rutaInformes

    })

  ).ejecutar()

}


