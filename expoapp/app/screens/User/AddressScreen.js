import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SERVER_IP } from "@env";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../components/AppContext";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Wishlist from "../../components/Wishlist";
import Cart from "../../components/Cart";
import addressValidation from "../../yup/AddressValidationSchema";

const AddressScreen = ({ showAddressHeader }) => {
  const navigation = useNavigation();

  const { userEmail, userAddresses, setUserAddresses, order, setOrder } =
    useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(order.address);
  const [errors, setErrors] = useState({});
  const [newAddress, setNewAddress] = useState({
    addressUserName: "",
    lane: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    contactNumber: "",
  });
  const [addNewAddress, setAddNewAddress] = useState(false);
  const screenWidth = useWindowDimensions("window").width;
  const screenHeight = useWindowDimensions("window").height;
  const addAddress = async () => {
    try {
      await addressValidation.validate(newAddress, { abortEarly: false });
      const response = await axios.post(
        `https://bold-foal-purely.ngrok-free.app/addAddress`,
        {
          email: userEmail,
          newAddress: newAddress,
        }
      );
      setErrors({});
      setAddNewAddress(false);
      const { addressList } = response.data;
      setUserAddresses(addressList);
      navigation.navigate("Address");
    } catch (error) {
      if (error.name === "ValidationError") {
        let validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
      console.log(error);
    }
  };
  const deleteAddress = async (_id) => {
    try {
      const response = await axios.post(
        `https://bold-foal-purely.ngrok-free.app/deleteAddress`,
        {
          email: userEmail,
          _id: _id,
        }
      );
      const { addressList } = response.data;
      setUserAddresses(addressList);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: screenWidth * 0.05,
          marginTop: 60,
          marginBottom: 20,
          display: addNewAddress || showAddressHeader ? "none" : "",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              letterSpacing: 1,
            }}
          >
            My Addresses
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,1)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          display: addNewAddress ? "none" : "",
          height: screenHeight * 0.84,
        }}
      >
        <View
          style={{
            marginHorizontal: screenWidth * 0.05,
            alignItems: "center",
          }}
        >
          <View style={{ width: screenWidth * 0.9 }}>
            {userAddresses.map((item, index) => (
              <Pressable
                onPress={() => {
                  setSelectedAddress(item._id),
                    setOrder({ ...order, address: item._id });
                }}
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor:
                    selectedAddress === item._id
                      ? "#eb104e"
                      : "rgba(0,0,0,0.2)",
                  marginVertical: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      lineHeight: 20,
                      letterSpacing: 1,
                    }}
                  >
                    {item.addressUserName}
                  </Text>
                  {selectedAddress === item._id && (
                    <Ionicons
                      name="checkmark-done-sharp"
                      size={20}
                      color="#eb104e"
                    />
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 20,
                    letterSpacing: 1,
                  }}
                >
                  {item.lane},
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 20,
                    letterSpacing: 1,
                  }}
                >
                  {item.street},
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 20,
                    letterSpacing: 1,
                  }}
                >
                  {item.city}, {item.state},
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 20,
                    letterSpacing: 1,
                  }}
                >
                  {item.country}, {item.postalCode}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      lineHeight: 20,
                      letterSpacing: 1,
                    }}
                  >
                    ph:{item.contactNumber}
                  </Text>
                  <TouchableOpacity onPress={() => deleteAddress(item._id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="#eb104e"
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      {!showAddressHeader &&
        (addNewAddress ? (
          <View style={{ height: screenHeight, width: screenWidth }}>
            <View
              style={{
                marginHorizontal: screenWidth * 0.05,
                flex: 1,
              }}
            >
              <View
                style={{
                  marginTop: 60,
                  marginBottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity onPress={() => setAddNewAddress(false)}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    letterSpacing: 1,
                  }}
                >
                  Add Address
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <View style={{ flex: 1, marginTop: 10 }}>
                  <Text style={{ fontWeight: "500" }}>
                    Name*{"  "}
                    <Text style={{ color: "#FF0000", fontSize: 12 }}>
                      {errors.addressUserName}
                    </Text>
                  </Text>

                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      borderRadius: 5,
                      marginVertical: 3,
                    }}
                  >
                    <TextInput
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, addressUserName: text })
                      }
                      placeholder="Name"
                      style={{ padding: 10 }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                  <Text style={{ fontWeight: "500" }}>
                    Contact*{"  "}
                    <Text style={{ color: "#FF0000", fontSize: 12 }}>
                      {errors.contactNumber}
                    </Text>
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      borderRadius: 5,
                      marginVertical: 3,
                    }}
                  >
                    <TextInput
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, contactNumber: text })
                      }
                      placeholder="Mobile no."
                      style={{ padding: 10 }}
                    />
                  </View>
                </View>
              </View>
              <Text style={{ fontWeight: "500", marginTop: 10 }}>
                House No./Lane/Locality*{"  "}
                <Text style={{ color: "#FF0000", fontSize: 12 }}>
                  {errors.lane}
                </Text>
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.4)",
                  borderRadius: 5,
                  marginVertical: 3,
                }}
              >
                <TextInput
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, lane: text })
                  }
                  placeholder="Lane"
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={{ fontWeight: "500", marginTop: 10 }}>
                Street/Area/Landmark*{"  "}
                <Text style={{ color: "#FF0000", fontSize: 12 }}>
                  {errors.street}
                </Text>
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.4)",
                  borderRadius: 5,
                  marginVertical: 3,
                }}
              >
                <TextInput
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, street: text })
                  }
                  placeholder="Street"
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={{ fontWeight: "500", marginTop: 10 }}>
                City*{"  "}
                <Text style={{ color: "#FF0000", fontSize: 12 }}>
                  {errors.city}
                </Text>
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.4)",
                  borderRadius: 5,
                  marginVertical: 3,
                }}
              >
                <TextInput
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, city: text })
                  }
                  placeholder="City"
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={{ fontWeight: "500", marginTop: 10 }}>
                State/Union Territory*{"  "}
                <Text style={{ color: "#FF0000", fontSize: 12 }}>
                  {errors.state}
                </Text>
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.4)",
                  borderRadius: 5,
                  marginVertical: 3,
                }}
              >
                <TextInput
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, state: text })
                  }
                  placeholder="State"
                  style={{ padding: 10 }}
                />
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <View style={{ flex: 1, marginTop: 10 }}>
                  <Text style={{ fontWeight: "500" }}>
                    Country*{"  "}
                    <Text style={{ color: "#FF0000", fontSize: 12 }}>
                      {errors.country}
                    </Text>
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      borderRadius: 5,
                      marginVertical: 3,
                    }}
                  >
                    <TextInput
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, country: text })
                      }
                      placeholder="Country"
                      style={{ padding: 10 }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                  <Text style={{ fontWeight: "500" }}>
                    Postal Code*{"  "}
                    <Text style={{ color: "#FF0000", fontSize: 12 }}>
                      {errors.postalCode}
                    </Text>
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      borderRadius: 5,
                      marginVertical: 3,
                    }}
                  >
                    <TextInput
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, postalCode: text })
                      }
                      placeholder="Pincode"
                      style={{ padding: 10 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                <Pressable
                  onPress={addAddress}
                  style={{
                    backgroundColor: "#fcc11c",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontWeight: "500" }}>Add Address</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ alignSelf: "center", width: screenWidth * 0.9 }}>
            <Pressable
              onPress={() => setAddNewAddress(true)}
              style={{
                backgroundColor: "#fcc11c",
                alignItems: "center",
                padding: 10,
                marginBottom: 20,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontWeight: "500" }}>Add New Address</Text>
            </Pressable>
          </View>
        ))}
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
