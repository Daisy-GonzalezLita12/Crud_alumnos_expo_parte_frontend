import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../Services/Api";

export default function AsistenciaScreen({ navigation }) {

  const [alumnos, setAlumnos] = useState([]);



  // Cargar alumnos desde la API
  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      const data = res.data.map((alumno) => ({
        ...alumno,
        asistencias: alumno.asistencias || 0,
      }));
      setAlumnos(data);
    } catch (error) {
      console.error("Error al cargar alumnos:", error.message);
      Alert.alert("Error", "No se pudieron cargar los alumnos");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAlumnos);
    return unsubscribe;
  }, [navigation]);

  // Incrementar asistencia
  const incrementarAsistencia = async (id) => {
    try {
      await api.put(`/alumnos/${id}/incrementar-asistencia`);
      fetchAlumnos(); // refresca la lista desde backend
    } catch (error) {
      console.error("Error actualizando asistencia:", error.message);
      Alert.alert("Error", "No se pudo actualizar la asistencia");
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.imagenURL ? (
        <Image source={{ uri: item.imagenURL }} style={styles.imagen} />
      ) : (
        <View style={[styles.imagen, styles.placeholder]}>
          <Text style={{ color: "#fff" }}>No Image</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
        <Text style={styles.text}>Carrera: {item.carrera}</Text>
        <Text style={styles.text}>Asistencias: {item.asistencias}</Text>
      </View>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => incrementarAsistencia(item.id)}
      >
        <MaterialIcons name="check-circle" size={32} color="#4caf50" />
      </TouchableOpacity>
    </View>
  );

  // Calcular total de asistencias
  const totalAsistencias = alumnos.reduce((acc, a) => acc + a.asistencias, 0);

  return (
    <View style={{ flex: 1 }}>
        <TouchableOpacity
  onPress={() => navigation.navigate("ReportesScreen")}
>
  <Text style={{ color: "#fff", fontWeight: "bold" }}>Ver Reporte</Text>
</TouchableOpacity>
      {/* Barra superior simple con total de asistencias */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Total de Asistencias: {totalAsistencias}</Text>
      </View>

      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id?.toString() || item.numeroControl?.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#1E88E5", // barra con color sólido
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  placeholder: {
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1E88E5",
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
  iconButton: {
    padding: 4,
  },
});
