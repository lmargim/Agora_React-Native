import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

export function HomeScreen() {
  return (
    <ImageBackground
      source={require("../../../assets/img1_agora_grecia.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Ágora: Publica sin censuras</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Oscurece la imagen de fondo
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default HomeScreen;
