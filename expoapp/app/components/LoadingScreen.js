import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "./AppContext";

const LoadingScreen = () => {
  const { init } = useContext(AppContext);
  const navigation = useNavigation();
  useEffect(() => {
    async function checkStatus() {
      const token = await getToken();
      if (token) {
        await init();
        navigation.replace("Main");
      } else {
        navigation.navigate("Login");
      }
    }
    checkStatus();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.log("Error getting token:", error);
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/loading.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
