import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";

export default function HomePrincipal({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cambia el color de la barra de estado */}
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      {/* Título */}
      <Text style={styles.title}>TECHNOLOGY</Text>
      <Text style={styles.descripcionApp}>APP DE CONTROL ESCOLAR</Text>

      {/* Imagen central */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2987/2987853.png" }}
        style={styles.image}
      />

      {/* Botón para continuar */}
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
        <Text style={styles.linkText}>Comenzar</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E88E5", // 🔹 azul educativo en toda la pantalla
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    letterSpacing: 3,
    textAlign: "center",

  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 1,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 21,
    color: "#FFFFFF",
    marginBottom: 40,
    fontWeight: "600",
    textAlign: "center",
  },
  descripcionApp: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  linkText: {
    color: "#FFFFFF",       // blanco
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline", // subrayado
    marginTop: 20,
  },

});
