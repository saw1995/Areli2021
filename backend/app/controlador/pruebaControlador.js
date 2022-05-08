const rubroModelo = require('../modelo/rubroModelo');
const pruebaModelo = require('../modelo/pruebaModelo');

const xlsx = require('xlsx-color');

const PdfPrinter = require('pdfmake');
const fs = require('fs');
const fonts = require('../libreria/fonts');
const {content} = require('../pdfs/nota_pre_venta');
const impuestos = require('../libreria/ControlCode');

//const path = require('path');
//var FormData = require('form-data');

function pruebapdf(){
    return new Promise(async (resolved, reject) =>{
        var docDefinition = {
            pageSize: {
                width: 78 / 0.35277,
                height: 350 / 0.35277
            },
            pageMargins: [ 10, 10, 10, 10 ],
            content: content
            /*content: [
                {text: 'Text on Landscape 3', pageOrientation: 'landscape', pageBreak: 'after'},
                {text: 'Text on Landscape 3', pageOrientation: 'landscape'}
            ]*/
        };

        const printer = new PdfPrinter(fonts);

        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        /*pdfDoc.pipe(fs.createWriteStream("./prueba.pdf"));
        pdfDoc.end();
        return resolved("doc");*/
        var chunks = [];
        pdfDoc.on('data', chunk => chunks.push(chunk));
        pdfDoc.on('end', () => resolved(Buffer.concat(chunks)));
        pdfDoc.end();
    })
}

function pruebaFactura(){
    return new Promise(async (resolved, reject) =>{
        var resultado = await impuestos.generateControlCode(
            "7904006306693",
            "876814",
            "1665979",
            "20080519",
            "35958.60",
            "zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS"
        );
        console.log("CODIGO DE CONTROL:", resultado);
        return resolved(resultado)
    })
}

function listaUsuarios(estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined){
                var resultado = await pruebaModelo.listaUsuarios(estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}


function excelPrueba(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}

            var rubro = await rubroModelo.listaRubroByEstado("1");

            const workSheetColumnName = [ "id","nombre","imagen"]
            const data = rubro.map(dato => {
                return [dato.id, dato.nombre, dato.imagen];
            });

            const workBook = xlsx.utils.book_new();

            const workSheetData = [workSheetColumnName, ... data]; // (ENCABEZADO, DATOS) CREA TABLA
            var workSheet = xlsx.utils.aoa_to_sheet(workSheetData); // CREA NUEVA HOJA E INTEGRA CON LA TABLA

            workSheet['A2'].v = "HOLA MUNDO DESDE NODEJS";
            workSheet['B3'].l = { Target:"#E2" };
            workSheet['C4'].c = [];
            workSheet['C4'].c.push({a:"SheetJS", t:"This comment is visible"});
        
        
            /*var wscols = [{wch:20},{wch:10},{wch:5},{wch:15},{wch:15},{wch:15},{wch:30},{wch:10},{wch:10},
            {wch:10},{wch:5},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},{wch:20},{wch:20}];
            workSheet['!cols'] = wscols;
            */
            workSheet['!cols'] = rubro.map((a, i) => ({ wch: Math.max(...rubro.map(a2 => String(a2[i]).length)) }));
            
            /*workSheet['A2'].s = {
                fill: {
                    patternType: "solid",
                    fgColor: { rgb: "111111" }
                }
            };*/
            workSheet['A2'].s = {
                fill: {
                  patternType: "solid", // none / solid
                  fgColor: {rgb: "111111"},
                  bgColor: {rgb: "FFFFFFFF"}
                  },
                  font: {
                  name: 'Times New Roman',
                  sz: 16,
                  color: {rgb: "FFFFFF"},
                  bold: true,
                  italic: false,
                  underline: false
                  },
                  border: {
                  top: {style: "thin", color: {auto: 1}},
                  right: {style: "thin", color: {auto: 1}},
                  bottom: {style: "thin", color: {auto: 1}},
                  left: {style: "thin", color: {auto: 1}}
                  }
              };

            xlsx.utils.book_append_sheet(workBook, workSheet, 'compras'); // (new excel, hoja, nombre de HOJA) INTEGRA AL EXCEL LAS HOJAS

           
            /*for (i = 1; i <= sheets["compras"].length; i++) {
                workBook.Sheets["compras"]["A"+i].s = {
                    fill: {
                        patternType: "solid",
                        fgColor: { rgb: "111111" }
                    }
                };
            }*/

            var wbout = xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer'});
            return resolved(wbout)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}
function excelListaUsuarioByEmpresa(id_empresa,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}

            var empresa = await empresaModelo.empresaById(id_empresa);
            var usuario = await usuarioModelo.listaUsuarioByEmpresaByEstado(id_empresa,estado);


            const workSheetColumnName = ["Empresa",empresa[0]["nombre"]];

            const data  =  
            [
                [ "Nit:", empresa[0]["nit"] ] ,
                [],
                [ "id","CI","EXP.","Nombre","Apellido Paterno","Apellido Materno",
                    "Email o correo","Celular","Genero","F.Nacimiento","Edad","E.Civil","Ocupación",
                    "Zona","Avenida","Calle","Número","Ref.","Cargo"]
            ] ;
            
            const data2 = usuario.map(dato => {
                return [dato.id, dato.ci, dato.ci_exp, dato.nombre, dato.appat, dato.apmat, dato.email,
                dato.celular,dato.genero,dato.fecha_nacimiento.getDate() + "/"+ dato.fecha_nacimiento.getMonth() + "/" + dato.fecha_nacimiento.getFullYear(),
                 dato.edad, dato.estado_civil,dato.estudio,
                dato.zona, dato.avenida, dato.calle,dato.numero,dato.referencia, dato.rol];
            });

            const data3  =  
            [
                ["Numero de registros: " , ,,,,,,,,,,,,,,,,,usuario.length]
            ] ;

       

            const workBook = xlsx.utils.book_new();

            const workSheetData = [workSheetColumnName, ... data,...data2,...data3]; // (ENCABEZADO, DATOS) CREA TABLA

            var workSheet = xlsx.utils.aoa_to_sheet(workSheetData); // CREA NUEVA HOJA E INTEGRA CON LA TABLa

            //const merge = [ { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } },{ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } }, ];
            //Aquí s = inicio, r = fila, c = col, e = final
            const merge = [
                { s: { r: 10, c: 0 }, e: { r: 10, c: 17 }},
              ];
            workSheet["!merges"] = merge;

            workSheet['!cols'] = data2[0].map((a, i) => ({ wch: Math.max(...data2.map(a1 => (a1[i].toString().length+3))) }));

            for (let i = 1; i <= data[2].length; i++) 
            {
                var index = (letras[i-1]+'4').toString();
                workSheet[index].s = {
                    fill: {
                      patternType: "solid", // none / solid
                      fgColor: {rgb: "002D40"},
                      bgColor: {rgb: "FFFFFFFF"}
                      },
                      font:{
                      name: 'Arial',
                      sz: 11,
                      color: {rgb: "FFFFFF"},
                      bold: true,
                      italic: false,
                      underline: false
                      }
                  };
            }

            for (let i = 1; i <= 2; i++) 
            {
                var index = ('A'+i.toString());
                workSheet[index].s = {
                      font:{
                      name: 'Arial',
                      sz: 11,
                      bold: true,
                      italic: false,
                      underline: false
                      }
                  };
            }

            var numIncio = 5;
            for (let i = 1; i <= usuario.length; i++) 
            {
                if(i%2==0)
                {
                    for (let j = 1; j <= data[2].length; j++) 
                    {
                        var index = (letras[j-1] + numIncio.toString());
                        
                        workSheet[index].s = {
                            fill: {
                            patternType: "solid", // none / solid
                            fgColor: {rgb: "D9ECF2"},
                            bgColor: {rgb: "D9ECF2"}
                            },
                            font:{
                            name: 'Arial',
                            sz: 11,
                            color: {rgb: "0D0D0D"},
                            bold: false,
                            italic: true,
                            underline: false}
                        };
                    }
                }
                else
                {
                    for (let j = 1; j <= data[2].length; j++) 
                    {
                        var index = (letras[j-1] + numIncio.toString());
                        
                        workSheet[index].s = {
                            fill: {
                            patternType: "solid", // none / solid
                            fgColor: {rgb: "F56A79"},
                            bgColor: {rgb: "F56A79"}
                            },
                            font:{
                            name: 'Arial',
                            sz: 11,
                            color: {rgb: "0D0D0D"},
                            bold: false,
                            italic: false,
                            underline: false}
                        };
                    }
                }
                numIncio = numIncio +1;
            }

            xlsx.utils.book_append_sheet(workBook, workSheet, 'lista de usuarios'); // (new excel, hoja, nombre de HOJA) INTEGRA AL EXCEL LAS HOJAS

            var wbout = xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer'});
            return resolved(wbout)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}
//export
module.exports = {
    pruebapdf,
    listaUsuarios,
    excelPrueba,
    pruebaFactura
}