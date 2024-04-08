import React, { useContext } from "react";
import { Pressable } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/reducers/dealSlice";
import { AppContext } from "./AppContext";

const Like = ({ Iconsize, dealId }) => {
  const { wishlisted } = useSelector(
    (state) => state.deals.dealsList.find((item) => item.id === dealId) || {}
  );
  const dispatch = useDispatch();
  const { userEmail } = useContext(AppContext);

  const handleLikePress = () => {
    dispatch(toggleWishlist({ id: dealId, userEmail }));
  };

  return (
    <Pressable
      onPress={handleLikePress}
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        width: 25,
        height: 25,
        paddingTop: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {wishlisted ? (
        <AntDesign name="heart" size={Iconsize} color="#e65a4b" />
      ) : (
        <FontAwesome5 name="heart" size={Iconsize} color="rgba(0,0,0,1)" />
      )}
    </Pressable>
  );
};

export default Like;
