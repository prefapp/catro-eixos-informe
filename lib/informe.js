const {Map} = require("immutable");

module.exports = class {

  constructor(tarea){

    this.tarea = tarea;
    this.informe = new Map();

    this.procesoSelf = this.ENTRADA().replace(/\./, "_");

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

    let procesoResuelto = proceso.replace(/\./g, "_");

    let metodo = procesoResuelto + paso;

    if(typeof this[metodo] === "function"){
      return this[metodo](procesoObjeto);
    }

    if(procesoResuelto === this.procesoSelf){

      metodo = "self" + paso;

      if(typeof this[metodo] === "function"){
        return this[metodo](procesoObjeto);
      }
    }
  }

  agregar(clave, valor){

    if(Array.isArray(clave) === false)
      clave = [clave];

    this.informe = this.informe.setIn(clave, valor);


  }

}
