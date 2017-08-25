const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

  parametrosNecesarios(){
    return ["cadena"]
  }

  __r(){
    return [
      "__a",
      "__b",
      "__c",
      "__apuntarResultados"
    ]
  }

  __a(){

    this["cadena"] = this.arg("cadena")

  }

  __b(){
    this["cadena"] = this["cadena"] + "_B_";
  }

  __c(){
    this["cadena"] = this["cadena"] + "_C_";
  }

  __apuntarResultados(){
    this.resultado("cadena", this["cadena"]);
  }
}
