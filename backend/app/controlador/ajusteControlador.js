const ajusteModelo = require('../modelo/ajusteModelo');
var dateTime = require('node-datetime');

function agregarAjuste(ruta, stock, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(ruta !== undefined && stock !== undefined && id_usuario !== undefined && id_empresa !== undefined)
            {
                var dt = dateTime.create();
                const fecha = dt.format('Y-m-d');
                const hora = dt.format('H:M:S');

                const id_generado = Date.now();
                var resultado = await ajusteModelo.agregarAjuste(id_generado, ruta, stock, fecha, hora, id_usuario, id_empresa);
                resultado["id_ajuste"] = id_generado;

                if(resultado.length == 0){
                    resultado = [];
                }

                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}


function listaAjusteByEmpresa(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined)
            {
                var resultado = await ajusteModelo.listaAjusteByEmpresa(id_empresa);

                if(resultado.length == 0){
                    resultado = [];
                }

                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}

//export
module.exports = {
    agregarAjuste,
    listaAjusteByEmpresa
}