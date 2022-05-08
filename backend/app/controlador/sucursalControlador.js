const sucursalModelo = require('../modelo/sucursalModelo');
const historialModelo = require('../modelo/historialModelo');

const path = require('path');
const fs = require('fs');

var dateTime = require('node-datetime');
// ------------> INSERT
function agregarSucursal(nombre, sitio_web, id_departamento, zona, avenida, calle, numero, referencia, latitud,
    longitud, telefono_uno, telefono_dos, telefono_tres, foto, id_empresa, id_rol, hr_id_usuario,hr_dispositivo,hr_latitud,hr_longitud){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && sitio_web !== undefined && id_departamento !== undefined &&
                zona !== undefined && avenida !== undefined && calle !== undefined && numero !== undefined &&
                referencia !== undefined && latitud !== undefined && longitud !== undefined && telefono_uno !== undefined && 
                telefono_dos !== undefined && telefono_tres !== undefined && foto !== undefined && id_empresa !== undefined &&
                hr_id_usuario !== undefined && hr_dispositivo !== undefined && hr_latitud !== undefined && hr_longitud !== undefined){

                var id_generado = Date.now();
                
                var resultado = await sucursalModelo.agregarSucursal(id_generado, nombre, sitio_web, id_departamento, zona, avenida, calle, numero, referencia, latitud,
                    longitud, telefono_uno, telefono_dos, telefono_tres, foto, "0", 1, id_empresa);

                    resultado["id_sucursal"] = id_generado;
                    
                    await sucursalModelo.agregarSucursalRol(id_generado, id_generado, id_rol, id_empresa);
                    var dt = dateTime.create();
                    fecha = dt.format('Y-m-d');
                    hora = dt.format('H:M:S');
                    
                    if(resultado.affectedRows=='1')
                    {
                        //insetarmos historial registro
                        //hr_registro: id,tipo,observacion,informacion,hora,fecha,latitud,longitud,dispositivo,id_empresa,id_usuario,id_modulo,modulo
                       /*var resHistorialRegistro = await historialModelo.agregarRegistroHistorial(
                           "IH"+id,"insert","(sin obs)","se agrega la categoria " + nombre,hora,fecha,hr_latitud,hr_longitud,hr_dispositivo,id_empresa,hr_id_usuario,id,"sucursal");*/

                        var semana = [{indice:1, dia:'Lunes'},{indice:2, dia:'Martes'},{indice:3, dia:'Miercoles'},{indice:4, dia:'Jueves'},{indice:5, dia:'Viernes'},{indice:6, dia:'Sabado'},{indice:7, dia:'Domingo'}];
                        for(let i = 0; i<= semana.length-1 ;i ++){
                            id_generado = parseFloat(id_generado + (i + 1));
                            await sucursalModelo.agregarHorarioSucursal(id_generado, resultado["id_sucursal"], semana[i].indice, semana[i].dia, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 1, fecha, hora, hr_id_usuario, id_empresa);
                        }
                        
                    }
    
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

function agregarSucursalRol(id_sucursal, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_rol !== undefined && id_empresa !== undefined){
                
                const id_generado = Date.now();

                var resultado = await sucursalModelo.agregarSucursalRol(id_generado, id_sucursal, id_rol, id_empresa);
                resultado['id_sucursal_rol'] = id_generado;
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


function agregarImagenServicioSucursal(imagen,id,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                let nombre_imagen = id+"-"+id_generado+".jpg"
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'sucursales', nombre_imagen),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{

                        var sucursal = await sucursalModelo.SucursalById(id_empresa, id);
                        if(sucursal[0]["imagen_servicio"] != ""){
                            sucursal[0]["imagen_servicio"] = sucursal[0]["imagen_servicio"] + "," + nombre_imagen;
                        }else{
                            sucursal[0]["imagen_servicio"] = nombre_imagen;
                        }
                        
                        var resultado = await sucursalModelo.actualizarImagenServiciosById(sucursal[0]["imagen_servicio"], id);
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

// ------------> UPDATE
function actualizarImagenById(imagen, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                const id_generado = Date.now();
                let nombre_imagen = id+"-"+id_generado+".jpg"
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'sucursales', nombre_imagen),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{
                        var sucursal = await sucursalModelo.SucursalById(id_empresa, id);
                        console.log(sucursal)
                        if(sucursal[0]["foto"] != "sin_imagen_sucursal.jpg" ){
                            fs.unlink(path.join(__dirname, '..', 'imagenes', 'sucursales', sucursal[0]["foto"]), (err) => { if(err) throw err;});
                        }
                        var resultado = await sucursalModelo.actualizarImagenById(nombre_imagen, id);
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

function actualizarDatosSucursal(nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud,
    longitud,telefono_uno,telefono_dos,telefono_tres,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && sitio_web !== undefined && id_departamento !== undefined &&
                zona !== undefined && avenida !== undefined && calle !== undefined && numero !== undefined &&
                referencia !== undefined && latitud !== undefined && longitud !== undefined && telefono_uno !== undefined && 
                telefono_dos !== undefined && telefono_tres !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await sucursalModelo.actualizarDatosSucursal(nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud,
                    longitud,telefono_uno,telefono_dos,telefono_tres,id_empresa,id);
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

function actualizarEstadoByIdSucursal(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await sucursalModelo.actualizarEstadoByIdSucursal(estado,id_empresa,id);
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

function actualizarAreliShopBySucursalEmpresa(areli_shop, id_sucursal, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(areli_shop !== undefined && id_sucursal !== undefined && id_empresa !== undefined){
                var resultado = await sucursalModelo.actualizarAreliShopBySucursalEmpresa(areli_shop, id_sucursal, id_empresa);
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

function actualizarHorarioSucursalById(hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, id_usuario, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(hora_inicio_uno !== undefined && hora_final_uno !== undefined && hora_inicio_dos !== undefined && hora_final_dos !== undefined && id_usuario !== undefined && id !== undefined){

                var dt = dateTime.create();
                fecha = dt.format('Y-m-d');
                hora = dt.format('H:M:S');

                var resultado = await sucursalModelo.actualizarHorarioSucursalById(hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, fecha, hora, id_usuario, id);
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

function actualizarInformacionServicioSucursal(info_servicio, id_sucursal, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(info_servicio !== undefined && id_sucursal !== undefined && id_empresa !== undefined){

                var resultado = await sucursalModelo.actualizarInformacionServicioSucursal(info_servicio, id_sucursal, id_empresa);
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
function eliminarSucursalRolById(id_sucursal, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await sucursalModelo.eliminarSucursalRolById(id_sucursal, id_rol, id_empresa);
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

function eliminarImagenById(imagen, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && imagen !== undefined && id_empresa !== undefined){

                var sucursal = await sucursalModelo.SucursalById(id_empresa,id);
                var arrayImagenes = sucursal[0]["imagen_servicio"].split(",");
                let imagenes = "";
                for(i=0;i<arrayImagenes.length;i++){
                    if(arrayImagenes[i] != imagen){
                        imagenes = imagenes + arrayImagenes[i];

                        if((i+1) < arrayImagenes.length){
                            imagenes = imagenes + ",";
                        }
                    }else{
                        fs.unlink(path.join(__dirname, '..', 'imagenes', 'sucursales', imagen), (err) => { if(err) throw err;});
                    }
                }
                var resultado = await sucursalModelo.actualizarImagenServiciosById(imagenes, id);
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
// ------------> SELECT
function listaSucursalByEmpresa(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined){

                var resultado = await sucursalModelo.listaSucursalByEmpresa(id_empresa);
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

function listaSucursalByIdEmpresaEstado(id_empresa,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined){

                var resultado = await sucursalModelo.listaSucursalByIdEmpresaEstado(id_empresa,estado);
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

function listaSucursalByEmpresaEstadoArelishop(id_empresa,estado, arelishop){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined && arelishop !== undefined){

                var resultado = await sucursalModelo.listaSucursalByEmpresaEstadoArelishop(id_empresa,estado, arelishop);
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


function SucursalById(id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id !== undefined){

                var resultado = await sucursalModelo.SucursalById(id_empresa, id);
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

function listaSucursalAlmacenVentaRolByRol(estado, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await sucursalModelo.listaSucursalAlmacenVentaRolByRol(estado, id_rol, id_empresa);
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

function listaSucursalRolByRol(estado, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await sucursalModelo.listaSucursalRolByRol(estado, id_rol, id_empresa);
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

function listaSucursalRolNoRegistradoByRol(estado, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await sucursalModelo.listaSucursalRolNoRegistradoByRol(estado, id_rol, id_empresa);
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

function listaHorarioSucursalByIdSucursal(id_sucursal, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await sucursalModelo.listaHorarioSucursalByIdSucursal(id_sucursal, estado, id_empresa);
                
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
    agregarSucursal,
    agregarSucursalRol,
    agregarImagenServicioSucursal,

    actualizarImagenById,
    actualizarDatosSucursal,
    actualizarEstadoByIdSucursal,
    actualizarAreliShopBySucursalEmpresa,
    actualizarHorarioSucursalById,
    actualizarInformacionServicioSucursal,

    eliminarSucursalRolById,
    eliminarImagenById,

    listaSucursalByEmpresa,
    listaSucursalByIdEmpresaEstado,
    listaSucursalByEmpresaEstadoArelishop,
    SucursalById,
    listaSucursalAlmacenVentaRolByRol,
    listaSucursalRolByRol,
    listaSucursalRolNoRegistradoByRol,
    listaHorarioSucursalByIdSucursal
}