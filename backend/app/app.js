const express = require('express');
const fileUpload = require('express-fileupload')
const net = require('net');

//el cors autorizacion par otras app
const cors = require('cors');

const portServer  = (process.env.PORT || 1234)
const portHttp  = (process.env.PORT || 5020)

// INICIALIZACION
const app = express();
var server = net.createServer();

// CONFIGURACION
app.set('portServer', portServer);
app.set('portHttp', portHttp);

// MIDDLEWARES
app.use(cors());
app.use(fileUpload())
app.use(express.urlencoded({extends: true}));
app.use(express.json());
app.use(express.static('imagenes'));

// RUTAS
app.use(require('./ruta/pruebaRuta'));
app.use(require('./ruta/usuarioRuta'));
app.use(require('./ruta/empresaRuta'));
app.use(require('./ruta/rolRuta'));
app.use(require('./ruta/rubroRuta'));
app.use(require('./ruta/sucursalRuta'));
app.use(require('./ruta/almacenRuta'));
app.use(require('./ruta/marcaRuta'));
app.use(require('./ruta/categoriaRuta'));
app.use(require('./ruta/productoRuta'));
app.use(require('./ruta/productoStockRuta'));
app.use(require('./ruta/sistemaRuta'));
app.use(require('./ruta/departamentoRuta'));
app.use(require('./ruta/licenciaRuta'));
app.use(require('./ruta/tiendaRuta'));
app.use(require('./ruta/rutaRuta'));
app.use(require('./ruta/imagenRuta'));
app.use(require('./ruta/compraRuta'));
app.use(require('./ruta/ventaRuta'));
app.use(require('./ruta/descuentoRuta'));
app.use(require('./ruta/cargaRuta'));
app.use(require('./ruta/promocionRuta'));
app.use(require('./ruta/traspasoRuta'));
app.use(require('./ruta/auxRuta'));
app.use(require('./ruta/ajusteRuta'));
app.use(require('./ruta/liquidacionRuta'));

module.exports = {
    app,
    server
}