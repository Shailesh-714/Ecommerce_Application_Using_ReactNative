import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import Wishlist from "../components/Wishlist";
import Cart from "../components/Cart";

const OrderedScreen = () => {
  return (
    <SafeAreaView
      style={{
        marginTop: 5,
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)",
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 20,
              letterSpacing: 1.2,
            }}
          >
            Orders
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderedScreen;

const styles = StyleSheet.create({});
