const rutaModelo = require('../modelo/rutaModelo');
const tiendaModelo = require('../modelo/tiendaModelo');
var pointInPolygon = require('point-in-polygon');
var dateTime = require('node-datetime');

// ------------> INSERT
function agregarRuta(nombre, descripcion, estado, id_empresa, id_usuario){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && descripcion !== undefined && estado !== undefined && id_empresa !== undefined && id_usuario !== undefined){

                const id_generado = Date.now();
                const id_generado_ruta = Date.now();
                var resultado = await rutaModelo.agregarRuta( id_generado_ruta, nombre, descripcion, estado, id_empresa);
                await rutaModelo.agregarRutaUsuario(id_generado, id_generado_ruta, id_usuario, id_empresa);
                resultado["id_ruta"] = id_generado_ruta;

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

function agergarTiendaEmpresaRuta(id_ruta, posicion, latitud, longitud, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined && posicion !== undefined && latitud !== undefined && longitud !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                var resultado = await rutaModelo.agregarRutaLimite(id_generado, id_ruta, posicion, latitud, longitud, id_empresa);

                var listaTiendas = await tiendaModelo.list
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

function agregarRutaLimite(id_ruta, posicion, latitud, longitud, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined && posicion !== undefined && latitud !== undefined && longitud !== undefined && id_empresa !== undefined){
                const id_generado = Date.now();
                var resultado = await rutaModelo.agregarRutaLimite(id_generado, id_ruta, posicion, latitud, longitud, id_empresa);
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

function agregarRutaUsuario(id_ruta, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                const id_generado = Date.now();
                var resultado = await rutaModelo.agregarRutaUsuario(id_generado, id_ruta, id_usuario, id_empresa);
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

function agregarRutaEntrega(id_ruta, numero_dia, dia){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined && numero_dia !== undefined && dia !== undefined){

                const id_generado = Date.now();
                var resultado = await rutaModelo.agregarRutaEntrega(id_generado, id_ruta, numero_dia, dia);
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

function agregarRutaEmpresaByTienda(id_tienda, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_tienda !== undefined){
                var tienda = await tiendaModelo.tiendaById(id_tienda);
                var ruta = await rutaModelo.listaRutaByEstadoEmpresa("1", id_empresa);
                var tienda_categoria = await tiendaModelo.listaTiendaCategoriaByEstado("1", id_empresa);
                var resultado = [];
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
                        var verificador = await pointInPolygon([parseFloat(tienda[0]["latitud"]), parseFloat(tienda[0]["longitud"])], points)
                        if(verificador == true){
                            var id = Date.now();
                            resultado = await tiendaModelo.agregarTiendaEmpresa(id, id_tienda, tienda_categoria[0]["id"], ruta[i]["id"], id_empresa);
                            swRuta = false;
                            break;
                        }
                    }
                }

                if(swRuta == true){
                    var id = Date.now();
                    resultado = await tiendaModelo.agregarTiendaEmpresa(id, id_tienda, tienda_categoria[0]["id"], "1", id_empresa);
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

function eliminarRutaUsuarioById(id_ruta, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.eliminarRutaUsuarioById(id_ruta, id_usuario, id_empresa);
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

function eliminarRutaEntregaById(id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){

                var resultado = await rutaModelo.eliminarRutaEntregaById(id);
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

function listaRutaLimiteByRuta(id_ruta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaRutaLimiteByRuta(id_ruta, id_empresa);
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

function listaRutaLimiteByEstadoEmpresa(estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaRutaLimiteByEstadoEmpresa(estado, id_empresa);
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

function listaRutaByEstadoEmpresa(estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaRutaByEstadoEmpresa(estado, id_empresa);
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

function listaRutaUsuarioByUsuario(estado, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaRutaUsuarioByUsuario(estado, id_usuario, id_empresa);
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

function listaRutaUsuarioNoRegistradoByUsuario(estado, id_ruta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_ruta !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaRutaUsuarioNoRegistradoByUsuario(estado, id_ruta, id_empresa);
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

function listaRutaUsuarioByRuta(estado, id_ruta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_ruta !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaRutaUsuarioByRuta(estado, id_ruta, id_empresa);
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

function listaCargaRutaByFechaUsuario(fecha, id_usuario, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(fecha !== undefined && id_usuario !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await rutaModelo.listaCargaRutaByFechaUsuario(fecha, id_usuario, estado, id_empresa);
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

function listaRutaEntregaByRuta(id_ruta){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_ruta !== undefined){

                var dia = await rutaModelo.listaRutaEntregaByRuta(id_ruta);
                for(i=0;i<dia.length;i++){
                    var j = new Date().getDay();
                    var c = 0;
                    while(true){
                        if(dia[i]["numero_dia"] == j){
                            if(c > 0){
                                var f = new Date();
                                f.setDate(f.getDate() + c);
                                fecha = f.getFullYear() + "-"+ (f.getMonth()+1)+ "-" +f.getDate();
                                dia[i]["fecha"] = fecha;
                                const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'];
                                var diasrestantes = " (en "+ c +" dias)"
                                if(c==1){diasrestantes = " (para mañana)";}
                                if(c==7){diasrestantes = " (en 1 semana)";}
                                dia[i]["dia"] = dias[dia[i]["numero_dia"]] + diasrestantes;
                                const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                                dia[i]["literal"] = f.getDate()+" de "+ meses[f.getMonth()] + " del " + f.getFullYear();
                                break;
                            }
                        }
                        j++;
                        c++;
                        if(j==7){
                            j=0;
                        }
                    }
                }
                resultado = dia;
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

//export
module.exports = {
    agregarRuta,
    agregarRutaLimite,
    agregarRutaUsuario,
    agregarRutaEntrega,
    agregarRutaEmpresaByTienda,
    eliminarRutaUsuarioById,
    eliminarRutaEntregaById,
    listaRutaLimiteByEstadoEmpresa,
    listaRutaLimiteByRuta,
    listaRutaByEstadoEmpresa,
    listaRutaUsuarioByUsuario,
    listaRutaUsuarioNoRegistradoByUsuario,
    listaCargaRutaByFechaUsuario,
    listaRutaEntregaByRuta,
    listaRutaUsuarioByRuta
}