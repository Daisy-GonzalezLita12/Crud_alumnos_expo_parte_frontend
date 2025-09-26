import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import api from "../Services/Api";

export default function ListaAlumnosScreen({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);

  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      setAlumnos(res.data);
    } catch (error) {
      console.error("Error al cargar alumnos:", error.message);
      Alert.alert("Error", "No se pudieron cargar los alumnos");
    }
  };

  const deleteAlumno = async (id) => {
    try {
      await api.delete(`/alumnos/eliminar-alumnos/${id}`);
      fetchAlumnos();
      Alert.alert("Éxito", "Alumno eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar alumno:", error.message);
      Alert.alert("Error", "No se pudo eliminar el alumno");
    }
  };

  useEffect(() => {
    // Refrescar alumnos cada vez que la pantalla tiene foco
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAlumnos();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={alumnos}
        keyExtractor={(item) =>
          item.id?.toString() || item.numeroControl?.toString()
        }
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.alumnoContainer}>
            <Text style={styles.field}>
              <Text style={styles.label}>Nombre:</Text> {item.nombre}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Apellido:</Text> {item.apellido}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Email:</Text> {item.email}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Carrera:</Text> {item.carrera}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Número de control:</Text>{" "}
              {item.numeroControl}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Teléfono:</Text> {item.telefono}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.label}>Imagen:</Text> {item.imagenURL}
            </Text>
            <Button
              title="Eliminar"
              onPress={() =>
                Alert.alert(
                  "Confirmar",
                  "¿Desea eliminar este alumno?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Eliminar", onPress: () => deleteAlumno(item.id) },
                  ]
                )
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  alumnoContainer: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  field: { marginBottom: 4 },
  label: { fontWeight: "bold" },
});
