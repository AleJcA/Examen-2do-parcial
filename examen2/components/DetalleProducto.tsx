import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Producto } from '../modelos/Producto';

interface DetalleProductoProps {
    producto: Producto | null;
    onEliminar: (id: number) => void;
}

export default function DetalleProducto({ producto, onEliminar }: DetalleProductoProps) {
    if (!producto) {
        return (
            <View style={styles.container}>
                <Text style={styles.infoText}>Selecciona un producto de la lista para ver sus detalles.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalles del Producto</Text>
            <Text style={styles.label}>Nombre: <Text style={styles.valor}>{producto.nombre}</Text></Text>
            <Text style={styles.label}>Descripción: <Text style={styles.valor}>{producto.descripcion}</Text></Text>
            <Text style={styles.label}>Precio: <Text style={styles.valor}>L. {producto.precio}</Text></Text>
            <Text style={styles.label}>Estado: <Text style={styles.valor}>{producto.estado}</Text></Text>
            <Text style={styles.label}>Categoría: <Text style={styles.valor}>{producto.categoria}</Text></Text>
            
            {producto.url_fotografia ? (
                <Image source={{ uri: producto.url_fotografia }} style={styles.imagen} />
            ) : null}

            <View style={{ marginTop: 15 }}>
                <Button 
                    title='Eliminar Producto' 
                    color="red" 
                    onPress={() => onEliminar(producto.idProducto)} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, margin: 10, borderWidth: 1, borderColor: '#ddd' },
    titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    label: { fontWeight: 'bold', marginVertical: 2, color: '#555' },
    valor: { fontWeight: 'normal', color: '#000' },
    infoText: { fontStyle: 'italic', color: '#777', textAlign: 'center' },
    imagen: { width: 150, height: 150, marginTop: 10, borderRadius: 8, alignSelf: 'center' }
});