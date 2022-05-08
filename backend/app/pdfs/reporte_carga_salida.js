function picklist(carga, nrocarga){
    return new Promise((resolved, reject) =>{
		var content = [];
    var detalle = [];
    var nros = "";

    for(i=0;i<nrocarga.length;i++){
      nros = nros + nrocarga[i]["nro_carga"] + ", ";
    }
    nros = nros.substring(0, nros.length - 2)

    detalle.push([{text: 'CATEGORIA', bold: true}, {text: 'CODIGO', bold: true}, {text: 'PRODUCTO', bold: true} , {text: 'CANTIDAD', bold: true}]);
    for(i=0;i<carga.length;i++){
      detalle.push([
				carga[i]["nombre_categoria"],
				"#"+carga[i]["codigo"],
				carga[i]["nombre_producto"],
				carga[i]["cant_medida"]
			]);
    }
    
		content.push({ fontSize: 12, bold: true, alignment: 'center', text: 'LISTA SALIDA DE CARGA' });
    content.push({
      columns: [
        { fontSize: 9, text: 'Distribuidor : ' + nrocarga[0]["usuario"]},
        { fontSize: 9, alignment: 'right', text: 'Fecha de Distribucion: ' + nrocarga[0]["fecha_entrega"]}
      ]
    });
    content.push({ fontSize: 9, text: '\n' });
    content.push({ fontSize: 9, text: 'La siguiente tabla reune los productos de las cargas: ' + nros, italics: true });
    content.push({ fontSize: 9, text: '\n' });
    content.push({
			fontSize: 9, alignment: 'center',
			table: {
				headerRows: 1,
				body: detalle
			},
			layout: 'lightHorizontalLines'
		});
    content.push({ fontSize: 9, alignment: 'center', text: '\n\n\n\n\n\n\n\n' });
    content.push({ fontSize: 9, alignment: 'center', text: '------------------------------------------------' });
    content.push({ fontSize: 9, alignment: 'center', text: nrocarga[0]["nombre_rol"]});
    content.push({ fontSize: 9, alignment: 'center', text: nrocarga[0]["usuario"] });
    content.push({ fontSize: 9, alignment: 'center', text: "C.I.: " + nrocarga[0]["ci"] + " " + nrocarga[0]["ci_exp"] });
    return resolved(content);
    })
}

module.exports = {
    picklist
}