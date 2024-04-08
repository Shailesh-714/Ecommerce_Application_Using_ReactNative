import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../components/AppContext";

const AddressScreen = () => {
  const { userEmail } = useContext(AppContext);
  const [newAddress, setNewAddress] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const addAddress = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.176:3000/addAddress",
        {
          email: userEmail,
          newAddress: newAddress,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Pressable
        onPress={() =>
          setNewAddress({
            address: "1",
            street: "2",
            city: "3",
            state: "4",
            country: "5",
            postalCode: "6",
          })
        }
      >
        <Text>tttttttt</Text>
      </Pressable>
      <Pressable onPress={addAddress}>
        <Text>tttttttt</Text>
      </Pressable>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
