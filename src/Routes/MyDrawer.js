import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {connect} from 'react-redux';
import {userActions} from '../_actions';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../constantComponent/Responsive';

const MyDrawer = props => {
  const navigation=useNavigation()
  const {users} = props;
  const {registerToken, registerData} = users;

  const _alertLogout=()=>{
        Alert.alert('Alert Logout', 'Are you sure you want to Logout ?', [
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>logout()},
    ]);
  }
  const logout = async () => {
    props.dispatch(userActions.logout(props));
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('Profile')}
              activeOpacity={.8}
              style={{
                borderWidth:wp(.4),
                                  borderColor:'#000266',
                                  borderRadius:wp(50)
              }}
            >

{registerData?.avatar?
<View>
                            <Text style={{color:'#000266',alignSelf:'center',alignItems:'center',justifyContent:'center',position:'absolute',top:hp(3.5),fontSize:hp(1.5),fontWeight:'600'}}>No Photo</Text>
             <Image
  style={{height: 60, width: 60,borderRadius:wp(60)}}
  resizeMode="cover"
  source={{uri: registerData?.avatar}} />
</View>

:
<View>
                            <Text style={{color:'#000266',alignSelf:'center',alignItems:'center',justifyContent:'center',position:'absolute',top:hp(3.5),fontSize:hp(1.5),fontWeight:'600'}}>No Photo</Text>

 <Image
              style={{resizeMode: 'cover', height: 60, width: 60}}
              source={require('../Images/userImg.png')}
            /> 
</View>
  
}

          
          
            </TouchableOpacity>
            <View style={{marginLeft: 5, width: '70%', alignSelf: 'center'}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#000266'}}>
                {registerData && registerData.name ? registerData.name : '-'}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#000266'}}>
                {registerData && registerData.email ? registerData.email : '-'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 18,
                width: 18,
                marginTop: -30,
                marginLeft:wp(-2)
              }}
              source={require('../Images/close4.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 50, alignItems: 'center'}}>
          <Image
            style={{resizeMode: 'contain', height: 30, width: 30}}
            source={require('../Images/account.png')}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                fontWeight: '600',
                color: '#000266',
              }}>
              Account
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
          <Image
            style={{resizeMode: 'contain', height: 30, width: 30}}
            source={require('../Images/feedback2.png')}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Feedback')}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                fontWeight: '600',
                color: '#000266',
              }}>
              Feedback
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
          <Image
            style={{resizeMode: 'contain', height: 30, width: 30}}
            source={require('../Images/power-off.png')}
          />
          <TouchableOpacity onPress={() => _alertLogout()}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                fontWeight: '600',
                color: '#000266',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  const {users} = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(MyDrawer);
