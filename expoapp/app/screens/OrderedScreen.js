import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { AppContext } from "../components/AppContext";
import { deals } from "../data/DealsData";
import CustomDate from "../components/CustomDate";
import { useFocusEffect } from "@react-navigation/native";
const OrderedScreen = () => {
  const [orderData, setOrderData] = useState([]);
  const { userEmail } = useContext(AppContext);
  const screenWidth = useWindowDimensions("window").width;
  const fetchOrderData = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.176:3000/getOrderDetails",
        {
          userEmail: userEmail,
        }
      );
      const { orders } = response.data;
      setOrderData(orders);
      console.log(orders);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrderData();
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        marginTop: 5,
        flex: 1,
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: screenWidth * 0.05 }}
      >
        <View>
          {orderData.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginVertical: 5,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  letterSpacing: -0.5,
                  marginVertical: 5,
                }}
              >
                Order ID : {item._id}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  letterSpacing: -0.5,
                  marginVertical: 5,
                }}
              >
                Ordered Products :
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.products.slice(0, 4).map((product, productIndex) => (
                  <View
                    key={productIndex}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      left: -10 * productIndex,
                    }}
                  >
                    {deals
                      .filter(
                        (orderProduct) => orderProduct.id === product.productId
                      )
                      .map((orderItem, orderItemIndex) => (
                        <View
                          key={orderItemIndex}
                          style={{
                            backgroundColor: "rgba(0,0,0,0.2)",
                            borderRadius: 100,
                            padding: 1,
                            marginVertical: 5,
                          }}
                        >
                          <View
                            style={{
                              padding: 1,
                              backgroundColor: "white",
                              borderRadius: 100,
                            }}
                          >
                            <Image
                              source={orderItem.image}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 50,
                              }}
                            />
                          </View>
                        </View>
                      ))}
                  </View>
                ))}
                <View>
                  {item.products.length > 4 && (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#aaaaaa",
                        fontWeight: "600",
                        left: -15,
                      }}
                    >
                      +{item.products.length - 4} products
                    </Text>
                  )}
                </View>
              </View>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#50C878",
                  marginVertical: 5,
                }}
              >
                Arriving On <CustomDate date={item.deliveryDate} />
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderedScreen;

const styles = StyleSheet.create({});
