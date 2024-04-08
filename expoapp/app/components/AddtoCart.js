import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddedtocart } from "../redux/reducers/cartSlice";
import { AppContext } from "./AppContext";
import Counter from "./Counter";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddtoCart = ({
  customStyle,
  dealId,
  showCounter,
  width,
  showGotoCart,
  showRemove,
  counterCustomStyle,
}) => {
  const { addedtocart } = useSelector(
    (state) => state.cart.cartList.find((item) => item.id === dealId) || {}
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userEmail } = useContext(AppContext);

  const handleCartPress = () => {
    dispatch(toggleAddedtocart({ id: dealId, userEmail }));
  };

  return (
    <Pressable
      style={{ paddingHorizontal: 0, marginVertical: 2 }}
      onPress={handleCartPress}
    >
      {addedtocart ? (
        <View
          style={{
            flexDirection: "row",
            width: width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showCounter && (
            <View
              style={[
                counterCustomStyle,
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  top: -5,
                },
              ]}
            >
              <Counter dealId={dealId} />
            </View>
          )}
          {showGotoCart && (
            <Pressable
              onPress={() => navigation.navigate("Cart")}
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  customStyle,
                  {
                    fontWeight: "500",
                    padding: 5.8,
                    textAlign: "center",
                    borderWidth: 1,
                    borderColor: "#fcc11c",
                    color: "black",
                    borderRadius: 7,
                    position: "relative",
                    top: -5,
                  },
                ]}
              >
                Goto Cart
              </Text>
            </Pressable>
          )}
          {showRemove && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                top: -7,
                gap: 3,
                margin: 3,
                marginRight: 8,
              }}
            >
              <MaterialIcons
                name="delete-outline"
                size={25}
                color="rgba(0,0,0,1)"
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text
            style={[
              customStyle,
              {
                padding: 7,
                fontWeight: "500",
                textAlign: "center",
                backgroundColor: "#fcc11c",
                borderRadius: 7,
                position: "relative",
                top: -5,
              },
            ]}
          >
            Add to Cart
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default AddtoCart;

const styles = StyleSheet.create({});
