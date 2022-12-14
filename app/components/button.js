import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const { onPress, title = "Button", styleButton, styleButtonText } = props;
  return (
    <Pressable style={styleButton || styles.button} onPress={onPress}>
      <Text style={styleButtonText || styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderColor: "#265E92",
    borderRadius: 4,
    padding: 18,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
