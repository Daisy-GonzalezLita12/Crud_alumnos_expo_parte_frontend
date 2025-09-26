import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import api from "../Services/Api";

export default function UsuariosScreen() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [carrera, setCarrera] = useState("");
  const [email, setEmail] = useState("");
  const [imagenurl, setImagen] = useState("");
  const [numero_control, setNumeroControl] = useState("");
  const [telefono, setTelefono] = useState("");

  // Insertar alumno
  const addAlumno = async () => {
    try {
      await api.post("/alumnos/insertar-alumnos", {
        nombre,
        apellido,
        carrera,
        email,
        imagenurl,
        numero_control,
        telefono
      });

      // Limpiar inputs después de registrar
      setNombre("");
      setApellido("");
      setCarrera("");
      setEmail("");
      setImagen("");
      setNumeroControl("");
      setTelefono("");

      alert("Alumno agregado correctamente!");
    } catch (error) {
      console.error("Error al agregar alumno:", error.message);
      alert("No se pudo agregar el alumno.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Imagen URL"
        value={imagenurl}
        onChangeText={setImagen}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de Control"
        keyboardType="numeric"
        value={numero_control}
        onChangeText={setNumeroControl}
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />

      <TouchableOpacity style={styles.botonConIcono} onPress={addAlumno}>
        <Text style={styles.textoBoton}>Agregar alumno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  botonConIcono: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f62ff',
    paddingVertical: 12,
    borderRadius: 15,
    width: '100%',
    marginBottom: 15,
    elevation: 3
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
