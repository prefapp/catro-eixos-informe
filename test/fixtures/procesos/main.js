const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

  parametrosNecesarios(){
    return []
  }

  __r(){
    return [
      "__cadena",
      "__apuntarResultados"
    ]
  }

  __cadena(){

    return this.subProceso(
      "Test.cadena",

      {
        cadena: "MI_CADENA"
      }
    )

  }

  OK__cadena(resultados){
    this["cadena_obtenida"] = resultados.cadena;
  }

  __apuntarResultados(){
  
    this.resultado("cadena_obtenida", this["cadena_obtenida"]);

  }
}
