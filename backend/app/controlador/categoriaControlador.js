const categoriaModelo = require('../modelo/categoriaModelo');
const historialModelo = require('../modelo/historialModelo');

const path = require('path');
const fs = require('fs');

var dateTime = require('node-datetime');

// ------------> INSERT
function agregarCategoria(nombre,descripcion,imagen,id_empresa,id_usuario,dispositivo,latitud,longitud){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && descripcion !== undefined && imagen !== undefined && id_empresa !== undefined && 
                id_usuario !== undefined && dispositivo !== undefined && latitud !== undefined && longitud !== undefined){

                const id_generado_categoria = Date.now();
                var resultado = await categoriaModelo.agregarCategoria(id_generado_categoria, nombre, descripcion, imagen, "1", id_empresa);

                resultado["id_categoria"] = id_generado_categoria;
                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');
                
                /*if(resultado["affectedRows"]>0)
                {
                    //insetarmos historial registro
                    //hr_registro: id,tipo,observacion,informacion,hora,fecha,latitud,longitud,dispositivo,id_empresa,id_usuario,id_modulo,modulo
                   var resHistorialRegistro = await historialModelo.agregarRegistroHistorial(
                       "IH"+id,"insert","(sin obs)","se agrega la categoria " + nombre,hora,fecha,latitud,longitud,dispositivo,id_empresa,id_usuario,id,"categoria");
                }*/

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
function actualizarImagenById(imagen, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'categorias', imagen.name),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{
                        var categoria = await categoriaModelo.categoriaById(id_empresa, id);
                        if(categoria[0]["imagen"] != "sin_imagen_categoria.jpg" ){
                            fs.unlink(path.join(__dirname, '..', 'imagenes', 'categorias', categoria[0]["imagen"]), (err) => { if(err) throw err;});
                        }
                        var resultado = await categoriaModelo.actualizarImagenById(imagen.name, id);
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

function actualizarCategoriaById(nombre, descripcion, id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if( nombre !== undefined && descripcion !== undefined && id_empresa !== undefined && id !== undefined ){

                var resultado = await categoriaModelo.actualizarCategoriaById(nombre, descripcion, id_empresa, id);

                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

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

function actualizarEstadoByIdCategoria(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await categoriaModelo.actualizarEstadoByIdCategoria(estado,id_empresa,id);
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

// ------------> SELECT

function categoriaById(id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id !== undefined){

                var resultado = await categoriaModelo.categoriaById(id_empresa, id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaCategoriaAleatorioProductoStockByEstado(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){

                var resultado = await categoriaModelo.listaCategoriaAleatorioProductoStockByEstado(estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaCategoriaProductoStockByAlmacenEmpresaEstado(id_almacen, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await categoriaModelo.listaCategoriaProductoStockByAlmacenEmpresaEstado(id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaCategoriaProductoStockCeroByAlmacenEmpresaEstado(id_almacen, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_empresa !== undefined && estado !== undefined){

                var resultado = await categoriaModelo.listaCategoriaProductoStockCeroByAlmacenEmpresaEstado(id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error);
            return resolved({"mysql":error});
        }
    })
}

function listaCategoriaByIdEmpresaByEstado(id_empresa,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined){

                var resultado = await categoriaModelo.listaCategoriaByIdEmpresaByEstado(id_empresa,estado);
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

function listaCategoriaProductoEmpresaByEstadoEmpresa(estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var resultado = await categoriaModelo.listaCategoriaProductoEmpresaByEstadoEmpresa(estado, id_empresa);
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
    agregarCategoria,
    actualizarImagenById,
    actualizarCategoriaById,
    actualizarEstadoByIdCategoria,
    categoriaById,
    listaCategoriaAleatorioProductoStockByEstado,
    listaCategoriaProductoStockByAlmacenEmpresaEstado,
    listaCategoriaProductoStockCeroByAlmacenEmpresaEstado,
    listaCategoriaByIdEmpresaByEstado,
    listaCategoriaProductoEmpresaByEstadoEmpresa
}