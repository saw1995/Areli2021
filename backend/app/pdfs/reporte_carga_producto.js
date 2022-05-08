
function reporteCargaProducto(sucursal, fecha, usuario_reporte, estado, carga){
    return new Promise((resolved, reject) =>{

		var content = [];
    var detalle = [];
    var total = 0.00;


    detalle.push([{text: 'CATEGORIA', bold: true}, {text: 'CODIGO', bold: true}, {text: 'PRODUCTO', bold: true}, {text: 'CANTIDAD', bold: true}, {text: 'TOTAL', bold: true}]);
    for(i=0;i<carga.length;i++){
      total = total + carga[i]["total"];

      detalle.push([
				carga[i]["nombre_categoria"],
				"#"+carga[i]["codigo"],
				carga[i]["nombre"],
				carga[i]["cant_medida"],
        "Bs. "+carga[i]["total"]
			]);
    }

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE CARGA - PRODUCTO' });
    content.push({ fontSize: 9, alignment: 'center', text: '\n' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal : ' + sucursal},
        { fontSize: 9, alignment: 'left', text: 'Distribuidor: ' + usuario_reporte}
      ]
    });
    content.push({
      columns: [
        { fontSize: 9, alignment: 'left', text: 'Fecha: ' + fecha},
        { fontSize: 9, alignment: 'left', text: 'Estado: ' + estado}
      ]
    });
    if(carga.length > 0){
      content.push({ fontSize: 9, text: '\n' });
      content.push({ fontSize: 9, text: 'La siguiente tabla muestra la lista de productos que contiene la ' + estado, italics: true });
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
      content.push({ fontSize: 9, text: 'No se encontro resultados de la busqueda, No existen productos. ', italics: true , alignment: "center"});
      content.push({ fontSize: 9, text: '\n' });
    }
    

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE VERIFICACION DE DATOS'});
    return resolved(content);
    })
}

module.exports = {
  reporteCargaProducto
}