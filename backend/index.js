const { app, server } = require('./app/app');

//BASE DE DATOS
require('./app/config/database');

// INICIO SERVIDOR
app.listen(app.get('portHttp'), (error) => {
    if(error){
        console.log(`Error encontrado en : ${error}`);
    }else{
        console.log(`Servidor HTTP en el puerto ${app.get('portHttp')}`);
    }
})

/*server.listen(app.get('portServer'), (error) => {
    if(error){
        console.log(`Error encontrado en : ${error}`);
    }else{
        console.log(`Servidor TCP en el puerto ${app.get('portServer')}`);
    }
})

clientes = []; //<---- VARIABLE GLOBAL EN TODO NODE JS

server.on('connection', function(socket) {
    console.log('Una Nueva Conexion de:',socket.remoteAddress,',',socket.remotePort,'.');
    socket.name = socket.remoteAddress + ":" + socket.remotePort
	//clientes.push(socket);
	
    socket.on('data', function(data) {
		var dt = dateTime.create();
		fecha = dt.format('Y-m-d');
		hora = dt.format('H:M:S');

        var nroCliente = clientes.indexOf(socket);
        var datos = JSON.parse(data.toString());
        console.log(datos);

        if(nroCliente < 0){
            if(datos.controlador === "usuario" && datos.metodo === "usuarioByCiPass"){
                tcpUsuario(datos, socket);
            }else{

            }
        }

        if(nroCliente >= 0){
            switch (datos.controlador) {
                case 'prueba':
                    tcpUsuario(datos, socket);
                  break;
                default:
                  console.log('Lo lamentamos, metodo no encontrado');
            }
        }
	});

    socket.on('end', function() {
		socket.emit('error', new Error('read ECONNRESET'));
		console.log('finalizo la conexion con el cliente' + socket.name);
	});
	
	socket.on('close', function() {
		console.log('Se cerro la conexion con el cliente' + socket.name);
		var num = clientes.indexOf(socket);
		clientes.splice(num, 1);
    });

    socket.on('error', function(err) {
        console.log('Error Detectado mio:', err.stack);
	});
})*/