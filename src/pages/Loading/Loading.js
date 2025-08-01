import { View, Text ,Image} from 'react-native'
import React,{useState,useEffect} from 'react'


// import LottieView from 'lottie-react-native';


const Loading= props => {



  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Home')
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 2500);
 
  }, [])
  


    


  return (

    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#FFF'}}>
      
      <Image  source={require('../../Images/loading.gif')}  style={{ height:150,width:150,resizeMode:'contain'}}/>
        <Text style={{fontSize:15,textAlign:'center',fontWeight:'600',color:'#000'}}>Please Wait</Text>
        <Text style={{textAlign:'center',fontSize:13}}>While we are creating your account</Text>
    
 

      
    </View>
  )
}

export default Loading