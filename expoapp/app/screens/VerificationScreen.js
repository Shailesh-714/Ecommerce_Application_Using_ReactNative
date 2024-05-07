import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomAlert from "../components/CustomAlert";
import { SERVER_IP } from "@env";

const VerificationScreen = ({ route }) => {
  const { name, email, password, verificationCode } = route.params;
  const [userCode, setUserCode] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorButton, setErrorButton] = useState("");
  const navigation = useNavigation();
  const handleVerification = async () => {
    if (userCode === verificationCode) {
      try {
        const response = await axios.post(
          `https://react-native-9ode.onrender.com/email-verify`,
          {
            name: name,
            email: email,
            password: password,
          }
        );
        setErrorTitle("Success");
        setErrorMessage("Email verified Successfully! Login to Proceed");
        setErrorButton("PROCEED");
        setShowAlert2(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorTitle("Wrong Code");
      setErrorMessage("The code you entered seems to be wrong");
      setErrorButton("Retry");
      setShowAlert1(true);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `https://react-native-9ode.onrender.com/register`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      const { verificationCode } = response.data;
      navigation.navigate("Verify", {
        name,
        email,
        password,
        verificationCode,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#020121",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: "white",
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Verify Your Email Account
      </Text>
      <Text
        style={{
          color: "rgba(255,255,255,0.8)",
          width: 295,
          textAlign: "justify",
          marginVertical: 10,
        }}
      >
        Enter the 6-digit verification code sent to your email account to
        proceed
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.15)",
          padding: 5,
          width: 300,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <MaterialCommunityIcons
          name="key-outline"
          size={24}
          color="rgba(255,255,255,0.4)"
          style={{ paddingLeft: 7 }}
        />
        <TextInput
          value={userCode}
          onChangeText={(text) => setUserCode(text)}
          placeholder="Enter your verification code"
          placeholderTextColor={"rgba(255,255,255,0.4)"}
          style={{
            paddingLeft: 10,
            color: "white",
            width: "100%",
            marginHorizontal: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: 290,
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={handleRegister}>
          <Text style={{ color: "#008FFF", marginVertical: 10 }}>
            Resend code
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("PageNotReady")}>
          <Text style={{ color: "#ffffff", marginVertical: 10, fontSize: 13 }}>
            Get Help?
          </Text>
        </Pressable>
      </View>

      <TouchableOpacity onPress={handleVerification}>
        <LinearGradient
          colors={["#FFAA46", "#2606FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            marginTop: 25,
            width: 150,
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Verify</Text>
        </LinearGradient>
      </TouchableOpacity>
      <CustomAlert
        visible={showAlert1}
        title={errorTitle}
        message={errorMessage}
        closeButton={errorButton}
        onClose={() => {
          setShowAlert1(false), setUserCode("");
        }}
      />
      <CustomAlert
        visible={showAlert2}
        title={errorTitle}
        message={errorMessage}
        closeButton={errorButton}
        onClose={() => {
          setShowAlert2(false), navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({});
