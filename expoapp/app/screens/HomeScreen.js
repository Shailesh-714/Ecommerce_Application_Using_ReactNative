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
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
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
  const handleProductPress = (productId) => {
    navigation.navigate("Product", { id: productId });
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
          <Pressable style={styles.location}>
            <MaterialIcons
              name="my-location"
              size={10}
              color="rgba(0,0,0,0.75)"
            />
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
              City - Coimbatore-641024
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={16}
              color="black"
              style={{ marginLeft: -3 }}
            />
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,1)" />
          <Wishlist />
          <Cart />
        </View>
      </View>
      <LinearGradient
        colors={["#FFAA46", "#2606FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.searchContainer}
      >
        <Pressable style={styles.search}>
          <TextInput
            placeholder="Search for Products"
            placeholderTextColor={"rgba(0,0,0,0.3)"}
            style={[
              styles.text,
              { marginLeft: 10, fontWeight: "500", width: "80%" },
            ]}
          />
          <Ionicons name="search-sharp" size={24} color="#2606FF" />
        </Pressable>
      </LinearGradient>
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate("PageNotReady")}
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
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => navigation.navigate("PageNotReady")}>
                <View style={{ marginHorizontal: screenWidth * 0.05 }}>
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
            justifyContent: "center",
            gap: screenWidth * 0.05,
          }}
        >
          {deals.map((item, index) => (
            <Pressable
              key={index}
              style={{}}
              onPress={() => handleProductPress(item.id)}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  maxWidth: 157,
                }}
              >
                <Image
                  style={{
                    width: 157,
                    height: 130,
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
              <View style={{ position: "absolute", top: 6, left: 125 }}>
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
  searchContainer: {
    padding: 2.5,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 50,
    width: "92%",
    alignSelf: "center",
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
