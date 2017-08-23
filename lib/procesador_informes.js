module.exports = class{

  constructor(informes){
    this.informes = informes;
    this.informesActivos = {};
    this.refProcesador = false;
  }

  iniciar(refProcesador){

    this.refProcesador = refProcesador;
  
    let refStore = refProcesador.manejadorEstado.refStore;

    refStore.subscribe(() => {
      this.__procesarCambio(refStore.getState());
    });

  }

  __procesarCambio(estado){

    let accion = estado["ultimaAccion"].get("accion");

    switch(accion.type){

      case "INICIO_TAREA":
        this.__inicioTarea(accion.tarea);
        break;
      case "PASO_EJECUTADO":
        this.__pasoEjecutado(accion);
        break;
      case "FIN_TAREA":
        this.__finTarea(accion.tarea);
    }

  }

  __inicioTarea(tarea){

    if(this.informes[tarea.args.proceso])
      this.__iniciarInforme(tarea);

  }

  __finTarea(tarea){

    let informeParaId = this.__getInformeParaId(tarea.id);

    if(!informeParaId) return;

    informeParaId.cerrar(

      this.refProcesador.getProcesoEnEjecucion(tarea.id)

    )

    delete this.informesActivos[tarea.id];

  }

  __pasoEjecutado(accion){

    let informeParaId = this.__getInformeParaId(accion.id);

    if(!informeParaId) return;
    
    informeParaId.pasoEjecutado(

      accion.proceso, 

      accion.paso, 

      this.refProcesador.getProcesoEnEjecucion(accion.id)
    );
  }

  __getInformeParaId(id){

    let ids = Object.keys(this.informesActivos);

    if(ids.length === 0) 
      return false;

    for(let i = 0; i < ids.length; i++){
      if(id.indexOf(ids[i]) !== -1) 
        return this.informesActivos[ids[i]];
    }

    return false;
  }

  __iniciarInforme(tarea){

    let informe = new this.informes[tarea.args.proceso](tarea);

    this.informesActivos[informe.id()] = informe;   

  }


}
