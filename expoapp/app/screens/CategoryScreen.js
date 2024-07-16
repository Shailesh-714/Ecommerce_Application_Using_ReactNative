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
    "Pet Supplies",
    "Jewelry & Watches",
    "Baby & Kids",
    "Musical Instruments",
  ];
  return (
    <SafeAreaView
      style={{
        marginTop: 5,
        flex: 1,
        backgroundColor: "rgba(250,250,250,1)",
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
            onPress={() => navigation.navigate("CategoryProduct", {category:item})}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 18,
                width: "90%",
                margin: 5,
                alignSelf: "center",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                ...Platform.select({
                  ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  },
                  android: {
                    elevation: 3,
                  },
                }),
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
