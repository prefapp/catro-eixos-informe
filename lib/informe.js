const {Map} = require("immutable");

module.exports = class {

  constructor(tarea){

    this.tarea = tarea;
    this.informe = new Map();

  }

  cerrar(refProceso){

    let salida = this.SALIDA();

    if(salida.resultados){
      refProceso.resultado(salida.resultados, this.informe.toJS());
    }

  }  

  id(){
    return this.tarea.id;
  }

  pasoEjecutado(proceso, paso, procesoObjeto){

    let metodo = proceso.replace(/\./g, "_");

    metodo += paso;

    if(typeof this[metodo] === "function"){
      this[metodo](procesoObjeto);
    }

  }

  agregar(clave, valor){

    if(Array.isArray(clave) === false)
      clave = [clave];

    this.informe = this.informe.setIn(clave, valor);


  }

}
