import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Like from "../components/Like";
import { images } from "../data/BannerData";
import { deals } from "../data/DealsData";
import { list } from "../data/ListData";
import AddtoCart from "../components/AddtoCart";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import CustomStarRating from "../components/CustomStarRating";

const HomeScreen = ({ navigation }) => {
  const screenWidth = useWindowDimensions("window").width;
  const [searchQuery, setSearchQuery] = useState("");
  const handleProductPress = (productId) => {
    navigation.navigate("Product", { id: productId });
  };
  const handleSearch = () => {
    if (searchQuery !== "") {
      navigation.navigate("SearchResult", { searchQuery });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "92%",
          marginTop: 5,
        }}
      >
        <View>
          <Image
            source={require("../assets/name_logo.png")}
            style={styles.nameLogo}
          />
          <View style={styles.location}>
            <Ionicons name="cart" size={11} color="rgba(0,0,0,0.75)" />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 9,
                  color: "black",
                  marginLeft: 0,
                  letterSpacing: 1.1,
                },
              ]}
            >
              Online Shopping Platform
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,1)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          marginBottom: 10,
          borderRadius: 50,
          width: "92%",
          alignSelf: "center",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 3,
            },
          }),
        }}
      >
        <LinearGradient
          colors={["#FFAA46", "#2606FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: 2.5,
            borderRadius: 50,
          }}
        >
          <Pressable style={styles.search}>
            <TextInput
              placeholder="Search for Products"
              placeholderTextColor={"rgba(0,0,0,0.3)"}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
              style={[
                styles.text,
                { marginLeft: 10, fontWeight: "500", width: "80%" },
              ]}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Ionicons name="search-sharp" size={24} color="#2606FF" />
            </TouchableOpacity>
          </Pressable>
        </LinearGradient>
      </View>
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate("CategoryProduct", {category:item.category})}
              style={{
                margin: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={require("../assets/list/product_bg.png")}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: 65,
                    height: 65,
                    resizeMode: "contain",
                  }}
                  source={item.image}
                />
              </ImageBackground>

              <Text
                style={[
                  styles.text,
                  {
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: "400",
                    marginTop: 8,
                  },
                ]}
              >
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <FlatList
          data={images}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => navigation.navigate("PageNotReady")}>
                <View
                  style={{
                    marginHorizontal: screenWidth * 0.05,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      width: screenWidth * 0.9,
                      height: 200,
                      alignSelf: "center",
                      borderRadius: 15,
                      backgroundColor: "white",
                      ...Platform.select({
                        ios: {
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                        },
                        android: {
                          elevation: 2,
                        },
                      }),
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: screenWidth * 0.9,
                        height: 200,
                        alignSelf: "center",
                        borderRadius: 15,
                      }}
                    />
                  </View>
                </View>
              </Pressable>
            );
          }}
          horizontal={true}
          pagingEnabled={true}
        />
        <View>
          <Text
            style={[
              styles.text,
              {
                paddingTop: 20,
                marginBottom: 15,
                marginHorizontal: screenWidth * 0.075,
                fontSize: 20,
                fontWeight: "600",
              },
            ]}
          >
            Hot Deals of the Day 🔥
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: screenWidth * 0.05,
            width: screenWidth * 0.9,
            alignSelf: "center",
          }}
        >
          {deals.slice(0, 50).map((item, index) => (
            <Pressable key={index} onPress={() => handleProductPress(item.id)}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  maxWidth: screenWidth * 0.425,
                  shadowColor: "#333333",
                  ...Platform.select({
                    ios: {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    },
                    android: {
                      elevation: 3,
                    },
                  }),
                }}
              >
                <Image
                  style={{
                    width: screenWidth * 0.425,
                    height: screenWidth * 0.4,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  source={item.image}
                />
                <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.text,
                      {
                        fontSize: 13,
                        fontWeight: "500",
                        overflow: "hidden",
                        marginVertical: 3,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.text,
                      {
                        fontSize: 11,
                        fontWeight: "400",
                        color: "grey",
                        minHeight:35
                      },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                  <View
                    style={{
                      marginVertical: 2,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <CustomStarRating
                      rating={item.rating}
                      starSize={10}
                      fullStarColor={"rgba(255,167,15,0.9)"}
                    />
                    <Text
                      style={{
                        color: "#50C878",
                        fontWeight: "500",
                        fontSize: 11,
                        letterSpacing: -0.3,
                      }}
                    >
                      {(
                        ((item.oldPrice - item.price) * 100) /
                        item.oldPrice
                      ).toFixed(0)}
                      % Off
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginVertical: 3 }}>
                    <Text style={{ fontWeight: "500" }}>₹{item.price}</Text>
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        fontSize: 12,
                        color: "grey",
                        fontWeight: "300",
                        marginHorizontal: 10,
                      }}
                    >
                      ₹{item.oldPrice}
                    </Text>
                  </View>
                </View>
                <View style={{ marginLeft: 8, marginRight: 2 }}>
                  <AddtoCart
                    dealId={item.id}
                    customStyle={{ marginRight: 3 }}
                    showGotoCart={true}
                  />
                </View>
              </View>
              <View style={{ position: "absolute", top: 10, right: 10 }}>
                <Like Iconsize={19} dealId={item.id} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  search: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    gap: 10,
    padding: 3,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 22,
    position: "relative",
    top: -3,
  },
  nameLogo: {
    height: 47,
    width: 108,
    marginHorizontal: 27,
  },
});
