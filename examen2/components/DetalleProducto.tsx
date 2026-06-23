import React, { useCallback } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';



export default function DetalleProducto() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const { producto } = route.params || {};

    async function eliminarProducto() {
        try {
            const response = await fetch(`http://192.168.1.4:5000/productos/${producto.idProducto}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Producto eliminado');

                navigation.goBack();
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión');
        }
    }

    if (!producto) {
        return (
            <View style={styles.center}>
                <Text>Ve a la lista y selecciona "Ver" en un producto.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle</Text>
            <Text style={styles.subtitle}>detalles del Producto</Text>

            <View style={{ width: '100%', marginBottom: 20 }}>
                <Text style={styles.text}>Nombre: {producto.nombre}</Text>
                <Text style={styles.text}>Descripción: {producto.descripcion}</Text>
                <Text style={styles.text}>Precio: {producto.precio}</Text>
                <Text style={styles.text}>Estado: {producto.estado}</Text>
                <Text style={styles.text}>Categoría: {producto.categoria}</Text>
            </View>

            {producto.url_fotografia ? (
                <Image source={{ uri: producto.url_fotografia }} style={styles.imagen} />
            ) : (
                <View style={styles.placeholder}><Text>Sin foto</Text></View>
            )}

            <View style={{ marginTop: 20, width: '50%' }}>
                <Button title="Eliminar" color="#ffb6c1" onPress={eliminarProducto} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', alignSelf: 'flex-start' },
    subtitle: { fontSize: 16, marginBottom: 20, alignSelf: 'flex-start' },
    text: { fontSize: 16, marginBottom: 5 },
    imagen: { width: 150, height: 150, borderWidth: 2, borderColor: '#f0a500' },
    placeholder: { width: 150, height: 150, borderWidth: 2, borderColor: '#f0a500', justifyContent: 'center', alignItems: 'center' }
});