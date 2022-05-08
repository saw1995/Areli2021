const descuentoModelo = require('../modelo/descuentoModelo');
var dateTime = require('node-datetime');

// ------------> SELECT
function agregarDescuentoTicket(id, nombre, id_sucursal, id_tienda_categoria, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){
                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

                var resultado = await descuentoModelo.agregarDescuentoTicket(id, nombre, id_sucursal, id_tienda_categoria, fecha, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa);
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

function agregarDescuentoCantidad(id_sucursal, id_producto_grupo, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_producto_grupo !== undefined && fecha_limite !== undefined && cantidad_inicio !== undefined && cantidad_limite !== undefined && precio !== undefined && porcentaje_descuento!== undefined && estado !== undefined && id_usuario !== undefined && id_empresa){
                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');
                const id_generado_descuento = Date.now();
                var resultado = await descuentoModelo.agregarDescuentoCantidad(id_generado_descuento, id_sucursal, id_producto_grupo, fecha, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa);
                resultado["id_descuento"] = id_generado_descuento
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

function actualizarEstadoDescuentoTicketById(estado, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){

                var resultado = await descuentoModelo.actualizarEstadoDescuentoTicketById(estado, id, id_empresa);
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

function actualizarEstadoDescuentoCantidadById(estado, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){

                var resultado = await descuentoModelo.actualizarEstadoDescuentoCantidadById(estado, id, id_empresa);
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

function descuentoTicketBySucursalCategoriaTiendaMonto(id_sucursal, id_tienda_categoria, monto, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_tienda_categoria !== undefined && monto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await descuentoModelo.descuentoTicketBySucursalCategoriaTiendaMonto(id_sucursal, id_tienda_categoria, monto, estado, id_empresa);
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

function descuentoCantidadBySucursalProductoCategoriaTiendaCantidad(id_sucursal, id_producto_empresa, id_tienda_categoria, cantidad, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_producto_empresa !== undefined && id_tienda_categoria !== undefined && cantidad !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await descuentoModelo.descuentoCantidadBySucursalProductoCategoriaTiendaCantidad(id_sucursal, id_producto_empresa, id_tienda_categoria, cantidad, estado, id_empresa);
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

function listaDescuentoCantidadAleatorioByEstado(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){

                var resultado = await descuentoModelo.listaDescuentoCantidadAleatorioByEstado(estado);
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

function listaDescuentoTicketBySucursal(id_sucursal, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){

                var resultado = await descuentoModelo.listaDescuentoTicketBySucursal(id_sucursal, id_empresa);
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

function listaDescuentoCantidadBySucursalProductoCategoria(id_sucursal, id_producto_empresa, id_tienda_categoria, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_producto_empresa !== undefined && id_tienda_categoria !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await descuentoModelo.listaDescuentoCantidadBySucursalProductoCategoria(id_sucursal, id_producto_empresa, id_tienda_categoria, estado, id_empresa);
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

function listaDescuentoCantidadBySucursalProductoGrupo(id_sucursal, id_producto_grupo, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_producto_grupo !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await descuentoModelo.listaDescuentoCantidadBySucursalProductoGrupo(id_sucursal, id_producto_grupo, estado, id_empresa);
                
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
    agregarDescuentoTicket,
    agregarDescuentoCantidad,
    actualizarEstadoDescuentoTicketById,
    actualizarEstadoDescuentoCantidadById,
    descuentoTicketBySucursalCategoriaTiendaMonto,
    descuentoCantidadBySucursalProductoCategoriaTiendaCantidad,
    listaDescuentoCantidadAleatorioByEstado,
    listaDescuentoTicketBySucursal,
    listaDescuentoCantidadBySucursalProductoCategoria,
    listaDescuentoCantidadBySucursalProductoGrupo
}