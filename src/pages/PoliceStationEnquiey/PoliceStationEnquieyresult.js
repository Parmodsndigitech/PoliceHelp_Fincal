import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Pressable,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const {width, height} = Dimensions.get('screen');

const PoliceStationEnquieyresult = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [policeData, setpoliceData] = useState(
    props?.route?.params?.policedata,
  );
  // console.log("props data", props?.route?.params?.policedata);
  const [districNumber, setdistricNumber] = useState([]);
  const [policeStation, setpoliceStation] = useState([]);
  const [shoNum, setshoNum] = useState([]);

  useEffect(() => {
    // console.log("props data", props?.route?.params?.policedata);
    if (!policeData) {
      setModalVisible(true);
    }
    if (policeData?.police_station_number.includes('|')) {
      const policenumber = policeData?.police_station_number.split('|');
      setpoliceStation(policenumber);
    } else {
      setpoliceStation([policeData?.police_station_number]);
    }
    if (policeData?.sho_contact_number.includes('|')) {
      const sho_numberList = policeData?.sho_contact_number.split('|');
      setshoNum(sho_numberList);
    } else {
      setshoNum([policeData?.sho_contact_number]);
    }
  }, []);
  const makePhoneCall = phoneNumber => {
    const phoneNumberToCall = `tel:${phoneNumber}`;
    // const phoneNumberToCall = `tel:${9999810055}`;
    Linking.openURL(phoneNumberToCall).catch(error => {
      console.error(`Failed to open phone dialer: ${error}`);
    });
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



      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Image
            source={require('../../Images/haretosave.png')}
            style={{height: 120, width: 120}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{color: '#000'}}>State</Text>
          <Text style={{color: '#000'}}>{policeData?.state}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{color: '#000'}}>City</Text>
          <Text style={{color: '#000'}}>{policeData?.city}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{color: '#000'}}>Distict</Text>
          <Text style={{color: '#000'}}>{policeData?.district}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{width: '40%', color: '#000'}}>
            Local Police Station Area name
          </Text>
          <Text style={{width: '40%', textAlign: 'right', color: '#000'}}>
            {policeData?.local_police_station_name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{width: '40%', color: '#000'}}>Police Station No.</Text>
          <View style={{width: '40%'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                makePhoneCall(`${policeStation && policeStation[0]}`)
              }>
              <Text style={{textAlign: 'right', color: '#000'}}>
                {' '}
                <Image
                  source={require('../../Images/phone.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'center',
                    marginLeft: 5,
                  }}
                />
                {`${policeStation && policeStation[0]}`}
              </Text>
            </TouchableOpacity>
            {policeStation && policeStation[1] ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  makePhoneCall(`${policeStation && policeStation[1]}`)
                }>
                <Text style={{textAlign: 'right', color: '#000'}}>
                  {' '}
                  <Image
                    source={require('../../Images/phone.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'center',
                      marginLeft: 5,
                    }}
                  />
                  {`${policeStation && policeStation[1]}`}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{width: '40%', color: '#000'}}>SHO Name</Text>
          <Text style={{width: '40%', textAlign: 'right', color: '#000'}}>
            {policeData?.sho_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{width: '40%', color: '#000'}}>SHO Contact No.</Text>
          <View style={{width: '50%'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => makePhoneCall(`+91-${shoNum && shoNum[0]}`)}>
              <Text style={{textAlign: 'right', color: '#000'}}>
                {' '}
                <Image
                  source={require('../../Images/phone.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'center',
                    marginLeft: 5,
                  }}
                />
                {`${shoNum && shoNum[0]}`}
              </Text>
            </TouchableOpacity>
            {shoNum && shoNum[1] ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => makePhoneCall(`${shoNum && shoNum[1]}`)}>
                <Text style={{textAlign: 'right', color: '#000'}}>
                  {' '}
                  <Image
                    source={require('../../Images/phone.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'center',
                      marginLeft: 5,
                    }}
                  />
                  {`${shoNum && shoNum[1]}`}
                </Text>
              </TouchableOpacity>
            ) : null}
            {shoNum && shoNum[2] ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => makePhoneCall(`${shoNum && shoNum[2]}`)}>
                <Text style={{textAlign: 'right', color: '#000'}}>
                  {' '}
                  <Image
                    source={require('../../Images/phone.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'center',
                      marginLeft: 5,
                    }}
                  />
                  {`${shoNum && shoNum[2]}`}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: '80%',
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: '#000266',
            padding: 10,
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
          //  onPress={() => makePhoneCall(`${shoNum && shoNum[0]}`)}
          onPress={() => Linking.openURL('tel:9999810055')}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>
            Connect With Us
          </Text>
          <Image
            source={require('../../Images/phone.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'stretch',
              tintColor: '#FFF',
            }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            height: 210,
            width: 250,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: height / 3,
            elevation: 100,
            borderRadius: 10,
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            {/* <TouchableOpacity
              style={{}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image source={require('../../Images/close.png')} style={{ height: 14, width: 14 }} />
            </TouchableOpacity> */}
          </View>

          <Image
            source={require('../../Images/star.gif')}
            style={{height: 80, width: 80, alignSelf: 'center'}}
            resizeMode="contain"
          />

          <Text
            style={{
              fontWeight: '500',
              textAlign: 'center',
              marginTop: 10,
              fontSize: 13,
              color: '#000',
            }}>
            Buy Premium for unlimited support
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 30,
              width: '70%',
              backgroundColor: '#2E2684',
              alignSelf: 'center',
              borderRadius: 10,
              elevation: 2,
              justifyContent: 'center',
            }}
            //  onPress={() => setModalVisible(!modalVisible)}
            onPress={() => props.navigation.navigate('Subsciption_plan')}>
            <View style={{}}>
              <Text style={{fontSize: 14, color: 'white', textAlign: 'center'}}>
                View Plan
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PoliceStationEnquieyresult;
