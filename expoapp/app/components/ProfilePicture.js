import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";

import { AppContext } from "./AppContext";
import defaultProfileImage from "../assets/defaultProfileImage.png";

const ProfilePicture = ({ imgWidth, imgHeight }) => {
  const { userEmail, profilePicture, setProfilePicture } =
    useContext(AppContext);

  return (
    <View>
      <Image
        source={
          profilePicture === ""
            ? { uri: "../assets/defaultProfileImage.png" }
            : { uri: profilePicture }
        }
        style={{ width: imgWidth, height: imgHeight, borderRadius: 1000 }}
      />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({});
