import { View, Text,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'


// import LottieView from 'lottie-react-native';


const Welcome = props => {




  return (

    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#FFF'}}>
     
         <Image   source={require('../Images/policelogo.gif')}  style={{height:200,width:200, resizeMode:'contain',marginBottom:20}}/>
    <Text style={{textAlign:'center' ,color:'#000266',fontSize:25,fontWeight:'700'}}>Police  Help</Text>

  <TouchableOpacity style={{marginHorizontal:20,borderRadius:15,backgroundColor:'#000266',padding:5,width:'85%',marginVertical:15}} onPress={()=>props.navigation.navigate('SignUp')}>
<Text style={{color:'white',textAlign:'center',fontSize:18}}>Create Account</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{marginHorizontal:20,borderRadius:15,backgroundColor:'#FFF',padding:5,width:'85%',borderWidth:2,borderColor:'#000266'}} onPress={()=>props.navigation.navigate('Login')}>
<Text style={{color:'#000266',textAlign:'center',fontSize:18,fontWeight:"bold"}}>Sign In</Text>
      </TouchableOpacity>

      
    </View>
  )
  }
export default Welcome