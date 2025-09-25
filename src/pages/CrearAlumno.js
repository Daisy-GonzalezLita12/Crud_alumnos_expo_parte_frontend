import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CrearAlumno() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.34.140.224:3001/crear-alumno-v', {
        nombre,
        apellido,
      });

      Alert.alert(
        'Éxito',
        `Alumno creado: ${response.data.alumno.nombre} ${response.data.alumno.apellido}`
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear el alumnito ');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <Button title="Crear Alumno" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});
