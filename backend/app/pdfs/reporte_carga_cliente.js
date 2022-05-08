
function reporteCargaCliente(sucursal, fecha, usuario_reporte, estado, carga){
    return new Promise((resolved, reject) =>{

		var content = [];
    var detalle = [];
    var total = 0.00;


    detalle.push([{text: 'NRO PRE VENTA', bold: true}, {text: 'FECHA - HORA', bold: true}, {text: 'CLIENTE', bold: true}, {text: 'VENDEDOR', bold: true}, {text: 'TOTAL', bold: true}]);
    for(i=0;i<carga.length;i++){
      total = total + carga[i]["total"];

      detalle.push([
				carga[i]["nro_pre_venta"],
				carga[i]["fecha"]+" - "+carga[i]["hora"],
				carga[i]["nombre_tienda"] + " (" + carga[i]["nombre_contacto"] + ")",
				carga[i]["usuario"],
        "Bs. "+carga[i]["total"]
			]);
    }

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE CARGA - CLIENTE' });
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
      content.push({ fontSize: 9, text: 'La siguiente tabla muestra la lista de clientes de cual se tiene ' + estado, italics: true });
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
      content.push({ fontSize: 9, text: 'No se encontro resultados de la busqueda, No existen clientes. ', italics: true , alignment: "center"});
      content.push({ fontSize: 9, text: '\n' });
    }
    

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE VERIFICACION DE DATOS'});
    return resolved(content);
    })
}

module.exports = {
  reporteCargaCliente
}