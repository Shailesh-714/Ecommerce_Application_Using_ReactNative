import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomStarRating = ({ rating, starSize, fullStarColor }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons key={i} name="star" size={starSize} color={fullStarColor} />
    );
  }
  if (halfStar) {
    stars.push(
      <Ionicons
        key="half"
        name="star-half"
        size={starSize}
        color={fullStarColor}
      />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Ionicons
        key={`empty-${i}`}
        name="star-outline"
        size={starSize}
        color={fullStarColor}
      />
    );
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export default CustomStarRating;
