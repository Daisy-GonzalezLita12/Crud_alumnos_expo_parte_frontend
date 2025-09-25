import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';

export default function ListarAlumnos({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://192.168.0.129:3001';

  const fetchAlumnos = async () => {
    try {
      const response = await fetch(`${API_URL}/alumnos`);
      const data = await response.json();
      setAlumnos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchAlumnos);
    return unsubscribe;
  }, [navigation]);

  if (loading) return <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <Button title="➕ Crear Alumno" onPress={() => navigation.navigate('Crear Alumno')} />
      <FlatList
        data={alumnos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nombre} {item.apellido}</Text>
            <Text>Control: {item.numero_control}</Text>
            <Text>Carrera: {item.carrera}</Text>
            <Text>Semestre: {item.semestre}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold' },
});
