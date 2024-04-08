import React from "react";
import { Pressable, Alert, Share, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Share_btn = () => {
  const onShare = async () => {
    try {
      const message = `Check out this new app: Built using Expo React Native`;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Pressable onPress={onShare}>
      <Feather name="share-2" size={22} color="black" style={{ padding: 4 }} />
    </Pressable>
  );
};

export default Share_btn;

const styles = StyleSheet.create({});
