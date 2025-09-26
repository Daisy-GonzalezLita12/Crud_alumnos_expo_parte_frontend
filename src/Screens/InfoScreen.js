import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function InfoScreen() {
  // Datos de ejemplo
  const resumen = [
    { icon: "emoji-events", label: "Alumnos Destacados", value: 5, color: "#4caf50" },
    { icon: "error", label: "Asistencia Baja", value: 2, color: "#f44336" },
    { icon: "book", label: "Materias Cursadas", value: 8, color: "#2196f3" },
    { icon: "event", label: "Próximos Eventos", value: 3, color: "#ff9800" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen Escolar</Text>
      <View style={styles.cardsContainer}>
        {resumen.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: item.color }]}>
            <MaterialIcons name={item.icon} size={32} color="#fff" />
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#333" },
  cardsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  value: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 8 },
  label: { fontSize: 14, color: "#fff", marginTop: 4, textAlign: "center" },
});
