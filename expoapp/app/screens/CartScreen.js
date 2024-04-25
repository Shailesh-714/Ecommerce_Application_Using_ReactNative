import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SERVER_IP } from "@env";
import React, { useContext, useState } from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import StepIndicator from "react-native-step-indicator";
import CartProducts from "./ProgressBar/CartProducts";
import PaymentScreen from "./ProgressBar/PaymentScreen";
import ConfirmOrder from "./ProgressBar/ConfirmOrder";
import AddressScreen from "./User/AddressScreen";
import { AppContext } from "../components/AppContext";
import { selectCartItems } from "../redux/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { resetCartItemsCount } from "../redux/reducers/cartSlice";

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

const nextButton = [
  "Check Out",
  "Confirm Address",
  "Confirm Order",
  "Go Back Home",
];

const CartScreen = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const productInfoList = cartItems.map((item) => ({
    productId: item.id,
    productCount: item.count,
  }));
  const { userEmail, order, setOrder, totalAmount } = useContext(AppContext);
  const [currentPosition, setCurrentPosition] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `https://bold-foal-purely.ngrok-free.app/order`,
        {
          userEmail: userEmail,
          address: order.address,
          totalAmount: totalPrice,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          products: productInfoList,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = () => {
    switch (currentPosition) {
      case 0:
        if (cartItems.length !== 0) {
          setOrder({
            ...order,
            userEmail: userEmail,
          });
          setCurrentPosition(currentPosition + 1);
        }
        break;
      case 1:
        if (order.address !== "") {
          setCurrentPosition(currentPosition + 1);
        }
        break;
      case 2:
        if (order.paymentMethod !== "") {
          if (order.paymentMethod === "COD" || order.paymentStatus == "Paid") {
            setCurrentPosition(currentPosition + 1);
            handlePlaceOrder();
            setOrder({
              products: [],
              userEmail: "",
              address: "",
              totalAmount: 0,
              paymentMethod: "",
              paymentStatus: "",
            });
            dispatch(resetCartItemsCount({ userEmail }));
          }
        }
        break;
      case 3:
        navigation.navigate("Main");
    }
  };
  const prevPage = () => setCurrentPosition(currentPosition - 1);

  const renderScreen = [
    <CartProducts />,
    <AddressScreen showAddressHeader={true} />,
    <PaymentScreen />,
    <ConfirmOrder />,
  ];
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
        <View style={{ height: "78.6%" }}>{renderScreen[currentPosition]}</View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {currentPosition === 0 && (
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 5,
              fontSize: 17,
              fontWeight: "500",
            }}
          >
            Total Amount :{"  "}₹{totalAmount}
          </Text>
        )}
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
