const ruta = require('express').Router();
const path = require('path');
const fs = require('fs')

ruta.get('/imagenes/:carpeta/:imagen', async (req, res) => {
    const { carpeta, imagen } = req.params;
    var rutaImagen = path.join(__dirname, '..', 'imagenes', carpeta);
    if(fs.existsSync(rutaImagen + "/" + imagen)){
        res.sendFile(imagen, { root: rutaImagen });
      } else {
        res.sendFile("sin_imagen.jpg", { root: path.join(__dirname, '..', 'imagenes') });
      }
});

module.exports = ruta;