var dateTime = require('node-datetime');

function reporteVentaDetalle(venta){
    return new Promise((resolved, reject) =>{
      var dt = dateTime.create();

		var content = [];
    var detalle = [];
    var total = 0.00;

    detalle.push([{text: 'NRO VENTA', bold: true}, {text: 'TIENDA', bold: true}, {text: 'CATEGORIA', bold: true}, {text: 'CODIGO', bold: true}, {text: 'PRODUCTO', bold: true}, {text: 'CANTIDAD', bold: true}, {text: 'PRECIO', bold: true}, {text: 'SUBTOTAL', bold: true}]);
    for(i=0;i<venta.length;i++){
      detalle.push([
        venta[i]["nro_venta"], 
				venta[i]["tipo"] + " " + venta[i]["tienda"],
        venta[i]["nombre_categoria"],
				"#"+venta[i]["codigo"],
				venta[i]["nombre"],
				venta[i]["cant_medida"],
        "Bs. "+venta[i]["precio"],
        "Bs. "+venta[i]["subtotal"]
			]);
      
      total = total + parseFloat(venta[i]["subtotal"])
    }
    
		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE VENTA A DETALLE' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal: ' +  venta[0]["nombre_sucursal"]}
      ]
    });
    content.push({
      columns: [
        { fontSize: 9, text: 'Usuario: ' +  venta[0]["usuario"]}
      ]
    });
    content.push({ fontSize: 9, text: '\n' });
    content.push({ fontSize: 9, text: 'La siguiente tabla muestra los productos vendido a detalle. ', italics: true });
    content.push({ fontSize: 9, text: '\n' });

    content.push({
			fontSize: 8, alignment: 'center',
			table: {
				headerRows: 1,
				body: detalle
			},
			layout: 'lightHorizontalLines'
		});

    content.push({ fontSize: 9, text: '\n' });
    content.push({ fontSize: 11, text: 'TOTAL: Bs. ' + total, bold: true, alignment: "right" });
    content.push({ fontSize: 9, alignment: 'center', text: '\n' });

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: venta[0]["usuario"]});
    content.push({ fontSize: 9, alignment: 'center', text: venta[0]["nombre_rol"]});
    return resolved(content);
    })
}

module.exports = {
  reporteVentaDetalle
}