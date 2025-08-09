import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import StationResult from '../../constantComponent/StationResult';
import {hp, wp} from '../../constantComponent/Responsive';
import Colors from '../../_constants/Colors';
import {userActions} from '../../_actions';
import {Tooltip} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import {CONSTENDPOINT} from '../../_config';

const {height} = Dimensions.get('window');
const PoliceStationEnquiey = props => {
  const [pincode, setpincode] = useState('');
  const [pincodeError, setpincodeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelresult, setModelresult] = useState(false);
  const [subscriptionUserPlan, setSubscriptionUserPlan] = useState(false);
  const [byPlan, setByPlan] = useState('');
  const [station, setStation] = useState([]);
  const [userData, setUserData] = useState('');
  const [PaidSuccess, setPaidSuccess] = useState(false);
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the Location');
      } else {
        // console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${info.coords.latitude}&lon=${info.coords.longitude}`,
      );
      const data = await response.json();
      // console.log("getLocation...PoliceStationEnquiey....",data);
      const pincode = data.address.postcode;
      setpincode(
        data && data.address && data.address.postcode
          ? data.address.postcode
          : null,
      );
    });
  };

  const handleRegistration = () => {
    setpincodeError();
    let isValid = true;
    if (pincode.trim() === '') {
      setpincodeError('Please Enter Pin Code');
      isValid = false;
    }
    if (isValid) {
      const registrationResult = {success: true};
      return registrationResult;
    } else {
      return {success: false};
    }
  };

  const ProfileDAta = async () => {
    props.dispatch(userActions.getProfile());
  };
  useEffect(() => {
    ProfileDAta();
    const {users} = props;
    let {registerData} = users;
    setUserData(registerData);
  }, []);
  useEffect(() => {
    ProfileDAta();
    const {users} = props;
    let {registerData} = users;
    setUserData(registerData);
  }, [station]);
  const searchStation = () => {
    const {users} = props;
    let {registerToken} = users;
    const registrationResult = handleRegistration();
    setLoading(true);
    if (registrationResult.success) {
      const FormData = require('form-data');
      let data = new FormData();
      data.append('postal_code', pincode);
      data.append('user_id', userData?.id);

      let config = {
        method: 'post',
        url: 'https://policehelp.in/api/policeenquiry',
        headers: {
          Authorization: `Bearer ${registerToken}`,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      axios
        .request(config)
        .then(response => {
          // console.log(
          //   'searchStation...PoliceStationEnquiey....List Will Show Of Police Staction... ',
          //   response.data,
          // );
          setStation(response.data.items);
          setLoading(false);
          setModelresult(true);
          if (userData?.enquirycount > 3) {
            setByPlan(response.data);
            setSubscriptionUserPlan(true);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const payWithRazorpay = async getPrice => {
    const PriceSet = getPrice?.price * 100;
    const options = {
      description: 'Police Station Search Subscription',
      image:
        'https://drive.google.com/file/d/1YEJTLiXMS4nC9M5RapCQ9xA9Hlckd1ze/view?usp=sharing',
      currency: 'INR',
      key: 'rzp_test_72nXhZjvS2PDXi',
      amount: PriceSet,
      name: 'Police Help',
      prefill: {
        email: userData?.email,
        contact: userData?.mobile,
        name: userData?.name,
      },
      theme: {color: '#000266'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // success
        paymetDone(data, getPrice);
        setSubscriptionUserPlan(false);
        setPaidSuccess(true)
      })
      .catch(error => {
        // alert('Payment failed');
      });
  };
  const paymetDone = async (planId, getPriceDetails) => {
    // setLoading(true);
    const fd = new FormData();
    fd.append('amount', getPriceDetails?.price);
    fd.append('day', getPriceDetails?.day);
    fd.append('user_id', userData?.id);
    try {
      const response = await fetch(CONSTENDPOINT.CREATEPAYMENTSEND, {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      console.log('Amout Sned to Backed ', result);
      _verifyPayment(result);
    } catch (error) {
      console.error(error);
    }
  };

  const _verifyPayment = async data => {
    const fd = new FormData();
    fd.append('razorpay_order_id', data?.order_id);
    fd.append('razorpay_signature', data?.razorpay_key);
    try {
      const response = await fetch(CONSTENDPOINT.VERIFYPAYMENT, {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      console.log('Aple Datata.....parmod ...Payment Done...', result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Image
              style={{
                alignSelf: 'center',
                height: 22,
                width: 22,
                marginRight: 10,
                tintColor: '#2E2684',
              }}
              source={require('../../Images/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#2E2684',
              fontSize: 18,
              fontWeight: '600',
              marginLeft: 20,
            }}>
            Police Station Enquiey
          </Text>
        </View>
      </View>

      {/* <Image
                  style={styles.background}
                  source={require('../../Images/GooleMapImg.png')}
                  resizeMode='contain'
                /> 
      */}
      <View
        style={{
          flex: 1,
          marginTop: -80,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            height: 40,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#2E2684',
            flexDirection: 'row',
            elevation: 5,
            backgroundColor: 'white',
          }}>
          <TextInput
            style={{width: '80%', marginLeft: 10, fontSize: 15, color: '#000'}}
            placeholder="Enter Pin Code / Area Name"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={text => setpincode(text.replace(/[^0-9]/g, ''))}
            value={pincode}
          />
          <TouchableOpacity
            style={{alignSelf: 'center', marginLeft: 10}}
            onPress={() => getLocation()}>
            <Image
              style={{height: 23, width: 23, resizeMode: 'contain'}}
              source={require('../../Images/location.png')}
            />
          </TouchableOpacity>
        </View>
        {pincodeError !== '' && (
          <Text style={{color: 'red'}}>{pincodeError}</Text>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={pincode.length > 5 ? false : true}
          style={[
            styles.btnSearch,
            {
              backgroundColor:
                pincode.length > 5 ? Colors.PrimaryColor : Colors.gray878787,
            },
          ]}
          onPress={() => searchStation()}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 14}}>
            Search Nearby Police Station
          </Text>
        </TouchableOpacity>

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
        {/* Plan  */}

        <StationResult
          addmodel={modelresult}
          props={props}
          stationRes={station}
          closeModel={() => setModelresult(!modelresult)}
        />
      </View>
      {byPlan?.package && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={subscriptionUserPlan}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'visible',
              backgroundColor: Colors.White,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 2,
              shadowRadius: 3,
              elevation: 20,
              width: '100%',
              maxHeight: hp(50),
              position: 'absolute',
              bottom: 0,
              borderTopLeftRadius: wp(10),
              borderTopRightRadius: wp(10),
              shadowColor: '#000',
              borderWidth: 1,
              borderColor: Colors.greenLight,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: wp(6),
                alignItems: 'center',
              }}>
              <Text />
              <View>
                <Text
                  style={{
                    color: Colors.PrimaryColor,
                    fontSize: hp(2.8),
                    fontWeight: '800',
                  }}>
                  Chooose Subscription
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  padding: wp(1.5),
                  borderRadius: wp(10),
                  height: wp(6),
                  width: wp(6),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setSubscriptionUserPlan(false)}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: wp(3),
                    width: wp(3),
                  }}
                  source={require('../../Images/close.png')}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}>
              {byPlan?.package?.map((items, index) => (
                <TouchableOpacity
                  onPress={() => payWithRazorpay(items)}
                  key={index}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: Colors.PrimaryColor,
                    width: wp(80),
                    paddingVertical: hp(1.5),
                    borderRadius: wp(10),
                    marginVertical: hp(1),
                  }}>
                  <Text
                    style={{
                      color: Colors.White,
                      textAlign: 'center',
                      fontSize: hp(2),
                      fontWeight: '700',
                    }}>
                    {items?.name} Rs / {items?.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={PaidSuccess}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'visible',
            backgroundColor: Colors.White,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 2,
            shadowRadius: 3,
            elevation: 20,
            borderRadius: wp(10),
            shadowColor: '#000',
            borderWidth: 1,
            borderColor: Colors.greenLight,
            width: wp(80),
            height:hp(40),
            marginTop:'50%'
          }}>
        <Image
                style={{
                  resizeMode: 'contain',
                  height: wp(50),
                  width: wp(50),
                }}
                source={require('../../Images/SuccessCheck.gif')}
              />
              <Text style={{color:'black',fontSize:hp(2),fontWeight:'700'}}>Payment Paid Successfully</Text>

              <Text onPress={()=>props.navigation.navigate('Home')} style={{fontSize:hp(3),color:'black',fontWeight:'700',marginVertical:hp(3)}}>OK</Text>
               </View>

      </Modal>
    </View>
  );
};
function mapStateToProps(state) {
  const {users} = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(PoliceStationEnquiey);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '33%',
    resizeMode: 'center',
  },
  btnSearch: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#000266',
    padding: 10,
    marginTop: 50,
  },
});
