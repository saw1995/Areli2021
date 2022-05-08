const departamentoModelo = require('../modelo/departamentoModelo');

// ------------> SELECT
function listaDepartamentoByEstado(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){

                var resultado = await departamentoModelo.listaDepartamentoByEstado(estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaProvinciasByDepartamentoEstado(departamento,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(departamento !== undefined && estado !== undefined){

                var resultado = await departamentoModelo.listaProvinciasByDepartamentoEstado(departamento,estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaMunicipiosByDepartamentoProvinciaEstado(departamento,provincia,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(departamento !== undefined && provincia !== undefined && estado !== undefined){

                var resultado = await departamentoModelo.listaMunicipiosByDepartamentoProvinciaEstado(departamento,provincia,estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
//export
module.exports = {
    listaDepartamentoByEstado,
    listaProvinciasByDepartamentoEstado,
    listaMunicipiosByDepartamentoProvinciaEstado
}