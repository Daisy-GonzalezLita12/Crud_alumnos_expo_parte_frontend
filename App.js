import React from 'react';
import Navigation from './src/pages/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrearAlumno from './src/pages/CrearAlumno';
import ListarAlumnos from './src/pages/ListarAlumnos';
import UsuarioScreen from './src/Screens/UsuarioScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <UsuarioScreen />
  ); 
}
