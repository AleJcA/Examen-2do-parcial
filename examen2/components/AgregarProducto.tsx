import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface AgregarProductoProps {
    onGuardar: (producto: {
        nombre: string;
        descripcion: string;
        precio: string;
        estado: string;
        categoria: string;
        url_fotografia: string;
    }) => void;
}

export default function AgregarProducto({ onGuardar }: AgregarProductoProps) {
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');
    const [estado, setEstado] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [url_fotografia, setUrlFotografia] = useState<string>('');

    async function tomarFoto() {
        const permiso = await ImagePicker.requestCameraPermissionsAsync();
        if (!permiso.granted) {
            alert('Permiso denegado');
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({ quality: 1 });
        if (!resultado.canceled) {
            setUrlFotografia(resultado.assets[0].uri);
        }
    }

    const manejarGuardar = () => {
        if (!nombre || !precio) {
            alert('Por favor ingresa al menos el nombre y el precio');
            return;
        }
        onGuardar({ nombre, descripcion, precio, estado, categoria, url_fotografia });
        
        // Limpiar formulario
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setEstado('');
        setCategoria('');
        setUrlFotografia('');
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder='Nombre' value={nombre} onChangeText={setNombre} style={styles.input} />
            <TextInput placeholder='Descripción' value={descripcion} onChangeText={setDescripcion} style={styles.input} />
            <TextInput placeholder='Precio' value={precio} onChangeText={setPrecio} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder='Estado' value={estado} onChangeText={setEstado} style={styles.input} />
            <TextInput placeholder='Categoría' value={categoria} onChangeText={setCategoria} style={styles.input} />

            <Button title='Tomar Fotografía' onPress={tomarFoto} />
            {url_fotografia !== '' && (
                <Image source={{ uri: url_fotografia }} style={styles.previewImage} />
            )}
            <View style={{ marginTop: 10 }}>
                <Button title='Guardar Producto' onPress={manejarGuardar} color="#2196F3" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
    input: { borderWidth: 1, borderColor: '#gray', marginBottom: 8, padding: 5, borderRadius: 4 },
    previewImage: { width: 100, height: 100, marginVertical: 10, alignSelf: 'center' }
});