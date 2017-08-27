const Informe = require("../../../lib/informe.js");

module.exports = class extends Informe{

  ENTRADA(){
    return 'Test.cadena' 
  }

  SALIDA(){
    return {resultados: "informe"}
  }

  Test_cadena__a(refProceso){

    this.agregar('cadenaVale', refProceso["cadena"]);

  } 
  
  Test_cadena__b(refProceso){

    this.agregar('cadenaVale', refProceso["cadena"]);

    console.log(this.informe);
  }
}
