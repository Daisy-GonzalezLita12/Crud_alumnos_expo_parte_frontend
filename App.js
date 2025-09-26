import * as React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Pantallas
import HomePrincipal from "./src/pages/Home/HomePrincipal";
import MenuPrincipal from "./src/screens/MenuPrincipal";
import UserScreen from "./src/screens/UserScreen"
import SettingsScreens from "./src/screens/SettingsScreen";
import ListaAlumnosScreen from "./src/screens/ListaAlumnosScreen";
import AsistenciaScreen from "./src/screens/AsistenciaScreen"
import ReportesScreen from "./src/screens/ReportesScreen"
import EventosScreen from "./src/screens/EventosScreen"
import ResumenScreen from "./src/screens/ResumenScreen"
import InfoScreen from "./src/screens/InfoScreen"



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs de la app
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="MenuPrincipal"
        component={MenuPrincipal}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreens}
        options={{
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePrincipal">
        {/* Pantalla de inicio */}
        <Stack.Screen
          name="HomePrincipal"
          component={HomePrincipal}
          options={{ headerShown: false }}
        />

        {/* Tabs principales */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ title: "Alumnos" }}
        />
         <Stack.Screen
          name="ListaAlumnosScreen"
          component={ListaAlumnosScreen}
          options={{ title: "Lista Alumnos" }}
        />
         <Stack.Screen
          name="AsistenciaScreen"
          component={AsistenciaScreen}
          options={{ title: "Asistencia " }}
        />
        <Stack.Screen
          name="ReportesScreen"
          component={ReportesScreen}
          options={{ title: "Reporte" }}
        />
                <Stack.Screen
          name="EventosScreen"
          component={EventosScreen}
          options={{ title: "Eventos Académicos" }}
        />

        
                <Stack.Screen
          name="ResumenScreen"
          component={ResumenScreen}
          options={{ title: "Resumen Escolar" }}
        />

              <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{ title: "Datos escolares" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
