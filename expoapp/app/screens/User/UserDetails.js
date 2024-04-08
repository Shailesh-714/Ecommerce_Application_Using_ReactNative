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
} from "react-native";
import { AppContext } from "../../components/AppContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const UserDetails = ({ isVisible }) => {
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

  const translateY = new Animated.Value(height);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <View>
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <View style={styles.content}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                fontSize: 20,
                fontWeight: "500",
                paddingHorizontal: 10,
                paddingBottom: 5,
                marginBottom: 10,
              }}
            >
              User Info
            </Text>
          </View>
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
              marginTop: 20,
              marginBottom: 10,
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    backgroundColor: "white",
  },
  content: {},
});

export default UserDetails;
