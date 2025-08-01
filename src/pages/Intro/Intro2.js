import { View, Text,TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'


const Intro2 = props => {
  return (
    <View style={{flex:1,backgroundColor:'#FFF'}}>
      <StatusBar
  backgroundColor="white"  
  barStyle="dark-content"  
/>

      <View style={{marginHorizontal:20,flexDirection:'row',justifyContent:"space-between",marginTop:20}}>
        <Text></Text>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',justifyContent:'space-evenly',width:'30%'}}>
          
          <View style={{height:6,width:17,backgroundColor:'#B6B6B6',borderRadius:10}} />
       <View style={{height:6,width:17,backgroundColor:'#000266',borderRadius:10}} /> 
       <View style={{height:6,width:17,backgroundColor:'#B6B6B6',borderRadius:10}} />
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Welcome')}>
        <Text style={{color:'#000266',fontSize:15,textDecorationLine:'underline',fontWeight:'500'}}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex:1,justifyContent:'center',}}>
        <Image source={require('../../Images/intro2.png')} style={{alignSelf:'center',height:300,width:300,resizeMode:'contain'}} />
        <Text style={{fontSize:16,textAlign:'center',marginTop:10}}>We are here to you help in your legal matters</Text>

      </View>
      <TouchableOpacity style={{marginHorizontal:20,borderRadius:15,backgroundColor:'#000266',padding:6,bottom:50}} onPress={()=>props.navigation.navigate('Intro3')}>
<Text style={{color:'white',textAlign:'center',fontSize:18}}>Next</Text>
      </TouchableOpacity>
     
    </View>
  )
}

export default Intro2