import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../components/AppContext";
import { decrementCount, incrementCount } from "../redux/reducers/cartSlice";
import { Entypo } from "@expo/vector-icons";

const Counter = ({ dealId }) => {
  const { count } = useSelector(
    (state) => state.cart.cartList.find((item) => item.id === dealId) || {}
  );
  const { userEmail } = useContext(AppContext);
  const dispatch = useDispatch();
  const addCount = () => {
    dispatch(incrementCount({ id: dealId, userEmail }));
  };
  const removeCount = () => {
    dispatch(decrementCount({ id: dealId, userEmail }));
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#fcc11c",
        borderRadius: 6,
        flexDirection: "row",
        paddingVertical: 8,
      }}
    >
      <Pressable
        onPress={removeCount}
        style={{
          flex: 1,
          borderRightWidth: 1,
          borderColor: "rgba(0,0,0,0.15)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 4,
          paddingVertical: 0,
        }}
      >
        <Entypo name="minus" size={20} color="black" />
      </Pressable>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 4,
          paddingVertical: 0,
        }}
      >
        <Text>{count}</Text>
      </View>
      <Pressable
        onPress={addCount}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderLeftWidth: 1,
          borderColor: "rgba(0,0,0,0.15)",
          paddingHorizontal: 4,
          paddingVertical: 0,
        }}
      >
        <Entypo name="plus" size={20} color="black" />
      </Pressable>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
