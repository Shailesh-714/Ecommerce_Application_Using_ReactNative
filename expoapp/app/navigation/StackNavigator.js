import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import OrderedScreen from "../screens/OrderedScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Feather,
  Foundation,
  Octicons,
} from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import WishListScreen from "../screens/WishListScreen";
import PageNotReady from "../screens/PageNotReady";
import VerificationScreen from "../screens/VerificationScreen";
import AddressScreen from "../screens/User/AddressScreen";
import OrderDetails from "../screens/User/OrderDetails";
import UserDetails from "../screens/User/UserDetails";
import SearchResult from "../screens/SearchResult";
import { AppContext } from "../components/AppContext";
import LoadingScreen from "../components/LoadingScreen";
import CategoryProducts from "../screens/CategoryProducts";

const StackNavigator = () => {
  const { userEmail, setIsLoggedIn } = useContext(AppContext);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarActiveTintColor: "#FAAB46",
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "600",
              position: "relative",
              top: -4,
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Foundation name="home" size={26} color="#FAAB46" />
              ) : (
                <Octicons name="home" size={22} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoryScreen}
          options={{
            tabBarLabel: "Categories",
            tabBarActiveTintColor: "#FAAB46",
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "600",
              position: "relative",
              top: -4,
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="grid" size={24} color="#FAAB46" />
              ) : (
                <Ionicons name="grid-outline" size={22} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrderedScreen}
          options={{
            tabBarLabel: "Orders",
            tabBarActiveTintColor: "#FAAB46",
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "600",
              position: "relative",
              top: -4,
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="inbox" size={24} color="#FAAB46" />
              ) : (
                <Feather name="inbox" size={22} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarActiveTintColor: "#FAAB46",
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "600",
              position: "relative",
              top: -4,
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="person" size={30} color="#FAAB46" />
              ) : (
                <MaterialIcons name="person-outline" size={26} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verify"
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryProduct"
          component={CategoryProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WishList"
          component={WishListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={OrderedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PageNotReady"
          component={PageNotReady}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  text: {
    fontFamily: "courgette",
  },
});
