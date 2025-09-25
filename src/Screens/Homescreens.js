import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreens = () => {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20 }}>
        Home Screen
      </Text>
      
      <TouchableOpacity
     onPress={() => navigation.navigate("Stack")}
        style={{
          backgroundColor: "purple",
          padding: 10,
          borderRadius: 8,
        }}
         
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "white",
          }}
        >
          Go to StackScreen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreens;
