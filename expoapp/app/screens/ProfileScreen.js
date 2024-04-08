import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Octicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import Wishlist from "../components/Wishlist";
import Cart from "../components/Cart";
import { AppContext } from "../components/AppContext";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import UserDetails from "./User/UserDetails";

const ProfileScreen = () => {
  const { userName, userEmail, userPhoneNumber } = useContext(AppContext);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const screenWidth = useWindowDimensions("window").width;
  const navigation = useNavigation();
  const toggleUserDetails = () => setShowUserDetails(!showUserDetails);
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
            Profile
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <ScrollView
        style={{
          marginHorizontal: screenWidth * 0.05,
        }}
      >
        <Pressable
          onPress={toggleUserDetails}
          style={{
            flexDirection: "row",
            backgroundColor: "#020121",
            borderRadius: 10,
            marginTop: 30,
            marginBottom: 10,

            ...Platform.select({
              ios: {},
              android: {},
            }),
          }}
        >
          <Image
            source={require("../assets/defaultProfileImage.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "white",
              marginVertical: 10,
              marginHorizontal: 15,
            }}
          />
          <View style={{ marginVertical: 10, justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
              Hello {userName} !
            </Text>

            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "500",
                overflow: "hidden",
                maxWidth: 200,
                marginBottom: 5,
                marginHorizontal: 1,
              }}
            >
              {userEmail}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 15,
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
            marginVertical: 20,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Orders")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 20,
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <FontAwesome name="inbox" size={24} color="black" />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Orders</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("WishList")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 20,
              borderRadius: 9,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <FontAwesome5 name="heart" size={20} color="rgba(0,0,0,1)" />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Wishlist</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Cart")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 20,
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <Feather name="shopping-bag" size={21.5} color="rgba(0,0,0,1)" />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Cart</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Address")}
            style={{
              width: 155,
              backgroundColor: "rgba(255,255,255,1)",
              padding: 20,
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <Entypo name="location" size={24} color="black" />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Addresses</Text>
          </Pressable>
        </View>
      </ScrollView>
      <UserDetails isVisible={showUserDetails} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
