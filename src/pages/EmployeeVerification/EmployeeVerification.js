import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CONST, CONSTENDPOINT} from '../../_config';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import {userActions} from '../../_actions';
import {hp, wp} from '../../constantComponent/Responsive';
import Colors from '../../_constants/Colors';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const EmployeeVerification = props => {
  const navigation = useNavigation();
  const [doc, setdoc] = useState(null);
  const [docError, setdocError] = useState(null);
  const [companyName, setcompanyName] = useState('');
  const [concernedPerson, setconcernedPerson] = useState('');
  const [concernedEmail, setconcernedEmail] = useState('');
  const [concernednumber, setconcernednumber] = useState('');
  const [companyNameError, setcompanyNameError] = useState('');
  const [concernPersonError, setconcernPersonError] = useState('');
  const [concernedEmailError, setconcernedEmailError] = useState('');
  const [concernednumberError, setconcernednumberError] = useState('');

  // add more here -----
  const [Occupation, setOccupation] = useState('');
  const [OccupationError, setOccupationError] = useState('');
  const [Address, setAddress] = useState('');
  const [AddressError, setAddressError] = useState('');
  const [DateOfVisit, setDateOfVisit] = useState('');
  const [DateOfVisitError, setDateOfVisitError] = useState('');
  const [ChiefComplaint, setChiefComplaint] = useState('');
  const [ChiefComplaintError, setChiefComplaintError] = useState('');

  const [onset, setOnset] = useState('');
  const [onsetError, setOnsetError] = useState('');
  const [duration, setDuration] = useState('');
  const [durationError, setDurationError] = useState('');
  const [Location, setLocation] = useState('');
  const [LocationError, setLocationError] = useState('');
  const [Character, setCharacter] = useState('');
  const [CharacterError, setCharacterError] = useState('');
  const [Aggravating, setAggravating] = useState('');
  const [AggravatingError, setAggravatingError] = useState('');
  const [Associated, setAssociated] = useState('');
  const [AssociatedError, setAssociatedError] = useState('');

  const [Chronic, setChronic] = useState('');
  const [ChronicError, setChronicError] = useState('');
  const [Previous, setPrevious] = useState('');
  const [PreviousError, setPreviousError] = useState('');
  const [Allergies, setAllergies] = useState('');
  const [AllergiesError, setAllergiesError] = useState('');
  const [Medications, setMedications] = useState('');
  const [MedicationsError, setMedicationsError] = useState('');

  const [loading, setLoading] = useState(false);

  // const isEmailValid = concernedEmail => {
  //   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  //   return emailRegex.test(concernedEmail);
  // };

  const validateDateFormat = inputDate => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-[0-9]{2}$/;
    return regex.test(inputDate);
  };

  // const handleSubmit = () => {

  //   console.log('Valid date:', date);
  // };

  const handleRegistration = () => {
    setcompanyNameError('');
    setconcernPersonError('');
    setconcernedEmailError('');
    setconcernednumberError('');
    // add more here -----
    setOccupationError('');
    setAddressError('');
    setDateOfVisitError('');
    setChiefComplaintError('');
    setOnsetError('');
    setDurationError(''), setLocationError('');
    setCharacterError('');
    setAggravatingError('');
    setAssociatedError('');
    setChronicError('');
    setPreviousError('');
    setAllergiesError('');
    setMedicationsError('');

    // setdocError();

    let isValid = true;

    if (companyName.trim() === '') {
      setcompanyNameError('Name is required.');
      isValid = false;
    }
    // if (doc === null) {
    //   setdocError('Requied !');
    //   isValid = false;
    // }
    if (concernedPerson === '') {
      setconcernPersonError('Age is required.');
      isValid = false;
    }
    if (concernednumber === '') {
      setconcernednumberError('Medical Status is required.');
      isValid = false;
    }
    // if (!isEmailValid(concernedEmail)) {
    //   setconcernedEmailError('Gender is required.');
    //   isValid = false;
    // }
    if (concernedEmail === '') {
      setconcernedEmailError('Gender is required.');
      isValid = false;
    }
    if (Occupation === '') {
      setOccupationError('Occupation is required.');
      isValid = false;
    }
    if (Address === '') {
      setAddressError('Address is required.');
      isValid = false;
    }
    // if (DateOfVisit === '') {
    //   setDateOfVisitError('Date Of Visit is required.');
    //   isValid = false;
    // }
    if (!validateDateFormat(DateOfVisit)) {
      Alert.alert(
        'Invalid Date Format',
        'Date should be in this format: 30-02-25',
      );
      return;
    }
    if (ChiefComplaint === '') {
      setChiefComplaintError('Chief Complaint is required.');
      isValid = false;
    }
    if (onset === '') {
      setOnsetError('Onset is required.');
      isValid = false;
    }

    if (duration === '') {
      setDurationError('Duration is required.');
      isValid = false;
    }
    if (Location === '') {
      setLocationError('Location is required.');
      isValid = false;
    }
    if (Character === '') {
      setCharacterError('Character is required.');
      isValid = false;
    }

    if (Aggravating === '') {
      setAggravatingError('Aggravating is required.');
      isValid = false;
    }
    if (Associated === '') {
      setAssociatedError('Associated is required.');
      isValid = false;
    }

    if (Chronic === '') {
      setChronicError('Chronic is required.');
      isValid = false;
    }

    if (Previous === '') {
      setPreviousError('Previous is required.');
      isValid = false;
    }

    if (Allergies === '') {
      setAllergiesError('Allergies is required.');
      isValid = false;
    }
    if (Medications === '') {
      setMedicationsError('Medications is required.');
      isValid = false;
    }

    if (isValid) {
      const registrationResult = {success: true};
      return registrationResult;
    } else {
      return {success: false};
    }
  };

  const UplaordDocument = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.csv],
      });

      // console.log('sssss', doc);
      setdoc(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log(err);
      else console.log(err);
    }
  };

  const SendEmployeedata = async () => {
    const registrationResult = await handleRegistration();
    setLoading(true);
    // console.log('..........',registrationResult)
    if (registrationResult.success) {
      const data = new FormData();
      data.append('name', companyName);
      data.append('age', concernedPerson);
      data.append('sex', concernedEmail);
      data.append('material_status', concernednumber);
      data.append('occupation', Occupation);
      data.append('address', Address);
      data.append('date_of_visite', DateOfVisit);
      data.append('CC', ChiefComplaint);
      data.append('onset', onset);
      data.append('duration', duration);
      data.append('location', Location);
      data.append('character_check', Character);
      data.append('aggravating_relieving', Aggravating);
      data.append('associated_symptoms', Associated);
      data.append('chronic_illnesses', Chronic);
      data.append('previous_surgeries_hospitalizations', Previous);
      data.append('allergies', Allergies);
      data.append('medications', Medications);
      // console.log('send to backend ...', data)
      try {
        const response = await fetch(CONSTENDPOINT.MEDICAL_ADVISORY_FORM, {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        });
        const result = await response.json();
        if (result) {
          Alert.alert('Alert', 'Advisor form submitted successfully.');
          navigation.navigate('Home');
          setcompanyName('');
          setconcernedPerson('');
          setconcernedEmail('');
          setconcernednumber('');
          setOccupation('');
          setAddress('');
          setDateOfVisit('');
          setChiefComplaint('');
          setOnset('');
          setDuration('');
          setLocation('');
          setCharacter('');
          setAggravating('');
          setAggravating('');
          setChronic('');
          setPrevious('');
          setAllergies('');
          setMedications('');
        }
      } catch (error) {
        console.error('Registration Error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      Alert.alert('Invalid Details', 'Please fill all details.');
    }
  };

  const downloadFile = () => {
    const downloadUrl = 'https://policehelp.in/public/images/sample.xlsx'; // URL of the file to download
    const savePath = RNFetchBlob.fs.dirs.DownloadDir + '/sample.xlsx'; // Path to save the downloaded file

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Downloading File',
        description: 'Please wait...',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        path: savePath,
      },
    })
      .fetch('GET', downloadUrl)
      .then(res => {
        // File downloaded successfully
        console.log('File downloaded:', savePath);
      })
      .catch(error => {
        // Handle download error
        console.error('Error downloading file:', error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              Medical Advisory
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{paddingBottom: hp(10)}}>
          <View style={{flex: 1, marginHorizontal: 20, marginTop: 50}}>
            <Text
              style={{
                color: '#000266',
                fontSize: hp(2.5),
                fontWeight: '700',
                marginLeft: wp(5),
              }}>
              Patient Demographics
            </Text>
            <View>
              <TextInput
                // placeholder='Name Of The Company'
                placeholder="Name..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setcompanyName(text)}
                value={companyName}
                // secureTextEntry={true}
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
              {companyNameError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {companyNameError}
                </Text>
              )}
              <TextInput
                // placeholder='Name of Concerned person'
                placeholder="Age..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setconcernedPerson(text)}
                value={concernedPerson}
                keyboardType="number-pad"
                maxLength={3}
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
              {concernPersonError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {concernPersonError}
                </Text>
              )}
              <TextInput
                // placeholder='Email of Concerned Person '
                placeholder="Gender... "
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setconcernedEmail(text)}
                value={concernedEmail}
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
              {concernedEmailError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {concernedEmailError}
                </Text>
              )}
              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Material Status..."
                placeholderTextColor={Colors.gray878787}
                value={concernednumber}
                onChangeText={text => setconcernednumber(text)}
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
              {concernednumberError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {concernednumberError}
                </Text>
              )}
              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Occupation..."
                placeholderTextColor={Colors.gray878787}
                value={Occupation}
                onChangeText={text => setOccupation(text)}
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
              {OccupationError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {OccupationError}
                </Text>
              )}

              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Address..."
                placeholderTextColor={Colors.gray878787}
                value={Address}
                multiline={true}
                onChangeText={text => setAddress(text)}
                style={{
                  borderWidth: 1,
                  borderColor: '#000266',
                  width: '90%',
                  height: hp(10),
                  textAlignVertical: 'top',
                  alignSelf: 'center',
                  padding: 7,
                  borderRadius: 8,
                  margin: 7,
                  color: '#000',
                }}
              />
              {AddressError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {AddressError}
                </Text>
              )}

              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Date Of Visit... Enter date (dd-mm-yy)"
                placeholderTextColor={Colors.gray878787}
                value={DateOfVisit}
                keyboardType="numeric"
                maxLength={8}
                onChangeText={text => setDateOfVisit(text)}
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
              {DateOfVisitError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {DateOfVisitError}
                </Text>
              )}

              <TextInput
                // placeholder='Name Of The Company'
                placeholder="Chief Complaint..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setChiefComplaint(text)}
                value={ChiefComplaint}
                // secureTextEntry={true}
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
              {ChiefComplaintError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {ChiefComplaintError}
                </Text>
              )}
            </View>

            {/* New Add  ################################  */}

            <Text
              style={{
                color: '#000266',
                fontSize: hp(2.5),
                fontWeight: '700',
                marginLeft: wp(5),
                marginTop: hp(3),
              }}>
              History of Present Illness (HPI)
            </Text>
            <View>
              <TextInput
                // placeholder='Name Of The Company'
                placeholder="Onset..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setOnset(text)}
                value={onset}
                // secureTextEntry={true}
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
              {onsetError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {onsetError}
                </Text>
              )}
              <TextInput
                // placeholder='Name of Concerned person'
                placeholder="Duration..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setDuration(text)}
                value={duration}
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
              {durationError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {durationError}
                </Text>
              )}
              <TextInput
                // placeholder='Email of Concerned Person '
                placeholder="Location... "
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setLocation(text)}
                value={Location}
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
              {LocationError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {LocationError}
                </Text>
              )}
              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Character..."
                placeholderTextColor={Colors.gray878787}
                value={Character}
                onChangeText={text => setCharacter(text)}
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
              {CharacterError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {CharacterError}
                </Text>
              )}

              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Aggravating..."
                placeholderTextColor={Colors.gray878787}
                value={Aggravating}
                onChangeText={text => setAggravating(text)}
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
              {AggravatingError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {AggravatingError}
                </Text>
              )}

              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Associated..."
                value={Associated}
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setAssociated(text)}
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
              {AssociatedError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {AssociatedError}
                </Text>
              )}
            </View>

            <Text
              style={{
                color: '#000266',
                fontSize: hp(2.5),
                fontWeight: '700',
                marginLeft: wp(5),
                marginTop: hp(3),
              }}>
              Past Medical History
            </Text>
            <View>
              <TextInput
                // placeholder='Name Of The Company'
                placeholder="Chronic..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setChronic(text)}
                value={Chronic}
                // secureTextEntry={true}
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
              {ChronicError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {ChronicError}
                </Text>
              )}
              <TextInput
                // placeholder='Name of Concerned person'
                placeholder="Previous..."
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setPrevious(text)}
                value={Previous}
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
              {PreviousError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {PreviousError}
                </Text>
              )}
              <TextInput
                // placeholder='Email of Concerned Person '
                placeholder="Allergies... "
                placeholderTextColor={Colors.gray878787}
                onChangeText={text => setAllergies(text)}
                value={Allergies}
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
              {AllergiesError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {AllergiesError}
                </Text>
              )}
              <TextInput
                // placeholder='Number of Concerned Person'
                placeholder="Medications..."
                placeholderTextColor={Colors.gray878787}
                value={Medications}
                onChangeText={text => setMedications(text)}
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
              {MedicationsError !== '' && (
                <Text style={{color: 'red', marginHorizontal: 20}}>
                  {MedicationsError}
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

            {/* ###########################################  */}
            {/* <View
            style={{
              marginTop: 30,
              marginLeft: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
            }}>
            <Image
              source={require('../../Images/excelicon.png')}
              style={{height: 22, width: 22}}
            />
            {doc && doc[0] ? (
              <>
                <Text style={{color: 'green', marginLeft: 5}}>
                  File Uploaded Succesfully
                </Text>
                <Image
                  source={require('../../Images/check-mark.png')}
                  style={{height: 20, width: 20}}
                />
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => downloadFile()}
                  style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000'}}> Download Simple File </Text>

                  <Image
                    source={require('../../Images/Downlord.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </>
            )}
            {docError !== '' && (
              <Text style={{color: 'red', marginHorizontal: 20}}>
                {docError}
              </Text>
            )}
          </View> */}

            {/* 
          <TouchableOpacity
            style={{
              width: '60%',
              marginLeft: 10,
              borderRadius: 20,
              backgroundColor: '#000266',
              padding: 6,
              marginTop: 25,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
            onPress={() => UplaordDocument()}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 14}}>
              Upload Employee Data
            </Text>
            <Image
              source={require('../../Images/upload.png')}
              style={{height: 18, width: 18, tintColor: 'white'}}
            />
          </TouchableOpacity> */}
            {/* ###########################################  */}
          </View>
        </ScrollView>

        <View style={{marginTop: 50}} />
      </View>

      <TouchableOpacity
        disabled={
          companyName &&
          concernedPerson &&
          concernedEmail &&
          concernednumber &&
          Occupation &&
          Address &&
          DateOfVisit &&
          ChiefComplaint &&
          onset &&
          duration &&
          Location &&
          Character &&
          Aggravating &&
          Associated &&
          Chronic &&
          Previous &&
          Allergies &&
          Medications
            ? false
            : true
        }
        style={{
          width: '80%',
          alignSelf: 'center',
          borderRadius: 20,
          backgroundColor:
            companyName &&
            concernedPerson &&
            concernedEmail &&
            concernednumber &&
            Occupation &&
            Address &&
            DateOfVisit &&
            ChiefComplaint &&
            onset &&
            duration &&
            Location &&
            Character &&
            Aggravating &&
            Associated &&
            Chronic &&
            Previous &&
            Allergies &&
            Medications
              ? '#000266'
              : 'lightgray',
          padding: 12,
          bottom: 30,
        }}
        onPress={() => SendEmployeedata()}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 14}}>
          Submit
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
export default connect(mapStateToProps)(EmployeeVerification);
