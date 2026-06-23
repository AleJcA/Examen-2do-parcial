import { View, Text, FlatList, TextInput, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Producto } from '../modelos/Producto';

export default function Productos() {

    const [listaProductos, setListaProductos] = useState<Producto[]>([]);

    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [url_fotografia, setUrlFotografia] = useState<string>('');

    async function obtenerProductos() {

        const response = await fetch('http://localhost:5000/productos');
        const data = await response.json();

        setListaProductos(data.data);
    }

    async function guardarProducto() {

        await fetch('http://localhost:5000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                precio,
                estado,
                categoria,
                url_fotografia
            })
        });

        obtenerProductos();

        setNombre('');
        setDescripcion('');
        setPrecio('');
        setEstado('');
        setCategoria('');
        setUrlFotografia('');
    }

    async function eliminarProducto(id:number) {

        await fetch(`http://localhost:5000/productos/${id}`, {
            method:'DELETE'
        });

        obtenerProductos();
    }

    async function tomarFoto() {

        const permiso = await ImagePicker.requestCameraPermissionsAsync();

        if (!permiso.granted) {
            alert('Permiso denegado');
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({
            quality: 1
        });

        if (!resultado.canceled) {
            setUrlFotografia(resultado.assets[0].uri);
        }
    }

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <View>

            <Text>Administración de Productos</Text>

            <TextInput
                placeholder='Nombre'
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                placeholder='Descripción'
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TextInput
                placeholder='Precio'
                value={precio}
                onChangeText={setPrecio}
            />

            <TextInput
                placeholder='Estado'
                value={estado}
                onChangeText={setEstado}
            />

            <TextInput
                placeholder='Categoría'
                value={categoria}
                onChangeText={setCategoria}
            />

            <Button
                title='Tomar Fotografía'
                onPress={tomarFoto}
            />

            {
                url_fotografia !== '' &&
                <Image
                    source={{ uri: url_fotografia }}
                    style={{
                        width: 100,
                        height: 100
                    }}
                />
            }

            <Button
                title='Guardar Producto'
                onPress={guardarProducto}
            />

            <FlatList
                data={listaProductos}
                keyExtractor={(item) => item.idProducto.toString()}
                renderItem={({ item }) =>

                    <View>

                        <Text>
                            {item.nombre}
                        </Text>

                        <Text>
                            {item.descripcion}
                        </Text>

                        <Text>
                            L. {item.precio}
                        </Text>

                        <Text>
                            {item.estado}
                        </Text>

                        <Text>
                            {item.categoria}
                        </Text>

                        {
                            item.url_fotografia &&
                            <Image
                                source={{ uri: item.url_fotografia }}
                                style={{
                                    width: 100,
                                    height: 100
                                }}
                            />
                        }

                        <Button
                            title='Eliminar'
                            onPress={() => eliminarProducto(item.idProducto)}
                        />

                    </View>

                }
            />

        </View>
    )
}