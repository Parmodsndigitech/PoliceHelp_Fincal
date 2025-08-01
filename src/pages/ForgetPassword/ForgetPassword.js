import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, Animated, StyleSheet, ScrollView, ActivityIndicator, Modal, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { userActions } from '../../_actions';

import axios from 'axios'
import Colors from '../../_constants/Colors';
import { hp, wp } from '../../constantComponent/Responsive';
const { height } = Dimensions.get('window');

function AnimatedInput({ value, onChangeText, placeholder, keyboardType, placeholderTextColor, secureTextEntry }) {
  const [inputHeight, setHeight] = useState(null);
  const [placeholderWidth, setWidth] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  const onFocus = () => animate(1);
  const onBlur = () => !value && animate(0);
  const animate = val => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={styles.inputContainer}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
        <Animated.Text
          style={[
            styles.placeholder,
            { transform: [{ translateY }, { translateX }, { scale }] },
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        style={[
          styles.input,

        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}

        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}

      />
    </View>
  );
}

const ForgetPassword = props => {
  const [email, setemail] = useState(props.route.params.emailId)
  console.log("asdasdasd", props.route.params.emailId);
  const [password, setpassword] = useState("")
  const [confirmePassword, setconfirmePassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleRegistration = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    let isValid = true;



    if (!isPasswordValid(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (password !== confirmePassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };



  const LogIn = async () => {
    const registrationResult = handleRegistration();
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 1500)

    if (registrationResult.success) {
      let data = new FormData();
      data.append('password', password);
      data.append('password_confirmation', confirmePassword);
      // console.log("calling funciot n",data);

      // props.dispatch(userActions.ForgetPassword(data,props));

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://policehelp.in/api/forgotpassword/${email}`,
        headers: {
          'Content-Type': 'multipart/form-data'
          // ...data.getHeaders()
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          Toast.show({
            text1: response.data.message,
            type: "success"
          })

          props.navigation.navigate('Login')
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });

        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            text1: error,
            type: "error"
          })

        });
    }


  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>


      <View style={{ marginHorizontal: 30, flexDirection: 'row', justifyContent: "flex-end", marginTop: 20 }}>

        <TouchableOpacity style={{}} onPress={() => props.navigation.navigate('Welcome')}>
          <Text style={{ color: '#000266', fontSize: 15, textDecorationLine: 'underline', fontWeight: '500' }}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginHorizontal: 20 }}>

        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 70, fontWeight: '700', color: '#000266' }}>Forget Password</Text>

        {/* <Text style={{ fontSize: 15, textAlign: 'center', color: '#000266',marginTop:30 }}>Enter New Password </Text> */}
        <Text style={{ fontSize: 15, textAlign: 'center', color: '#000266', marginTop: 30 }}>Continue With "{email}"</Text>
        <View style={{ flex: 1, }}>

         
          <AnimatedInput value={password} onChangeText={setpassword} placeholder="Enter New Password" placeholderTextColor="black" secureTextEntry={true} />
          {passwordError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{passwordError}</Text>}
       
          <AnimatedInput value={confirmePassword} onChangeText={setconfirmePassword} placeholder="Confirme Password" placeholderTextColor="black" secureTextEntry={true} />
          {ConfirmPasswordError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{ConfirmPasswordError}</Text>}

          <TouchableOpacity style={{ width: '70%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 8, marginTop: 60 }} onPress={() => LogIn()}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Update Password</Text>
          </TouchableOpacity>



 

         <Modal
          style={{ zindex: 999 }}
          animationType="fade"
          transparent={true}
          visible={loading}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'visible',
              backgroundColor: Colors.White,
              width: wp(30),
              alignSelf: 'center',
              height: wp(30),
              borderRadius: wp(5),
              shadowColor: '#000',
              marginTop: height / 2 - 80,

              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <ActivityIndicator color={Colors.PrimaryColor} size={'large'} />
            <Text style={{ color: Colors.PrimaryColor, fontSize: hp(2) }}>
              Loading....
            </Text>
          </View>
        </Modal>

        </View>
      </View>


    </ScrollView>
  )
}

export default ForgetPassword
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 20,
    borderBottomColor: '#000266',
  
    marginBottom: 10,
    marginTop: 25
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000'
  },
  placeholderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
});