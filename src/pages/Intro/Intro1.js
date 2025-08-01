// import { View, Text,TouchableOpacity, StatusBar, Image } from 'react-native'
// import React from 'react'


// const Intro1 = props => {
//   return (
//     <View style={{flex:1,backgroundColor:'#FFF'}}>
//       <StatusBar
//   backgroundColor="white"  
//   barStyle="dark-content"  
// />

//       <View style={{marginHorizontal:20,flexDirection:'row',justifyContent:"space-between",marginTop:20}}>
//         <Text></Text>
//         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',justifyContent:'space-evenly',width:'30%'}}>
          
//           <View style={{height:6,width:17,backgroundColor:'#000266',borderRadius:10}} />
//        <View style={{height:6,width:17,backgroundColor:'#B6B6B6',borderRadius:10}} /> 
//        <View style={{height:6,width:17,backgroundColor:'#B6B6B6',borderRadius:10}} />
//         </View>
//         <TouchableOpacity onPress={()=>props.navigation.navigate('Welcome')}>
//        <Text style={{color:'#000266',fontSize:15,textDecorationLine:'underline',fontWeight:'500'}}>Skip</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{flex:1,justifyContent:'center',}}>
//         <Image source={require('../../Images/intro1.png')} style={{alignSelf:'center',height:300,width:300,resizeMode:'contain'}} />
//         <Text style={{fontSize:16,textAlign:'center',marginTop:10}}>We help you get Police assistance in just one Click!!</Text>

//       </View>
//       <TouchableOpacity style={{marginHorizontal:20,borderRadius:15,backgroundColor:'#000266',padding:6,bottom:50}} onPress={()=>props.navigation.navigate('Intro2')}>
// <Text style={{color:'white',textAlign:'center',fontSize:18}}>Next</Text>
//       </TouchableOpacity>
      
//     </View>
//   )
// }

// export default Intro1
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const slides = [
  {
    key: 'slide1',
    // title: 'Welcome to Your App',
    text: 'We help you get Police assistance in just one Click!!',
    image: require('../../Images/intro1.png'),
    // backgroundColor: '#59b2ab',
  },
  {
    key: 'slide2',
    // title: 'Discover Amazing Features',
    text: 'We are here to you help in your legal matters',
    image: require('../../Images/intro2.png'),
    // backgroundColor: '#febe29',
  },
  {
    key: 'slide3',
    // title: 'Get Started Now',
    text: 'We will help you verify your employee, so that you can run your business tension free',
    image: require('../../Images/intro3.png'),
    // backgroundColor: '#22bcb5',
  },
];

const Intro1 = props => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      props.navigation.navigate('Welcome')
    }
  };

  const handleSkip = () => {
    props.navigation.navigate('Welcome')
    // Handle skip action, e.g., skip to the main screen
  };

  return (
    <View style={styles.container}>
    
   
      <View style={styles.navigationContainer}>
        <View></View>
      <View style={styles.paginationContainer}>
        {slides.map((slide, index) => (
          <View
            key={slide.key}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={{color:'#000266',fontSize:15,textDecorationLine:'underline',fontWeight:'500'}}>Skip</Text>
        </TouchableOpacity>
    
      </View>
      <View style={styles.slideContainer}>
        <Image source={slides[currentIndex].image} style={styles.image} />
        {/* <Text style={styles.title}>{slides[currentIndex].title}</Text> */}
        <Text style={styles.text}>{slides[currentIndex].text}</Text>

      
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={{color:'white',textAlign:'center',fontSize:18}}>Next</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:-30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop:10,
    fontWeight:'500',
    color:'#000'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationDot: {
    width: 20,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  activeDot: {
    backgroundColor: '#000266', // Change the color of the active dot
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingBottom: 20,
    marginTop:20
  },
  skipButton: {
    color: 'gray',
  },
  nextButton: {
    // backgroundColor: 'green',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // borderRadius: 25,
    marginHorizontal:20,borderRadius:15,backgroundColor:'#000266',padding:6,bottom:40
  },
});

export default Intro1;
