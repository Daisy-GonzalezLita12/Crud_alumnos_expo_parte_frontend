import {View, Text, StyleSheet, StatusBar, Platform, TouchableOpacity, ScrollViewBase, ScrollView} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Card from "../../Componentes/Card";


export default function HomePrincipal() {
  return (
    <ScrollView>
    <View style = {style.mainS}>
        <Text style={style.title}>Pagina Principal</Text>
        
        {/* <CardBasico/>
        <CardBasicoImg/>
        <CardV2/>
        <CardV3/> */}
        <Card/>
    </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
    mainS:{
        flex:1,
        backgroundColor:'#d5dde7',
        paddingTop: Platform.OS ==='android' ? StatusBar.currentHeight: 44,
        padding: 16,
    },
    title:{
        fontSize:22,
        fontWeight: 'bold',
        marginTop:20,
        textAlign:'center'
    },
})