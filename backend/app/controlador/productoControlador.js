const productoModelo = require('../modelo/productoModelo');
const path = require('path');
const fs = require('fs')

// ------------> INSERT
function agregarProducto(codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(codigo_barra_qr !== undefined && codigo !== undefined && id_producto_grupo !== undefined && nombre !== undefined && descripcion !== undefined ){
                const id_generado_producto = Date.now();
                var resultado = await productoModelo.agregarProducto(id_generado_producto, codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa);
                const id_generado = Date.now();
                await productoModelo.agregarProductoMedida(id_generado, id_generado_producto, "1", "Unidad", "1", "0", "0", "0", "0", "1");
                resultado["id_producto"] = id_generado_producto;
                
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

function agregarProductoGrupo(grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(grupo !== undefined && descripcion !== undefined && imagen !== undefined && estado !== undefined && id_marca !== undefined ){
                const id_generado_producto_grupo = Date.now();
                var resultado = await productoModelo.agregarProductoGrupo(id_generado_producto_grupo, grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa);
                resultado["id_producto_grupo"] = id_generado_producto_grupo;
                
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

function agregarProductoMedida(id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto !== undefined && unidad !== undefined && medida !== undefined && rango !== undefined ){
                const id_generado_producto_medida = Date.now();
                var resultado = await productoModelo.agregarProductoMedida(id_generado_producto_medida, id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado);
                resultado["id_producto_medida"] = id_generado_producto_medida;
                
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

function agregarImagenById(imagen,id){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                const id_generado = Date.now();
                let nombre_imagen = id+"-"+id_generado+".jpg"
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'productos', nombre_imagen),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{

                        var producto = await productoModelo.productoById(id);
                        if(producto[0]["imagen"] != ""){
                            producto[0]["imagen"] = producto[0]["imagen"] + "," + nombre_imagen;
                        }else{
                            producto[0]["imagen"] = nombre_imagen;
                        }
                        
                        var resultado = await productoModelo.actualizarImagenById(producto[0]["imagen"], id);
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

function eliminarImagenById(imagen, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && imagen !== undefined){

                var producto = await productoModelo.productoById(id);
                var arrayImagenes = producto[0]["imagen"].split(",");
                let imagenes = "";
                for(i=0;i<arrayImagenes.length;i++){
                    if(arrayImagenes[i] != imagen){
                        imagenes = imagenes + arrayImagenes[i];

                        if((i+1) < arrayImagenes.length){
                            imagenes = imagenes + ",";
                        }
                    }else{
                        fs.unlink(path.join(__dirname, '..', 'imagenes', 'productos', imagen), (err) => { if(err) throw err;});
                    }
                }
                var resultado = await productoModelo.actualizarImagenById(imagenes, id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function actualizarProductoGrupoById(nombre, descripcion, id_categoria, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarProductoGrupoById(nombre, descripcion, id_categoria, id);
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

function actualizarProductoById(codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(codigo !== undefined && id_producto_grupo !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarProductoById(codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, id);
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

function actualizarImagenGrupoById(imagen,id){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                const id_generado = Date.now();
                let nombre_imagen = id+"-"+id_generado+".jpg"
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'productos', nombre_imagen),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{
                        var producto = await productoModelo.productoGrupoById(id);
                        if(producto[0]["imagen"] != "sin_imagen_grupo_producto.jpg" ){
                            fs.unlink(path.join(__dirname, '..', 'imagenes', 'productos', producto[0]["imagen"]), (err) => { if(err) throw err;});
                        }
                        var resultado = await productoModelo.actualizarImagenGrupoById(nombre_imagen, id);
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

function listaProductoByGrupoEmpresa(id_producto_grupo, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_grupo !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoByGrupoEmpresa(id_producto_grupo, estado, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoGrupoByMarcaEmpresa(id_marca, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_marca !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoGrupoByMarcaEmpresa(id_marca, estado, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaMedidaByProductoEstado(id_producto, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto !== undefined && estado !== undefined){

                var resultado = await productoModelo.listaMedidaByProductoEstado(id_producto, estado);
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












































function agregarProductoEmpresa(id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_producto !== undefined && id_empresa !== undefined &&
                codigo !== undefined && id_categoria !== undefined && imagenes !== undefined && descripcion !== undefined){

                var resultado = await productoModelo.agregarProductoEmpresa(id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion,1);
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
// ------------> UPDATE
function actualizarDatosProducto(codigo_barra_qr,codigo,nombre,descripcion,id_marca,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(codigo_barra_qr !== undefined && codigo !== undefined && nombre !== undefined && 
                descripcion !== undefined && id_marca !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarDatosProducto(codigo_barra_qr,codigo,nombre,descripcion,id_marca,id);
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

function actualizarEstadoByIdProducto(estado,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarEstadoByIdProducto(estado,id);
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

function actualizarDatosProductoMedida(id_producto,unidad,medida,rango,presentacion,imagen,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto !== undefined && unidad !== undefined && medida !== undefined && 
                rango !== undefined && presentacion !== undefined && imagen !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarDatosProductoMedida(id_producto,unidad,medida,rango,presentacion,imagen,id);
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

function actualizarEstadoByIdProductoMedida(estado,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarEstadoByIdProductoMedida(estado,id);
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

function actualizarDatosProductoEmpresa(id_producto,codigo,id_categoria,imagenes,descripcion,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto !== undefined && codigo !== undefined && id_categoria !== undefined && 
                imagenes !== undefined && descripcion !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarDatosProductoEmpresa(id_producto,codigo,id_categoria,imagenes,descripcion,id_empresa,id);
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
function actualizarEstadoByIdProductoEmpresa(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await productoModelo.actualizarEstadoByIdProductoEmpresa(estado,id_empresa,id);
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




// ------------> DELETE

// ------------> SELEC

function productoById(id_producto){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto !== undefined){

                var resultado = await productoModelo.productoById(id_producto);
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

function productoGrupoById(id_producto_grupo){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_grupo !== undefined){

                var resultado = await productoModelo.productoGrupoById(id_producto_grupo);
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

function listaProductoByEstado(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){

                var resultado = await productoModelo.listaProductoByEstado(estado);
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

function listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo ,estado_producto,estado,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_grupo !== undefined && estado_producto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo ,estado_producto,estado,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo,estado_producto,estado,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto_grupo !== undefined && estado_producto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo,estado_producto,estado,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_marca !== undefined && estado_producto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}
function listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_marca !== undefined && estado_producto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_marca !== undefined && estado_producto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_marca !== undefined && estado_producto !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa(id_marca,estado_producto,estado,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}

function listaProductoEmpresaVistaSencillaByIdEmpresa(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoEmpresaVistaSencillaByIdEmpresa(id_empresa);
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
function listaProductoGrupoByCategoriaEmpresa(id_categoria, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_categoria !== undefined && id_empresa !== undefined){

                var resultado = await productoModelo.listaProductoGrupoByCategoriaEmpresa(id_categoria, estado, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log("error", error)
            return resolved({"mysql":error});
        }
    })
}
//export
module.exports = {
    agregarProducto,
    agregarProductoGrupo,
    agregarProductoMedida,
    agregarImagenById,
    eliminarImagenById,
    actualizarProductoById,
    actualizarImagenGrupoById,
    listaProductoByGrupoEmpresa,
    listaProductoGrupoByMarcaEmpresa,
    listaMedidaByProductoEstado,
    listaProductoGrupoByCategoriaEmpresa,











    
    agregarProductoEmpresa,

    actualizarDatosProducto,
    actualizarEstadoByIdProducto,
    actualizarDatosProductoMedida,
    actualizarEstadoByIdProductoMedida,
    actualizarDatosProductoEmpresa,
    actualizarProductoGrupoById,
    actualizarEstadoByIdProductoEmpresa,
    
    productoById,
    productoGrupoById,
    listaProductoByEstado,
    listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa,
    listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa,
    listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa,
    listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoEmpresaVistaSencillaByIdEmpresa
}