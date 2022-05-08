const {
    listaUsuarios
} = require('../controlador/pruebaControlador');

async function tcpUsuario(datos, socket){
    switch (datos.metodo) {
        case 'listaUsuarios':
          try{
            var resultado = await listaUsuarios(datos.estado);
            socket.write(JSON.stringify(resultado)+"\n");
          }catch(error){
            socket.write(JSON.stringify(error)+"\n");
          }
          break;
        default:
            socket.write(JSON.stringify('{"nodejs":"No se encontro el modulo"}')+"\n");
    }
}

module.exports = {
    tcpUsuario
}