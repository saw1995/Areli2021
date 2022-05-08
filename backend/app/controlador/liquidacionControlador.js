const fs = require('fs')
const liquidacionModelo = require('../modelo/liquidacionModelo');
const path = require('path');
var dateTime = require('node-datetime');
const usuarioModelo = require('../modelo/usuarioModelo');
// ------------> INSERT
function agregarLiquidacion(id_sucursal, id_usuario_cuenta, id_usuario, observacion,  
    corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, 
    corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, 
    total, sobrante, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_usuario_cuenta !== undefined && id_usuario !== undefined && observacion !== undefined &&
                corte_centavo_10 !== undefined && corte_centavo_20 !== undefined && corte_centavo_50 !== undefined && corte_boliviano_1!== undefined &&
                corte_boliviano_2 !== undefined && corte_boliviano_5 !== undefined &&
                corte_boliviano_10 !== undefined && corte_boliviano_20 !== undefined && corte_boliviano_50 !== undefined &&
                corte_boliviano_100!== undefined && corte_boliviano_200 !== undefined &&
                total!== undefined && sobrante !== undefined && id_empresa !== undefined){

                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

                const id_generado = Date.now();

                var resultado = await liquidacionModelo.agregarLiquidacion(id_generado, id_sucursal, id_usuario_cuenta, id_usuario, fecha, hora, observacion,  
                corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, 
                corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, 
                total, sobrante, 1, id_empresa);

                resultado["id_liquidacion"] = id_generado;

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

function actualizarLiquidacionPagoSobrante(id_liquidacion, sobrante, nro_carga, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_liquidacion !== undefined && sobrante !== undefined  && nro_carga !== undefined && id_empresa !== undefined){
                 
                var listaDetalle = await liquidacionModelo.listaDetallePreventaByCargaParaLiquidacion(nro_carga, id_empresa);
                
                for(let i = 0; i<= listaDetalle.length - 1;i++){
                    if(listaDetalle[i].total_descuento <= sobrante){
                        await liquidacionModelo.actualizarPreventaDetalleLiquidacion(1, listaDetalle[i].id);
                        sobrante = sobrante - listaDetalle[i].total_descuento;
                    }
                }
                
                var resultado = await liquidacionModelo.actualizarLiquidacionPagoSobrante(sobrante, id_liquidacion);

                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarLiquidacionItemProducto(id_liquidacion, sobrante, id_preventa_detalle){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_liquidacion !== undefined && sobrante !== undefined  && id_preventa_detalle !== undefined){
                
                var resultado = await liquidacionModelo.actualizarLiquidacionPagoSobrante(sobrante, id_liquidacion);

                if(resultado.affectedRows==1){
                    await liquidacionModelo.actualizarPreventaDetalleLiquidacion(1, id_preventa_detalle);
                }

                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaLiquidacionGeneralByIdSucursal(id_sucursal, estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && estado !== undefined && id_usuario_cuenta !== undefined &&
                id_usuario !== undefined && fecha_inicio !== undefined && fecha_fin !== undefined && id_empresa !== undefined){
                 
                var usuario;

                if(id_usuario == "0" || id_usuario_cuenta == "0"){
                    usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                }
                
                if(id_usuario == "0"){
                    id_usuario = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                if(id_usuario_cuenta == "0"){
                    id_usuario_cuenta = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario_cuenta = id_usuario_cuenta + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario_cuenta = id_usuario_cuenta + ",";
                        }
                    }
                }else{
                    id_usuario_cuenta = "'" + id_usuario_cuenta + "'";
                }            
                
                var resultado = await liquidacionModelo.listaLiquidacionGeneralByIdSucursal(id_sucursal, estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa);
                
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaLiquidacionGeneralByIdUsuario(estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_usuario_cuenta !== undefined &&
                id_usuario !== undefined && fecha_inicio !== undefined && fecha_fin !== undefined && id_empresa !== undefined){
                 
                var usuario;

                if(id_usuario == "0" || id_usuario_cuenta == "0"){
                    usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                }
                
                if(id_usuario == "0"){
                    id_usuario = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }

                if(id_usuario_cuenta == "0"){
                    id_usuario_cuenta = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario_cuenta = id_usuario_cuenta + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario_cuenta = id_usuario_cuenta + ",";
                        }
                    }
                }else{
                    id_usuario_cuenta = "'" + id_usuario_cuenta + "'";
                }            
                
                var resultado = await liquidacionModelo.listaLiquidacionGeneralByIdUsuario(estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa);
                
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaPreventaProductosByCargaParaLiquidacion(nro_carga, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nro_carga !== undefined && estado !== undefined && id_empresa !== undefined){
            
                var resultado = await liquidacionModelo.listaPreventaProductosByCargaParaLiquidacion(nro_carga, estado, id_empresa);
                
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaCargaTotalMontosParaLiquidacion(id_usuario, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && estado !== undefined && id_empresa !== undefined){
            
                var resultado = await liquidacionModelo.listaCargaTotalMontosParaLiquidacion(id_usuario, estado, id_empresa);
                
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
    agregarLiquidacion,
    actualizarLiquidacionPagoSobrante,
    actualizarLiquidacionItemProducto,
    listaLiquidacionGeneralByIdSucursal,
    listaLiquidacionGeneralByIdUsuario,
    listaPreventaProductosByCargaParaLiquidacion,
    listaCargaTotalMontosParaLiquidacion,
    
}