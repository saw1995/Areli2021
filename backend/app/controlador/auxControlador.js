const ventaModelo = require('../modelo/ventaModelo');
const productoModelo = require('../modelo/productoModelo');
const auxModelo = require('../modelo/auxModelo');
const productoStockModelo = require('../modelo/productoStockModelo');
const compraModelo = require('../modelo/compraModelo');
var pointInPolygon = require('point-in-polygon');

const PdfPrinter = require('pdfmake');
const fonts = require('../libreria/fonts');
const ticketPdf = require('../pdfs/ticket_pre_venta');

function insertTiendaRuta(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var id = 1000;
            var resultado = "";
            var rutas = await auxModelo.listaRutas();
            var tiendas = await auxModelo.listaTiendas();

            console.log("rutas", rutas.length);
            console.log("tiendas", tiendas.length);

            for(i=0;i<rutas.length;i++){
                console.log("rec rutas:", i);
                var limite = await auxModelo.listaRutaLimite(rutas[i]["id"]);

                if(limite.length > 0){
                    var points = [];
                    for(j=0;j<limite.length;j++){
                        var coordenadas = [];
					    coordenadas[0] = parseFloat(limite[j]["latitud"]);
					    coordenadas[1] = parseFloat(limite[j]["longitud"]);
					    points[j] = coordenadas;
                    }

                    for(k=0;k<tiendas.length;k++){
                        console.log("rec tiendas:", k);
                        //var verificador = await auxModelo.inside_polygon([tiendas[k]["latitud"], tiendas[k]["longitud"]], points);
                        var verificador = await pointInPolygon([parseFloat(tiendas[k]["latitud"]), parseFloat(tiendas[k]["longitud"])], points)
                        if(verificador == true){
                            id = id + 1;
                            resultado = await auxModelo.agregarTiendaEmpresa(id, tiendas[k]["id"], "100", rutas[i]["id"], "123456789");
                        }
                    }
                }
            }

            if(resultado.length == 0){
                resultado = [];
            }
            respuesta = {"datos":resultado}

            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return reject({"mysql":error});
        }
    })
}

function insertTiendaRutaId(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var id = 299112600;
            var resultado = "";

            var rutaid = "1627383342258461374391"
            var tiendas = await auxModelo.listaTiendas();

            console.log("tiendas", tiendas.length);

            var limite = await auxModelo.listaRutaLimite(rutaid);

            if(limite.length > 0){
                var points = [];
                for(j=0;j<limite.length;j++){
                    var coordenadas = [];
				    coordenadas[0] = parseFloat(limite[j]["latitud"]);
				    coordenadas[1] = parseFloat(limite[j]["longitud"]);
				    points[j] = coordenadas;
                }

                for(k=0;k<tiendas.length;k++){
                    console.log("rec tiendas:", k);
                    //var verificador = await auxModelo.inside_polygon([tiendas[k]["latitud"], tiendas[k]["longitud"]], points);
                    var verificador = await pointInPolygon([parseFloat(tiendas[k]["latitud"]), parseFloat(tiendas[k]["longitud"])], points)
                    if(verificador == true){
                        id = id + 1;
                        resultado = await auxModelo.agregarTiendaEmpresa(id, tiendas[k]["id"], "300", rutaid, "963852741");
                    }
                }
            }    

            if(resultado.length == 0){
                resultado = [];
            }
            respuesta = {"datos":resultado}

            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return reject({"mysql":error});
        }
    })
}


function imprimirNotaVenta(nro_min, nro_max, venta, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            var preventa = await ventaModelo.listaPreVentaDetalleByNroVenta(nro_min, nro_max, venta, id_empresa);

            for (j=0;j<preventa.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(preventa[j]["id_producto"], "1")
            
                var sto = preventa[j]["cantidad"];
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]) ;
                    var stmod = sto % parseInt(medida[i]["unidad"]) ;
                    if(st > 0 && stmod == 0){
                        preventa[j]["cant_medida"] = st;
                        preventa[j]["medida"] = medida[i]["medida"];
                        
                        preventa[j]["precio_medida"] = parseFloat(preventa[j]["precio"]) * parseFloat(medida[i]["unidad"]);
                        preventa[j]["subTotal"] = parseFloat(preventa[j]["precio_medida"]) * parseFloat(preventa[j]["cant_medida"]);

                        preventa[j]["descuento"] = (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"]))) * parseFloat(preventa[j]["cant_medida"]);
                        preventa[j]["precio_descuento_medida"] = parseFloat(preventa[j]["precio_medida"]) - (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"])));
                        preventa[j]["subTotalDescuento"] = parseFloat(preventa[j]["subTotal"]) - parseFloat(preventa[j]["descuento"]);
                        break;
                    }
                }
            }

            var content = await ticketPdf.ticketPreVenta(preventa);
            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                content: content
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

function imprimirNotaVentaUsuario(usuario, venta, id_empresa, fecha_entrega){
    return new Promise(async (resolved, reject) =>{
        try{
            var preventa = await ventaModelo.listaPreVentaDetalleByUsuario(usuario, venta, id_empresa, fecha_entrega);
            console.log(preventa)
            for (j=0;j<preventa.length;j++) {
                var medida = await productoModelo.listaMedidaByProductoEstado(preventa[j]["id_producto"], "1")
            
                var sto = preventa[j]["cantidad"];
                for (i = (medida.length-1); i >=0; i--) {
                    var st = sto / parseInt(medida[i]["unidad"]) ;
                    var stmod = sto % parseInt(medida[i]["unidad"]) ;
                    if(st > 0 && stmod == 0){
                        preventa[j]["cant_medida"] = st;
                        preventa[j]["medida"] = medida[i]["medida"];
                        
                        preventa[j]["precio_medida"] = parseFloat(preventa[j]["precio"]) * parseFloat(medida[i]["unidad"]);
                        preventa[j]["subTotal"] = parseFloat(preventa[j]["precio_medida"]) * parseFloat(preventa[j]["cant_medida"]);

                        preventa[j]["descuento"] = (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"]))) * parseFloat(preventa[j]["cant_medida"]);
                        preventa[j]["precio_descuento_medida"] = parseFloat(preventa[j]["precio_medida"]) - (parseFloat(preventa[j]["precio_medida"]) * (0.01*parseFloat(preventa[j]["porcentaje_descuento"])));
                        preventa[j]["subTotalDescuento"] = parseFloat(preventa[j]["subTotal"]) - parseFloat(preventa[j]["descuento"]);
                        break;
                    }
                }
            }

            var content = await ticketPdf.ticketPreVenta(preventa);
            var docDefinition = {
                pageSize: {
                    width: 78 / 0.35277,
                    height: 350 / 0.35277
                },
                pageMargins: [ 10, 10, 10, 10 ],
                content: content
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

function stock(){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            var productoempresa = await auxModelo.lisproductoempresa();

            for(i=0;i<productoempresa.length;i++){
                var productoprecio = await auxModelo.lisproductoprecio(productoempresa[i]["codigo"]);
                if(productoprecio.length > 0){
                    resultado = await productoStockModelo.agregarProductoStock("4000"+productoprecio[0]["codigo"], productoempresa[i]["id"], "16849454600001", "1000", "2021-12-31", productoprecio[0]["costo"], productoprecio[0]["precio_dh"], "1", "0", "1", "147852369", "1");
                    resultado = await compraModelo.agregarCompraDetalle("4000"+productoprecio[0]["codigo"], "162329475051279122407", "4000"+productoprecio[0]["codigo"], "1000", productoprecio[0]["costo"], "1", "147852369");
                    resultado = await productoStockModelo.agregarKardexStock("4000"+productoprecio[0]["codigo"], "4000"+productoprecio[0]["codigo"], "0", "Compra", "1000", productoprecio[0]["costo"], "aux", "", "2021-06-12", "08:00:00", "8345976018EIMC", "147852369");
                }
                console.log("stock:", i);
            }

            if(resultado.length == 0){
                resultado = [];
            }
            respuesta = {"datos":resultado}

            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return reject({"mysql":error});
        }
    })
}
//export
module.exports = {
    stock,
    insertTiendaRuta,
    insertTiendaRutaId,
    imprimirNotaVenta,
    imprimirNotaVentaUsuario
}