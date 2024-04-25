import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import { deals } from "../data/DealsData";
import Like from "../components/Like";
import AddtoCart from "../components/AddtoCart";
import Share_btn from "../components/Share_btn";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import CustomStarRating from "../components/CustomStarRating";

const DotIndicator = ({ dataLength, currentIndex }) => {
  const dots = Array.from({ length: dataLength }, (_, index) => index);

  return (
    <View style={styles.indicatorContainer}>
      {dots.map((dotIndex) => (
        <View
          key={dotIndex}
          style={[
            styles.dot,
            dotIndex === currentIndex ? styles.activeDot : null,
          ]}
        />
      ))}
    </View>
  );
};

const ProductScreen = ({ route }) => {
  const { id } = route.params;

  const selectedIndex = deals.findIndex((product) => product.id === id);
  const product = deals[selectedIndex];
  const screenWidth = useWindowDimensions().width;
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth, height: screenWidth }}>
      <Image source={item} style={{ width: "100%", height: "100%" }} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "92%",
          marginVertical: 10,
          marginHorizontal: "4%",
        }}
      >
        <View>
          <Image
            style={{ height: 47, width: 108 }}
            source={require("../assets/name_logo.png")}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,1)" />
          <Wishlist />
          <Cart />
        </View>
      </View>

      <ScrollView>
        <View style={{ marginBottom: 35 }}>
          <FlatList
            data={product.carouselImages}
            renderItem={renderItem}
            onScroll={(event) => {
              const { contentOffset, layoutMeasurement } = event.nativeEvent;
              const currentIndex = Math.floor(
                contentOffset.x / layoutMeasurement.width
              );
              setCurrentIndex(currentIndex);
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          <DotIndicator
            dataLength={product.carouselImages.length}
            currentIndex={currentIndex}
          />
          <View
            style={{
              position: "absolute",
              right: 17,
              top: 260,
              backgroundColor: "white",
              paddingLeft: 1,
              paddingRight: 3,
              paddingVertical: 2,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <Share_btn />
          </View>
          <View
            style={{
              position: "absolute",
              right: 17,
              top: 310,
              backgroundColor: "white",
              paddingHorizontal: 4.5,
              paddingBottom: 5,
              paddingTop: 3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <Like Iconsize={21} dealId={product.id} />
          </View>
        </View>
        <View style={{ marginHorizontal: 18 }}>
          <Text
            style={{
              fontSize: 20,
              letterSpacing: 1.1,
              fontWeight: "600",
              paddingVertical: 3,
            }}
          >
            {product.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "grey",
              paddingVertical: 3,
            }}
          >
            {product.subtitle}
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "rgba(144,144,144,0.8)",
              }}
            >
              MRP INCLUSIVE OF ALL TAXES
            </Text>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
                ₹{product.price.toFixed(2)}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  fontSize: 11,
                  color: "grey",
                  fontWeight: "300",
                  marginHorizontal: 10,
                }}
              >
                ₹{product.oldPrice.toFixed(2)}
              </Text>
              <Text style={{ color: "#50C878", fontWeight: "500" }}>
                {(
                  ((product.oldPrice - product.price) * 100) /
                  product.oldPrice
                ).toFixed(0)}
                % OFF
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 3,
              alignItems: "center",
            }}
          >
            <View style={{ width: 50, marginVertical: 2 }}>
              <CustomStarRating
                rating={product.rating}
                starSize={10}
                fullStarColor={"rgba(255,167,15,0.9)"}
              />
            </View>
            <Text
              style={{ color: "rgba(144,144,144,0.8)", marginHorizontal: 8 }}
            >
              |
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="verified" size={20} color="#00adef" />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  alignSelf: "center",
                  marginHorizontal: 3,
                }}
              >
                {product.reviews} Verified Reviews
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "600", marginVertical: 15 }}
            >
              Product Description
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "grey",
                fontWeight: "500",
                textAlign: "justify",
                lineHeight: 24,
              }}
            >
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
        <AddtoCart
          customStyle={{
            paddingVertical: 9,
            fontSize: 14,
            fontWeight: "500",
            marginHorizontal: 0,
            backgroundColor: "#fcc11c",
          }}
          counterCustomStyle={{
            height: 45,
            marginRight: 20,
          }}
          dealId={product.id}
          showCounter={true}
          showGotoCart={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -23,
    left: 0,
    right: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "rgba(145, 145, 145,0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 7,
    height: 7,
    backgroundColor: "#FAAB46",
  },
});

export default ProductScreen;
