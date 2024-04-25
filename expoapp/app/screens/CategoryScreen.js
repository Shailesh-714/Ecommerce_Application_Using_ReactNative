import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import Wishlist from "../components/Wishlist";
import Cart from "../components/Cart";

const CategoryScreen = () => {
  const navigation = useNavigation();
  const category_list = [
    "Electronics",
    "Clothing & Accessories",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Books & Media",
    "Toys & Games",
    "Sports & Outdoors",
    "Health & Wellness",
    "Automotive & Tools",
    "Grocery & Household Essentials",
    "Pet Supplies",
    "Jewelry & Watches",
    "Baby & Kids",
    "Office Supplies",
    "Furniture & Decor",
    "Travel & Luggage",
    "Musical Instruments",
    "Art & Craft Supplies",
    "Party Supplies",
    "Fitness & Exercise Equipment",
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 20,
              letterSpacing: 1.2,
            }}
          >
            Categories
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <ScrollView>
        {category_list.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate("PageNotReady")}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 18,
                width: "90%",
                margin: 4,
                alignSelf: "center",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "grey", fontWeight: "500", fontSize: 16 }}>
                {item}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
