
function reportePreVentaProducto(sucursal, fecha, tipo, tipo_nombre, usuario_reporte, usuario_pre_venta_reporte, venta){
    return new Promise((resolved, reject) =>{

		var content = [];
    var detalle = [];
    var total = 0.00;


    detalle.push([{text: 'CATEGORIA', bold: true}, {text: 'CODIGO', bold: true}, {text: 'PRODUCTO', bold: true}, {text: 'CANTIDAD', bold: true}, {text: 'TOTAL', bold: true}]);
    for(i=0;i<venta.length;i++){
      total = total + venta[i]["total"];

      detalle.push([
				venta[i]["nombre_categoria"],
				"#"+venta[i]["codigo"],
				venta[i]["nombre"],
				venta[i]["cant_medida"],
        "Bs. "+venta[i]["total"]
			]);
    }
    total = total.toFixed(2);

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE VENTA - PRODUCTO' });
    content.push({ fontSize: 9, alignment: 'center', text: '\n' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal : ' + sucursal},
        { fontSize: 9, alignment: 'left', text: 'Fecha: ' + fecha}
      ]
    });
    if(tipo == "5"){
      content.push({
        columns: [
          { fontSize: 9, text: 'Tipo : ' + tipo_nombre},
          { fontSize: 9, alignment: 'left', text: 'Vendedor: ' + usuario_pre_venta_reporte},
          { fontSize: 9, alignment: 'left', text: 'Distribuidor: ' + usuario_reporte}
        ]
      });
    }else{
      content.push({
        columns: [
          { fontSize: 9, text: 'Tipo : ' + tipo_nombre},
          { fontSize: 9, alignment: 'left', text: 'Vendedor: ' + usuario_reporte}
        ]
      });
    }
    
    if(venta.length > 0){
      content.push({ fontSize: 9, text: '\n' });
      content.push({ fontSize: 9, text: 'La siguiente tabla muestra la lista de productos. ', italics: true });
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
      content.push({ fontSize: 9, text: 'No se encontro resultados de la busqueda, No existen ventas. ', italics: true , alignment: "center"});
      content.push({ fontSize: 9, text: '\n' });
    }
    

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE VERIFICACION DE DATOS'});
    return resolved(content);
    })
}

module.exports = {
  reportePreVentaProducto
}