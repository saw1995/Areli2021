const usuarioModelo = require('../modelo/usuarioModelo');
const empresaModelo = require('../modelo/empresaModelo');
const historialModelo = require('../modelo/historialModelo');

const path = require('path');
const fs = require('fs');

var dateTime = require('node-datetime');
const Excel = require('exceljs');

// ------------> INSERT
function agregarUsuario(ci, ci_exp, nombre, appat, apmat, email, 
    celular, genero, id_departamento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia,
    latitud, longitud, foto, pass, id_rol, id_empresa,hr_id_usuario,hr_dispositivo,hr_latitud,hr_longitud){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(ci !== undefined && ci_exp !== undefined && nombre !== undefined &&
                appat !== undefined && apmat !== undefined && email !== undefined && genero !== undefined && id_departamento !== undefined &&
                fecha_nacimiento !== undefined && estado_civil !== undefined && estudio !== undefined && zona !== undefined &&
                avenida !== undefined && calle !== undefined && numero !== undefined && referencia !== undefined &&
                latitud !== undefined && longitud !== undefined && foto !== undefined && pass !== undefined &&
                id_rol !== undefined  && id_empresa !== undefined){

                    const id_generado_usuario = Date.now();
                    var resultado = await usuarioModelo.agregarUsuario(id_generado_usuario, ci, ci_exp, nombre, appat, apmat, email, 
                    celular, genero, id_departamento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia,
                    latitud, longitud, foto, pass, id_rol, "1", id_empresa);

                    var dt = dateTime.create();
                    fecha = dt.format('Y-m-d');
                    hora = dt.format('H:M:S');
                    
                    resultado["id_usuario"] = id_generado_usuario;
                    if(resultado["affectedRows"]>0)
                    {
                        // var resHistorialRegistro = await historialModelo.agregarRegistroHistorial("H"+id,"insert","(sin obs)","se agrega " + nombre,hora,fecha,hr_latitud,hr_longitud,hr_dispositivo,id_empresa,hr_id_usuario,id,"usuario");
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

function agregarLogin(id_usuario, plataforma, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var dt = dateTime.create();
		    fecha = dt.format('Y-m-d');
		    hora = dt.format('H:M:S');

            if(id_usuario !== undefined && plataforma !== undefined && latitud_ingreso !== undefined && longitud_ingreso !== undefined && dispositivo_ingreso !== undefined && id_empresa !== undefined){
                const id_generado_login = Date.now();
                var resultado = await usuarioModelo.agregarLogin(id_generado_login, id_usuario, plataforma, fecha, hora, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, 1, id_empresa);
                resultado["id_login"] = id_generado_login;
                
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
function salirLogin(latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var dt = dateTime.create();
		    fecha = dt.format('Y-m-d');
		    hora = dt.format('H:M:S');

            if(latitud_salida !== undefined && longitud_salida !== undefined && observacion_salida !== undefined &&
                dispositivo_salida !== undefined && estado !== undefined && id_empresa !== undefined){

                var resultado = await usuarioModelo.salirLogin(fecha, hora, latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id, id_empresa);

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

function actualizarDatosUsuarioById(ci, ci_exp , nombre, appat, apmat, email, celular, genero, id_departamento_nacimiento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, 
   latitud, longitud, id_rol, id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(ci !== undefined && ci_exp !== undefined && nombre !== undefined && appat !== undefined && apmat !== undefined &&
                email !== undefined && celular !== undefined && genero !== undefined && id_departamento_nacimiento !== undefined &&
               fecha_nacimiento !== undefined && estado_civil !== undefined && estudio !== undefined && zona !== undefined &&
               avenida !== undefined && calle !== undefined && numero !== undefined && referencia !== undefined &&
               latitud !== undefined && longitud !== undefined && id_rol !== undefined  && id_empresa !== undefined && id !== undefined){

                var resultado = await usuarioModelo.actualizarDatosUsuarioById(ci, ci_exp , nombre, appat, apmat, email,
                    celular, genero, id_departamento_nacimiento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, 
                   latitud, longitud, id_rol, id_empresa, id);

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

function actualizarEstadoByIdUsuario(estado, id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined ){

                var resultado = await usuarioModelo.actualizarEstadoByIdUsuario(estado, id_empresa, id);

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

function actualizarPassById(pass, id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(pass !== undefined && id_usuario !== undefined && id_empresa !== undefined ){

                var resultado = await usuarioModelo.actualizarPassById(pass, id_usuario, id_empresa);

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

function actualizarImagenById(imagen, id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            var respuesta = {"nodejs":"Falta de parametros para la Operacion."};
            if(id !== undefined){
                const id_generado_usuario = Date.now();
                let nombre_imagen = id_empresa+"-"+id_generado_usuario+".jpg"
                 await imagen.mv(path.join(__dirname, '..', 'imagenes', 'usuarios', nombre_imagen),async err => {
                    if(err){
                        respuesta = {"nodejs":"No se puede guardar la imagen en el servidor -> " + err};
                    }else{
                        var usuario = await usuarioModelo.usuarioById(id_empresa, id);
                        if(usuario[0]["foto"] != "sin_imagen_usuario.jpg" ){
                            fs.unlink(path.join(__dirname, '..', 'imagenes', 'usuarios', usuario[0]["foto"]), (err) => { if(err) throw err;});
                        }
                        
                        var resultado = await usuarioModelo.actualizarImagenById(nombre_imagen, id);
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

// ------------> DELETE

// ------------> SELECT
function listaUsuarioByEmpresaByEstado(id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && estado !== undefined ){

                var resultado = await usuarioModelo.listaUsuarioByEmpresaByEstado(id_empresa, estado);
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

function listaUsuarioByEmpresa(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined ){

                var resultado = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);

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

function usuarioById(id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id !== undefined ){

                var resultado = await usuarioModelo.usuarioById(id_empresa, id);

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

function usuarioByCiPass(ci, pass){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(ci !== undefined && pass !== undefined ){

                var resultado = await usuarioModelo.usuarioByCiPass(ci, pass);

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

function usuarioLoginByUsuarioEmpresa(id_usuario, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined && id_empresa !== undefined){

                var resultado = await usuarioModelo.usuarioLoginByUsuarioEmpresa(id_usuario, id_empresa);

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

function loginByUsuarioPlataforma(id_usuario, plataforma, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_usuario !== undefined &&  plataforma !== undefined && id_empresa !== undefined){

                var resultado = await usuarioModelo.loginByUsuarioPlataforma(id_usuario, plataforma, id_empresa);

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

//------->>>>>export to excel rutas
var letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ'];

function listaUsuarioByEmpresaToExcel(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{        

            var empresa = await empresaModelo.empresaById(id_empresa);
            var usuario = await usuarioModelo.listaUsuarioByEmpresaToExcel(id_empresa);

            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet("Usuarios");

            var columnas = ['Nº','Foto','CI','EXP.','Nombre(s) Completo','Email','Telefono.','Genero','Fecha Nacimiento','Estado Civil','Ocupación','Dirección','Cargo','Sucursal'];
            worksheet.addRow(["Empresa: " + empresa[0]['nombre']]);
            worksheet.addRow(["NIT: " + empresa[0]['nit']]);
            worksheet.addRow(["Descripción: " + empresa[0]['descripcion']]);
            worksheet.addRow([]);
            worksheet.addRow(columnas);

            let numIndex = 6;
            for(let i =0;i<=usuario.length-1;i++)
            {
                worksheet.addRow([
                    i+1,"",usuario[i]['ci'],usuario[i]['ci_exp'],usuario[i]['nombre'], usuario[i]['email'], 
                    usuario[i]['celular'],usuario[i]['genero'], usuario[i]['fecha_nacimiento'],usuario[i]['estado_civil'],
                    usuario[i]['estudio'], usuario[i]['direccion'], usuario[i]['rol'], usuario[i]['sucursal'] + ' - ' + usuario[i]['departamento']
                ]);
                try{
                    const img = workbook.addImage({
                        filename: 'app/imagenes/'+usuario[i][foto],
                        extension: 'jpg',
                    });
                    worksheet.addImage(img,'B'+numIndex.toString() + ':B'+ numIndex.toString());
                }catch{
                    const img = workbook.addImage({
                        filename: 'app/imagenes/sin_imagen.jpg',
                        extension: 'jpg',
                    });
                    worksheet.addImage(img,'B'+numIndex.toString() + ':B'+ numIndex.toString());
                }
                numIndex++;
            }

            for(let i = 0; i<=columnas.length-1;i++)
            {
                worksheet.getCell(letras[i].toString()+'5').fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor:{argb:'002D40'}
                };

                worksheet.getCell(letras[i].toString()+'5').font = {
                    name: 'Arial',
                    family: 4,
                    size: 12,
                    underline: false,
                    bold: false,
                    italic:false,
                    color:{ argb: 'F5F4F2' }
                };
            }

            var fila = 6;
            for(let i = 1;i<=usuario.length-1;i++)
            {
                if(i%2==0)
                {
                    
                    for(let j=0;j<=columnas.length-1;j++)
                    {
                        worksheet.getCell(letras[j].toString()+fila.toString()).fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor:{argb:'F56A79'}
                        };
                    }
                }
                else
                {
                    for(let j=0;j<=columnas.length-1;j++)
                    {
                        worksheet.getCell(letras[j].toString()+fila.toString()).fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor:{argb:'D9ECF2'}
                        };
                    }
                }
                fila = fila + 1;
            }

            const buffer = await workbook.xlsx.writeBuffer();
            console.log("File is written");
        return resolved(buffer)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}

function excelprueba(){
    return new Promise(async (resolved, reject) =>{
        try{        
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet("My Sheet");

                const logo = workbook.addImage({
                    filename: 'app/imagenes/productos/26061063.jpg',
                    extension: 'jpg',
                });

                const img = workbook.addImage({
                    filename: 'app/imagenes/sin_imagen.jpg',
                    extension: 'jpg',
                });

                worksheet.addImage(logo,'A1:A4');

                worksheet.addRow(['',"Empresa", "SOCIEDAD SAP S.A."]);
                worksheet.addRow(['',"NIT:", "99501951"]);
                worksheet.addRow(['',"Telefono:", "2220651-221015"]);
                worksheet.addRow(['',"Direccion", "Av. Costanera Calle 3 Nº432"]);
                worksheet.addRow([]);
                worksheet.addRow(["Nº", "DATOS","D","D","DIRECCION",'D','D']);
                worksheet.addRow(["Nº","CI", "NOMBRE", "APELLIDOS","ZONA", "CALLE","IMG"]);

                let num = 8;
                for(let i =1; i<=10;i++)
                {
                    worksheet.addRow([i,"CI"+i.toString(), "NOMBRE"+i.toString(), "APELLIDOS"+i.toString(),
                    "ZONA" + i.toString(), "CALLE" + i.toString()]);
                    worksheet.addImage(img,'G'+num.toString() + ':G'+ num.toString());
                    num = num + 1;
                }

                var letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T']

                for(let i = 0; i<=7-1;i++)
                {
                    worksheet.getCell(letras[i].toString()+'6').fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor:{argb:'002D40'}
                    };
                    worksheet.getCell(letras[i].toString()+'7').fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor:{argb:'002D40'}
                    };
                    worksheet.getCell(letras[i].toString()+'6').font = {
                        name: 'Arial',
                        family: 4,
                        size: 12,
                        underline: false,
                        bold: false,
                        italic:false,
                        color:{ argb: 'F5F4F2' }
                    };
                    worksheet.getCell(letras[i].toString()+'7').font = {
                        name: 'Arial',
                        family: 4,
                        size: 11,
                        underline: false,
                        bold: false,
                        italic:false,
                        color:{ argb: 'F5F4F2' }
                    };
                }
                
                for(let i = 1; i<=4;i++)
                {
                    worksheet.getCell('B'+i.toString()).font = {
                        name: 'Comic Sans MS',
                        family: 4,
                        size: 11,
                        underline: true,
                        bold: true,
                        italic:true
                    };
                }

                var fila = 8;
                for(let i = 1;i<=10;i++)
                {
                    if(i%2==0)
                    {
                        
                        for(let j=0;j<=7-1;j++)
                        {
                            worksheet.getCell(letras[j].toString()+fila.toString()).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor:{argb:'F56A79'}
                            };
                        }
                    }
                    else
                    {
                        for(let j=0;j<=7-1;j++)
                        {
                            worksheet.getCell(letras[j].toString()+fila.toString()).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor:{argb:'D9ECF2'}
                            };
                        }
                    }
                    fila = fila + 1;
                }


                worksheet.mergeCells('A6:A7');
                worksheet.mergeCells('B6:D6');
                worksheet.mergeCells('E6:G6');
                worksheet.getCell('A6').alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.getCell('D6').alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.getCell('G6').alignment = { vertical: 'middle', horizontal: 'center' };
                // save under export.xlsx
                //await workbook.xlsx.writeFile('export.xlsx');

                const buffer = await workbook.xlsx.writeBuffer();
                console.log("File is written");
            return resolved(buffer)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}
//export
module.exports = {
    agregarUsuario,
    agregarLogin,
    salirLogin,
    actualizarDatosUsuarioById,
    actualizarEstadoByIdUsuario,
    actualizarPassById,
    actualizarImagenById,
    listaUsuarioByEmpresaByEstado,
    listaUsuarioByEmpresa,
    usuarioByCiPass,
    usuarioLoginByUsuarioEmpresa,
    loginByUsuarioPlataforma,
    usuarioById,
    listaUsuarioByEmpresaToExcel,
    excelprueba
}