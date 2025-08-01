import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
const Feedback = props => {



  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedRatingError, setSelectedRatingError] = useState(null);
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);





  // useEffect(() => {
  //   getUser()

  // }, [])
  // const getUser = async () => {
  //   try {
  //     const userData = JSON.parse(await AsyncStorage.getItem("LogToken"))
  //     if (userData !== null) {
  //       setToken(userData);
  //       console.log("Cosultation tokoen", userData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleRatingPress = (rating) => {
    setSelectedRating(rating)
  }

  const handletitle = (text) => {
    console.log("text", text);
    setmessage(text)
  }


  const handleRegistration = () => {
    setSelectedRatingError("");

    let isValid = true;

    if (selectedRating === null) {
      setSelectedRatingError("Rating is required.")
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };



  const feedbackSubmit = () => {
    const registrationResult = handleRegistration();
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 1500)

    if (registrationResult.success) {

      console.log("feedback", { selectedRating, message });
      const FormData = require('form-data');
      let data = new FormData();
      data.append('number', selectedRating);
      data.append('description', message);
      props.dispatch(userActions.sendFeedback(data,props))

    }

  }




  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>



      <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10, tintColor: '#2E2684' }} source={require('../../Images/back.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#2E2684', fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Feedback</Text>

        </View>

      </View>

      <View style={{ flex: 1, marginHorizontal: 20, marginTop: -50, justifyContent: 'center', }}>
        <Text style={{ color: '#2E2684', fontSize: 18, fontWeight: '600', marginTop: -50, textAlign: 'center' }}>Rate Us</Text>

        <Text style={{ marginTop: 20, color: '#2E2684', fontSize: 18, fontWeight: '600', }}>How much happy are you?</Text>
        <View style={{ marginTop: 20, padding: 5, borderRadius: 10, backgroundColor: 'white', elevation: 5, flexDirection: 'row', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <TouchableOpacity onPress={() => handleRatingPress(rating)}>
              <Text style={{ backgroundColor: selectedRating === rating ? 'blue' : 'white', height: 25, width: 22, borderWidth: 1, borderColor: 'green', textAlign: 'center', margin: 4, color: selectedRating === rating ? 'white' : 'red', fontSize: 14, alignSelf: 'center' }}>{rating}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedRatingError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{selectedRatingError}</Text>}
        <View style={{ alignSelf: 'center', borderRadius: 10, width: '95%', backgroundColor: "#FFF", height: 120, elevation: 5, borderWidth: 1, borderRadius: 10, borderColor: '#2E2684', marginTop: 20 }}>
          <TextInput
            style={{ marginHorizontal: 10, fontSize: 16, color: '#000', width: '100%', }}
            placeholder="Write Feedback (optional)"

            placeholderTextColor='gray'
            name="msg"
            multiline
            numberOfLines={1}
            onChangeText={(text) => handletitle(text)}
            value={message}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={loading}
        >
          <View
            style={{
              marginTop: 240,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(231, 231, 231,0.1)', backfaceVisibility: 'visible'
            }}>
            <ActivityIndicator color={"#6CC417"} size={'large'} />
            <Text style={{ color: "#6CC417", fontSize: 13, }}>
              Loading....
            </Text>
          </View>
        </Modal>



      </View>
      <TouchableOpacity style={{ width: '75%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 10, bottom: 20 }} onPress={() => feedbackSubmit()}
      // props.navigation.navigate('FeedLoading')}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Submit  </Text>

      </TouchableOpacity>




    </View>
  )
}

function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  const { users, } = state;
  return {
    // loggingIn,
    users,
  };
}
export default connect(mapStateToProps)(Feedback);
