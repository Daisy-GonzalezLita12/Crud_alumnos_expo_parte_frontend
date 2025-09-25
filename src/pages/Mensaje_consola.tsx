import React, { useState, useEffect } from "react";
import { Image, Platform, StatusBar, View, Button, Text, StyleSheet } from "react-native";

export default function Mensaje_consola() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("El contador cambió a:", contador);
  }, [contador]); // se ejecutará cada vez que 'contador' cambia

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHUJJhuBTRJ7KlcmqD0FNpDMbWYhA1RYkdWw&s",
          }}
          style={styles.avatar}
        />

        <Text style={styles.textS}>
          Hola, esta app está realizada para cambiar el contador de una variable.
        </Text>
      </View>
      <Text style={{ padding: 10, fontSize: 20 }}>
        Contador: {contador}
      </Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffdeb3'
  },
  textS: {
    padding: 20,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "justify",
    margin: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
    borderColor: "#5d5c5cff",
  },
});
