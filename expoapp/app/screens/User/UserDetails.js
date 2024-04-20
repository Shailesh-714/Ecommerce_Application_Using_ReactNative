import React, { useContext, useState, useEffect, useRef } from "react";
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
import { SERVER_IP } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../components/AppContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import Wishlist from "../../components/Wishlist";
import Cart from "../../components/Cart";
import ProfilePicture from "../../components/ProfilePicture";
import * as Imagepicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    setProfilePicture,
  } = useContext(AppContext);
  const [newUsername, setNewUsername] = useState(userName);
  const [newUserEmail, setNewUserEmail] = useState(userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [age, setAge] = useState(userAge);
  const navigation = useNavigation();
  const screenWidth = useWindowDimensions("window").width;
  const [mediaModal, setMediaModal] = useState(false);

  const updateUserData = async () => {
    try {
      const response = await axios.post(
        `http://${SERVER_IP}/update-user-data`,
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
  const uploadImageCamera = async () => {
    try {
      await Imagepicker.requestCameraPermissionsAsync();
      let result = await Imagepicker.launchCameraAsync({
        cameraType: Imagepicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
        await AsyncStorage.setItem(
          `@MyApp:ProfilePicture:${userEmail}`,
          result.assets[0].uri
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMediaModal(false);
    }
  };
  const uploadImageMedia = async () => {
    try {
      await Imagepicker.requestMediaLibraryPermissionsAsync();
      let result = await Imagepicker.launchImageLibraryAsync({
        mediaTypes: Imagepicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
        await AsyncStorage.setItem(
          `@MyApp:ProfilePicture:${userEmail}`,
          result.assets[0].uri
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMediaModal(false);
    }
  };
  const deleteImage = async () => {
    setProfilePicture("");
    setMediaModal(false);
    await AsyncStorage.removeItem(`@MyApp:ProfilePicture:${userEmail}`);
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
      <View
        style={{ marginHorizontal: screenWidth * 0.05, flex: 1, marginTop: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            marginBottom: 40,
            alignSelf: "center",
            right: -10,
          }}
        >
          <View
            style={{
              borderRadius: 1000,
              borderWidth: 2,
              padding: 3,
              borderColor: "#eb104e",
            }}
          >
            <ProfilePicture imgHeight={110} imgWidth={110} />
          </View>
          <TouchableOpacity
            onPress={() => setMediaModal(true)}
            style={{
              alignSelf: "flex-end",
              borderRadius: 100,
              backgroundColor: "#EBD7DB",
              padding: 6,
              left: -30,
            }}
          >
            <Feather name="camera" size={18} color="#eb104e" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ marginVertical: 10, flex: 1 }}>
            <Text style={{ fontWeight: "500", fontSize: 14 }}>Username</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.4)",
                borderRadius: 5,
                marginVertical: 5,
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
                marginVertical: 5,
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
              marginVertical: 5,
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
              marginVertical: 5,
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
            bottom: 10,
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
      {mediaModal && (
        <View
          style={{
            width: screenWidth,
            borderRadius: 20,
            backgroundColor: "white",
            position: "absolute",
            alignSelf: "center",
            bottom: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "#eb104e",
              paddingTop: 10,
              fontSize: 15,
              paddingBottom: 6,
              paddingHorizontal: 8,
              borderBottomWidth: 2,
              borderColor: "rgba(0,0,0,0.15)",
            }}
          >
            Change Profile Picture
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              flex: 1,
              width: "100%",
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={uploadImageCamera}
              style={{
                backgroundColor: "rgba(235, 16, 78, 0.08)",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Feather name="camera" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={uploadImageMedia}
              style={{
                backgroundColor: "rgba(235, 16, 78, 0.08)",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="perm-media" size={36} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteImage}
              style={{
                backgroundColor: "rgba(235, 16, 78, 0.08)",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="delete-outline" size={36} color="#eb104e" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setMediaModal(false)}
            style={{ position: "absolute", top: 12, right: 20 }}
          >
            <AntDesign name="close" size={20} color="#eb104e" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default UserDetails;
