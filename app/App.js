import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable, Text, FlatList } from "react-native";
import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";

import ImageViewer from "../components/ImageViewer";
import ListData from "../components/ListData";

const PlaceholderImage = require("../assets/images/6.jpg");

const App = () => {
  const [data, setData] = useState([]);
  const {userData, setUserData} = useContext(AuthContext);

  const url = "https://jsonplaceholder.typicode.com/posts";
  const router = useRouter();

  useEffect(() => {
    logData();
  }, [memoizedData]);

  const logData = async () => {
    console.log("Parent comp re-render:::::");
    try {
      const response = await fetch(url);
      const data = await response.json();
      // setData(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };


  const memoizedData = useMemo(() => {
    return userData;
  }, [userData]);

  const goToDetails = (e) => {
    router.push({
      pathname: "/Details",
      params: e,
    });
  };

  const memoizedCallback = useCallback(async (resp) => {
    let id = resp?.id;
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      goToDetails(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />

        {data && (
          <FlatList
            data={memoizedData}
            renderItem={({ item, index }) => {
              return (
                <ListData
                  item={item}
                  index={index}
                  fetchDetails={memoizedCallback}
                />
              );
            }}
            ListEmptyComponent={handleEmpty}
          />
        )}

        <Link href="/Details" asChild>
          <Pressable>
            <Text>Home</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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

export default App;
