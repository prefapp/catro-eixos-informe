const {init, Tarea} = require("catro-eixos-js");

const {expect} = require("chai"); 

const Middleware = require("../lib/middleware.js");

describe("CatroEixosInforme", function(){

  let refProcesador;

  before(function(hecho){

    init({
      "Test": __dirname + "/fixtures/procesos"
    })
    .then((procesador) => {
      refProcesador = procesador;
      hecho();
    })
    .catch((err) => {
      hecho(err);
    })

  })

  before(function(hecho){

    Middleware(refProcesador, {

      rutaInformes: __dirname + "/fixtures/informes"

    })

      .then(() => {

        hecho();

      })

      .catch(err => hecho(err))

  })

  it("Carga los informes", function(hecho){
    
    refProcesador.ejecutar(

      new Tarea("test_cadena", {
        proceso: "Test.cadena",
        cadena: "CADENA"
      })
    )
      .then(({resultados}) => {
        
        expect(resultados.informe).to.be.an("object");
        expect(resultados.informe.cadenaVale).to.equal("CADENA_B_");

        hecho();

      })
      .catch((err) => {
        hecho(err);
      })

  })

})
