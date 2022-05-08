
function notaEntregaVentaTermica(nro_venta_inicio, nro_venta_final, venta){
  return new Promise((resolved, reject) =>{

		var content = [];
    var venta_preventa = "";
    var var_venta_pre_venta = "";
    var detalle = [];
    var total = 0.00;
    var nro_venta = 0;
    var fecha = "";
    var cliente = "";
    var nombre_contacto = "";

    if(venta.length > 0){
      if(venta[0]["nro_pre_venta"] !== undefined){
        nro_venta = venta[0]["nro_pre_venta"];
        venta_preventa = "Nro. de Pre Venta : ";
        var_venta_pre_venta = "nro_pre_venta";
      }
      if(venta[0]["nro_venta"] !== undefined){
        nro_venta = venta[0]["nro_venta"];
        venta_preventa = "Nro. de Venta : ";
        var_venta_pre_venta = "nro_venta";
      }

      nro_venta = venta[0][var_venta_pre_venta];
      fecha = venta[0]["fecha"];
      cliente = venta[0]["tipo"] + " " + venta[0]["nombre_tienda"];
      nombre_contacto = venta[0]["nombre_contacto"];
      detalle.push([{text: 'CANT.', bold: true}, {text: 'DETALLE', bold: true}, {text: 'P/UNIT.', bold: true}, {text: 'SUBTOTAL', bold: true}]);

      for(i=0;i<venta.length;i++){
        
        if(nro_venta != venta[i][var_venta_pre_venta]){
          total = total.toFixed(2);

          content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });
          content.push({ fontSize: 9, alignment: 'center', text: '\n' });
          content.push({
            columns: [
              { fontSize: 9, text: venta_preventa + nro_venta},
              { fontSize: 8, alignment: 'right', text: 'Fecha: ' + fecha}
            ]
          });
          content.push({ fontSize: 8, alignment: 'left', text: 'Cliente : ' + cliente });
          content.push({ fontSize: 8, alignment: 'left', text: 'Nombre : ' + nombre_contacto });
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
          content.push({ fontSize: 9, text: '\n' });
          content.push({ fontSize: 8, italics: true, alignment: 'center', text: '"Gracias por su compra"', pageBreak: 'after'});

          total = 0.0;
          nro_venta = venta[i][var_venta_pre_venta];
          fecha = venta[i]["fecha"];
          cliente = venta[i]["tipo"] + " " + venta[i]["nombre_tienda"];
          nombre_contacto = venta[i]["nombre_contacto"];
          detalle = [];
          detalle.push([{text: 'CANT.', bold: true}, {text: 'DETALLE', bold: true}, {text: 'P/UNIT.', bold: true}, {text: 'SUBTOTAL', bold: true}]);
        }

        contPrecio = [];
        if(parseFloat(venta[i]["precio"]) != parseFloat(venta[i]["precio_descuento"])){
          contPrecio.push({ fontSize: 7, decoration: 'lineThrough', alignment: 'center', text: "Bs. " + venta[i]["precio"].toFixed(2) });
        }
        contPrecio.push({ alignment: 'center', text: "Bs. " + venta[i]["precio_descuento"].toFixed(2) });

        detalle.push([
          venta[i]["cant_medida"],
          "#"+venta[i]["codigo"] + " " + venta[i]["nombre"],
          contPrecio,
          "Bs. "+venta[i]["total_descuento"].toFixed(2)
        ]);
        total = total + parseFloat(venta[i]["total_descuento"]);

        if((i+1) == venta.length){
          total = total.toFixed(2);

          content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });
          content.push({ fontSize: 9, alignment: 'center', text: '\n' });
          content.push({
            columns: [
              { fontSize: 9, text: venta_preventa + nro_venta},
              { fontSize: 9, alignment: 'right', text: 'Fecha: ' + fecha}
            ]
          });
          content.push({ fontSize: 9, alignment: 'left', text: 'Cliente : ' + cliente });
          content.push({ fontSize: 9, alignment: 'left', text: 'Nombre : ' + nombre_contacto });
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
          content.push({ fontSize: 9, text: '\n' });
          content.push({ fontSize: 8, italics: true, alignment: 'center', text: '"Gracias por su compra"' });
        }
      }
    }else{
      content.push({ fontSize: 9, text: '\n' });
      content.push({ fontSize: 9, text: 'No se encontro notas de entrega del ' + nro_venta_inicio + ' al ' + nro_venta_final + ' en la busqueda. ', italics: true , alignment: "center"});
      content.push({ fontSize: 9, text: '\n' });
    }
    return resolved(content);
  })
}

module.exports = {
  notaEntregaVentaTermica
}