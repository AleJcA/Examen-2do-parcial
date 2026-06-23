const express = require('express');
const Producto = require('./modelos/Producto');

var cors = require('cors')
const app = express();


app.use(express.json());
app.use(cors());


app.get('/productos', async(req,res)=>{

    try{

        const productos = await Producto.findAll();

        return res.status(200).json({
            message:'Productos obtenidos',
            data:productos
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

app.post('/productos', async(req,res)=>{

    try{

        const producto = await Producto.create(req.body);

        return res.status(200).json({
            message:'Producto creado',
            data:producto
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

app.delete('/productos/:id', async(req,res)=>{

    try{

        const producto = await Producto.destroy({
            where:{
                idProducto:req.params.id
            }
        });

        return res.status(200).json({
            message:'Producto eliminado',
            data:producto
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});