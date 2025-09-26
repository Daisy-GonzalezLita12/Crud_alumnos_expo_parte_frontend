import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import UserScreen  from './UserScreen';


export default function MenuPrincipal({ navigation }) {
    const cards = [
        { title: "Agregar Alumnos", img: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png", screen: "UserScreen" },
        { title: "Lista de Alumnos", img: "https://cdn-icons-png.flaticon.com/512/4728/4728607.png", screen: "ListaAlumnosScreen" },
        { title: "Reportes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9ouU1Cl_kBm67dQQ76LjZuUnbjdAyiCwY7UOCDz9LxZnw3mcPNV78buicO7td71XXbM&usqp=CAU" , screen: "ReportesScreen" },
        { title: "Asistencias", img: "https://cdn-icons-png.flaticon.com/256/9913/9913579.png", screen: "AsistenciaScreen" },
        { title: "Eventos", img: "https://cdn-icons-png.flaticon.com/512/3512/3512927.png", screen: "EventosScreen" },
        { title: "Resumen escolar", img: "https://cdn-icons-png.flaticon.com/512/1949/1949624.png", screen: "ResumenScreen" },
        { title: "Perfil Alumnos", img: "https://cdn-icons-png.flaticon.com/512/7870/7870524.png", screen: "InfoScreen" },

    ];

    const rows = [];
    for (let i = 0; i < cards.length; i += 2) {
        rows.push(cards.slice(i, i + 2));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.menuTitle}>Menú:</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {rows.map((row, index) => (
                    <View key={index} style={styles.row}>
                        {row.map((card, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.card}
                                onPress={() => navigation.navigate(card.screen)} // navegar al screen correspondiente
                            >
                                <Image source={{ uri: card.img }} style={styles.image} />
                                <Text style={styles.cardTitle}>{card.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#e5e6c9",
    },
    menuTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1E88E5",
        marginBottom: 16,
        textAlign: "center",
        marginTop: 30,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    card: {
        width: "43%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginHorizontal: 10,
        marginVertical: 12,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1E88E5",
        textAlign: "center",
    },
});
