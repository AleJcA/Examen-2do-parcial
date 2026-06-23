import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AgregarProducto from './AgregarProducto';
import DetalleProducto from './DetalleProducto';
import ListaProductos from './ListaProductos';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function ListaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaItems" component={ListaProductos} />
      <Stack.Screen name="Detalles" component={DetalleProducto} />
    </Stack.Navigator>
  );
}

export default function Navegacion() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Agregar" component={AgregarProducto} />
      <Tab.Screen name="Lista" component={ListaStack} />
    </Tab.Navigator>
  );
}