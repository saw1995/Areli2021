const tiendaModelo = require('../modelo/tiendaModelo');
const rutaModelo = require('../modelo/rutaModelo');
const fs = require('fs')
const path = require('path');
var dateTime = require('node-datetime');
var pointInPolygon = require('point-in-polygon');

// ------------> INSERT
function agregarTiendaAreliShop(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_tipo_tienda !== undefined && nombre !== undefined && id_departamento !== undefined && zona !== undefined && avenida !== undefined && calle !== undefined && numero !== undefined && referencia !== undefined && nit !== undefined && razon_social !== undefined && telefono !== undefined && usuario !== undefined && pass !== undefined){

                var resultado = await tiendaModelo.agregarTiendaAreliShop(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass);

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

function agregarTienda(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto,
     celular_contacto, latitud, longitud, foto, estado, id_tienda_categoria, id_empresa, usuario, pass){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tipo_tienda !== undefined && nombre !== undefined &&  id_departamento !== undefined && zona !== undefined &&
                avenida !== undefined && calle !== undefined && numero !== undefined && referencia !== undefined && 
                nit !== undefined && razon_social !== undefined && email !== undefined && telefono !== undefined && 
                nombre_contacto !== undefined && celular_contacto !== undefined && latitud !== undefined && longitud !== undefined &&
                foto !== undefined && estado !== undefined && id_tienda_categoria !== undefined && id_empresa !== undefined &&
                usuario !== undefined && pass !== undefined ){

                const id_generado_tienda = Date.now();
                var resultado = await tiendaModelo.agregarTienda(id_generado_tienda, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass);
                resultado["id_tienda"] = id_generado_tienda;

                var ruta = await rutaModelo.listaRutaByEstadoEmpresa("1", id_empresa);
                var swRuta = true;

                for(i=0; i<ruta.length;i++){
                    var limite = await rutaModelo.listaRutaLimiteByRuta(ruta[i]["id"], id_empresa);

                    if(limite.length > 0){
                        var points = [];
                        for(j=0;j<limite.length;j++){
                            var coordenadas = [];
                            coordenadas[0] = parseFloat(limite[j]["latitud"]);
                            coordenadas[1] = parseFloat(limite[j]["longitud"]);
                            points[j] = coordenadas;
                        }
                        var verificador = await pointInPolygon([parseFloat(latitud), parseFloat(longitud)], points)
                        if(verificador == true){
                            await tiendaModelo.agregarTiendaEmpresa(Date.now(), id_generado_tienda, id_tienda_categoria, ruta[i]["id"], id_empresa);
                            swRuta = false;
                            break;
                        }
                    }
                }

                if(swRuta == true){
                    await tiendaModelo.agregarTiendaEmpresa(Date.now(), id_generado_tienda, id_tienda_categoria, "1", id_empresa);
                }

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

function agregarTiendaCategoria(nombre, detalle, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && detalle !== undefined && estado !== undefined && id_empresa !== undefined){
                const id_generado_cateoria_tienda = Date.now();
                var resultado = await tiendaModelo.agregarTiendaCategoria(id_generado_cateoria_tienda, nombre, detalle, estado, id_empresa);
                resultado["id_categoria_tienda"] = id_generado_cateoria_tienda;
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

function agregarTiendaVisita(id_tienda_empresa, id_tienda_estado, detalle, id_usuario, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda_empresa !== undefined && id_tienda_estado !== undefined && detalle !== undefined  && id_usuario !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

                var resultado = await tiendaModelo.agregarTiendaVisita(id_generado, id_tienda_empresa, id_tienda_estado, detalle, fecha, hora, id_usuario, estado, id_empresa);
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

function agregarTiendaEmpresa(id_tienda, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                var categoria = await tiendaModelo.listaTiendaCategoriaByEstado("1", id_empresa);
                var resultado = await tiendaModelo.agregarTiendaEmpresa(id_generado, id_tienda, categoria[0]["id"], "1", id_empresa);
                resultado["id_tienda_empresa"] = id_generado
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

function agregarTiendaCategoriaRol(id_tienda_categoria, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda_categoria !== undefined && id_rol !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                var resultado = await tiendaModelo.agregarTiendaCategoriaRol(id_generado, id_tienda_categoria, id_rol, id_empresa);
                resultado["id_tienda_rol"] = id_generado;
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
function actualizarTiendaById(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tipo_tienda !== undefined && nombre !== undefined && id_departamento !== undefined && zona !== undefined && latitud !== undefined && longitud !== undefined && id !== undefined){

                var resultado = await tiendaModelo.actualizarTiendaById(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id);
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

function actualizarTiendaEmpresaById(new_tienda_categoria, new_ruta, id_tienda, id_tienda_categoria, id_ruta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(new_tienda_categoria !== undefined && new_ruta !== undefined && id_tienda !== undefined && id_tienda_categoria !== undefined && id_ruta !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.actualizarTiendaEmpresaById(new_tienda_categoria, new_ruta, id_tienda, id_tienda_categoria, id_ruta, id_empresa);
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

function actualizarImagenById(imagen,id){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'tiendas', imagen.name),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{
                        var tienda = await tiendaModelo.tiendaById(id);
                        if(tienda[0]["foto"] != "sin_imagen_tienda.jpg" ){
                            fs.unlink(path.join(__dirname, '..', 'imagenes', 'tiendas', tienda[0]["foto"]), (err) => { if(err) throw err;});
                        }
                        var resultado = await tiendaModelo.actualizarImagenById(imagen.name, id);
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

function actualizarTiendaCategoriaById(nombre, detalle, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && nombre !== undefined && detalle !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.actualizarTiendaCategoriaById(nombre, detalle, id, id_empresa);
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

function actualizarEstadoById(estado, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.actualizarEstadoById(estado, id, id_empresa);
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

function actualizarDatosContactoById(id_tipo_tienda, nombre, email, telefono, nombre_contacto, celular_contacto, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tipo_tienda !== undefined && nombre !== undefined && email !== undefined && telefono !== undefined && id !== undefined){

                var resultado = await tiendaModelo.actualizarDatosContactoById(id_tipo_tienda, nombre, email, telefono, nombre_contacto, celular_contacto, id);
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

function actualizarUbicacionById(id_departamento, zona, avenida, calle, numero, referencia, latitud, longitud, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_departamento !== undefined && zona !== undefined && avenida !== undefined && calle !== undefined && id !== undefined){

                var resultado = await tiendaModelo.actualizarUbicacionById(id_departamento, zona, avenida, calle, numero, referencia, latitud, longitud, id);
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

function actualizarNitRazonSocialById(nit, razon_social, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nit !== undefined && razon_social !== undefined && id !== undefined){

                var resultado = await tiendaModelo.actualizarNitRazonSocialById(nit, razon_social, id);
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

function actualizarPassByTienda(pass, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(pass !== undefined && id !== undefined){

                var resultado = await tiendaModelo.actualizarPassByTienda(pass, id);
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

function eliminarTiendaCategoriaRolById(id_tienda_categoria, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda_categoria !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.eliminarTiendaCategoriaRolById(id_tienda_categoria, id_rol, id_empresa);
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

function agregarLogin(id, id_tienda, plataforma, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_tienda !== undefined && plataforma !== undefined){
                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

                var resultado = await tiendaModelo.agregarLogin(id, id_tienda, plataforma, fecha, hora, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado);
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

function salirLogin(latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){
                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

                var resultado = await tiendaModelo.salirLogin(fecha, hora, latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id);
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
// ------------> SELECT

function tiendaById(id_tienda){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined){

                var resultado = await tiendaModelo.tiendaById(id_tienda);
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

function tiendaEmpresaById(id_tienda_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda_empresa !== undefined){

                var resultado = await tiendaModelo.tiendaEmpresaById(id_tienda_empresa);
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

function tiendaByUsuarioPass(usuario, pass){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(usuario !== undefined && pass !== undefined){

                var resultado = await tiendaModelo.tiendaByUsuarioPass(usuario, pass);
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

function tiendaLoginByTiendaPlataforma(id_tienda, plataforma){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && plataforma !== undefined){

                var resultado = await tiendaModelo.tiendaLoginByTiendaPlataforma(id_tienda, plataforma);
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

function listaTiendaEmpresaByEstadoCategoriaRutaEmpresa(estado, id_tienda_categoria, id_ruta, id_empresa, fecha){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var tiendas = await tiendaModelo.listaTiendaEmpresaByEstadoCategoriaRutaEmpresa(estado, id_tienda_categoria, id_ruta, id_empresa);
                var visitas = await tiendaModelo.listaTiendaVisitaByCategoriaRutaEmpresaFecha(id_tienda_categoria, id_ruta, id_empresa, fecha);
                
                for(i=0;i<tiendas.length;i++){
                    tiendas[i]["id_tienda_visita"] = "0";
                    tiendas[i]["tipo_visita"] = "0";
                    tiendas[i]["fecha_visita"] = "0000-00-00";
                    tiendas[i]["hora_visita"] = "00:00:00";
                    tiendas[i]["nombre_visita"] = "No se realizo la visita";
                    tiendas[i]["detalle_visita"] = "";
                    tiendas[i]["observacion_visita"] = "";
                    tiendas[i]["usuario_visita"] = "";

                    for(j=0;j<visitas.length;j++){
                        if(tiendas[i]["id_tienda_empresa"] == visitas[j]["id_tienda_empresa"]){
                            tiendas[i]["id_tienda_visita"] = visitas[j]["id_tienda_visita"];
                            tiendas[i]["tipo_visita"] = visitas[j]["tipo"];
                            tiendas[i]["fecha_visita"] = visitas[j]["fecha"];
                            tiendas[i]["hora_visita"] = visitas[j]["hora"];
                            tiendas[i]["nombre_visita"] = visitas[j]["nombre"];
                            tiendas[i]["detalle_visita"] = visitas[j]["detalle"];
                            tiendas[i]["observacion_visita"] = visitas[j]["observacion"];
                            tiendas[i]["usuario_visita"] = visitas[j]["usuario"];
                            break;
                        }
                    }
                }

                if(tiendas.length == 0){
                    tiendas = [];
                }
                respuesta = {"datos":tiendas}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaTiendaEmpresaByEstadoEmpresa(estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.listaTiendaEmpresaByEstadoEmpresa(estado, id_empresa);
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

function listaTiendaEmpresaRutaByUsuarioEmpresa(estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.listaTiendaEmpresaRutaByUsuarioEmpresa(estado, id_usuario, id_empresa);
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

function listaTiendaEmpresaByEstadoCategoriaRuta(estado, id_categoria, id_ruta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_categoria !== undefined && id_ruta !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.listaTiendaEmpresaByEstadoCategoriaRuta(estado, id_categoria, id_ruta, id_empresa);
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

function listaTipoTiendaByEstado(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){

                var resultado = await tiendaModelo.listaTipoTiendaByEstado(estado);
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

function listaTiendaEstadoByEstadoTipo(estado, tipo){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && tipo !== undefined){

                var resultado = await tiendaModelo.listaTiendaEstadoByEstadoTipo(estado, tipo);
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

function listaTiendaCategoriaByEstado(estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.listaTiendaCategoriaByEstado(estado, id_empresa);
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


function listaCategoriaTiendaRolByRol(estado, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.listaCategoriaTiendaRolByRol(estado, id_rol, id_empresa);
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

function listaCategoriaTiendaRolNoRegistradoByRol(estado, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_rol !== undefined && id_empresa !== undefined){
                var resultado = await tiendaModelo.listaCategoriaTiendaRolNoRegistradoByRol(estado, id_rol, id_empresa);
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


function listaTiendaNoRutaByEmpresaEstado(id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined){

                var resultado = await tiendaModelo.listaTiendaNoRutaByEmpresaEstado(id_empresa, estado);
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

function listaTiendaNoRutaByEmpresaEstadoBuscar(id_empresa, estado, palabra){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined && palabra !== undefined){

                var resultado = await tiendaModelo.listaTiendaNoRutaByEmpresaEstadoBuscar(id_empresa, estado, palabra);
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

function listaTiendaEmpresaByEmpresaEstado(id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined){

                var resultado = await tiendaModelo.listaTiendaEmpresaByEmpresaEstado(id_empresa, estado);
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

function tiendaEmpresaByTiendaEmpresa(id_tienda, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined && id_empresa !== undefined){

                var resultado = await tiendaModelo.tiendaEmpresaByTiendaEmpresa(id_tienda, id_empresa);
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

function usuarioTiendaByUsuario(usuario){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(usuario !== undefined){

                var resultado = await tiendaModelo.usuarioTiendaByUsuario(usuario);
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
    agregarTienda,
    agregarTiendaEmpresa,
    agregarTiendaAreliShop,
    agregarTiendaCategoria,
    agregarTiendaVisita,
    agregarTiendaCategoriaRol,
    agregarLogin,
    salirLogin,
    actualizarTiendaById,
    actualizarTiendaEmpresaById,
    actualizarImagenById,
    actualizarTiendaCategoriaById,
    actualizarEstadoById,
    actualizarUbicacionById,
    actualizarDatosContactoById,
    actualizarNitRazonSocialById,
    actualizarPassByTienda,
    eliminarTiendaCategoriaRolById,
    tiendaById,
    tiendaEmpresaById,
    tiendaByUsuarioPass,
    tiendaLoginByTiendaPlataforma,
    listaTiendaEmpresaRutaByUsuarioEmpresa,
    listaTiendaEmpresaByEstadoCategoriaRuta,
    listaTiendaEmpresaByEstadoCategoriaRutaEmpresa,
    listaTiendaEmpresaByEstadoEmpresa,
    listaTipoTiendaByEstado,
    listaTiendaEstadoByEstadoTipo,
    listaTiendaCategoriaByEstado,
    listaCategoriaTiendaRolByRol,
    listaCategoriaTiendaRolNoRegistradoByRol,
    listaTiendaNoRutaByEmpresaEstado,
    listaTiendaNoRutaByEmpresaEstadoBuscar,
    listaTiendaEmpresaByEmpresaEstado,
    tiendaEmpresaByTiendaEmpresa,
    usuarioTiendaByUsuario
}