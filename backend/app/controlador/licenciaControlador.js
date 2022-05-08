const licenciaModelo = require('../modelo/licenciaModelo');

function ultimaLicencia(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined){

                var resultado = await licenciaModelo.ultimaLicencia(id_empresa);
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
    ultimaLicencia
}