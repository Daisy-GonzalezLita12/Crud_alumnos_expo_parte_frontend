import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreens from "../screens/SettingsScreen";
import StackScreen from "../screens/StackScreen";
import MenuPrincipal from "../screens/MenuPrincipal";
import UserScreen from "../screens/UserScreen"


const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();

// Stack Navigator para manejar pantallas dentro del stack si lo necesitas
function MyStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="MenuPrincipal">
      <HomeStackNavigator.Screen
        name="MenuPrincipal"
        component={MenuPrincipal}
      />
      <HomeStackNavigator.Screen
        name="Stack"
        component={StackScreen}
      />
    </HomeStackNavigator.Navigator>
  );
}

// Tab Navigator con navegación garantizada al menú principal
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MenuPrincipal"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
      backgroundColor: "#8ba6ac",         // color de fondo de la barra de tabs
    },
      }}
    >
      <Tab.Screen
        name="MenuPrincipal"
        component={MenuPrincipal}
        options={({ navigation }) => ({
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="home"
              color={color}
              size={size}
              onPress={() => navigation.navigate("MenuPrincipal")}
            />
          ),
          headerShown: false,
          tabBarBadge: 3,
        })}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreens}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
          headerShown: false,
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

// NavigationContainer principal
export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
