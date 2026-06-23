import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


export default function AgregarProducto() {
    const navigation = useNavigation<any>();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [url_fotografia, setUrlFotografia] = useState('');

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

    async function guardarProducto() {
        try {
            await fetch('http://192.168.1.4:5000/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre, descripcion, precio, estado, categoria, url_fotografia
                })
            });

            setNombre(''); setDescripcion(''); setPrecio(''); 
            setEstado(''); setCategoria(''); setUrlFotografia('');
            
            alert('Producto Guardado');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput placeholder='Nombre' value={nombre} onChangeText={setNombre} style={styles.input} />
            <TextInput placeholder='Descripcion' value={descripcion} onChangeText={setDescripcion} style={styles.input} />
            <TextInput placeholder='Estado' value={estado} onChangeText={setEstado} style={styles.input} />
            <TextInput placeholder='Categoria' value={categoria} onChangeText={setCategoria} style={styles.input} />
            <TextInput placeholder='Precio' value={precio} onChangeText={setPrecio} keyboardType="numeric" style={styles.input} />

            <View style={styles.imgContainer}>
                {url_fotografia !== '' ? (
                    <Image source={{ uri: url_fotografia }} style={styles.imagen} />
                ) : (
                    <View style={styles.placeholder}><Text>Fotografía Item</Text></View>
                )}
            </View>

            <View style={{ marginBottom: 10 }}>
                <Button title='Tomar Foto' onPress={tomarFoto} color="#f0a500" />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Button title='Guardar' onPress={guardarProducto} color="#2196F3" />
            </View>
            <View>
                <Button title='Detalle items' onPress={() => navigation.navigate('Lista')} color="#4caf50" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    input: { borderWidth: 1, borderColor: '#000', marginBottom: 15, padding: 8, borderRadius: 5, textAlign: 'center' },
    imgContainer: { alignItems: 'center', marginBottom: 15 },
    imagen: { width: 120, height: 120, borderWidth: 2, borderColor: '#f0a500' },
    placeholder: { width: 120, height: 120, borderWidth: 2, borderColor: '#f0a500', justifyContent: 'center', alignItems: 'center' }
});