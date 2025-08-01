import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {userActions} from '../../_actions';
import {wp} from '../../constantComponent/Responsive';
import Colors from '../../_constants/Colors';

const {height} = Dimensions.get('window');
const LegalConsultation = props => {
  const [isSelected, setSelection] = useState(false);
  const [isSelectederror, setSelectionerror] = useState('');
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [value, setValue] = useState('');
  const [bvalue, setBvalue] = useState('');
  const [showvalue, setShowvalue] = useState('');
  const [showBvalue, setShowBvalue] = useState('');
  const [items, setItems] = useState([
    {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {label: 'Assam', value: 'Assam'},
    {label: 'Bihar', value: 'Bihar'},
    {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    {label: 'Dadra and Nagar Haveli', value: 'Dadra and Nagar Haveli'},
    {label: 'Daman and Diu', value: 'Daman and Diu'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Goa', value: 'Goa'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Haryana', value: 'Haryana'},
    {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    {label: 'Jammu and Kashmir', value: 'Jammu and Kashmir'},
    {label: 'Jharkhand', value: 'Jharkhand'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Kerala', value: 'Kerala'},
    {label: 'Ladakh', value: 'Ladakh'},
    {label: 'Lakshadweep', value: 'Lakshadweep'},
    {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Manipur', value: 'Manipur'},
    {label: 'Meghalaya', value: 'Meghalaya'},
    {label: 'Mizoram', value: 'Mizoram'},
    {label: 'Nagaland', value: 'Nagaland'},
    {label: 'Odisha', value: 'Odisha'},
    {label: 'Puducherry', value: 'Puducherry'},
    {label: 'Punjab', value: 'Punjab'},
    {label: 'Rajasthan', value: 'Rajasthan'},
    {label: 'Sikkim', value: 'Sikkim'},
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    {label: 'Telangana', value: 'Telangana'},
    {label: 'Tripura', value: 'Tripura'},
    {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
    {label: 'Uttarakhand', value: 'Uttarakhand'},
    {label: 'West Bengal', value: 'West Bengal'},
  ]);
  const [itemsb, setItemsb] = useState([
    {label: 'Civil', value: 'Civil'},
    {label: 'Criminal', value: 'Criminal'},
    {label: 'Writ', value: 'Writ'},
    {label: 'Bail', value: 'Bail'},
    {label: 'Appeal', value: 'Appeal'},
    {label: 'Revision', value: 'Revision'},
  ]);
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [nameError, setnameError] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [MobileError, setMobileError] = useState('');
  const [StateError, setStateError] = useState('');
  const [consultationError, setconsultationError] = useState('');
  const txnByKey = item => {
    setShowvalue(item);
  };
  const txnByKeyB = item => {
    setShowBvalue(item);
  };
  const isEmailValid = email => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleRegistration = () => {
    setnameError('');
    setEmailError('');
    setMobileError('');
    setStateError('');
    setconsultationError('');
    setSelectionerror('');
    let isValid = true;
    if (name.trim() === '') {
      setnameError('Name is required.');
      isValid = false;
    }
    if (isSelected == false) {
      setSelectionerror('Required !');
      isValid = false;
    }
    if (mobile.trim() === '') {
      setMobileError('Mobile Number is required.');
      isValid = false;
    }
    if (showvalue.trim() === '') {
      setStateError('Please Select your State');
      isValid = false;
    }
    if (showBvalue.trim() === '') {
      setconsultationError('Please Select Consultation Type');
      isValid = false;
    }

    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }
    if (isValid) {
      const registrationResult = {success: true};
      return registrationResult;
    } else {
      return {success: false};
    }
  };
  const Submit_Data = () => {
    const registrationResult = handleRegistration();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (registrationResult.success) {
      const FormData = require('form-data');
      let data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('mobile', mobile);
      data.append('state', showvalue);
      data.append('consultation_type', showBvalue);
      props.dispatch(userActions.LegalConsultaion(data, props));
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
            Legal Consultation
          </Text>
        </View>
      </View>

      <View style={{flex: 1, marginHorizontal: 10, marginTop: 30}}>
        <Text style={{marginLeft: 20, fontSize: 12, color: '#000'}}>
          Fill Up the below mentioned form
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="grey"
          value={name}
          onChangeText={text => setname(text)}
          style={{
            borderWidth: 1,
            borderColor: '#000266',
            width: '90%',
            alignSelf: 'center',
            padding: 7,
            borderRadius: 8,
            margin: 7,
            color: '#000',
          }}
        />
        {nameError !== '' && (
          <Text style={{color: 'red', marginHorizontal: 20}}>{nameError}</Text>
        )}
        <TextInput
          placeholder="Email"
          placeholderTextColor="grey"
          value={email}
          keyboardType="email-address"
          onChangeText={text => setemail(text)}
          style={{
            borderWidth: 1,
            borderColor: '#000266',
            width: '90%',
            alignSelf: 'center',
            padding: 7,
            borderRadius: 8,
            margin: 7,
            color: '#000',
          }}
        />
        {EmailError !== '' && (
          <Text style={{color: 'red', marginHorizontal: 20}}>{EmailError}</Text>
        )}
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="grey"
          value={mobile}
          onChangeText={text => setmobile(text.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          maxLength={10}
          style={{
            borderWidth: 1,
            borderColor: '#000266',
            width: '90%',
            alignSelf: 'center',
            padding: 7,
            borderRadius: 8,
            margin: 7,
            color: '#000',
          }}
        />
        {MobileError !== '' && (
          <Text style={{color: 'red', marginHorizontal: 20}}>
            {MobileError}
          </Text>
        )}

        <DropDownPicker
          open={open}
          placeholder="State"
          placeholderStyle={{color: 'grey'}}
          value={value}
          onSelectItem={item => txnByKey(item.value)}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{borderColor: '#000266'}}
          containerStyle={{width: '90%', alignSelf: 'center'}}
        />
        {StateError !== '' && (
          <Text style={{color: 'red', marginHorizontal: 20}}>{StateError}</Text>
        )}
        <DropDownPicker
          open={openB}
          zIndex={2000}
          placeholder="Select Consultation Type"
          placeholderStyle={{color: 'grey'}}
          value={bvalue}
          onSelectItem={item => txnByKeyB(item.value)}
          items={itemsb}
          setOpen={setOpenB}
          setValue={setBvalue}
          setItems={setItemsb}
          style={{borderColor: '#000266', marginTop: 10}}
          containerStyle={{width: '90%', alignSelf: 'center'}}
        />

        {consultationError !== '' && (
          <Text style={{color: 'red', marginHorizontal: 20}}>
            {consultationError}
          </Text>
        )}

        <View
          style={{
            marginTop: 20,
            marginLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <CheckBox
            style={{
              marginTop: -55,
            }}
            onClick={() => setSelection(!isSelected)}
            isChecked={isSelected}
            leftText={'CheckBox'}
          />
          <Text style={{fontSize: 13, color: '#000'}}>
            I have read & agreed to the company’s Terms and Conditions,
            disclaimer and refund policy. and also ready to accept calls, SMS,
            emails, etc.
          </Text>
        </View>

        {isSelectederror !== '' && (
          <Text style={{color: 'red', marginHorizontal: 20}}>
            {isSelectederror}
          </Text>
        )}
      </View>
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
      <TouchableOpacity
        disabled={
          name && email && mobile && value && bvalue && isSelected == true
            ? false
            : true
        }
        activeOpacity={0.8}
        style={{
          width: '80%',
          alignSelf: 'center',
          borderRadius: 20,
          backgroundColor:
            name && email && mobile && value && bvalue && isSelected == true
              ? '#000266'
              : Colors.lightGray,
          padding: 12,
          bottom: 30,
        }}
        onPress={() => Submit_Data()}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>
          Request a call back
        </Text>
      </TouchableOpacity>
    </View>
  );
};
function mapStateToProps(state) {
  const {users} = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(LegalConsultation);
