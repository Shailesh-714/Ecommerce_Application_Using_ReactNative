import { Animated, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

const ConfirmOrder = () => {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
    >
      <View style={{ marginTop: 10 }}>
        <Image
          source={require("../../assets/payment/OrderPlaced.png")}
          style={{ width: 200, height: 60 }}
        />
      </View>
      <View style={{}}>
        <LottieView
          source={require("../../assets/payment/OrderConfirmed.json")}
          autoPlay
          style={{ width: 350, height: 350 }}
        />
      </View>
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
