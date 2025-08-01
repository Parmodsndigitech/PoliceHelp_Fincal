import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Toast from 'react-native-toast-message';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';
import Colors from '../../_constants/Colors';
import {hp, wp} from '../../constantComponent/Responsive';
import MobileNoLoginModal from '../../constantComponent/MobileNoLoginModal';
function AnimatedInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  placeholderTextColor,
  secureTextEntry,
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
      style={styles.inputContainer}
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
      />
    </View>
  );
}
const {height} = Dimensions.get('window');
const Login = props => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modaleForgetPassword, setModaleForgetPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
   const [isVisibleMobileLogin, setIsVisibleMobileLogin] = useState(false);
  const isEmailValid = email => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const isPasswordValid = password => {
    return password.length >= 6;
  };
  const handleRegistration = () => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!isPasswordValid(password)) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (isValid) {
      const registrationResult = {success: true};
      return registrationResult;
    } else {
      return {success: false};
    }
  };

  const LogIn = async () => {
    const registrationResult = handleRegistration();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (registrationResult.success) {
      const FormData = require('form-data');
      let data = new FormData();
      data.append('email', email);
      data.append('password', password);
      props.dispatch(userActions.login(data, props));
    }
  };

  const forgetnavigate = () => {
    if (!isEmailValid(email)) {
      Toast.show({
        text1: 'Please Type Register Email Id For Password Reset.',
        type: 'error',
      });
    }
    if (isEmailValid(email)) {
      props.navigation.navigate('ForgetPassword', {emailId: email});
    setModaleForgetPassword(false)
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
            fontSize: 30,
            textAlign: 'center',
            marginTop: 70,
            fontWeight: '700',
            color: '#000266',
          }}>
          Welcome
        </Text>
        <Text style={{fontSize: 15, textAlign: 'center', color: '#000266'}}>
          Login to continue
        </Text>
        <View style={{flex: 1}}>
          <AnimatedInput
            value={email}
            onChangeText={setemail}
            placeholder="Email Id"
            keyboardType="email-address"
            placeholderTextColor="black"
          />
          {emailError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {emailError}
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

          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: '90%', alignSelf: 'center', marginTop: 20}}
            onPress={() => setModaleForgetPassword(true)}>
            <Text style={{color: '#000266'}}>Forget Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: '90%', alignSelf: 'center', marginTop:hp(1)}}
            onPress={() =>setIsVisibleMobileLogin(true)}>
            <Text style={{color: '#000266'}}>Login With Mobile No ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '70%',
              alignSelf: 'center',
              borderRadius: 20,
              backgroundColor: '#000266',
              padding: 8,
              marginTop: 60,
            }}
            onPress={() => LogIn()}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
              Login
            </Text>
          </TouchableOpacity>
          <View
            style={{marginTop: 30, alignSelf: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{fontWeight: '700', color: '#000266'}}>
                {' '}
                Register Now
              </Text>
            </TouchableOpacity>
          </View>







{/* Forget Password Modal get Email  */}

           <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modaleForgetPassword}
                    >
                      <View
                        style={{
                        
                          alignItems: 'center',
                          justifyContent: 'center',
                         flex:1,
                          backgroundColor: 'rgba(231, 231, 231,.4)', backfaceVisibility: 'visible'
                        }}>
                    
                    <View style={{ 
                backfaceVisibility: 'visible',
                backgroundColor: Colors.White,
                width:'80%',
                alignSelf: 'center',
                // height: hp(30),
                borderRadius: wp(5),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                paddingBottom:hp(4)

                          }}>
   

                    <Text style={{color:'black',fontSize:hp(2.5),fontWeight:'600',textAlign:'center',marginTop:hp(4)}}>Enter Register Email id</Text>
                       <AnimatedInput
            value={email}
            onChangeText={setemail}
            placeholder="Email Id"
            keyboardType="email-address"
            placeholderTextColor="black"
          />
          {emailError !== '' && (
            <Text style={{color: 'red', marginHorizontal: 20}}>
              {emailError}
            </Text>
          )}

           <TouchableOpacity
            style={{
              width: '70%',
              alignSelf: 'center',
              borderRadius: 20,
              backgroundColor: '#000266',
              padding: 8,
              marginTop: 60,
            }}
            onPress={() => forgetnavigate()}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
              Login
            </Text>
          </TouchableOpacity>
                            <Text style={{color:'black',alignSelf:'center',fontSize:hp(2),marginTop:wp(10),fontWeight:'700'}} onPress={()=>setModaleForgetPassword(false)}>Close</Text>
                    </View>
                      </View>
                    </Modal>

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
              <Text style={{color: Colors.PrimaryColor, fontSize: 13}}>
                Loading....
              </Text>
            </View>
          </Modal>


          <MobileNoLoginModal
        isVisible={isVisibleMobileLogin}
        setIsVisible={setIsVisibleMobileLogin}
        onBackdropPress={() => setIsVisibleMobileLogin(false)}
        // onBackdropPress={() => setIsVisible(true)}
      />
        </View>
      </View>
    </ScrollView>
  );
};

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

function mapStateToProps(state) {
  const {users} = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(Login);
