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
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RegisterValidationSchema from "../yup/RegisterValidationSchema";
import CustomAlert from "../components/CustomAlert";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorButton, setErrorButton] = useState("");
  const navigation = useNavigation();
  const handleRegister = async () => {
    try {
      await RegisterValidationSchema.validate(
        { name, email, password },
        { abortEarly: false }
      );
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
      if (error.name === "ValidationError") {
        let validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else if (error.response && error.response.status === 401) {
        setErrorTitle("Existing Email");
        setErrorMessage(
          "An account with this email address already exists. Sign In!"
        );
        setErrorButton("OK");
        setShowAlert(true);
        console.log(error);
      } else if (error.response && error.response.status === 500) {
        setErrorTitle("Server Error");
        setErrorMessage("An unexpected error occured. Please Try Again Later!");
        setErrorButton("OK");
        setShowAlert(true);
        console.log(error);
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
          <Text style={styles.logtext}>Create an account in Impulse</Text>
        </KeyboardAvoidingView>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="person-outline"
            size={24}
            color="rgba(255,255,255,0.4)"
            style={{ paddingLeft: 7 }}
          />
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="Enter your name"
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            style={styles.inputText}
          />
        </View>
        <View style={{ height: 20, width: 300 }}>
          {errors.name && <Text style={styles.errorText}>*{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="rgba(255,255,255,0.4)"
            style={{ paddingLeft: 7 }}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            style={styles.inputText}
          />
        </View>
        <View style={{ height: 20, width: 300 }}>
          {errors.email && (
            <Text style={styles.errorText}>*{errors.email}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="key-outline"
            size={24}
            color="rgba(255,255,255,0.4)"
            style={{ paddingLeft: 7 }}
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
        <View style={{ height: 20, width: 300 }}>
          {errors.password && (
            <Text style={styles.errorText}>*{errors.password}</Text>
          )}
        </View>
      </KeyboardAvoidingView>

      <View style={styles.links}>
        <Text style={styles.termsAndConditions}>
          By signing up, you agree to our{" "}
          <Text style={styles.linkText}>Terms</Text>,{" "}
          <Text style={styles.linkText}>Privacy Policy</Text> and{" "}
          <Text style={styles.linkText}>Cookies Policy</Text>
        </Text>
      </View>

      <TouchableOpacity onPress={handleRegister}>
        <LinearGradient
          colors={["#FFAA46", "#2606FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signupText}>Already have an account? Sign In</Text>
      </Pressable>
      <CustomAlert
        visible={showAlert}
        title={errorTitle}
        message={errorMessage}
        closeButton={errorButton}
        onClose={() => {
          setShowAlert(false), setErrors({});
        }}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020121",
    alignItems: "center",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 11,
    margin: 2,
    marginHorizontal: 4,
  },
  logo: {
    marginTop: 105,
    width: 150,
    height: 150,
  },
  logtext: {
    color: "white",
    marginTop: 50,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 1.2,
  },
  inputContainer: {
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
    width: "100%",
  },
  links: {
    width: 300,
    padding: 5,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  termsAndConditions: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 1.1,
  },
  linkText: {
    color: "#008FFF",
    fontSize: 10,
    fontWeight: "400",
  },
  button: {
    marginTop: 90,
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
