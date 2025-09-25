import React, { useState } from "react"; //importación del hook para  manejar estados
import { Image, View, Button, StyleSheet, Platform, StatusBar, Text } from "react-native"; //componentes basicos  de la interfaz
export default function App_cambio_color() {
    const [color, setColor] = useState("white");//Declaracion de un estado llamado color, inicialmente el color e blanco

    const cambiarColor = () => { //funcion cambiar color, aqui alterna el cambio de color
        const nuevoColor = color === "white" ? "#f0b49e" : "white";
        setColor(nuevoColor);
    };

    return (
        //vista principal 
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHUJJhuBTRJ7KlcmqD0FNpDMbWYhA1RYkdWw&s",
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.textS}>
                    Hola, esta app está realizada para cambiar el color de pantalla de la app al presionar el siguiente botón.
                </Text>
            </View>
            {/* el boton cambia de color porque la presionarlo se invoca la función cambio de color */}
            <Button title="Cambiar color" onPress={cambiarColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // ocupa toda la pantalla
        width: "100%",
        //Agrega un espacio paae arriba, para no chocar con la barra de estados 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
        justifyContent: "center", // centra el botón verticalmente
        alignItems: "center", // centra horizontalmente todo
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
