import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Producto } from '../modelos/Producto';

interface ListaProductosProps {
    productos: Producto[];
    onVerDetalles: (producto: Producto) => void;
}

export default function ListaProductos({ productos, onVerDetalles }: ListaProductosProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Productos</Text>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.idProducto.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.nombreProducto}>{item.nombre}</Text>
                        <Button title="Ver Detalles" onPress={() => onVerDetalles(item)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    titulo: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    itemContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 10, 
        borderBottomWidth: 1, 
        borderColor: '#eee' 
    },
    nombreProducto: { fontSize: 16 }
});