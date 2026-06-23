import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';



export default function ListaProductos() {
    const navigation = useNavigation<any>();
    const [listaProductos, setListaProductos] = useState([]);

    async function obtenerProductos() {
        try {
            const response = await fetch('http://192.168.1.4:5000/productos');
            const data = await response.json();
            setListaProductos(data.data || []); 
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            obtenerProductos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.rowHeader}>
                <Text style={styles.headerText}>Nombre</Text>
                <Text style={styles.headerText}>Precio</Text>
                <Text style={styles.headerText}>Descripción</Text>
                <Text style={styles.headerText}>Item</Text>
            </View>

            <FlatList
                data={listaProductos}
                keyExtractor={(item: any) => item.idProducto?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.nombre}</Text>
                        <Text style={styles.cell}>{item.precio}</Text>
                        <Text style={styles.cell}>{item.descripcion}</Text>
                        <View style={styles.btnCell}>
                            <Button 
                                title="Ver" 
                                color="#4caf50"
                                onPress={() => navigation.navigate('Detalles', { producto: item })} 
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    rowHeader: { flexDirection: 'row', borderWidth: 1, paddingVertical: 10, backgroundColor: '#f9f9f9' },
    headerText: { flex: 1, fontWeight: 'bold', textAlign: 'center', fontSize: 12 },
    row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, paddingVertical: 8 },
    cell: { flex: 1, textAlign: 'center', fontSize: 12 },
    btnCell: { flex: 1, paddingHorizontal: 5 }
});