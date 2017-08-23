const {Proceso} = require("catro-eixos-js");

const fs = require("fs");
const path = require("path");

module.exports = class extends Proceso{

  parametrosNecesarios(){
    return ["rutaInformes"]
  }

  __r(){
    return [
      "__listarModulos",
      "__cargarModulos",
      "__apuntarResultados"
    ]
  }

  __listarModulos(){

    return new Promise((cumplida, falla) => {

      fs.readdir(this.arg("rutaInformes"), (err, lista) => {

        if(err) return falla(err);

        cumplida(lista.filter(f => f.match(/\.js$/)))    

      })

    })
  }

  OK__listarModulos(lista){
    this["lista"] = lista;
  }

  KO__listarModulos(err){
    this.error(`[INFORMES_JS][LISTAR_MODULOS][${err}]`)
  }

  __cargarModulos(){

    this["informes"] = {};

    this["lista"].forEach((f) => {

      try{

        let ruta = path.join(this.arg("rutaInformes"), f);
  
        let nombre = f.match(/(.+)\.js$/)[1];
  
        nombre = require(ruta);

        this["informes"][nombre.ENTRADA()] = nombre; 

      }
      catch(err){

        throw `En carga de ${f}: ${err}`

      }

    })
  }

  KO__cargarModulos(err){
    this.error(`[CARGAR_MODULOS_INFORME][${err}]`);
  }

  __apuntarResultados(){

    this.resultado("informes", this["informes"]);
  }

}
