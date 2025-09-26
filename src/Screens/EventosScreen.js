import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";

// Eventos de ejemplo
const eventos = [
  { fecha: "2025-09-26", titulo: "Examen Matemáticas" },
  { fecha: "2025-09-28", titulo: "Entrega Proyecto de Programación" },
  { fecha: "2025-10-01", titulo: "Reunión de Asesoría" },
  { fecha: "2025-10-08", titulo: "Reunión de Academia" },
  { fecha: "2025-10-08", titulo: "Comida con amistades" },
  { fecha: "2025-10-08", titulo: "Salida a Oaxaca" },
  { fecha: "2025-10-10", titulo: "Tequio un día por mi Tec " },
];

export default function CalendarioScreen() {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());
  const [diaSeleccionado, setDiaSeleccionado] = useState(hoy.getDate());

  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const diasSemana = ["D", "L", "M", "M", "J", "V", "S"];

  // Devuelve cantidad de días en un mes
  const diasEnMes = (mes, anio) => new Date(anio, mes + 1, 0).getDate();

  // Generar array de días para mostrar en calendario
  const dias = Array.from({ length: diasEnMes(mesActual, anioActual) }, (_, i) => i + 1);

  // Filtra eventos de un día
  const eventosDelDia = (dia) => {
    const fechaStr = `${anioActual}-${String(mesActual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    return eventos.filter(e => e.fecha === fechaStr);
  };

  const cambiarMes = (direccion) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAnio = anioActual;

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAnio -= 1;
    } else if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAnio += 1;
    }

    setMesActual(nuevoMes);
    setAnioActual(nuevoAnio);
    setDiaSeleccionado(1); // Seleccionar primer día del mes
  };

  return (
    <View style={styles.container}>
      {/* Header con mes y botones */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => cambiarMes(-1)}>
          <Text style={styles.button}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.mes}>{nombresMeses[mesActual]} {anioActual}</Text>
        <TouchableOpacity onPress={() => cambiarMes(1)}>
          <Text style={styles.button}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Iniciales de la semana */}
      <View style={styles.semana}>
        {diasSemana.map((d, i) => (
          <Text key={i} style={styles.inicialDia}>{d}</Text>
        ))}
      </View>

      {/* Días */}
      <FlatList
        data={dias}
        keyExtractor={(item) => item.toString()}
        numColumns={7}
        renderItem={({ item }) => {
          const tieneEvento = eventosDelDia(item).length > 0;
          const esSeleccionado = diaSeleccionado === item;
          return (
            <TouchableOpacity
              style={[
                styles.dia, 
                tieneEvento && styles.diaEvento, 
                esSeleccionado && styles.diaSeleccionado
              ]}
              onPress={() => setDiaSeleccionado(item)}
            >
              <Text style={styles.diaText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Card de eventos del día seleccionado */}
      <ScrollView style={styles.eventosContainer}>
        {eventosDelDia(diaSeleccionado).length > 0 ? (
          eventosDelDia(diaSeleccionado).map((e, i) => (
            <View key={i} style={styles.eventoCard}>
              <Text style={styles.eventoTitulo}>{e.titulo}</Text>
              <Text style={styles.eventoFecha}>{e.fecha}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEvento}>No hay eventos este día</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  mes: { fontSize: 20, fontWeight: "bold", color: "#1E88E5" },
  button: { fontSize: 20, color: "#1E88E5", fontWeight: "bold" },
  semana: { flexDirection: "row", justifyContent: "space-around", marginBottom: 8 },
  inicialDia: { width: 40, textAlign: "center", fontWeight: "bold", color: "#555" },
  dia: { 
    width: 40, height: 40, margin: 4, justifyContent: "center", alignItems: "center", 
    backgroundColor: "#f1c4eeff", borderRadius: 4 
  },
  diaEvento: { backgroundColor: "#42A5F5" },
  diaSeleccionado: { borderWidth: 2, borderColor: "#1E88E5" },
  diaText: { color: "#000" },
  eventosContainer: { marginTop: 1 },
  eventoCard: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8, elevation: 2 },
  eventoTitulo: { fontSize: 16, fontWeight: "bold", color: "#1E88E5" },
  eventoFecha: { fontSize: 14, marginTop: 2 },
  noEvento: { fontSize: 18, fontStyle: "italic", color: "#555" }
});
