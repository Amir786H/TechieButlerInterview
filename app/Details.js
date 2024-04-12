import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  const userdata = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Details Page</Text>
      </View>
      <View style={styles.boxStyle}>
        <Text style={styles.textStyle}>
          <Text style={[styles.textStyle, { fontWeight: "800" }]}>id: </Text>
          {userdata.id}
        </Text>
        <Text>
          <Text style={[styles.textStyle, { fontWeight: "800" }]}>Title: </Text>
          {userdata.title}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={[styles.textStyle, { fontWeight: "800" }]}>Desc: </Text>
          {userdata.body}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  textStyle: {
    color: "black",
  },
  boxStyle: {
    height: "25%",
    width: "80%",
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    margin: 10,
  },
});

export default Details;
