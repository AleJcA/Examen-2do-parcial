import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // <--- OBLIGATORIO
import Navegacion from './components/Navegacion';

export default function App() {
  return (
    <NavigationContainer> 
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Navegacion />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});