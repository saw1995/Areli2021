
function reportePreVentaCliente(sucursal, fecha, tipo, tipo_nombre, estado_nombre, usuario_reporte, pre_venta){
    return new Promise((resolved, reject) =>{

		var content = [];
    var detalle = [];
    var total = 0.00;


    detalle.push([{text: 'NRO VENTA', bold: true}, {text: 'FECHA - HORA', bold: true}, {text: 'FECHA ENTREGA', bold: true}, {text: 'VENDEDOR', bold: true}, {text: 'CLIENTE', bold: true}, {text: 'TIPO', bold: true}, {text: 'ESTADO', bold: true}, {text: 'TOTAL', bold: true}]);
    for(i=0;i<pre_venta.length;i++){
      total = total + pre_venta[i]["total"];
      venta_tipo = '';
      estado = '';

      if(pre_venta[i]["venta_inicio"] == "0") venta_tipo = 'Pre Venta';
      if(pre_venta[i]["venta_inicio"] == "5") venta_tipo = 'Venta con Reserva';

      if(pre_venta[i]["venta"] == "0") estado = 'Pendiente';
      if(pre_venta[i]["venta"] == "1") estado = 'Vendido';
      if(pre_venta[i]["venta"] == "2") estado = 'Cancelado por el Usuario';
      if(pre_venta[i]["venta"] == "3") estado = 'En Distribucion';
      if(pre_venta[i]["venta"] == "4") estado = 'Cancelado por el Distribuidor';
      if(pre_venta[i]["venta"] == "5") estado = 'Pendiente';
      
      detalle.push([
				pre_venta[i]["nro_pre_venta"],
				pre_venta[i]["fecha"]+" - "+pre_venta[i]["hora"],
        pre_venta[i]["fecha_entrega"],
        pre_venta[i]["usuario"],
        pre_venta[i]["nombre_tienda"] + " (" +pre_venta[i]["nombre_contacto"] + ")",
        venta_tipo,
				estado, 
        "Bs. "+pre_venta[i]["total"]
			]);
    }
    total = total.toFixed(2);

		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'REPORTE DE PRE VENTA Y RESERVA' });
    content.push({ fontSize: 9, alignment: 'center', text: '\n' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Sucursal : ' + sucursal},
        { fontSize: 9, alignment: 'left', text: 'Fecha de Entrega: ' + fecha}
      ]
    });
    if(tipo == "0"){
      content.push({
        columns: [
          { fontSize: 9, text: 'Tipo : ' + tipo_nombre},
          { fontSize: 9, text: 'Estado : ' + estado_nombre},
          { fontSize: 9, alignment: 'left', text: 'Vendedor: ' + usuario_reporte},
        ]
      });
    }else{
      content.push({
        columns: [
          { fontSize: 9, text: 'Tipo : ' + tipo_nombre},
          { fontSize: 9, text: 'Estado : ' + estado_nombre},
        ]
      });
    }
    
    if(pre_venta.length > 0){
      content.push({ fontSize: 9, text: '\n' });
      content.push({ fontSize: 9, text: 'La siguiente tabla muestra la lista de ventas realizadas. ', italics: true });
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
      content.push({ fontSize: 9, text: 'No se encontro resultados de la busqueda, No existen pre ventas. ', italics: true , alignment: "center"});
      content.push({ fontSize: 9, text: '\n' });
    }
    

    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '--------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: 'REPONSABLE DE VERIFICACION DE DATOS'});
    return resolved(content);
    })
}

module.exports = {
  reportePreVentaCliente
}