import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../_constants/Colors';
import {hp, wp} from './Responsive';
const InputComp = ({
  placeholder,
  containerStyle,
  maxLength,
  keyboardType,
  value,
  onChangeText,
  multiline,
  editable,
  inputStyleInner,
}) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <TextInput
        multiline={multiline}
        editable={editable}
        onChangeText={onChangeText}
        value={value}
        maxLength={maxLength}
        keyboardType={keyboardType ? 'phone-pad' : 'default'}
        placeholder={placeholder}
        placeholderTextColor={Colors.Black}
        style={{...styles.inputStyle, ...inputStyleInner}}
      />
    </View>
  );
};
export default InputComp;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingHorizontal: wp(2),
    height: hp(5.8),
    borderRadius: wp(1.5),
    borderBottomWidth: hp(0.3),
    borderColor: 'red',
    borderTopWidth: hp(0),
    borderLeftWidth: hp(0),
    borderRightWidth: hp(0),
    borderBottomColor: Colors.PrimaryColor,
    borderColor: Colors.PrimaryColor,
  },
  inputStyle: {
    padding: 0,
    width: '100%',
    height: '100%',
    color: Colors.Black,
    borderWidth: 0,
    fontSize: hp(1.9),
  },
});
