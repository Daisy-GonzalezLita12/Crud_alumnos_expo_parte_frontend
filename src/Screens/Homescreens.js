import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native"; 
import api from "../Services/Api";

export default function HomeScreens({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);
  const isFocused = useIsFocused();

  // Traer alumnos
  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos/traer-alumnos");
      setAlumnos(res.data);
    } catch (error) {
      console.error("Error al cargar alumnos:", error.message);
    }
  };

  // Eliminar alumno
  const deleteAlumno = async (id) => {
    try {
      await api.delete(`/alumnos/eliminar-alumnos/${id}`);
      fetchAlumnos(); // refrescar lista
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el alumno");
      console.error("Error al eliminar:", error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAlumnos();
    }
  }, [isFocused]);

  return (
    <View style={style.mainS}>
      {/* AppBar */}
      <View style={style.appBar}>
        <Text style={style.appBarTitle}>Lista de Usuarios</Text>
      </View>

      {/* Lista de alumnos */}
      <ScrollView style={{ padding: 16 }}>
        {alumnos.map((item) => (
          <View style={style.card} key={item.id}>
            <Image
              source={{ uri: item.imagenurl || 'https://www.shutterstock.com/image-vector/cute-cartoon-cat-profile-avatar-600nw-2432356437.jpg' }}
              style={style.avatar}
            />
            <View style={style.cardInfo}>
              <Text style={style.userName}>{item.nombre} {item.apellido}</Text>
              <Text style={style.userDetails}>Carrera: {item.carrera}</Text>
              <Text style={style.userDetails}>Email: {item.email}</Text>
              <Text style={style.userDetails}>Tel: {item.telefono}</Text>
              <Text style={style.userDetails}>No. Control: {item.numero_control}</Text>

              {/* Botones de acciones */}
              <View style={style.actionRow}>
                <TouchableOpacity 
  style={[style.actionButton, { backgroundColor: "#ffa500" }]} 
  onPress={() => navigation.navigate("UserScreen", { alumno: item })}
>
  <FontAwesome name="edit" size={20} color="#fff" />
</TouchableOpacity>




                <TouchableOpacity
                  style={[style.actionButton, { backgroundColor: "#ff4040" }]}
                  onPress={() =>
                    Alert.alert(
                      "Eliminar",
                      "¿Seguro que quieres eliminar este alumno?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Eliminar", onPress: () => deleteAlumno(item.id) }
                      ]
                    )
                  }
                >
                  <FontAwesome name="trash" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

    
    </View> 
  );
}

const style = StyleSheet.create({
  mainS: { flex: 1, backgroundColor: '#d5dde7' },
  appBar: { height: 50, width: '100%', backgroundColor: '#baafc4', justifyContent: 'center', alignItems: 'center' },
  appBarTitle: { fontWeight: 'bold', fontSize: 16 },
  navBar: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    height: 70, backgroundColor: '#e2acf3ff', borderTopWidth: 1,
  },
  botonConIcono: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#8a2be2',
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8,
  },
  textoBoton: { color: '#fff', fontSize: 14, marginRight: 5 },
  iconoIzquierda: { marginLeft: 10 },
  card: {
    flexDirection: 'row', padding: 16, borderRadius: 16, backgroundColor: '#fff',
    elevation: 2, marginBottom: 10,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  cardInfo: { flex: 1, justifyContent: 'center' },
  userName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  userDetails: { fontSize: 14, marginBottom: 2 },
  actionRow: { flexDirection: "row", marginTop: 10 },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  editButton: {
  padding: 8,
  borderRadius: 8,
  marginRight: 10,
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  backgroundColor: "#ffa500", // naranja para editar
},

});
