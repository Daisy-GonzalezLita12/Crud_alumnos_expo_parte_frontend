import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import api from "../Services/Api";

export default function ReportesScreen({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);
  const [totalAsistencias, setTotalAsistencias] = useState(0);

  // Cargar alumnos desde backend
  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      const data = res.data.map((alumno) => ({
        ...alumno,
        asistencias: Number(alumno.asistencias) || 0, // asegurar que sea número
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
    labels: alumnos.map((a) => a.nombre.length > 8 ? a.nombre.slice(0, 8) + "…" : a.nombre),
    datasets: [
      {
        data: alumnos.map((a) => a.asistencias),
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width - 32;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Reporte de Asistencias</Text>
      <Text style={styles.total}>Total de asistencias: {totalAsistencias}</Text>

      {alumnos.length > 0 && (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#1E88E5",
            backgroundGradientFrom: "#1E88E5",
            backgroundGradientTo: "#42A5F5",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#1E88E5" },
          }}
          style={{ marginVertical: 16, borderRadius: 16 }}
        />
      )}

      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id?.toString() || item.numeroControl?.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.alumnoName}>{item.nombre} {item.apellido}</Text>
            <Text style={styles.alumnoInfo}>Carrera: {item.carrera}</Text>
            <Text style={styles.alumnoInfo}>Asistencias: {item.asistencias}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: "#1E88E5" },
  total: { fontSize: 16, marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  alumnoName: { fontSize: 16, fontWeight: "bold", color: "#1E88E5" },
  alumnoInfo: { fontSize: 14, marginTop: 2 },
});
