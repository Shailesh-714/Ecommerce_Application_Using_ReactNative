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

const ProfilePicture = ({ imgWidth, imgHeight }) => {
  const { userEmail, profilePicture, setProfilePicture } =
    useContext(AppContext);

  return (
    <View>
      <Image
        source={
          profilePicture === ""
            ? {
                uri: "https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg",
              }
            : { uri: profilePicture }
        }
        style={{ width: imgWidth, height: imgHeight, borderRadius: 1000 }}
      />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({});
