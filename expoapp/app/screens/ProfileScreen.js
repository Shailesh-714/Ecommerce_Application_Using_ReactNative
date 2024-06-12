import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Octicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
  FontAwesome,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import Wishlist from "../components/Wishlist";
import Cart from "../components/Cart";
import { AppContext } from "../components/AppContext";
import { useNavigation } from "@react-navigation/native";
import ProfilePicture from "../components/ProfilePicture";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userName, userEmail, userPhoneNumber, setIsLoggedIn, isLoggedIn } =
    useContext(AppContext);
  const screenWidth = useWindowDimensions("window").width;
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        marginTop: 5,
        flex: 1,
        alignItems: "center",
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
            Profile
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          gap: 20,
          marginHorizontal: screenWidth * 0.05,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("UserDetails")}
          style={{
            flexDirection: "row",
            backgroundColor: "#020121",
            borderRadius: 10,
            marginTop: 30,
            width: 320,
            marginBottom: 5,

            ...Platform.select({
              ios: {},
              android: {},
            }),
          }}
        >
          <View
            style={{
              borderRadius: 1000,
              marginVertical: 10,
              marginHorizontal: 20,
              borderWidth: 1.2,
              borderColor: "white",
              padding: 3,
            }}
          >
            <ProfilePicture imgHeight={45} imgWidth={45} />
          </View>
          <View style={{ marginVertical: 10, justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
              Hello {userName} !
            </Text>

            <Text
              numberOfLines={1}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 9.5,
                fontWeight: "400",
                overflow: "hidden",
                maxWidth: 200,
                marginBottom: 5,
                marginTop: 2,
                marginHorizontal: 1,
              }}
            >
              {userEmail}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              marginVertical: 15,
              padding: 5,
              right: 10,
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color="white"
            />
          </View>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            marginVertical: 5,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Orders")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 22,
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <FontAwesome name="inbox" size={18} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Orders</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("WishList")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 22,
              borderRadius: 9,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <FontAwesome5 name="heart" size={17} color="rgba(0,0,0,1)" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Wishlist</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Cart")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 22,
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <Feather name="shopping-bag" size={18} color="rgba(0,0,0,1)" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Cart</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Address")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 22,
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <Entypo name="location" size={18} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Addresses</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: "100%",
            gap: 20,
            position: "absolute",
            bottom: 35,
            alignItems: "left",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("PageNotReady")}
            style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
          >
            <MaterialIcons name="help-outline" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Help & Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PageNotReady")}
            style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
          >
            <Ionicons name="document-text-outline" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PageNotReady")}
            style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
          >
            <Ionicons name="chatbubbles-outline" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
          >
            <Ionicons name="mail-outline" size={24} color="black" />
            <Text
              style={{ fontSize: 16, fontWeight: "500" }}
              onPress={() =>
                Linking.openURL("mailto:?to=expoapp.shailesh@gmail.com")
              }
            >
              Email Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("token");
              navigation.replace("Login");
            }}
            style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
          >
            <Feather name="log-out" size={23} color="#ff0000" />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#ff0000" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
