const { numeroALetras } = require('../libreria/numeroletra');


function notaEntregaVentaCarta(nro_venta_inicio, nro_venta_final, venta){
  return new Promise((resolved, reject) =>{

		var content = [];
    var detalle = [];
    var venta_preventa = "";
    var var_venta_pre_venta = "";
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

      fecha = venta[0]["fecha"];
      cliente = venta[0]["tipo"] + " " + venta[0]["nombre_tienda"];
      nombre_contacto = venta[0]["nombre_contacto"];
      detalle.push([{text: 'CANTIDAD', bold: true}, {text: 'DETALLE', bold: true}, {text: 'PRECIO UNIT.', bold: true}, {text: 'MONTO', bold: true}, {text: 'DESC. UNIT', bold: true}, {text: 'DESCUENTO', bold: true}, {text: 'SUBTOTAL', bold: true}]);

      for(i=0;i<venta.length;i++){
        
        if(nro_venta != venta[i][var_venta_pre_venta]){
          total = total.toFixed(2);
          var totalLetra = numeroALetras(total);

          content.push({ fontSize: 15, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });
          content.push({ fontSize: 9, alignment: 'center', text: '\n' });
          content.push({
            columns: [
              { fontSize: 10, alignment: 'left', text: 'Cliente : ' + cliente },
              { fontSize: 10, alignment: 'right', text: venta_preventa + nro_venta }
            ]
          });
          content.push({
            columns: [
              { fontSize: 10, alignment: 'left', text: 'Nombre : ' + nombre_contacto },
              { fontSize: 10, alignment: 'right', text: 'Fecha: ' + fecha }
            ]
          });
          content.push({ fontSize: 9, text: '\n' });

          content.push({
            style: 'tableExample',
            fontSize: 8, alignment: 'center',
            table: {
              widths: [45, 110, 55, 55, 55, 55, 60],
              headerRows: 1,
              body: detalle
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return 'black';
              },
              vLineColor: function (i, node) {
                return 'black';
              },
              hLineStyle: function (i, node) {
                if (i === 0 || i === node.table.body.length) {
                  return null;
                }
                return {dash: {length: 10, space: 4}};
              },
              vLineStyle: function (i, node) {
                if (i === 0 || i === node.table.widths.length) {
                  return null;
                }
                return {dash: {length: 4}};
              },
            }
          });
        
          content.push({ fontSize: 9, text: '\n' });
          content.push({
            columns: [
              { fontSize: 10, alignment: 'left', text: 'SON: ' + totalLetra},
              { fontSize: 10, alignment: 'right', bold: true, text: 'TOTAL: Bs. ' + total}
            ]
          });
          content.push({ fontSize: 9, text: '\n' });
          content.push({ fontSize: 9, italics: true, alignment: 'center', text: '"Gracias por su compra"', pageBreak: 'after'});

          total = 0.0;
          nro_venta = venta[i][var_venta_pre_venta];
          fecha = venta[i]["fecha"];
          cliente = venta[i]["tipo"] + " " + venta[i]["nombre_tienda"];
          nombre_contacto = venta[i]["nombre_contacto"];
          detalle = [];
          detalle.push([{text: 'CANTIDAD', bold: true}, {text: 'DETALLE', bold: true}, {text: 'PRECIO UNIT.', bold: true}, {text: 'MONTO', bold: true}, {text: 'DESC. UNIT', bold: true}, {text: 'DESCUENTO', bold: true}, {text: 'SUBTOTAL', bold: true}]);
        }

        detalle.push([
          venta[i]["cant_medida"],
          "#"+venta[i]["codigo"] + " " + venta[i]["nombre"],
          "Bs. " + venta[i]["precio"].toFixed(2),
          "Bs. " + venta[i]["total"].toFixed(2),
          "Bs. " + venta[i]["descuento_unit"].toFixed(2),
          "Bs. " + (venta[i]["descuento_unit"] * venta[i]["cantidad"]).toFixed(2),
          "Bs. "+venta[i]["total_descuento"].toFixed(2)
        ]);
        total = total + parseFloat(venta[i]["total_descuento"]);

        if((i+1) == venta.length){
          total = total.toFixed(2);
          var totalLetra = numeroALetras(total);

          content.push({ fontSize: 15, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });
          content.push({ fontSize: 9, alignment: 'center', text: '\n' });
          content.push({
            columns: [
              { fontSize: 10, alignment: 'left', text: 'Cliente : ' + cliente },
              { fontSize: 10, alignment: 'right', text: venta_preventa + nro_venta }
            ]
          });
          content.push({
            columns: [
              { fontSize: 10, alignment: 'left', text: 'Nombre : ' + nombre_contacto },
              { fontSize: 10, alignment: 'right', text: 'Fecha: ' + fecha }
            ]
          });
          content.push({ fontSize: 9, text: '\n' });

          content.push({
            style: 'tableExample',
            fontSize: 8, alignment: 'center',
            table: {
              widths: [45, 110, 55, 55, 55, 55, 60],
              headerRows: 1,
              body: detalle
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return 'black';
              },
              vLineColor: function (i, node) {
                return 'black';
              },
              hLineStyle: function (i, node) {
                if (i === 0 || i === node.table.body.length) {
                  return null;
                }
                return {dash: {length: 10, space: 4}};
              },
              vLineStyle: function (i, node) {
                if (i === 0 || i === node.table.widths.length) {
                  return null;
                }
                return {dash: {length: 4}};
              },
            }
          });
        
          content.push({ fontSize: 9, text: '\n' });
          content.push({
            columns: [
              { fontSize: 10, alignment: 'left', text: 'SON: ' + totalLetra},
              { fontSize: 10, alignment: 'right', bold: true, text: 'TOTAL: Bs. ' + total}
            ]
          });
          content.push({ fontSize: 9, text: '\n' });
          content.push({ fontSize: 9, italics: true, alignment: 'center', text: '"Gracias por su compra"' });
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
  notaEntregaVentaCarta
}