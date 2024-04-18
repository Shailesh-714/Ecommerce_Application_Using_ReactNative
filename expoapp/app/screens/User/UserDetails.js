import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
  Text,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../components/AppContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import Wishlist from "../../components/Wishlist";
import Cart from "../../components/Cart";

const { height } = Dimensions.get("window");

const UserDetails = () => {
  const {
    userName,
    userEmail,
    setUserName,
    userPhoneNumber,
    setUserPhoneNumber,
    userAge,
    setUserAge,
  } = useContext(AppContext);
  const [newUsername, setNewUsername] = useState(userName);
  const [newUserEmail, setNewUserEmail] = useState(userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [age, setAge] = useState(userAge);
  const navigation = useNavigation();
  const screenWidth = useWindowDimensions("window").width;
  const updateUserData = async () => {
    try {
      const response = await axios.post(
        "http://192.168.2.176:3000/update-user-data",
        {
          email: userEmail,
          name: newUsername,
          phoneNumber: phoneNumber,
          age: age,
        }
      );
      setUserAge(age);
      setUserPhoneNumber(phoneNumber);
      setUserName(newUsername);
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while updating user data.");
    }
  };

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
            User Info
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <View style={{ marginHorizontal: screenWidth * 0.05, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ marginVertical: 10, flex: 1 }}>
            <Text style={{ fontWeight: "500" }}>Username</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.4)",
                borderRadius: 5,
                marginVertical: 3,
              }}
            >
              <TextInput
                value={newUsername}
                onChangeText={(text) => setNewUsername(text)}
                placeholder="Enter Username"
                style={{ padding: 7 }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 10, flex: 1 }}>
            <Text style={{ fontWeight: "500" }}>Age</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.4)",
                borderRadius: 5,
                marginVertical: 3,
              }}
            >
              <TextInput
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Enter Age"
                style={{ padding: 7 }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: "500" }}>Email</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.4)",
              borderRadius: 5,
              marginVertical: 3,
            }}
          >
            <TextInput
              value={newUserEmail}
              onChangeText={(text) => setNewUserEmail(text)}
              placeholder="Enter Email"
              style={{ padding: 7 }}
            />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: "500" }}>Mobile No.</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.4)",
              borderRadius: 5,
              marginVertical: 3,
            }}
          >
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholder="Enter Mobile No."
              style={{ padding: 7 }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={updateUserData}
          style={{
            borderWidth: 2,
            borderColor: "#50C878",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            marginVertical: 20,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#50C878",
              fontWeight: "600",
              fontSize: 14,
              letterSpacing: -0.5,
            }}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default UserDetails;
