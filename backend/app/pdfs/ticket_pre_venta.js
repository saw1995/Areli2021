function ticketPreVenta(preventa){
    return new Promise((resolved, reject) =>{
		var content = [];
		var detalle = [];
		var nro_pre_venta = "";
		var fecha = "";
		var tienda = "";

		detalle.push([{text: 'Cant.'}, {text: 'Producto'}, {text: 'P/Unit'} , {text: 'SubTotal'}]);
		var nro = preventa[0]["nro_pre_venta"];
		var total = 0.00;
		for(i=0;i<preventa.length;i++){
			if(nro == preventa[i]["nro_pre_venta"]){
				
			}else{
				content.push({ fontSize: 10, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });
				content.push({ fontSize: 5, text: '\n' });
				content.push({ fontSize: 8, columns: [
								{ text: [ 'Nro. Pre Venta: ', {text: nro_pre_venta, bold: true} ] },
								{ text: [ 'Fecha: ', {text: fecha, bold: true} ] } 
							] });
				content.push({ fontSize: 8, text: [ 'Cliente: ', {text: tienda, bold: true} ] });
				content.push({ fontSize: 3, text: '\n' });
				content.push({ fontSize: 7, alignment: 'center',
								table: {
									headerRows: 1,
									body: detalle
								},
								layout: 'headerLineOnly'
							});
				content.push({ fontSize: 3, text: '\n' });
				content.push({ fontSize: 8, alignment: 'right', text: ['Total: ', {text: 'Bs. ' + total, bold: true}] });
				content.push({ fontSize: 3, text: '\n' });
				content.push({ fontSize: 8, alignment: 'center', text: preventa[i]["usuario_nombre"].substring(0,1) + preventa[i]["usuario_appat"].substring(0,1) + preventa[i]["usuario_apmat"].substring(0,1) });
				content.push({ fontSize: 8, italics: true, alignment: 'center', text: '"Gracias por su compra"', pageOrientation: 'portrait', pageBreak: 'after' });
		
				nro = preventa[i]["nro_pre_venta"];
				detalle = [];
				detalle.push([{text: 'Cant.'}, {text: 'Producto'}, {text: 'P/Unit'} , {text: 'SubTotal'}]);
				total = 0.00;
			}

			nro_pre_venta = preventa[i]["nro_pre_venta"];
			fecha = preventa[i]["fecha_entrega"];
			tienda = preventa[i]["tipo"] + " " + preventa[i]["tienda"];
			total = total + parseFloat(preventa[i]["subTotalDescuento"]);
			detalle.push([
				preventa[i]["cant_medida"] + " " + preventa[i]["medida"],
				" #"+preventa[i]["codigo"] + " " + preventa[i]["nombre"],
				'Bs. ' + preventa[i]["precio_descuento_medida"],
				'Bs. ' + preventa[i]["subTotalDescuento"]
			]);

			if((i+1) == preventa.length){
				content.push({ fontSize: 10, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });
				content.push({ fontSize: 5, text: '\n' });
				content.push({ fontSize: 8, columns: [
								{ text: [ 'Nro. Pre Venta: ', {text: nro_pre_venta, bold: true} ] },
								{ text: [ 'Fecha: ', {text: fecha, bold: true} ] } 
							] });
				content.push({ fontSize: 8, text: [ 'Cliente: ', {text: tienda, bold: true} ] });
				content.push({ fontSize: 3, text: '\n' });
				content.push({ fontSize: 7, alignment: 'center',
								table: {
									headerRows: 1,
									body: detalle
								},
								layout: 'headerLineOnly'
							});
				content.push({ fontSize: 3, text: '\n' });
				content.push({ fontSize: 8, alignment: 'right', text: ['Total: ', {text: 'Bs. ' + total, bold: true}] });
				content.push({ fontSize: 3, text: '\n' });
				content.push({ fontSize: 8, alignment: 'center', text: preventa[i]["usuario_nombre"].substring(0,1) + preventa[i]["usuario_appat"].substring(0,1) + preventa[i]["usuario_apmat"].substring(0,1) });
				content.push({ fontSize: 8, italics: true, alignment: 'center', text: '"Gracias por su compra"' });
			}
		}
		/*content = [
			{
				fontSize: 7, alignment: 'center',
				table: {
					headerRows: 1,
					body: [
						[{text: 'Cant.'}, {text: 'Producto'}, {text: 'P/Unit'} , {text: 'SubTotal'}],
						['000', '#000000 Sample 2 Sample 2 Sample 2 Sample 2', 'Bs. 000.00', 'Bs. 000.00'],
						['000', '#000000 Sample 2 Sample 2 Sample 2 Sample 2', 'Bs. 000.00', 'Bs. 000.00'],
						['000', '#000000 Sample 2 Sample 2 Sample 2 Sample 2', 'Bs. 000.00', 'Bs. 000.00'],
						['000', '#000000 Sample 2 Sample 2 Sample 2 Sample 2', 'Bs. 000.00', 'Bs. 000.00'],
						['000', '#000000 Sample 2 Sample 2 Sample 2 Sample 2', 'Bs. 000.00', 'Bs. 000.00'],
					]
				},
				layout: 'headerLineOnly'
			},
		]*/
		return resolved(content);
    })
}

module.exports = {
    ticketPreVenta
}