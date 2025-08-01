import { View, Text,Image,TouchableOpacity,ScrollView,Alert } from 'react-native'
import React from 'react'
// import { alert } from '../../_reducers/alert.reducer'

const Subsciption_plan = props => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>


    <View style={{ marginHorizontal: 20, marginTop: 20 }}>

      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.navigate('Home')}>
        <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10,tintColor:'#000266' }} source={require('../../Images/back.png')} />
        <Text style={{ color: '#000266', fontSize: 15, fontWeight: '600' }}>Back</Text>
      </TouchableOpacity>
    </View>

    <View style={{ flex: 1, marginHorizontal: 20 }}>

      <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 70, fontWeight: '700', color: '#000266' }}>Police Help</Text>
      <Text style={{ fontSize: 22, textAlign: 'center', color: '#000266',marginTop:10 }}>Subsciption plan</Text>

      <Image source={require('../../Images/call.png')} style={{height:250,width:250,marginTop:10,resizeMode:'contain',alignSelf:'center'}} />
      <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, fontWeight: '700', color: '#000266' }}>500 rs/month</Text>
      <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 8, marginTop: 50 }} onPress={()=>  Alert.alert(
          'Comming Soon  !',

        )}
        //   onPress={() => ProfileUpdated()}
        //  onPress={() => props.navigation.navigate('Home')}
        >
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 18 }}>Pay</Text>
        </TouchableOpacity>
      
     
      
    </View>


  </ScrollView>
  )
}

export default Subsciption_plan