const promocionModelo = require('../modelo/promocionModelo');
const path = require('path');
const fs = require('fs')

var dateTime = require('node-datetime');

// ------------> SELECT
function agregarPromocion(id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, id_empresa, id_usuario){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && nombre !== undefined && descripcion !== undefined && precio !== undefined && imagen !== undefined &&
                fecha_inicio!== undefined && fecha_limite !== undefined && cantidad_limite !== undefined && id_empresa!== undefined && id_usuario !== undefined){
                
                const id_generado = Date.now();

                var resultado = await promocionModelo.agregarPromocion(id_generado, id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, 1, id_empresa, id_usuario);
                resultado["id_promocion"] = id_generado;
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function agregarPromocionProductoEmpresa(id_promocion, id_producto, precio, cantidad, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_promocion !== undefined && id_producto !== undefined && precio !== undefined && cantidad !== undefined && id_empresa !== undefined){

                const id_generado = Date.now();

                var resultado = await promocionModelo.agregarPromocionProductoEmpresa(id_generado, id_promocion, id_producto, precio, cantidad, 1, id_empresa);

                resultado["id_promocion_detalle"] = id_generado;

                var detallePromocion = await promocionModelo.listaPromocionDetalleProductoByIdPromocion(id_promocion, "1");
                var total = 0.0;

                for(i=0;i<detallePromocion.length;i++){
                    total = parseFloat(total) + (parseFloat(detallePromocion[i]["precio"]) * parseInt(detallePromocion[i]["cantidad"]))
                }

                await promocionModelo.actualizarPrecioPromocionById(total, id_promocion);

                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function agregarImagenById(imagen,id){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                const id_generado = Date.now();
                let nombre_imagen = id+"-"+id_generado+".jpg"
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'promociones', nombre_imagen),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{

                        var promocion = await promocionModelo.promocionById(id);
                        if(promocion[0]["imagen"] != ""){
                            promocion[0]["imagen"] = promocion[0]["imagen"] + "," + nombre_imagen;
                        }else{
                            promocion[0]["imagen"] = nombre_imagen;
                        }
                        
                        var resultado = await promocionModelo.actualizarImagenById(promocion[0]["imagen"], id);
                        if(resultado.length == 0){
                            resultado = [];
                        }
                        respuesta = {"datos":resultado}
                    }
                    return resolved(respuesta)
                });
            }else{
                return resolved(respuesta)
            }
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaPromocionBySucursalByEstado(id_sucursal, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await promocionModelo.listaPromocionBySucursalByEstado(id_sucursal, estado, id_empresa);

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

function listaPromocionDetalleProductoByIdPromocion(id_promocion, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_promocion !== undefined && estado !== undefined ){

                var resultado = await promocionModelo.listaPromocionDetalleProductoByIdPromocion(id_promocion, estado);

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
    agregarPromocion,
    agregarPromocionProductoEmpresa,
    agregarImagenById,
    listaPromocionBySucursalByEstado,
    listaPromocionDetalleProductoByIdPromocion
}