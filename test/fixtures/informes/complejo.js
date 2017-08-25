const Informe = require("../../../lib/informe.js");

module.exports = class extends Informe{

  static ENTRADA(){
    return 'Test.main' 
  }

  SALIDA(){
    return {resultados: "informe"}
  }

  Test_main__cadena(refProceso){
    this.agregar("cadenaObtenida", refProceso["cadena_obtenida"]);
  }

  Test_cadena__a(refProceso){

    this.agregar('cadenaVale', refProceso["cadena"]);

  } 
  
  Test_cadena__b(refProceso){

    this.agregar('cadenaVale', refProceso["cadena"]);

    console.log(this.informe);
  }
}
