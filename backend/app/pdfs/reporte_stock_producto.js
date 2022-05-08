var dateTime = require('node-datetime');

function reporteStock(almacenes, sucursal, stock){
    return new Promise((resolved, reject) =>{
      var dt = dateTime.create();
      const fecha = dt.format('d/m/Y');
      const hora = dt.format('H:M:S');

		var content = [];
    var detalle = [];
    var total = 0.00;


    detalle.push([{text: 'CATEGORIA', bold: true}, {text: 'CODIGO', bold: true}, {text: 'PRODUCTO', bold: true}, {text: 'UNIDAD', bold: true}, {text: 'CAJAS', bold: true}, {text: 'FEC. VENCIMIENTO', bold: true}]);
    for(i=0;i<stock.length;i++){
      detalle.push([
				stock[i]["nombre_categoria"],
				"#"+stock[i]["codigo"],
				stock[i]["nombre"],
        stock[i]["stock"]+" uds",
				stock[i]["cant_medida"],
        stock[i]["fecha_vencimiento"]
			]);
    }

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE STOCK' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal : ' + sucursal},
        { fontSize: 9, alignment: 'right', text: 'Hasta la fecha: ' + fecha + " - " + hora}
      ]
    });
    content.push({
      columns: [
        { fontSize: 9, text: 'Almacen(es) : ' + almacenes}
      ]
    });
    content.push({ fontSize: 9, text: '\n' });
    content.push({ fontSize: 9, text: 'La siguiente tabla muestra el stock hasta la fecha de la impresion del reporte. ', italics: true });
    content.push({ fontSize: 9, text: '\n' });

    content.push({
			fontSize: 8, alignment: 'center',
			table: {
				headerRows: 1,
				body: detalle
			},
			layout: 'lightHorizontalLines'
		});

  

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE ALMACEN'});
    return resolved(content);
    })
}

module.exports = {
  reporteStock
}