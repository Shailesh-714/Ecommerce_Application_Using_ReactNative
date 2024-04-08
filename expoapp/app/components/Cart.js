import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Cart")}>
      <Feather name="shopping-bag" size={21.5} color="rgba(0,0,0,1)" />
    </Pressable>
  );
};

export default Cart;

const styles = StyleSheet.create({});
