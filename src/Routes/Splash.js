import { View, Text,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import Colors from '../_constants/Colors'
import { hp } from '../constantComponent/Responsive'




const Splash = props => {




  return (

    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#FFF'}}>

    
    <Image   source={require('../Images/policelogo.gif')}  style={{height:300,width:300, resizeMode:'contain'}}/>
      <Text style={{color:Colors.Black,fontSize:hp(2.5),marginTop:hp(3),fontWeight:'900'}}>Dutantj Support Pvt Ltd</Text>
    </View>
  )
}

export default Splash