import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { deals } from "../../data/DealsData";
import { selectCartItems } from "../../redux/reducers/cartSlice";
import { Selector, useSelector } from "react-redux";
import AddtoCart from "../../components/AddtoCart";
import Like from "../../components/Like";
import { useNavigation } from "@react-navigation/native";
import CustomStarRating from "../../components/CustomStarRating";
import { AppContext } from "../../components/AppContext";

const CartProducts = () => {
  const navigation = useNavigation();
  const screenWidth = useWindowDimensions("window").width;
  const cartItems = useSelector(selectCartItems);
  const { order, setOrder } = useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const handleProductPress = (productId) => {
    navigation.navigate("Product", { id: productId });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            marginHorizontal: screenWidth * 0.05,
            width: screenWidth * 0.9,
          }}
        >
          {cartItems.map((item, index) => (
            <Pressable
              key={index}
              style={{}}
              onPress={() => handleProductPress(item.id)}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  width: screenWidth * 0.9,
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{
                      width: 105,
                      height: 105,
                      borderRadius: 5,
                      margin: 10,
                    }}
                    source={item.image}
                  />
                  <View>
                    <View
                      style={{
                        paddingHorizontal: 3,
                        paddingVertical: 5,
                        maxWidth: screenWidth * 0.5,
                        marginTop: 2,
                        height: 84,
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={[
                          styles.text,
                          {
                            fontSize: 14,
                            fontWeight: "500",
                            overflow: "hidden",
                            marginVertical: 0,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <View style={{ flexDirection: "row", marginVertical: 2 }}>
                        <Text style={{ fontWeight: "500" }}>₹{item.price}</Text>
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
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 2,
                          gap: 10,
                        }}
                      >
                        <CustomStarRating
                          rating={item.rating}
                          starSize={10}
                          fullStarColor={"rgba(255,167,15,0.9)"}
                        />
                        <Text style={{ color: "#50C878", fontWeight: "500" }}>
                          {(
                            ((item.oldPrice - item.price) * 100) /
                            item.oldPrice
                          ).toFixed(0)}
                          % OFF
                        </Text>
                      </View>
                      <View style={{ bottom: -7 }}>
                        <AddtoCart
                          dealId={item.id}
                          customStyle={{}}
                          counterCustomStyle={{ marginRight: 15 }}
                          width={180}
                          showCounter={true}
                          showRemove={true}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ position: "absolute", top: 20, left: 80 }}>
                <Like Iconsize={20} dealId={item.id} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          bottom: 0,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            marginHorizontal: screenWidth * 0.06,
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Total Amount :{"  "}₹{totalPrice}
        </Text>
      </View>
    </View>
  );
};

export default CartProducts;

const styles = StyleSheet.create({});
