import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Dimensions, 
   
  } from 'react-native';

  import Icon from 'react-native-vector-icons/FontAwesome';
  import { normalizeFont } from '../../constants/Helper'
  import { useNavigation } from '@react-navigation/native';
  import ArrowBack from '../../components/ArrowBack'
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const EventDetailScreen = () => {
  const navigation=useNavigation() ;
    return (
     <>
     
     <View  style={styles.wrapper1}>
      <View style={styles.wrapper2}>
        <Image 
        style={{marginTop:-windowHeight/55.15,}} 
        source={require('../../assets/images/f1.png')} />
        
      </View>
      <TouchableOpacity style={{ zIndex:1,position:'absolute',top:windowHeight/17 }} onPress={()=>navigation.goBack() }>
     <ArrowBack  />
     </TouchableOpacity>
      <ScrollView style={{marginTop:windowHeight/5.5}}>
      <View style={styles.card}>
     <Image style={styles.image} source={require('../../assets/images/card.jpeg')}  resizeMode={"cover"} />
     
     <View style={styles.setText}>
        <Text style={{color:'white',fontSize:normalizeFont(20),paddingVertical:3}}>Event Name</Text>
        <Text style={{color:'white',fontSize:normalizeFont(15),paddingVertical:3}}>Buy in:$90</Text>
        <Text style={{color:'white',paddingVertical:5,fontSize:normalizeFont(13)}}>Vacant seats: 5</Text>
        <Text style={{color:'white',paddingVertical:5,fontSize:normalizeFont(13)}}>Handling Charges: $2.00</Text>
       
       
     </View>
     </View>
     <View>
     <Image 
        style={{marginTop:windowHeight/270,}} 
        source={require('../../assets/images/map2.png')} />
        
      </View>
      <View style={{ padding:20 }}>
          <Text style={{color:'white'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since 
           the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but it has survived not only five centuries, but </Text>
      </View>
      <View >
                {
                  <TouchableOpacity
                    style={[styles.loginButton, { marginBottom: windowHeight / 25 }]}
                    >
                    <Text style={[styles.buttonText, { color: 'white' }]}> Reserve a Seat </Text>
                  </TouchableOpacity> }
              </View>
     </ScrollView>
          </View>
          
          </>
     
    )
    }
  
  export default EventDetailScreen;
  
  const styles=StyleSheet.create({
    wrapper1:{
      flex: 1,
       backgroundColor:'#232727',
    },
    wrapper2: {
     position: "absolute",
     zIndex: 1,
      alignItems: 'center',
      borderBottom:2,
      alignSelf:'center'
    
    
    },
    cardImage:{
      marginTop:windowHeight/20,
      alignItems: 'center',
    },
    image: {
      width: windowWidth/3,
      height: windowWidth/3,
      borderWidth: 2,
      borderRadius: windowWidth/30,
    },
    card:{
    
      flexDirection: 'row',
   //   backgroundColor:'#232727',
      marginLeft:windowWidth/20,
      borderRadius: windowWidth/30,
      marginBottom:windowHeight/35
    },
    setText: {
      margin:windowWidth/110,
      paddingLeft:10
      
   
    },
    loginButton: {
        width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: "#5b0b0b", padding: windowWidth / 18, marginTop: windowHeight / 60, fontWeight: '700',
      },
      buttonText: {
        textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
      },
  })