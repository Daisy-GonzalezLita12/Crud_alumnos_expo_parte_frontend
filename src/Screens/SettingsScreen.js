import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const [fondo, setFondo] = useState("#ffffff"); // color inicial blanco

  const cambiarColor = () => {
    // Cambia entre dos colores solo como ejemplo
    setFondo(fondo === "#ffffff" ? "#1E88E5" : "#ffffff");
  };

  return (
    <View style={[styles.container, { backgroundColor: fondo }]}>
      <Text style={styles.titulo}>Pantalla de Configuración</Text>

      <TouchableOpacity style={styles.boton} onPress={cambiarColor}>
        <Text style={styles.botonTexto}>Cambiar Color de Fondo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000",
  },
  boton: {
    padding: 16,
    backgroundColor: "#4caf50",
    borderRadius: 8,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
