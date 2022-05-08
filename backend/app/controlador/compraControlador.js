const almacenModelo = require('../modelo/almacenModelo');
const usuarioModelo = require('../modelo/usuarioModelo');
const compraModelo = require('../modelo/compraModelo');
const empresaModelo = require('../modelo/empresaModelo');
const productoStockModelo = require('../modelo/productoStockModelo');
const productoModelo = require('../modelo/productoModelo');
const Excel = require('exceljs');

var dateTime = require('node-datetime');
const meses = new Array ("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

const PdfPrinter = require('pdfmake');
const fonts = require('../libreria/fonts');
const { header } = require('../pdfs/config_reporte');
const { reporteCompra } = require('../pdfs/reporte_compra');

function agregarCompra(id_almacen, id_usuario, id_proveedor, concepto, id_factura_compra, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var dt = dateTime.create();
            const fecha = dt.format('Y-m-d');
            const hora = dt.format('H:M:S');
            
            if(id_almacen !== undefined && id_usuario !== undefined && id_proveedor !== undefined && concepto !== undefined && id_factura_compra !== undefined && estado !== undefined && id_empresa !== undefined){
                const id_generado_compra = Date.now();
                var nro_compra = 1;
                var compra = await compraModelo.ultimaCompraByEmpresa(id_empresa);
                if(compra.length > 0){
                    nro_compra = parseInt(compra[0]["nro_compra"]) + 1;
                }

                var resultado = await compraModelo.agregarCompra(id_generado_compra, nro_compra, id_almacen, id_usuario, id_proveedor, fecha, hora, concepto, id_factura_compra, estado, id_empresa);
                
                resultado["id_compra"] = id_generado_compra;
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

function agregarCompraDetalle(id_compra, cantidad, costo_adquisicion, estado, id_usuario, id_empresa, id_producto, id_almacen, fecha_vencimiento, stock, precio_sugerido, stock_minimo, cantidad_minima){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var dt = dateTime.create();
            const fecha = dt.format('Y-m-d');
            const hora = dt.format('H:M:S');

            if(id_compra !== undefined && cantidad !== undefined && costo_adquisicion !== undefined && estado !== undefined && id_empresa !== undefined && id_producto !== undefined && id_almacen !== undefined && fecha_vencimiento !== undefined && precio_sugerido !== undefined){
                var resultado;
                var id_producto_stock;

                var productoStock = await productoStockModelo.listaProductoStockByProductoEmpresaAlmacenCosto(id_producto, id_almacen, costo_adquisicion, id_empresa, estado);
                if(productoStock.length > 0){
                    var stock_actual = parseInt(productoStock[0]["stock"]) + parseInt(stock);
                    id_producto_stock = productoStock[0]["id"];
                    resultado = await productoStockModelo.actualizarStockFecVenById(stock_actual, fecha_vencimiento, id_producto_stock);
                }else{
                    id_producto_stock = Date.now();
                    const id_generado = Date.now();
                    resultado = await productoStockModelo.agregarProductoStock(id_generado, id_producto, id_almacen, stock, fecha_vencimiento, costo_adquisicion, precio_sugerido, stock_minimo, cantidad_minima, id_empresa, estado);
                }
                const id_generado_compra_detalle = Date.now();
                resultado = await compraModelo.agregarCompraDetalle(id_generado_compra_detalle, id_compra, id_producto_stock, cantidad, costo_adquisicion, estado, id_empresa);
                if(resultado["affectedRows"]>0){
                    var compra = await compraModelo.compraById(id_compra, "1", id_empresa);
                    var detalle = "Compra Nro. " + compra[0]["nro_compra"]
                    const id_generado = Date.now();
                    resultado = await productoStockModelo.agregarKardexStock(id_generado, id_producto_stock, "0", "Compra", cantidad, costo_adquisicion, detalle, "", fecha, hora, id_usuario, id_empresa);
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

function listaCompraDetalleHistorialByProductoEmpresa(id_producto, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_producto !== undefined && id_empresa !== undefined){
                var resultado = await compraModelo.listaCompraDetalleHistorialByProductoEmpresa(id_producto, id_empresa);
                
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

function compraById(id_compra, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_compra !== undefined && estado !== undefined && id_empresa !== undefined){
                var resultado = await compraModelo.compraById(id_compra, "1", id_empresa);
                
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

function listaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && estado !== undefined && id_empresa !== undefined){

                if(id_usuario == "0"){
                    var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                    id_usuario = "";
                    for(i=0;i<usuario.length;i++){
                        id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                        if(i+1 != usuario.length){
                            id_usuario = id_usuario + ",";
                        }
                    }
                }else{
                    id_usuario = "'" + id_usuario + "'";
                }
                var compra = await compraModelo.listaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario);

                if(compra.length == 0){
                    compra = [];
                }
                respuesta = {"datos":compra}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaCompraDetalleByCompra(id_compra, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_compra !== undefined && estado !== undefined && id_empresa !== undefined){
                var compra = await compraModelo.listaCompraDetalleByCompra(id_compra, estado, id_empresa);
                
                for (j=0;j<compra.length;j++) {
                    var medida = await productoModelo.listaMedidaByProductoEstado(compra[j]["id_producto"], "1")
                
                    var sto = compra[j]["cantidad"];
                    for (i = (medida.length-1); i >=0; i--) {
                        var st = sto / parseInt(medida[i]["unidad"]) ;
                        var stmod = sto % parseInt(medida[i]["unidad"]) ;
                        if(st > 0 && stmod == 0){
                            compra[j]["cant_medida"] = st;
                            compra[j]["medida"] = medida[i]["medida"];
                            
                            compra[j]["costo_medida"] = (parseFloat(compra[j]["costo_adquisicion"]) * parseFloat(medida[i]["unidad"])).toFixed(2);
                            compra[j]["subTotal"] = (parseFloat(compra[j]["costo_medida"]) * parseFloat(compra[j]["cant_medida"])).toFixed(2);
                            break;
                        }
                    }

                }

                if(compra.length == 0){
                    compra = [];
                }
                respuesta = {"datos":compra}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function reporteListaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario, id_usuario_impresion){
    return new Promise(async (resolved, reject) =>{
        try{
            var usuario_reporte = "Todos los usuarios";
            if(id_usuario == "0"){
                var usuario = await usuarioModelo.listaUsuarioByEmpresa(id_empresa);
                id_usuario = "";
                for(i=0;i<usuario.length;i++){
                    id_usuario = id_usuario + "'" + usuario[i]["id"] + "'";
                    if(i+1 != usuario.length){
                        id_usuario = id_usuario + ",";
                    }
                }
            }else{
                var res = await usuarioModelo.usuarioById(id_empresa,id_usuario);
                usuario_reporte = res[0]["nombre"] + " " + res[0]["appat"] + " " + res[0]["apmat"];
                id_usuario = "'" + id_usuario + "'";
            }

            var arrayFecInicio = fecha_inicio.split("-");
            var arrayFecFin = fecha_final.split("-");
            var fecha = arrayFecInicio[2]+" de "+ meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0] + " al " + arrayFecFin[2]+" de "+ meses[arrayFecFin[1]] + " del " + arrayFecFin[0] ;
            if(arrayFecInicio[0] == arrayFecFin[0]){
                if(arrayFecInicio[1] == arrayFecFin[1]){
                    if(arrayFecInicio[2] == arrayFecFin[2]){
                        fecha = arrayFecInicio[2] + " de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                    }else{
                        if(parseInt(arrayFecInicio[2]) == 1){
                            var dias_mes = new Date(arrayFecInicio[0], arrayFecInicio[1], 0).getDate()
                            if(arrayFecFin[2] == dias_mes){
                                fecha = "Mes de " + meses[arrayFecInicio[1]] + " del " + arrayFecInicio[0];
                            }
                        }
                    }
                } 
            }

            var compra = await compraModelo.listaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario);
            
            var res_almacen = await almacenModelo.almacenById(id_empresa, id_almacen);
            var almacen = res_almacen[0]["nombre"];
            var sucursal = res_almacen[0]["nombre_sucursal"];
            var id_sucursal = res_almacen[0]["id_sucursal"];
            if(id_sucursal == "1"){
                sucursal = "Almacen Independiente"
            }

            var docDefinition = {
                pageSize: 'LETTER',
                pageMargins: [ 80, 100, 40, 60 ],
                header: {
                    stack: await header(id_sucursal, id_empresa, id_usuario_impresion),
                    margin: [ 80, 25, 40, 20 ],
                },
                footer: function(currentPage, pageCount) {
                    return {
                        margin: [ 80, 10, 40, 40 ],
                        fontSize: 8,
                        columns: [
                            { text: '©NovaPOS', italics: true },
                            { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right' }
                        ],
                    };
                },
                content: await reporteCompra(almacen, sucursal, fecha, usuario_reporte, compra),
            };
    
            const printer = new PdfPrinter(fonts);
    
            let pdfDoc = printer.createPdfKitDocument(docDefinition);

            var chunks = [];
            pdfDoc.on('data', chunk => chunks.push(chunk));
            pdfDoc.on('end', () => resolved(Buffer.concat(chunks)));
            pdfDoc.end();

        }catch(error){
            console.log(error)
            return reject({"mysql":error});
        }
    })
}


var letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ'];
function listaComprasByFechaToExcel(fecha_inicio,fecha_fin,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{        

            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet("My Sheet");

            var empresa = await empresaModelo.empresaById(id_empresa);
            var detalleCompra = await compraModelo.listaComprasByFechaToExcel(fecha_inicio,fecha_fin,id_empresa)

            var columnas = ['CÒDIGO','PRODUCTO','CANT.','C.ADQ.'];

            worksheet.addRow(["Empresa: " + empresa[0]['nombre']]);
            worksheet.addRow(["NIT: " + empresa[0]['nit']]);
            worksheet.addRow(["Descripción: " + empresa[0]['descripcion']]);
            worksheet.addRow([]);

            var idCompra = detalleCompra[0]["id_compra"];

            var compras = [idCompra];
            for(let i=0;i<=detalleCompra.length-1;i++)
            {
                if(idCompra != detalleCompra[i]["id_compra"])
                {
                    idCompra = detalleCompra[i]["id_compra"];
                    compras.push(detalleCompra[i]["id_compra"]);
                }
            }

            let numCompra = detalleCompra[0]['nro_compra'];
            let fechaHora = detalleCompra[0]['fecha'] + ' ' + detalleCompra[0]['hora']; 
            let Concepto = detalleCompra[0]['concepto'];
            let usuario = detalleCompra[0]['usuario']; 
            let proveedor = detalleCompra[0]['proveedor'];

            var pintarColumnasInde = [];

            for(let i =0;i<=compras.length-1;i++)
            {
                let indexPintar = 10;

                worksheet.addRow(["Nº Compra: " + numCompra]);
                worksheet.addRow(["Fecha: " + fechaHora]);
                worksheet.addRow(["Concepto: " + Concepto]);
                worksheet.addRow(["Usuario: " + usuario]);
                worksheet.addRow(["Proveedor: " + proveedor ]);

                worksheet.addRow(columnas);

                for(let j=0;j<=detalleCompra.length-1;j++)
                {
                    if(compras[i]==detalleCompra[j]['id_compra'])
                    {
                        worksheet.addRow([detalleCompra[j]['codigo'],detalleCompra[j]['nombre'],detalleCompra[j]['cantidad'],detalleCompra[j]['costo_adquisicion']]);
                        if(j==detalleCompra.length-1)
                        {
                            indexPintar = indexPintar + 2;
                        }
                        else
                        {
                            indexPintar = indexPintar + 1;
                        }
                    }
                    else
                    {
                        numCompra = detalleCompra[j]['nro_compra'];
                        fechaHora = detalleCompra[j]['fecha'] + ' ' + detalleCompra[j]['hora']; 
                        Concepto = detalleCompra[j]['concepto'];
                        usuario = detalleCompra[j]['usuario']; 
                        proveedor = detalleCompra[j]['proveedor'];
                    }
                }
                worksheet.addRow([]);

                pintarColumnasInde.push(indexPintar);

            }

            console.log(pintarColumnasInde);
            worksheet.columns = [
                { width: 15 },
                { width: 50 }
              ];

            const buffer = await workbook.xlsx.writeBuffer();
            return resolved(buffer)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}

//export
module.exports = {
    agregarCompra,
    agregarCompraDetalle,
    compraById,
    listaCompraDetalleHistorialByProductoEmpresa,
    listaCompraByAlmacenFechaUsuario,
    listaCompraDetalleByCompra,

    reporteListaCompraByAlmacenFechaUsuario,

    listaComprasByFechaToExcel
}