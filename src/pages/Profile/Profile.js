import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {connect} from 'react-redux';
import {userActions} from '../../_actions';
import Colors from '../../_constants/Colors';
import {hp, wp} from '../../constantComponent/Responsive';

const {height} = Dimensions.get('window');
const Profile = props => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [image, setimage] = useState();
  const [email, setemail] = useState();
  const [currentPassword, setcurrentPassword] = useState('');
  const [password, setpassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const isPasswordValid = password => {
    return password.length >= 4;
  };
  useEffect(() => {
    ProfileDAta();
    const {users} = props;
    let {registerData} = users;
    // console.log('pamodd.........Profile', registerData);
    setName(registerData && registerData.name ? registerData.name : '-');
    setemail(registerData && registerData.email ? registerData.email : '-');
    setimage(registerData && registerData?.avatar?registerData?.avatar:'-')
  }, []);
  const handleRegistration = () => {
    setPasswordError('');
    setConfirmPasswordError('');
    let isValid = true;
    if (!isPasswordValid(password)) {
      setPasswordError('Please Enter Password');
      isValid = false;
    }
    if (password !== currentPassword) {
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
  const ProfileUpdated = () => {
    const registrationResult = handleRegistration();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    if (registrationResult.success) {
      let data = new FormData();
      data.append('name', name);
      data.append('password', password);
      {
        image && image[0]
          ? data.append('avatar', {
              uri: image && image[0].uri,
              name: image && image[0].name,
              type: image && image[0].type,
            })
          : null;
      }
      props.dispatch(userActions.ProfileUpdated(data, props));
    }
  };

  const ProfileDAta = async () => {
    props.dispatch(userActions.getProfile());
  };

  const UplaordDocument = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setimage(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else console.log(err);
    }
  };


   
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView>
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
              }}
              source={require('../../Images/back.png')}
            />
            <Text style={{color: '#000', fontSize: 15, fontWeight: '400'}}>
              Account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginHorizontal: 20}}>
        
          {image && image[0].uri ? (
            <TouchableOpacity onPress={() => UplaordDocument()}>
                            <Text style={{color:'#000266',alignSelf:'center',alignItems:'center',justifyContent:'center',position:'absolute',top:hp(13),fontSize:hp(1.7),fontWeight:'600'}}>No Photo</Text>
              <Image
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                  marginTop: 50,
                  borderRadius: 50,
                  borderWidth:wp(.5),
                  borderColor:'#000266'
                }}
                source={{uri: image && image[0].uri}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => UplaordDocument()}>
                            <Text style={{color:'#000266',alignSelf:'center',alignItems:'center',justifyContent:'center',position:'absolute',top:hp(13),fontSize:hp(1.7),fontWeight:'600'}}>No Photo</Text>
              <Image
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                  marginTop: 50,
                  borderRadius: 50,
                  resizeMode: 'contain',
                  borderWidth:wp(.5),
                  borderColor:'#000266'
                }}
                // source={require('../../Images/userImg.png')}
                //  source={image?{uri: image}:require('../../Images/userImg.png')}
                  source={image ? { uri: image } : require('../../Images/userImg.png')}
              />
            </TouchableOpacity>
          )}

          <View style={{flex: 1}}>
            <Text
              style={{
                marginTop: 20,
                marginLeft: 15,
                fontWeight: '500',
                fontSize: 12,
              }}>
              Name
            </Text>
            <TextInput
              placeholder="name"
              placeholderTextColor="black"
              value={name}
              onChangeText={text => setName(text)}
              style={{
                borderWidth: 1,
                borderColor: '#000266',
                width: '90%',
                alignSelf: 'center',
                color: '#000',
                margin: 5,
                padding: 10,
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                marginTop: 10,
                marginLeft: 15,
                fontWeight: '500',
                fontSize: 12,
              }}>
              Email Address
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert('Alert Email', `You can't Update Your Email Id`)
              }>
              <TextInput
                placeholder="E-mail Id"
                placeholderTextColor="black"
                value={email}
                editable={false}
                style={{
                  borderWidth: 1,
                  borderColor: '#000266',
                  width: '90%',
                  alignSelf: 'center',
                  color: '#000',
                  margin: 5,
                  padding: 10,
                  borderRadius: 5,
                }}
              />
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
            <Text
              style={{
                marginTop: 10,
                marginLeft: 15,
                fontWeight: '500',
                fontSize: 12,
              }}>
              Password
            </Text>
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="black"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setpassword(text)}
              style={{
                borderWidth: 1,
                borderColor: '#000266',
                width: '90%',
                alignSelf: 'center',
                color: '#000',
                margin: 5,
                padding: 10,
                borderRadius: 5,
              }}
            />
            {passwordError !== '' && (
              <Text style={{color: 'red', marginHorizontal: 20}}>
                {passwordError}
              </Text>
            )}
            <Text
              style={{
                marginTop: 10,
                marginLeft: 15,
                fontWeight: '500',
                fontSize: 12,
              }}>
              Confirm New Password
            </Text>
            <TextInput
              placeholder="Confirm  password"
              placeholderTextColor="black"
              value={currentPassword}
              secureTextEntry={true}
              onChangeText={text => setcurrentPassword(text)}
              style={{
                borderWidth: 1,
                borderColor: '#000266',
                width: '90%',
                alignSelf: 'center',
                color: '#000',
                margin: 5,
                padding: 10,
                borderRadius: 5,
              }}
            />
            {confirmPasswordError !== '' && (
              <Text style={{color: 'red', marginHorizontal: 20}}>
                {confirmPasswordError}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: '80%',
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: '#000266',
            padding: 8,
            marginTop: 70,
          }}
          onPress={() => ProfileUpdated()}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  const {users} = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(Profile);
