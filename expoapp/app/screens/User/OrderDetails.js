import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import Wishlist from "../../components/Wishlist";
import Cart from "../../components/Cart";
import CustomDate from "../../components/CustomDate";
import { deals } from "../../data/DealsData";
import { AppContext } from "../../components/AppContext";

const OrderDetails = ({ route }) => {
  const { item } = route.params;
  const { userAddresses } = useContext(AppContext);
  const screenWidth = useWindowDimensions("window").width;
  const deliverAddress = userAddresses.find(
    (address) => address._id === item.address
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
            Orders Info
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ marginHorizontal: screenWidth * 0.05, marginVertical: 10 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              letterSpacing: 0,
              marginVertical: 8,
            }}
          >
            Order ID :{" "}
            <Text style={{ color: "rgba(0,0,0,0.4)" }}>{item._id}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              letterSpacing: 0,
              marginVertical: 8,
            }}
          >
            Ordered On :{" "}
            <Text style={{ color: "rgba(0,0,0,0.4)" }}>
              <CustomDate date={item.deliveryDate} />
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              letterSpacing: 0,
              marginVertical: 8,
            }}
          >
            Product Summary
          </Text>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#aaaaaa",
              borderStyle: "dashed",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#aaaaaa",
                borderStyle: "dashed",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  borderRightWidth: 1,
                  width: "10%",
                  borderColor: "#aaaaaa",
                  borderStyle: "dashed",
                  textAlign: "center",
                  padding: 8,
                }}
              >
                Sl
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  borderRightWidth: 1,
                  width: "70%",
                  borderColor: "#aaaaaa",
                  borderStyle: "dashed",
                  textAlign: "center",
                  padding: 8,
                }}
              >
                Products
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  width: "20%",
                  textAlign: "center",
                  padding: 8,
                }}
              >
                Qty
              </Text>
            </View>
            <View>
              {item.products.map((product, productIndex) => (
                <View key={productIndex}>
                  {deals
                    .filter(
                      (orderProduct) => orderProduct.id === product.productId
                    )
                    .map((orderItem, orderItemIndex) => (
                      <View
                        key={orderItemIndex}
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "500",
                            borderRightWidth: 1,
                            width: "10%",
                            borderColor: "#aaaaaa",
                            borderStyle: "dashed",
                            textAlign: "center",
                            padding: 10,
                          }}
                        >
                          {productIndex + 1}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "500",
                            borderRightWidth: 1,
                            width: "70%",
                            borderColor: "#aaaaaa",
                            borderStyle: "dashed",
                            textAlign: "left",
                            padding: 10,
                          }}
                        >
                          {orderItem.title}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "500",
                            width: "20%",
                            textAlign: "center",
                            padding: 10,
                            letterSpacing: 1,
                          }}
                        >
                          x{product.productCount}
                        </Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          </View>
          <Text
            style={{
              alignSelf: "flex-end",
              fontSize: 16,
              fontWeight: "500",
              margin: 5,
            }}
          >
            Total Amount : ₹{item.totalAmount}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",

              marginVertical: 8,
            }}
          >
            Arriving On :{" "}
            <Text style={{ color: "#50C878" }}>
              <CustomDate date={item.deliveryDate} />
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 0,
              marginVertical: 8,
            }}
          >
            Deliver Address :{" "}
          </Text>
          <View style={{ marginLeft: 30, marginBottom: 10 }}>
            <Text
              style={{
                color: "rgba(0,0,0,0.4)",
                fontSize: 16,
                fontWeight: "500",
                letterSpacing: 1,
              }}
            >
              {deliverAddress.addressUserName}
            </Text>
            <Text
              style={{
                color: "rgba(0,0,0,0.4)",
                fontSize: 16,
                fontWeight: "500",
                letterSpacing: 1,
              }}
            >
              {deliverAddress.lane},{"  "}
              {deliverAddress.street},
            </Text>
            <Text
              style={{
                color: "rgba(0,0,0,0.4)",
                fontSize: 16,
                fontWeight: "500",
                letterSpacing: 1,
              }}
            >
              {deliverAddress.city},{"  "}
              {deliverAddress.state},
            </Text>
            <Text
              style={{
                color: "rgba(0,0,0,0.4)",
                fontSize: 16,
                fontWeight: "500",
                letterSpacing: 1,
              }}
            >
              {deliverAddress.country},{"  "} {deliverAddress.postalCode}.
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 0,
              marginVertical: 8,
            }}
          >
            Payment Status :{" "}
            <Text style={{ color: "rgba(0,0,0,0.4)" }}>
              {item.paymentStatus}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 0,
              marginVertical: 8,
            }}
          >
            Payment Method :{" "}
            <Text style={{ color: "rgba(0,0,0,0.4)" }}>
              {item.paymentMethod}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
