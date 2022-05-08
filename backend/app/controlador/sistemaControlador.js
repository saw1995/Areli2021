const sistemaModelo = require('../modelo/sistemaModelo');

function version(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}

            var resultado = await sistemaModelo.version();
            if(resultado.length == 0){
                resultado = [];
            }
            respuesta = {"datos":resultado}

            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function versionAreliShop(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}

            var resultado = await sistemaModelo.versionAreliShop();
            if(resultado.length == 0){
                resultado = [];
            }
            respuesta = {"datos":resultado}

            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

//export
module.exports = {
    version,
    versionAreliShop
}