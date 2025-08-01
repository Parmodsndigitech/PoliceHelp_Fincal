import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import EmailVerifactionModle from '../../constantComponent/EmailVerifactionModle';
import MobileNoVerifactionModle from '../../constantComponent/MobileNoVerifactionModle';
import {hp, wp} from '../../constantComponent/Responsive';
import Colors from '../../_constants/Colors';
import {useNavigation} from '@react-navigation/native';
import { CONSTENDPOINT } from '../../_config';
function AnimatedInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  placeholderTextColor,
  secureTextEntry,
  maxLength,
  editable,
}) {
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
      style={[styles.inputContainer]}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={{height: inputHeight, ...styles.placeholderContainer}}>
        <Animated.Text
          style={[
            styles.placeholder,
            {transform: [{translateY}, {translateX}, {scale}]},
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        style={[styles.input]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        editable={editable}
      />
    </View>
  );
}
const {height} = Dimensions.get('window');
const SignUp = props => {
  const emaill = props?.route?.params?.data || '';
  const mobileNoData = props?.route?.params?.mobileNoData || '';
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobileNo, setMobile] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setnameError] = useState('');
  const [mobileNoError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // for Modal
  const [isVisibleEmail, setIsVisibleEmail] = useState(false);
  const [isVisibleMobile, setIsVisibleMobile] = useState(false);

  const isEmailValid = email => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const isPasswordValid = password => {
    return password.length > 8;
  };

  //  #############################################

  const handleDataEmail = data => {
    console.log('Data from Email:', data);
    setemail(data);
  };

  const handleDataMobile = data => {
    console.log('Data from Mobile:', data);
    setMobile(data);
  };

  // #####################################################

  const handleRegistration = () => {
    setnameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    let isValid = true;
    if (name.trim() === '') {
      setnameError('Name is required.');
      isValid = false;
    }
    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }
    if (!isPasswordValid(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }
    if (isValid) {
      const registrationResult = {success: true};
      return registrationResult;
    } else {
      return {success: false};
    }
  };

const navigation=useNavigation()
const Register = async () => {
  setLoading(true);
  const registrationResult = await handleRegistration();
  if (registrationResult.success) {
     const pluse = '+91';
    const data = new FormData();
    data.append('name', name);
    data.append('email', email||emaill);
    data.append('mobile', pluse+mobileNo||pluse+mobileNoData);
    data.append('password', password);

    // console.log('send to backend ...', data)
    try {
      const response = await fetch(CONSTENDPOINT.REGISTER_USER, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });
      const result = await response.json();
      // console.log('Parmod Register Response:', result);
      // console.log('Parmod Register Response:', result?.user);
      console.log('Register SuccessFully ......', result)
      if (result?.user) {
          navigation.navigate('Login')
      }else if (result) {
        Alert.alert('Alert', result?.message);
      } else {
        Alert.alert('Alert', 'something went wrong try angin.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
    } finally {
      setLoading(false);
    }

  } else {
    setLoading(false);
    Alert.alert(
      'Invalid Details',
      'Please fill all details.',
    );
  }
};
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => props.navigation.pop()}>
          <Image
            style={{
              alignSelf: 'center',
              height: 22,
              width: 22,
              marginRight: 10,
              tintColor: '#000266',
            }}
            source={require('../../Images/back.png')}
          />
          <Text style={{color: '#000266', fontSize: 15, fontWeight: '600'}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            marginTop: 70,
            fontWeight: '500',
            color: '#000266',
          }}>
          Create Account
        </Text>
        <View style={{flex: 1}}>
          <AnimatedInput
            value={name}
            onChangeText={setname}
            placeholder="Full Name "
            placeholderTextColor="black"
          />
          {nameError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {nameError}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setIsVisibleEmail(true);
            }}>
            <AnimatedInput
              placeholder={email ? email || emaill: 'Email Id '}
              editable={false}
              // placeholderTextColor="black"
              // keyboardType="email-address"
              // value={emaill}
              // onChangeText={setemail}
            />
          </TouchableOpacity>

          {emailError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {emailError}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setIsVisibleMobile(true);
            }}>
            <AnimatedInput
              placeholder={mobileNo ? mobileNo||mobileNoData : 'Mobile No '}
              editable={false}
              // value={mobileNo}
              // onChangeText={setMobile}
              // keyboardType="numeric"
              // maxLength={10}
              // placeholderTextColor="black"
            />
          </TouchableOpacity>
          {mobileNoError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {mobileNoError}
            </Text>
          )}

          <AnimatedInput
            value={password}
            onChangeText={setpassword}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
          {passwordError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {passwordError}
            </Text>
          )}
          <AnimatedInput
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
          {confirmPasswordError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {confirmPasswordError}
            </Text>
          )}
          <Modal animationType="fade" transparent={true} visible={loading}>
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
              <Text style={{color: Colors.PrimaryColor, fontSize: hp(2)}}>
                Loading....
              </Text>
            </View>
          </Modal>
          <TouchableOpacity
            disabled={
              name &&
              email &&
              password &&
              confirmPassword &&
              password == confirmPassword
                ? false
                : true
            }
            style={{
              width: '70%',
              alignSelf: 'center',
              borderRadius: 20,
              backgroundColor:
                name &&
                email &&
                password &&
                confirmPassword &&
                password == confirmPassword
                  ? '#000266'
                  : 'lightgray',
              padding: 8,
              marginTop: 60,
            }}
            onPress={() => Register()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}>
              Create Account
            </Text>
          </TouchableOpacity>
          <View
            style={{marginTop: 30, alignSelf: 'center', flexDirection: 'row'}}>
            <Text style={{color: '#000'}}>Already have an Account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={{fontWeight: '700', color: '#000266'}}>
                {' '}
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modals  */}
      <EmailVerifactionModle
        isVisible={isVisibleEmail}
        setIsVisible={setIsVisibleEmail}
        onBackdropPress={() => setIsVisibleEmail(false)}
        sendDataEmail={handleDataEmail}
        // onBackdropPress={() => setIsVisible(true)}
      />
      <MobileNoVerifactionModle
        isVisible={isVisibleMobile}
        setIsVisible={setIsVisibleMobile}
        onBackdropPress={() => setIsVisibleMobile(false)}
        sendDataMobile={handleDataMobile}

        // onBackdropPress={() => setIsVisible(true)}
      />
    </ScrollView>
  );
};

function mapStateToProps(state) {
  const {users} = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(SignUp);
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 20,
    borderBottomColor: '#000266',
    marginBottom: 10,
    marginTop: 25,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
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
