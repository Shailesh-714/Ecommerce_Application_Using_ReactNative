import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AppContext } from "../../components/AppContext";

import LottieView from "lottie-react-native";

const PaymentScreen = () => {
  const { order, setOrder } = useContext(AppContext);
  const [paidGif, setPaidGif] = useState(false);
  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      {paidGif ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LottieView
            source={require("../../assets/payment/PaidAnimation.json")}
            autoPlay
            loop={false}
            style={{ width: 130, height: 130, top: -15 }}
          />
        </View>
      ) : (
        <View>
          <View>
            <Text
              style={{
                color: "#aaaaaa",
                fontSize: 15,
                fontWeight: "500",
                margin: 10,
              }}
            >
              Recommended:
            </Text>
            <TouchableOpacity
              onPress={() =>
                setOrder({
                  ...order,
                  paymentMethod: "COD",
                  paymentStatus: "Pending",
                })
              }
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 1,
                borderColor:
                  order.paymentMethod === "COD" ? "#eb104e" : "rgba(0,0,0,0)",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 15 }}>
                    Cash on Delivery(COD)
                  </Text>
                  <MaterialCommunityIcons
                    name="cash-fast"
                    size={20}
                    color="black"
                  />
                </View>
                <Text
                  style={{ fontWeight: "500", color: "#aaaaaa", fontSize: 13 }}
                >
                  Pay when you recieve your delivery
                </Text>
              </View>
              {order.paymentMethod === "COD" && (
                <View>
                  <Ionicons
                    name="checkmark-done-sharp"
                    size={20}
                    color="#eb104e"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: "#aaaaaa",
                fontSize: 15,
                fontWeight: "500",
                margin: 10,
              }}
            >
              Other Payment Options:
            </Text>
            <TouchableOpacity
              onPress={() => setOrder({ ...order, paymentMethod: "UPI" })}
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
                marginBottom: 5,
                borderWidth: 1,
                borderColor:
                  order.paymentMethod === "UPI" ? "#eb104e" : "rgba(0,0,0,0)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>UPI</Text>
                    <Image
                      source={require("../../assets/payment/upi.png")}
                      style={{ height: 18, width: 55 }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#aaaaaa",
                      fontSize: 13,
                    }}
                  >
                    Pay with your UPI ID
                  </Text>
                </View>
                {order.paymentMethod === "UPI" && (
                  <View>
                    <Ionicons
                      name="checkmark-done-sharp"
                      size={20}
                      color="#eb104e"
                    />
                  </View>
                )}
              </View>
              {order.paymentMethod === "UPI" && (
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 11 }}>
                      This payment method has not yet been enabled!
                    </Text>
                    <Text style={{ fontSize: 10, color: "#eb104e" }}>
                      Just Click Pay to proceed
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setPaidGif(true);
                      setOrder({ ...order, paymentStatus: "Paid" });
                    }}
                    style={{
                      backgroundColor: "#eb104e",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Pay
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOrder({ ...order, paymentMethod: "Card" })}
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
                marginVertical: 5,
                borderWidth: 1,
                borderColor:
                  order.paymentMethod === "Card" ? "#eb104e" : "rgba(0,0,0,0)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>
                      Debit/Credit Card
                    </Text>
                    <Image
                      source={require("../../assets/payment/card.png")}
                      style={{ width: 65, height: 18 }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#aaaaaa",
                      fontSize: 13,
                    }}
                  >
                    Add your Debit/Credit card
                  </Text>
                </View>
                {order.paymentMethod === "Card" && (
                  <View>
                    <Ionicons
                      name="checkmark-done-sharp"
                      size={20}
                      color="#eb104e"
                    />
                  </View>
                )}
              </View>
              {order.paymentMethod === "Card" && (
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 11 }}>
                      This payment method has not yet been enabled!
                    </Text>
                    <Text style={{ fontSize: 10, color: "#eb104e" }}>
                      Just Click Pay to proceed
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setPaidGif(true);
                      setOrder({ ...order, paymentStatus: "Paid" });
                    }}
                    style={{
                      backgroundColor: "#eb104e",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Pay
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setOrder({ ...order, paymentMethod: "NetBanking" })
              }
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
                marginVertical: 5,
                borderWidth: 1,
                borderColor:
                  order.paymentMethod === "NetBanking"
                    ? "#eb104e"
                    : "rgba(0,0,0,0)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>
                      Net Banking
                    </Text>
                    <FontAwesome name="bank" size={14} color="black" />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#aaaaaa",
                      fontSize: 13,
                    }}
                  >
                    Pay directly from your bank account
                  </Text>
                </View>
                {order.paymentMethod === "NetBanking" && (
                  <View>
                    <Ionicons
                      name="checkmark-done-sharp"
                      size={20}
                      color="#eb104e"
                    />
                  </View>
                )}
              </View>
              {order.paymentMethod === "NetBanking" && (
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 11 }}>
                      This payment method has not yet been enabled!
                    </Text>
                    <Text style={{ fontSize: 10, color: "#eb104e" }}>
                      Just Click Pay to proceed
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setPaidGif(true);
                      setOrder({ ...order, paymentStatus: "Paid" });
                    }}
                    style={{
                      backgroundColor: "#eb104e",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Pay
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOrder({ ...order, paymentMethod: "EMI" })}
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
                marginVertical: 5,
                borderWidth: 1,
                borderColor:
                  order.paymentMethod === "EMI" ? "#eb104e" : "rgba(0,0,0,0)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>EMI</Text>
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={18}
                      color="black"
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#aaaaaa",
                      fontSize: 13,
                    }}
                  >
                    Pay monthly with no cost EMI
                  </Text>
                </View>
                {order.paymentMethod === "EMI" && (
                  <View>
                    <Ionicons
                      name="checkmark-done-sharp"
                      size={20}
                      color="#eb104e"
                    />
                  </View>
                )}
              </View>
              {order.paymentMethod === "EMI" && (
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 11 }}>
                      This payment method has not yet been enabled!
                    </Text>
                    <Text style={{ fontSize: 10, color: "#eb104e" }}>
                      Just Click Pay to proceed
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setPaidGif(true);
                      setOrder({ ...order, paymentStatus: "Paid" });
                    }}
                    style={{
                      backgroundColor: "#eb104e",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Pay
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
