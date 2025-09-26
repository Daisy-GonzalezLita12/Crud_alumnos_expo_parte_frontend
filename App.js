import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// tus pantallas
import HomeScreen from "./src/screens/HomeScreens";
import HomePrincipal from "./src/pages/Home/HomePrincipal";
import UserScreen from "./src/screens/UserScreen";
import SettingsScreens from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreens}
        options={{
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
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
      <Stack.Navigator>
        {/* Pantalla de bienvenida */}
        <Stack.Screen
          name="Inicio"
          component={HomePrincipal}
          options={{ headerShown: false }}
        />

        {/* Navegación principal (tabs) */}
        <Stack.Screen
          name="MainTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />

        {/* Pantallas extra */}
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={({ navigation }) => ({
            title: "Usuario",
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <FontAwesome name="arrow-left" size={24} color="#000" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
