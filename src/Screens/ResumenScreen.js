import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import api from "../Services/Api"; 

export default function ResumenScreen({ navigation }) {


  const [alumnos, setAlumnos] = useState([]);
  const [totalAsistencias, setTotalAsistencias] = useState(0);

  // Cargar alumnos desde la API
  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      const data = res.data.map((alumno) => ({
        ...alumno,
        asistencias: alumno.asistencias || 0,
      }));
      setAlumnos(data);

      const total = data.reduce((acc, a) => acc + a.asistencias, 0);
      setTotalAsistencias(total);
    } catch (error) {
      console.error("Error al cargar alumnos:", error.message);
      Alert.alert("Error", "No se pudieron cargar los alumnos");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAlumnos);
    return unsubscribe;
  }, [navigation]);

  // Datos para el gráfico
  const chartData = {
    labels: alumnos.map((a) => a.nombre),
    datasets: [
      {
        data: alumnos.map((a) => a.asistencias),
      },
    ],
  };
  const screenWidth = Dimensions.get("window").width - 32;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Resumen de Alumnos</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de alumnos:</Text>
        <Text style={styles.cardValue}>{alumnos.length}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de asistencias:</Text>
        <Text style={styles.cardValue}>{totalAsistencias}</Text>
      </View>

      
     
            </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1E88E5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  cardValue: {
    fontSize: 14,
    marginTop: 4,
  },
});
