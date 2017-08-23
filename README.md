# catro-eixos-informe

Sistema de realización de informes (dumps) de procesado.

Permite la creación de un fichero que guarda espectros de ejecución de uno o varios procesos. 

*No altera la ejecución del proceso o procesos en los que esté basado*


## Empleo

Se crea un objeto informe con las partes de procesado que interesen:

```js
const {Informe} = require("catro-eixos-informe");

class MiInforme extends Informe{

    static ENTRADA(){
        return 'Familia.proceso_entrada'
    }

    //ejecución de un paso del informe
    Familia_proceso_entrada__pasoFoo(refProceso){
        this.agregar(`${en el paso foo "a" vale ${refProceso.a} `);
    }

}

```

Para emplear el informe, basta con vincularlo al proceso:

```js

const {InformesMiddleWare} = require("catro-eixos-informe");

InformesMiddleWare.aplicar(refProcesador, {

    rutaInformes: __dirname + "/carpeta_modulos_informes",
    salida: __dirname + "/ruta_almacenamiento_informes"

})

```

