import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ModalCom from './ModalCom';
import Colors from '../_constants/Colors';
import {hp, wp} from './Responsive';
import InputComp from './InputComp';
import ButtonComp from './ButtonComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VectorIcon from './VectorIcon';
import { CONSTENDPOINT } from '../_config';
import { userActions } from '../_actions';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const MobileNoLoginModal = ({onBackdropPress, isVisible, setIsVisible,props}) => {
    const navigation = useNavigation();
  // const [mobileNo, setMobileNo] = useState('7739387442');
  const [mobileNo, setMobileNo] = useState('');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  // Gmail and Get OTP START  Part
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '');
    setOtp(newOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

      // const LogInMobile = async () => {
      //   if (mobileNo.length == 10) {
      //     setLoading(true);
      //     const pluse = '+91';
      //     const fd = new FormData();
      //     // fd.append('mobile', pluse + mobileNo);
      //     fd.append('mobile', '7739387442');
      //     fd.append('password', '123456789');
      //     try {
      //       const response = await fetch(CONSTENDPOINT.LOGIN_WITH_MOBILE, {
      //         method: 'POST',
      //         body: fd,
      //         headers: {
      //           Accept: 'multipart/form-data',
      //           'Content-Type': 'multipart/form-data',
      //         },
      //       });
      //       const result = await response.json();
      //       if (result&& result?.user) {
      //         // props('Home')
      //          props.navigation.navigate('Home')
      //               props.navigation.reset({
      //                 index: 0,
      //                 routes: [{ name: 'Home' }]
      //               });
      //         setLoading(false);
      //       }
      //     } catch (error) {
      //       console.error(error);
      //     }

        
      //     //       const FormData = require('form-data');
      //     //       let data = new FormData();
      //     //       // data.append('email', email);
      //     //       // data.append('password', password);
      //     // data.append('mobile', '7739387442');
      //     // data.append('password', '123456789');
      //     //       props.dispatch(userActions.loginMobile(data, props));
      //   } else {
      //     Alert.alert('Invalid Mobile no.', 'Please enter 10 digit Mobile no.');
      //   }
      // };

const LogInMobile = async () => {
    if (mobileNo.length === 10) {
      setLoading(true);
      const fd = new FormData();
      fd.append('mobile', '7739387442');
      fd.append('password', '123456789');

      try {
        const response = await fetch(CONSTENDPOINT.LOGIN_WITH_MOBILE, {
          method: 'POST',
          body: fd,
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
        });

        const result = await response.json();

        if (result && result.user) {
          navigation.navigate('Home');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      Alert.alert('Invalid Mobile no.', 'Please enter 10 digit Mobile no.');
    }
  };

  return (
    <ModalCom
      contianerStyle={{
        backgroundColor: 'rgba(0,0,0,0.0)',
        padding: 0,
        margin: 0,
      }}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: wp(4),
          padding: wp(4),
          position: 'absolute',
          width: '100%',
          bottom: hp(0),
          borderBottomEndRadius: 0,
          borderBottomLeftRadius: 0,
        }}>
        <Text
          style={[
            styles.titleTxt,
            {
              textAlign: 'center',
              fontSize: hp(3),
              color: Colors.PrimaryColor,
              fontWeight: '900',
              marginVertical: hp(7),
              marginTop: hp(6),
            },
          ]}>
          Login With Mobile No
        </Text>
        <InputComp
          keyboardType={'numeric'}
          placeholder={'Enter mobile No'}
          maxLength={10}
          containerStyle={styles.containerStyle}
          value={mobileNo}
          onChangeText={txt => {
            setMobileNo(txt);
          }}
        />
        <Text style={styles.titleTxt}></Text>
        <InputComp
          placeholder={'Enter password '}
          maxLength={10}
          containerStyle={styles.containerStyle}
          value={password}
          onChangeText={txt => {
            setPassword(txt);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{alignSelf: 'flex-start', marginTop: 20, marginLeft: wp(6)}}
          //   onPress={() => forgetnavigate()}
        >
          <Text style={{color: '#000266'}}>Forget Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{alignSelf: 'flex-start', marginTop: hp(1), marginLeft: wp(6)}}
          onPress={() => setIsVisible(false)}>
          <Text style={{color: '#000266'}}>Login With Email Id ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: '70%',
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: '#000266',
            padding: 8,
            marginTop: 60,
          }}
          //     onPress={() =>
          //     LogInMobile()
          // }
        >
          <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: hp(5),
          }}>
          <Text style={{color: '#000266'}}>Don't have an account ?</Text>
          <Text
            style={{
              color: '#000266',
              textDecorationLine: 'underline',
              fontWeight: '600',
            }}
            onPress={() => props('SignUp')}>
            {' '}
            Register Now
          </Text>
        </View>
      </View>

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
    </ModalCom>
  );
};

export default MobileNoLoginModal;

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: wp(0.2),
    borderColor: Colors[525252],
    width: '90%',
    alignSelf: 'center',
  },
  btnGoBack: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  titleTxt: {
    color: Colors.PrimaryColor,
    fontSize: hp(2.2),
    marginVertical: hp(0.5),
    marginTop: hp(1.5),
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  input: {
    width: wp(12),
    height: wp(12),
    borderWidth: wp(0.3),
    borderColor: Colors.lightGray,
    textAlign: 'center',
    fontSize: hp(2),
    marginHorizontal: wp(1),
    borderRadius: wp(1.5),
    color: Colors.Black,
  },
});
