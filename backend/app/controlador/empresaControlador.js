const empresaModelo = require('../modelo/empresaModelo');
const rubroModelo = require('../modelo/rubroModelo');

// ------------> INSERT
function agregarEmpresa(id,nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id_licencia){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && nombre !== undefined && propietario !== undefined && descripcion !== undefined &&
                nit !== undefined && sitio_web !== undefined && logo !== undefined && id_rubro !== undefined &&
                id_licencia !== undefined){

                var resultadoEmpresa = await empresaModelo.agregarEmpresa(id,nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id_licencia,'1');
                if(resultadoEmpresa.length == 0){
                    resultadoEmpresa = [];
                }
                respuesta = {"datos":resultadoEmpresa}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

// ------------> UPDATE
function actualizarDatosEmpresa(nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && propietario !== undefined && descripcion !== undefined && nit !== undefined &&
                sitio_web !== undefined && logo !== undefined && id_rubro !== undefined && id !== undefined){

                var resultado = await empresaModelo.actualizarDatosEmpresa(nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id);
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

function actualizarEstodoByIdEmpresa(estado,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id !== undefined){

                var resultado = await empresaModelo.actualizarEstodoByIdEmpresa(estado,id);
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

function empresaById(id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined){
                var resultado = await empresaModelo.empresaById(id);
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


function listaEmpresaRubroByEstadoAreliShop(estado, arelishop){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && arelishop !== undefined){
                var resultado = await empresaModelo.listaEmpresaRubroByEstadoAreliShop(estado, arelishop);
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

function listaEmpresaAleatorioByEstadoAreliShop(estado, arelishop){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && arelishop !== undefined){
                var resultado = await empresaModelo.listaEmpresaAleatorioByEstadoAreliShop(estado, arelishop);
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

function listaEmpresaRubroByEstadoAreliShopRubro(estado, arelishop, id_rubro){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && arelishop !== undefined && id_rubro !== undefined){

                if(id_rubro == "0"){
                    var rubro = await rubroModelo.listaRubroEmpresaByEstado("1");
                    id_rubro = "";
                    for(i=0;i<rubro.length;i++){
                        id_rubro = id_rubro + "'" + rubro[i]["id"] + "'";
                        if(i+1 != rubro.length){
                            id_rubro = id_rubro + ",";
                        }
                    }
                }else{
                    id_rubro = "'" + id_rubro + "'";
                }

                var resultado = await empresaModelo.listaEmpresaRubroByEstadoAreliShopRubro(estado, arelishop, id_rubro);
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


async function listaEmpresaByEstado(req, res){
    try{
        //const { ci } = req.params; //GET
        const {estado} = req.body // POST
        respuesta = {"nodejs":"Falta de parametros para la Operacion."}
        if(estado !== undefined){
            var resultado = await empresaModelo.listaEmpresaByEstado(estado);
            if(resultado.length == 0){
                resultado = [];
            }
            respuesta = {"datos":resultado}
        }
        res.json(respuesta);
    }catch(error){
        res.json({"mysql":error});
    }
}

//export
module.exports = {
    agregarEmpresa,
    actualizarDatosEmpresa,
    actualizarEstodoByIdEmpresa,
    empresaById,
    listaEmpresaRubroByEstadoAreliShop,
    listaEmpresaAleatorioByEstadoAreliShop,
    listaEmpresaRubroByEstadoAreliShopRubro,
    listaEmpresaByEstado
}