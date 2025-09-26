import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreens from "../screens/SettingsScreen";
import  StackScreen from "../screens/StackScreen";

const Tab = createBottomTabNavigator();

const HomeStackNavigator= createNativeStackNavigator();
// 
function MyStack() {
  return (
    <HomeStackNavigator.Navigator
    initialRouteName="Home"
    >
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreens}
      />
      <HomeStackNavigator.Screen
        name="Stack"
        component={StackScreen}
      />
    </HomeStackNavigator.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'purple', // Color de la pestaña activa
        tabBarInactiveTintColor: 'gray',  // Color de las pestañas inactivas
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: () => (
           <MaterialIcons name="home" size={24} color="black" />
          ),
          tabBarBadge:3,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreens}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
           
          tabBarBadge:3,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
