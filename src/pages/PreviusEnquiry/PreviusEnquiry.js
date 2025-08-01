import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import moment from 'moment';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
const PreviusEnquiry = props => {
  const [UserData, setUserData] = useState([])
  useEffect(() => {
    props.dispatch(userActions.getEnquiryDetails())


  }, [])


  const { users } = props;
  const { getEnquirydata } = users
  // console.log("+getEnquirydatagetEnquirydata", getEnquirydata);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>



      <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10, tintColor: '#2E2684' }} source={require('../../Images/back.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#2E2684', fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Previous Enquiey</Text>

        </View>

      </View>

      <View style={{ flex: 1, marginHorizontal: 20, marginTop: -30 }}>
        <ScrollView style={{ marginTop: 50 }} showsVerticalScrollIndicator={false}>
          {getEnquirydata && getEnquirydata.length > 0 ?


            getEnquirydata.map((element) => (
              <View key={element.id} style={{ borderWidth: 1, marginVertical: 10, borderRadius: 15, borderColor: '#000', padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                <View>
                  <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 16,color:'#000' }}>{element.name}
                  </Text>
                  <Text style={{ fontWeight: '300', marginTop: 5, fontSize: 13,color:'#000' }}>{moment(element.created_at).format('DD/MM/YYYY')}
                  </Text>
                  <Text style={{ fontWeight: '400', marginTop: 5, fontSize: 14, color: '#000', }}>{element.name}

                  </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ color: element.userstatus == "0" ? 'green' : 'red', fontSize: 15, fontWeight: '400' }}>Case Status</Text>
                  <Text style={{ color: element.userstatus == "0" ? 'green' : 'red', fontSize: 15, fontWeight: '700' }}>{element.userstatus == "0" ? "Open" : "Closed"}</Text>

                </View>
              </View>

            ))

            :
            <View style={{ marginTop: 50, alignSelf: 'center' }}>
              <Image style={{ height: 150, width: 150, resizeMode: 'contain', alignSelf: 'center', }} source={require('../../Images/nodata.gif')} />
              <Text style={{ color: '#2E2684', fontSize: 20, fontWeight: '400' }}>No data Found</Text>
            </View>
          }

        </ScrollView>


      </View>



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
export default connect(mapStateToProps)(PreviusEnquiry);


