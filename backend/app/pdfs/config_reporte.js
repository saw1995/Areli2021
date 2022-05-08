const empresaModelo = require('../modelo/empresaModelo');
const usuarioModelo = require('../modelo/usuarioModelo');
const path = require('path');
var dateTime = require('node-datetime');

function header(id_sucursal, id_empresa, id_usuario){
  return new Promise(async (resolved, reject) =>{
    try{
      var cabecera;
      if(id_sucursal == "1"){
        cabecera = await empresaModelo.empresaById(id_empresa);
        cabecera[0]["nombre_empresa"] = cabecera[0]["nombre"];
        cabecera[0]["nombre_sucursal"] = "Sin Sucursal";
      }else{
        cabecera = await empresaModelo.cabezeraReporteByIdEmpresa(id_sucursal, id_empresa);
      }
      var usuarioImpresion = await usuarioModelo.usuarioById(id_empresa, id_usuario);
      var dt = dateTime.create();
      const fecha = dt.format('d/m/Y');
      const hora = dt.format('H:M:S');
      var header = [];

      header.push({
        columns: [
          {
            width: 'auto',
            stack:[
              { image: path.join(__dirname, '..', 'imagenes', 'empresas', cabecera[0]["logo"]), width: 60},
            ]
          },
          {
            width: '*',
            margin: [ 5, 5 ],
            stack:[
              { fontSize: 11, text: cabecera[0]["nombre_empresa"].toUpperCase(), bold: true },
              { fontSize: 10, text: "De: " + cabecera[0]["propietario"] },
              { fontSize: 9, text: '"'+cabecera[0]["descripcion"]+'"', italics: true }
            ]
          },
          {
            width: '*',
            alignment: 'center',
            margin: [ 5, 5 ],
            stack:[
              { fontSize: 8, text: 'DETALLES DE IMPRESION', bold: true},
              { fontSize: 8, text: 'Sucursal: ' + cabecera[0]["nombre_sucursal"]},
              { fontSize: 8, text: 'Personal: ' + usuarioImpresion[0]["nombre"] + " " + usuarioImpresion[0]["appat"] + " " + usuarioImpresion[0]["apmat"]},
              { fontSize: 8, text: 'Fecha y Hora: ' + fecha + ' - ' + hora}
            ],
          },
        ]
      });	
      header.push({canvas: [{ type: 'line', x1: 0, y1: 5, x2: 580-2*40, y2: 5, lineWidth: 2 }]});	
      header.push({canvas: [{ type: 'line', x1: 0, y1: 5, x2: 580-2*40, y2: 5, lineWidth: 1 }]});	
      return resolved(header);
    }catch(error){
      console.log(error)
      return resolved({"mysql":error});
    }
  })
}

function footer(){
    return new Promise((resolved, reject) =>{
		//var content = [];
        //content.push({ fontSize: 10, bold: true, alignment: 'center', text: 'NOTA DE ENTREGA' });	
        return resolved({
          columns: [
            'Left part',
            { text: 'Right part', alignment: 'right' }
          ]
        });
    })
}

module.exports = {
    header,
    footer
}