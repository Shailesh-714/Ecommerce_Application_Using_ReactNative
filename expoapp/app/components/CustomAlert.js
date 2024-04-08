import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

const CustomAlert = ({ visible, title, message, onClose, closeButton }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255,255,255,1)",
            borderRadius: 12,
            paddingTop: 18,
            paddingHorizontal: 18,
            width: 280,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 4,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14.5,
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {message}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
              borderTopWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.2)",
              width: 280,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                color: "#008FFF",
                padding: 10,
              }}
            >
              {closeButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
