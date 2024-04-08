import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import StepIndicator from "react-native-step-indicator";
import CartProducts from "./ProgressBar/CartProducts";
import DeliveryAddress from "./ProgressBar/DeliveryAddress";
import PaymentScreen from "./ProgressBar/PaymentScreen";
import ConfirmOrder from "./ProgressBar/ConfirmOrder";

const labels = [
  "Cart List",
  "Delivery Address",
  "Payment Method",
  "Confirm Order",
];
const customStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 10,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#50C878",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#50C878",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#50C878",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#50C878",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: "#50C878",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 8,
  currentStepLabelColor: "#50C878",
};
const renderScreen = [
  <CartProducts />,
  <DeliveryAddress />,
  <PaymentScreen />,
  <ConfirmOrder />,
];

const nextButton = [
  "Check Out",
  "Confirm Address",
  "Confirm Order",
  "Go Back Home",
];

const CartScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const nextPage = () => setCurrentPosition(currentPosition + 1);
  const prevPage = () => setCurrentPosition(currentPosition - 1);
  return (
    <SafeAreaView
      style={{
        marginTop: 5,
        flex: 1,
        backgroundColor: "rgba(255,255,240,0.1)",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "92%",
          marginVertical: 16,
        }}
      >
        <View>
          <Image
            source={require("../assets/name_logo.png")}
            style={{
              height: 47,
              width: 108,
              marginHorizontal: 27,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>

      <View>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={4}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          {currentPosition > 0 && (
            <Pressable
              onPress={prevPage}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                top: 1.5,
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={18}
                color="rgba(0,0,0,0.5)"
                style={{ top: 0.5, right: -2 }}
              />
              <Text style={{ fontWeight: "500", color: "rgba(0,0,0,0.5)" }}>
                Back
              </Text>
            </Pressable>
          )}
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "500", letterSpacing: 0.5 }}
            >
              {labels[currentPosition]}
            </Text>
          </View>
        </View>
        {renderScreen[currentPosition]}
      </View>

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Pressable
          onPress={nextPage}
          style={{
            backgroundColor: "#fcc11c",
            borderRadius: 10,
            marginVertical: 10,
            marginHorizontal: 20,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>{nextButton[currentPosition]}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
