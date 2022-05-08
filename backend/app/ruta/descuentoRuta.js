const {
  agregarDescuentoTicket,
  agregarDescuentoCantidad,
  actualizarEstadoDescuentoTicketById,
  actualizarEstadoDescuentoCantidadById,
  descuentoTicketBySucursalCategoriaTiendaMonto,
  descuentoCantidadBySucursalProductoCategoriaTiendaCantidad,
  listaDescuentoCantidadAleatorioByEstado,
  listaDescuentoTicketBySucursal,
  listaDescuentoCantidadBySucursalProductoCategoria,
  listaDescuentoCantidadBySucursalProductoGrupo
} = require('../controlador/descuentoControlador');

const ruta = require('express').Router();

ruta.post('/descuento/agregarDescuentoTicket', async (req, res) => {
    const { id, nombre, id_sucursal, id_tienda_categoria, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa } = req.body;
    try{
        var resultado = await agregarDescuentoTicket(id, nombre, id_sucursal, id_tienda_categoria, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
});

ruta.post('/descuento/agregarDescuentoCantidad', async (req, res) => {
  const { id_sucursal, id_producto_grupo, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await agregarDescuentoCantidad(id_sucursal, id_producto_grupo, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/descuento/actualizarEstadoDescuentoTicketById', async (req, res) => {
  const { estado, id, id_empresa } = req.body;
  try{
      var resultado = await actualizarEstadoDescuentoTicketById(estado, id, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/descuento/actualizarEstadoDescuentoCantidadById', async (req, res) => {
const { estado, id, id_empresa } = req.body;
try{
    var resultado = await actualizarEstadoDescuentoCantidadById(estado, id, id_empresa);

    res.json(resultado);
  }catch(error){
    res.json(error);
  }

});

ruta.post('/descuento/descuentoTicketBySucursalCategoriaTiendaMonto', async (req, res) => {
  const { id_sucursal, id_tienda_categoria, monto, estado, id_empresa } = req.body;
  try{
      var resultado = await descuentoTicketBySucursalCategoriaTiendaMonto(id_sucursal, id_tienda_categoria, monto, estado, id_empresa);
  
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
  
  });

  ruta.post('/descuento/descuentoCantidadBySucursalProductoCategoriaTiendaCantidad', async (req, res) => {
    const { id_sucursal, id_producto_empresa, id_tienda_categoria, cantidad, estado, id_empresa } = req.body;
    try{
        var resultado = await descuentoCantidadBySucursalProductoCategoriaTiendaCantidad(id_sucursal, id_producto_empresa, id_tienda_categoria, cantidad, estado, id_empresa);
    
        res.json(resultado);
      }catch(error){
        res.json(errors);
      }
    
    });

    ruta.post('/descuento/listaDescuentoCantidadAleatorioByEstado', async (req, res) => {
      const { estado } = req.body;
      try{
          var resultado = await listaDescuentoCantidadAleatorioByEstado(estado);
      
          res.json(resultado);
        }catch(error){
          res.json(error);
        }
      
      });

    
ruta.post('/descuento/listaDescuentoTicketBySucursal', async (req, res) => {
const { id_sucursal, id_empresa } = req.body;
try{
    var resultado = await listaDescuentoTicketBySucursal(id_sucursal, id_empresa);

    res.json(resultado);
  }catch(error){
    res.json(error);
  }

});

ruta.post('/descuento/listaDescuentoCantidadBySucursalProductoCategoria', async (req, res) => {
  const { id_sucursal, id_producto_empresa, id_tienda_categoria, estado, id_empresa } = req.body;
  try{
      var resultado = await listaDescuentoCantidadBySucursalProductoCategoria(id_sucursal, id_producto_empresa, id_tienda_categoria, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/descuento/listaDescuentoCantidadBySucursalProductoGrupo', async (req, res) => {
  const { id_sucursal, id_producto_grupo, estado, id_empresa } = req.body;
  try{
      var resultado = await listaDescuentoCantidadBySucursalProductoGrupo(id_sucursal, id_producto_grupo, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

module.exports = ruta;