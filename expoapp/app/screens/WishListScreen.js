import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { deals } from "../data/DealsData";
import { selectWishlistedItems } from "../redux/reducers/dealSlice";
import { Selector, useSelector } from "react-redux";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import AddtoCart from "../components/AddtoCart";
import Like from "../components/Like";
import { useNavigation } from "@react-navigation/native";

const WishListScreen = () => {
  const navigation = useNavigation();
  const screenWidth = useWindowDimensions("window").width;
  const wishListedItems = useSelector(selectWishlistedItems);
  const handleProductPress = (productId) => {
    navigation.navigate("Product", { id: productId });
  };
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
            Wish List
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.04,
          }}
        >
          {deals
            .filter((item) =>
              wishListedItems.some((matchItem) => matchItem.id === item.id)
            )
            .map((item, index) => (
              <Pressable
                key={index}
                style={{}}
                onPress={() => handleProductPress(item.id)}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    maxWidth: 155,
                  }}
                >
                  <Image
                    style={{
                      width: 155,
                      height: 130,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    source={item.image}
                  />
                  <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.text,
                        {
                          fontSize: 13,
                          fontWeight: "500",
                          overflow: "hidden",
                          marginVertical: 3,
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.text,
                        {
                          fontSize: 11,
                          fontWeight: "400",
                          color: "grey",
                        },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                    <View style={{ flexDirection: "row", marginVertical: 3 }}>
                      <Text
                        style={{
                          paddingVertical: 2,
                          paddingHorizontal: 3,
                          backgroundColor: "#398e3d",
                          borderRadius: 7,
                          width: 30,
                          fontSize: 9,
                          color: "white",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ★ {item.rating}
                      </Text>
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          fontSize: 12,
                          color: "grey",
                          fontWeight: "300",
                          marginHorizontal: 10,
                        }}
                      >
                        ₹{item.oldPrice}
                      </Text>
                    </View>
                    <Text style={{ fontWeight: "500" }}>₹{item.price}</Text>
                  </View>
                  <AddtoCart dealId={item.id} />
                </View>
                <View style={{ position: "absolute", top: 6, left: 110 }}>
                  <Like Iconsize={20} dealId={item.id} />
                </View>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({});
