
import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    View,
    Button,
    Dimensions,
    TouchableOpacityBase
  } from 'react-native'
  import { normalizeFont } from '../constants/Helper'
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  const TransactionHistory=()=>{
    const [color_name,setColor_name]=useState(false)
    return(
        <TouchableOpacity>
        <View style={[styles.card,{marginTop:windowHeight/60}]}>
       
    
    
<View style={styles.setText}>
   <Text style={{color:'white',fontSize:normalizeFont(17),paddingVertical:3,paddingTop:10,}}>Jacky jell has booked a punchy event</Text>
  
   <Text style={{color:'white',fontSize:normalizeFont(15),paddingVertical:3,paddingBottom:10}}>Booking id: 12345</Text>
   
</View>
<View style={ styles.dateCard}>
      <Text style={{color:'white',fontSize:normalizeFont(13)}}>sept 20th,2020</Text>
  </View>
</View>
<View style={[styles.card,{marginTop:windowHeight/60}]}>
       
    
    
       <View style={styles.setText}>
          <Text style={{color:'white',fontSize:normalizeFont(17),paddingVertical:3,paddingTop:15,paddingBottom:15}}>Ramy jack has paid $2.00</Text>
          
       </View>
       <View style={ styles.dateCard2}>
             <Text style={{color:'white',textAlign:'center', fontSize:normalizeFont(13)}}>yesterday</Text>
         </View>
       </View>
</TouchableOpacity>
    )
  }
export default TransactionHistory
const styles=StyleSheet.create({
  
   
    card:{
    
      flexDirection: 'row',
      backgroundColor:'#232727',
      marginLeft:windowWidth/30,
      marginRight:windowWidth/30,
      borderRadius: 20,
      marginBottom:windowHeight/35
    },
    setText: {
      margin:windowWidth/110,
      paddingLeft:10
    },
    dateCard:{
    width:"25%",  backgroundColor:'#3c4343',padding:6,borderRadius:20,position:'absolute',right: windowWidth/25,bottom:windowHeight/12
    },
    dateCard2:{
        width:"25%",  backgroundColor:'#3c4343',padding:6,borderRadius:20,position:'absolute',right: windowWidth/25,bottom:windowHeight/15.3
        }
  })