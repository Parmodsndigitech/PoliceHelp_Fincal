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
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ModalCom from './ModalCom';
import Colors from '../_constants/Colors';
import { hp, wp } from './Responsive';
import InputComp from './InputComp';
import ButtonComp from './ButtonComp';
import VectorIcon from './VectorIcon';
import { CONSTENDPOINT } from '../_config';
const { height } = Dimensions.get('window');
const EmailVerifactionModle = ({ onBackdropPress, isVisible, setIsVisible,sendDataEmail }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  // const isDotComEmail = email.toLowerCase().includes(".com");
  const isDotComEmail = email.toLowerCase().includes('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [emailData, setEmailData] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Gmail and Get OTP START  Part

  // useEffect(()=>{
  //   setOtp('')
  // },[])
  const handleSendEmail = () => {
    sendDataEmail(email);
  };
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
  const _registerUser = async () => {
    setLoading(true);
    if (validateEmail(email)) {
      const fd = new FormData();
      fd.append('email', email);
      try {
        const response = await fetch(CONSTENDPOINT.SEND_OTP_MAIL, {
          method: 'POST',
          body: fd,
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
        });
        const result = await response.json();
        if (result) {
          Alert.alert('Email Alert', result?.message);
          handleSendEmail();
          setEmailData(result?.message);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert(
        'Invalid Email Address',
        'Please enter a valid email address.',
      );
    }
  };

  // OTP Verify Part START
  const _OtpVerify = async () => {
    try {
      setLoading(true);
      const otpCode = otp.join('');
      const response = await fetch(CONSTENDPOINT.VERIFY_OTP_MAIL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otpCode,
        }),
      });
      const result = await response.json();

      if (result) {
        Alert.alert('OTP Alert', result?.message);
        setLoading(false);
        navigation.navigate('SignUp', { data: email });
        setIsVisible(false);
        // setEmail('')
        // setOtp('')
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('There was an error processing your request');
      setLoading(false);
    } finally {
      setLoading(false);
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
          // height: emailData?.success == true ? hp(50) : hp(30),
          marginHorizontal: wp(4),
          borderRadius: wp(4),
          padding: wp(4),
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnGoBack}
          onPress={() => setIsVisible(false)}>
          <VectorIcon
            size={hp(3)}
            name={'close'}
            type={'Fontisto'}
            color={Colors.PrimaryColor}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.titleTxt,
            {
              textAlign: 'center',
              fontSize: hp(3),
              color: Colors.PrimaryColor,
              fontWeight: '900',
              marginTop: hp(0),
              marginBottom: hp(4),
            },
          ]}>
          Email Verification
        </Text>

        <InputComp
          placeholder={'Enter email Id'}
          containerStyle={[styles.containerStyle]}
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
        />
        <ButtonComp
          disabled={isDotComEmail ? false : true}
          onPress={() => {
            _registerUser();
          }}
          title={'Send Otp'}
          containerTitle={{ fontSize: hp(2) }}
          containerStyle={{
            width: '35%',
            alignSelf: 'flex-end',
            paddingVertical: hp(1.5),
            backgroundColor: isDotComEmail
              ? Colors.PrimaryColor
              : Colors.lightGray,
          }}
        />
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

        {emailData && (
          <View>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={ref => (inputRefs.current[index] = ref)}
                  autoFocus={index === 0}
                  placeholderTextColor={Colors[525252]}
                />
              ))}
            </View>
            <ButtonComp
              disabled={otp ? false : true}
              onPress={() => {
                _OtpVerify();
              }}
              title={'Verify Otp'}
              containerStyle={{
                paddingHorizontal: wp(10),
                backgroundColor: otp ? Colors.PrimaryColor : Colors.lightGray,
              }}
            />
          </View>
        )}
      </View>
    </ModalCom>
  );
};

export default EmailVerifactionModle;

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: wp(0.2),
    borderColor: Colors[525252],
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
