import { StyleSheet, FlatList, Text, View, Pressable } from "react-native";
import { Link, useRouter  } from "expo-router";
import React, { useMemo, useState } from "react";

export default function ListData({ item, index, fetchDetails }) {
  // const router = useRouter();

  // console.log('re--- render');

  const Item = () => (
    <Pressable
      onPress={() => {
        // goToDetails(item);
        fetchDetails(item);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <Text style={styles.title}>{item.id}. </Text>
        <Text>{item.title}</Text>
      </View>
    </Pressable>
  );

  return <Item />;
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    color: "black",
  },
});
