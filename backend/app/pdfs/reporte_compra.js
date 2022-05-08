
function reporteCompra(almacen, sucursal, fecha, usuario, compra){
    return new Promise((resolved, reject) =>{

		var content = [];
    var detalle = [];
    var total = 0.00;


    detalle.push([{text: 'NRO COMPRA', bold: true}, {text: 'FECHA - HORA', bold: true}, {text: 'CONCEPTO', bold: true}, {text: 'TOTAL', bold: true}, {text: 'USUARIO', bold: true}]);
    for(i=0;i<compra.length;i++){
      total = total + compra[i]["total"];
      detalle.push([
				compra[i]["nro_compra"],
				compra[i]["fecha"]+" - "+compra[i]["hora"],
				compra[i]["concepto"],
        "Bs. "+compra[i]["total"],
				compra[i]["usuario"]
			]);
    }

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE COMPRA' });
    content.push({ fontSize: 9, alignment: 'center', text: '\n' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Almacen : ' + almacen},
        { fontSize: 9, alignment: 'left', text: 'Fecha: ' + fecha}
      ]
    });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal : ' + sucursal},
        { fontSize: 9, alignment: 'left', text: 'Usuario: ' + usuario}
      ]
    });
    if(compra.length > 0){
      content.push({ fontSize: 9, text: '\n' });
      content.push({ fontSize: 9, text: 'La siguiente tabla muestra la lista de compras realizadas. ', italics: true });
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
    }else{
      content.push({ fontSize: 9, text: '\n' });
      content.push({ fontSize: 9, text: 'No se encontro resultados de la busqueda, No existen compras. ', italics: true , alignment: "center"});
      content.push({ fontSize: 9, text: '\n' });
    }
    

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE VERIFICACION DE DATOS'});
    return resolved(content);
    })
}

module.exports = {
  reporteCompra
}