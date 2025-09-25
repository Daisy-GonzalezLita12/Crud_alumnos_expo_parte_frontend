import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";
import api from "../Services/Api"; // ojo: ../ porque estás dentro de Screens

export default function UsuariosScreen() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");

  // Traer alumnos
  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      setAlumnos(res.data);
    } catch (error) {
      console.error("Error al cargar alumnos:", error.message);
    }
  };

  // Insertar alumno
  const addAlumno = async () => {
    try {
      console.log("Enviando a:", api.defaults.baseURL + "/alumnos/insertar-alumnos");
      await api.post("/alumnos/insertar-alumnos", { nombre });
      setNombre("");
      fetchAlumnos();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.status, error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  // Eliminar alumno
  const deleteAlumno = async (id) => {
    try {
      await api.delete(`/alumnos/eliminar-alumnos/${id}`);
      fetchAlumnos();
    } catch (error) {
      console.error("Error al eliminar alumno:", error.message);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Agregar Alumno" onPress={addAlumno} />

      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>{item.nombre}</Text>
            <Button title="Eliminar" onPress={() => deleteAlumno(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
