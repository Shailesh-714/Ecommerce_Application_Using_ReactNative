import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const Wishlist = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("WishList")}>
      <FontAwesome5 name="heart" size={22} color="rgba(0,0,0,1)" />
    </Pressable>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
