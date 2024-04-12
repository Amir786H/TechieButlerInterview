
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "./Context/AuthContext";
import React, { useState, useEffect } from "react";
import App from "./App";


export default function AppDemo() {
  const [userData, setUserData] = useState();

  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{ userData, setUserData }}>
        <App />
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
