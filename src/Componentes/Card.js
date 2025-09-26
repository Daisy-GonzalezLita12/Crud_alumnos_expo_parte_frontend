import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"; // 👈 import

export default function Card() {
    const navigation = useNavigation(); // 👈 hook para obtener navigation

    return (
        <View style={style.mainS}>
            <View style={style.card}>
                <Image style={style.img} source={{ uri: 'https://www.shutterstock.com/image-vector/cute-cartoon-cat-profile-avatar-600nw-2432356437.jpg' }} />
                <Text style={style.h1}>Bienvenidos</Text>
                <Text style={style.h2}>a la app de Maribel</Text>

                <TouchableOpacity style={style.botonConIcono}
                    onPress={() => navigation.navigate('HomeScreen')} >
                    <Text style={style.textoBoton}>Iniciar</Text>
                    <FontAwesome name="sign-in" size={20} color="#fff" style={style.iconoIzquierda} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    mainS: {
        flex: 1,
        backgroundColor: '#d5dde7',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
        //padding: 16,
    },
    card: {
        backgroundColor: '#ffff',
        padding: 16,
        margin: 10,
        borderRadius: 25,
        //shadowColor: '#282828',
        elevation: 4,
        //shadowOpacity: 0.5,
        //shadowRadius: 4,
        height: 350,
        width: 380,
        alignItems: 'center',   // centra horizontalmente
        justifyContent: 'center', // centra verticalmente
        marginTop: 190,
        marginLeft: 17,
    },
    img: {
        width: 170,
        height: 170,
        borderRadius: 100,

    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    contenido: {
        marginTop: 4,
    },
    botonConIcono: {
        backgroundColor: '#a5aad9',
        marginTop: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        width: 200,
        height: 50,
    },
    iconoIzquierda: {
        marginLeft: 10,
    },
    textoBoton: {
        color: 'rgba(5, 5, 5, 1)',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
    },

    h1: { fontSize: 30, fontWeight: 'bold' },
    h2: { fontSize: 20, fontWeight: '600', marginTop: 5, marginBottom: 10, },

})
