import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../components/AppContext";
import { loadCartFromStorage } from "../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { loadWishlistFromStorage } from "../redux/reducers/dealSlice";
import CustomAlert from "../components/CustomAlert";
import { SERVER_IP } from "@env";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorButton, setErrorButton] = useState("");
  const navigation = useNavigation();
  const {
    setUserEmail,
    setUserName,
    setUserAge,
    setUserPhoneNumber,
    setUserAddresses,
    setProfilePicture,
    setLoginStatus,
  } = useContext(AppContext);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://bold-foal-purely.ngrok-free.app/login`,
        {
          email: email,
          password: password,
        }
      );
      const { token, username, userEmail, phoneNumber, age, addresses } =
        response.data;
      setUserEmail(userEmail);
      setUserName(username);
      setUserAge(age);
      setUserPhoneNumber(phoneNumber);
      setUserAddresses(addresses);
      dispatch(loadWishlistFromStorage(userEmail));
      dispatch(loadCartFromStorage(userEmail));
      const profileUri = await AsyncStorage.getItem(
        `@MyApp:ProfilePicture:${userEmail}`
      );
      if (profileUri !== "") {
        setProfilePicture(profileUri);
      } else {
        setProfilePicture("");
      }
      await AsyncStorage.setItem("token", token);
      setLoginStatus(true);
      navigation.navigate("Main");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorTitle("Invalid Login");
        setErrorMessage(
          "The Email and Password that you've entered is incorrect. Please try again"
        );
        setErrorButton("OK");
        setShowAlert(true);
      } else {
        setErrorTitle("Server Error");
        setErrorMessage(
          "An error occured while signing you in. Please try again later"
        );
        setErrorButton("OK");
        setShowAlert(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      <View>
        <KeyboardAvoidingView>
          <Text style={styles.logtext}>
            Login In to your Account{SERVER_IP}
          </Text>
        </KeyboardAvoidingView>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="rgba(255,255,255,0.4)"
            style={{ paddingLeft: 7, paddingRight: 5 }}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            style={styles.inputText}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="key-outline"
            size={24}
            color="rgba(255,255,255,0.4)"
            style={{ paddingLeft: 7, paddingRight: 5 }}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            style={styles.inputText}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.links}>
        <Text style={[{ color: "white" }, styles.remember]}>
          Keep me logged in
        </Text>
        <TouchableOpacity>
          <Text style={[{ color: "#008FFF" }, styles.forgot]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          colors={["#FFAA46", "#2606FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </Pressable>
      <CustomAlert
        visible={showAlert}
        title={errorTitle}
        message={errorMessage}
        closeButton={errorButton}
        onClose={() => {
          setShowAlert(false), setEmail(""), setPassword("");
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020121",
    alignItems: "center",
  },
  logo: {
    marginTop: 105,
    width: 150,
    height: 150,
  },
  logtext: {
    color: "white",
    marginTop: 80,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 1.2,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 5,
    width: 300,
    borderRadius: 5,
  },
  inputText: {
    paddingLeft: 10,
    color: "white",
    width: 250,
  },

  links: {
    width: 300,
    padding: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 130,
    width: 300,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  signupText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "400",
    padding: 10,
  },
});
