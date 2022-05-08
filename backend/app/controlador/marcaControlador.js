const fs = require('fs')
const marcaModelo = require('../modelo/marcaModelo');
const path = require('path');

// ------------> INSERT
function agregarMarca(nombre, descripcion, imagen, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && descripcion !== undefined && imagen !== undefined){
                const id_generado_marca = Date.now();
                var resultado = await marcaModelo.agregarMarca(id_generado_marca, nombre, descripcion, imagen, estado, id_empresa);
                resultado["id_marca"] = id_generado_marca;

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
function actualizarImagenById(imagen,id){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'marcas', imagen.name),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{
                        var marca = await marcaModelo.marcaById(id);
                        if(marca[0]["imagen"] != "sin_imagen_marca.jpg" ){
                            fs.unlink(path.join(__dirname, '..', 'imagenes', 'marcas', marca[0]["imagen"]), (err) => { if(err) throw err;});
                        }
                        var resultado = await marcaModelo.actualizarImagenById(imagen.name, id);
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
            return resolved({"mysql":error});
        }
    })
}

function actualizarDatosById(nombre, descripcion, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && descripcion !== undefined && id !== undefined){

                var resultado = await marcaModelo.actualizarDatosById(nombre, descripcion, id);
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

function actualizarEstadoByIdMarca(estado,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id !== undefined){

                var resultado = await marcaModelo.actualizarEstadoByIdMarca(estado,id);
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
function marcaById(id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){

                var resultado = await marcaModelo.marcaById(id);
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

function listaMarcaByEstado(estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var resultado = await marcaModelo.listaMarcaByEstado(estado, id_empresa);
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
    agregarMarca,
    actualizarImagenById,
    actualizarDatosById,
    actualizarEstadoByIdMarca,
    marcaById,
    listaMarcaByEstado
}