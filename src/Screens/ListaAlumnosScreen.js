import React, { useEffect, useState } from "react"; 
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import api from "../Services/Api";

export default function ListaAlumnosScreen({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);

  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      setAlumnos(res.data);
    } catch (error) {
      console.error("Error al cargar alumnos:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAlumnos);
    return unsubscribe;
  }, [navigation]);

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
        <Text style={styles.text}>Email: {item.email}</Text>
        <Text style={styles.text}>Teléfono: {item.telefono}</Text>
        <Text style={styles.text}>Número de control: {item.numeroControl}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={alumnos}
      keyExtractor={(item) => item.id?.toString() || item.numeroControl?.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1E88E5",
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
});
