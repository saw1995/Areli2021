var dateTime = require('node-datetime');

function reporteTrapaso(fecha, usuario_reporte, entrada_salida, traspaso){
    return new Promise((resolved, reject) =>{
      var entrada = " de Recepcion";
      var salida = " de Envio";
      var dt = dateTime.create();

		var content = [];
    var detalle = [];

    if(entrada_salida == "entrada"){
      entrada = " de Envio";
      salida = " de Recepcion";
    }

    detalle.push([{text: entrada.toUpperCase() + ": ", bold: true}, {text: 'FECHA', bold: true}, {text: 'CATEGORIA', bold: true}, {text: 'CODIGO', bold: true}, {text: 'PRODUCTO', bold: true}, {text: 'CANTIDAD', bold: true}, {text: 'ESTIMADO', bold: true}, {text: 'CONCEPTO', bold: true}, {text: 'USUARIO', bold: true}]);
    var total = 0.0;
    for(i=0;i<traspaso.length;i++){
      total = total + parseFloat(traspaso[i]["subTotal"]);
      detalle.push([
        "Suc. " + traspaso[i]["nombre_sucursal"] + "\nAlm.:" + traspaso[i]["nombre_almacen"], 
        traspaso[i]["fecha"] + "\n" + traspaso[i]["hora"],
				traspaso[i]["nombre_categoria"],
				"#"+traspaso[i]["codigo"],
				traspaso[i]["nombre"],
				traspaso[i]["cant_medida"],
        "Bs. "+ traspaso[i]["subTotal"],
        traspaso[i]["concepto"],
        traspaso[i]["usuario"]
			]);
    }
    detalle.push([{text: '', bold: true}, {text: '', bold: true}, {text: '', bold: true}, {text: '', bold: true}, {text: '', bold: true}, {text: 'TOTAL Bs.:', bold: true}, {text: total, bold: true}, {text: '', bold: true}, {text: '', bold: true}]);

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE TRASPASO ' + salida.toUpperCase()});
    content.push({ fontSize: 9, text: '\n' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal ' + salida  + ": " +  traspaso[0]["nombre_sucursal_rec"]},
        { fontSize: 9, alignment: 'left', text: 'Fecha: ' + fecha}
      ]
    });
    content.push({
      columns: [
        { fontSize: 9, text: 'Almacen' + salida  + ": " +  traspaso[0]["nombre_almacen_rec"]},
        { fontSize: 9, alignment: 'left', text: 'Usuario: ' + usuario_reporte}
      ]
    });
    content.push({ fontSize: 9, text: '\n' });
    content.push({ fontSize: 9, text: 'La siguiente tabla muestra los productos que fueron transferidos. ', italics: true });
    content.push({ fontSize: 8, text: 'La columna "ESTIMADO" muestra el subtotal de la cantidad transferida por el precio sugerido actual del sistema. ', italics: true });
    content.push({ fontSize: 9, text: '\n\n' });

    content.push({
			fontSize: 7, alignment: 'center',
			table: {
				headerRows: 1,
				body: detalle
			},
			layout: 'lightHorizontalLines'
		});

  

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE VERIFICACION'});
    return resolved(content);
    })
}

module.exports = {
  reporteTrapaso
}