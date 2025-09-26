import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView, Image } from "react-native";
import api from "../Services/Api";
import * as ImagePicker from "expo-image-picker";

export default function AlumnosScreen() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [carrera, setCarrera] = useState("");
  const [email, setEmail] = useState("");
  const [imagenURI, setImagenURI] = useState(""); // URL de la imagen
  const [numeroControl, setNumeroControl] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Pedir permisos para galería
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesitan permisos para acceder a la galería!');
      }
    })();
  }, []);

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await api.get("alumnos/traer-alumnos");
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error cargando alumnos:", error.message);
    }
  };

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagenURI(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !apellido || !carrera || !email) {
      return alert("Completa todos los campos requeridos");
    }

    const alumnoData = { nombre, apellido, carrera, email, imagenURL: imagenURI, numeroControl, telefono };

    try {
      if (editingId) {
        await api.put(`/alumnos/editar-alumnos/${editingId}`, alumnoData);
        setEditingId(null);
      } else {
        await api.post("/alumnos/insertar-alumnos", alumnoData);
      }

      // Limpiar campos
      setNombre(""); setApellido(""); setCarrera(""); setEmail(""); setImagenURI(""); setNumeroControl(""); setTelefono("");
      fetchAlumnos();
    } catch (error) {
      console.error("Error guardando alumno:", error.message);
    }
  };

  const deleteAlumno = async (id) => {
    try {
      await api.delete(`/alumnos/eliminar-alumnos/${id}`);
      fetchAlumnos();
    } catch (error) {
      console.error("Error eliminando alumno:", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.input} />
      <TextInput placeholder="Carrera" value={carrera} onChangeText={setCarrera} style={styles.input} />
      <TextInput placeholder="Correo Electrónico" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Número de Control" value={numeroControl} onChangeText={setNumeroControl} style={styles.input} />
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={seleccionarImagen}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imagenURI ? (
        <Image source={{ uri: imagenURI }} style={styles.imagen} />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editingId ? "Actualizar" : "Agregar"}</Text>
      </TouchableOpacity>

      {alumnos.map((alumno) => (
        <View key={alumno.id} style={styles.card}>
          <Text style={styles.cardText}>{alumno.nombre} {alumno.apellido}</Text>
          <Text>{alumno.numeroControl} - {alumno.carrera}</Text>
          <Text>{alumno.email} - {alumno.telefono}</Text>

          {alumno.imagenURL ? (
            <Image source={{ uri: alumno.imagenURL }} style={styles.imagen} />
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => {
              setNombre(alumno.nombre);
              setApellido(alumno.apellido);
              setCarrera(alumno.carrera);
              setEmail(alumno.email);
              setImagenURI(alumno.imagenURL);
              setNumeroControl(alumno.numeroControl);
              setTelefono(alumno.telefono);
              setEditingId(alumno.id);
            }}>
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => {
              Alert.alert("Eliminar", "¿Seguro que quieres eliminar?", [
                { text: "Cancelar" },
                { text: "Eliminar", onPress: () => deleteAlumno(alumno.id) },
              ]);
            }}>
              <Text style={styles.actionText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  input: { borderWidth: 1, borderColor: "#aaa", borderRadius: 10, padding: 10, marginBottom: 10, backgroundColor: "#fff" },
  button: { backgroundColor: "#1E88E5", padding: 12, borderRadius: 10, marginBottom: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 10, marginBottom: 12 },
  cardText: { fontSize: 16, fontWeight: "bold" },
  actions: { flexDirection: "row", marginTop: 8 },
  editButton: { marginRight: 12, backgroundColor: "#fbc02d", padding: 8, borderRadius: 8 },
  deleteButton: { backgroundColor: "#e53935", padding: 8, borderRadius: 8 },
  actionText: { color: "#fff", fontWeight: "bold" },
  imagen: { width: 150, height: 150, borderRadius: 10, marginVertical: 10 },
});
