import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable, Text, FlatList } from "react-native";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { AuthContext } from "./Context/AuthContext";
import { Link, useRouter } from "expo-router";

import ImageViewer from "../components/ImageViewer";
import ListData from "../components/ListData";

const PlaceholderImage = require("../assets/images/6.jpg");

const App = () => {
  const { userData, setUserData } = useContext(AuthContext);

  const url = "https://jsonplaceholder.typicode.com/posts";
  const router = useRouter();

  useEffect(() => {
    logData();
  }, [logData]);

  /* The `logData` function defined using `useCallback` is making an asynchronous call to fetch data
  from the URL specified in the `url` variable. Once the data is fetched, it is converted to JSON
  format. Then, the `setUserData` function, which is obtained from the `AuthContext`, is called with
  the fetched JSON data as an argument to update the user data state. */
  const logData = useCallback(() => {
    try {
      const response = fetch(url).then((res) => {
        res.json().then((json) => {
          //Do stuff with json here
          setUserData(json);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  /**
   * The `goToDetails` function navigates to the Details page with the provided parameters.
   * @param e - The parameter `e` in the `goToDetails` function likely represents an event object that
   * is being passed as an argument to the function. This event object may contain information about
   * the event that triggered the function, such as mouse click coordinates, key presses, or other
   * relevant data. The function then
   */
  const goToDetails = (e) => {
    router.push({
      pathname: "/Details",
      params: e,
    });
  };

  /* The `const memoizedCallback` function defined using `useCallback` is an asynchronous function that
  takes a parameter `resp`. Inside this function: */
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

        {userData && (
          <FlatList
            data={userData}
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
