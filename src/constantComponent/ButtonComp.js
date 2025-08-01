import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../_constants/Colors";
import { hp, wp } from "./Responsive";

export default function ButtonComp({
  title,
  onPress,
  containerStyle,
  disabled,
  containerTitle
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}
    >
      <Text style={{...styles.btnTitle,...containerTitle}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PrimaryColor,
    paddingVertical: hp(1.8),
    borderRadius: wp(2),
    marginTop: hp(1.5),
  },
  btnTitle: {
    color: Colors.White,
    textAlign: "center",
    letterSpacing: wp(0.3),
    fontSize: hp(2),
  },
});
