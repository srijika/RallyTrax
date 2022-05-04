import React, { useState, useEffect } from 'react'
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
     Button

} from 'react-native';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalizeFont } from '../../constants/Helper'
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '../../components/ScreenHeader';
import CheckBox from '../../components/CheckBox';
import * as userAction from '../../store/actions/users';
import ArrowBack from '../../components/ArrowBack'
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

import input_styles from "../Auth/Styles"



const BusinessInvitePleyer = () => {
     const playerName = [
          {
               id: "1",
               name: "Earnest Green",
          },
          {
               id: "2",
               name: "Winston Orn",
          },
          {
               id: "3",
               name: "Carlton Collins",
          },
          {
               id: "4",
               name: "Malcolm Labadie",
          },
          {
               id: "5",
               name: "Michelle Dare",
          },
          {
               id: "6",
               name: "Carlton Zieme",
          },

          {
               id: "7",
               name: "Jessie Dickinson",
          },
          {
               id: "8",
               name: "Michelle Dare now",
          },
          {
               id: "9",
               name: "Carlton Zieme then",
          },
          {
               id: "10",
               name: "sham",
          },
          {
               id: "11",
               name: "mohan",
          },
          {
               id: "12",
               name: "hari",
          },
          {
               id: "13",
               name: "madhav",
          },

          {
               id: "14",
               name: "keshav",
          },




     ];
     const [players, setPlayers] = useState(playerName)
     const navigation = useNavigation();

     const [isFocused, setIsFocused] = useState({
          email: false,

     })
     const [isLoading, setIsloading] = useState(false);
     const [inputs, setInputs] = useState({
          email: ""
     });
     const [searchResults, setSearchResults] = useState([]);

     console.log('searchTerm', inputs)

     const handleInputFocus = (textinput) => {
          setIsFocused({
               [textinput]: true
          })
     }
     const handleInputBlur = (textinput) => {
          setIsFocused({
               [textinput]: false
          })
     }



     const handleOnchange = (text, input) => {
          setInputs(prevState => ({ ...prevState, [input]: text }));
     };

     useEffect(() => {

          const result = players.filter(post => {

               if (inputs.email == "") {

                    return post;
               } else if (post.name.toLowerCase().includes(inputs.email.toLowerCase())) {


                    return post;
               }
          })
          setSearchResults(result);

     }, [inputs])



     return (
          <>
               <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: 'black' }}>
                    <AuthStackGradientContainer>
                         <View >

                              <View style={styles.avatarView}>
                                   <ScreenHeader name="Invite Players" />

                              </View>
                              <ArrowBack />
                              <View>


                                   <TextInput
                                        style={[[input_styles.input, { alignSelf: 'center' }], isFocused.email ? styles.onfocusInput : styles.onblurInput]}
                                        // onBlur={onBlur}
                                        onChangeText={text => handleOnchange(text, 'email')}
                                        placeholder='Type name'
                                        placeholderTextColor={isFocused.email ? "gray" : "#d1baba"}
                                        onFocus={() => handleInputFocus('email')}
                                        onBlur={() => handleInputBlur('email')}
                                        value={inputs.email}

                                   />


                                   <Icon size={20} name="search" style={[styles.icon, isFocused.email ? { color: "gray" } : { color: "#d1baba" }]} />

                              </View>
                              <View style={{ flexDirection: 'row', marginTop: WindowHeight / 30, alignItems: 'center', justifyContent: 'center' }}>
                                   <View style={styles.hairline} />
                                   <Text style={styles.loginButtonBelowText1}>OR</Text>
                                   <View style={styles.hairline} />
                              </View>
                              <View style={{ paddingLeft: WindowWidth / 20, marginTop: WindowHeight / 60 }}>
                                   <Text style={{ color: 'white', fontSize: normalizeFont(25), fontWeight: 'bold', marginBottom: 20 }}>NearBy Players</Text>
                              </View>
                              <ScrollView nestedScrollEnabled={true} style={{ maxHeight: WindowHeight / 4.3 }}>
                                   <View style={{ paddingLeft: WindowWidth / 20, }}>


                                        {
                                             searchResults.map((player) => {

                                                  return <CheckBox plName={player} key={player.id} />
                                             })
                                        }
                                   </View>
                              </ScrollView>

                              <View >
                                   {!isLoading ? (
                                        <TouchableOpacity
                                             style={[styles.loginButton, { marginBottom: WindowHeight / 30 }]}
                                             onPress={() => { navigation.navigate('BussinessHomeScreen') }}

                                        >
                                             <Text style={[styles.buttonText, { color: 'white' }]} > Add </Text>
                                        </TouchableOpacity>) : (<ActivityIndicator style={[styles.loginButton, { marginBottom: WindowHeight / 30 }]} size="small" color="white" />)}
                              </View>




                         </View>

                    </AuthStackGradientContainer>
                    <View >

                         <TouchableOpacity style={styles.bottomButton}
                              onPress={() => { navigation.navigate('BussinessHomeScreen') }}

                         >
                              <Text style={{ color: "white", textAlign: "center", fontWeight: '700', paddingBottom: 20 }}> Skip </Text>
                         </TouchableOpacity>
                    </View>
               </ScrollView>

          </>
     )
}
export default BusinessInvitePleyer

const styles = StyleSheet.create({

     loginButton: {
          width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: 'black', padding: WindowWidth / 18, marginTop: WindowHeight / 8, fontWeight: '700'
     },
     buttonText: {
          textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
     },
     avatarView: { marginBottom: WindowHeight / 12, marginTop: WindowHeight / 40 },
     icon: {
          position: 'absolute',
          left: WindowWidth / 13.33,
          top: WindowHeight / 27.5,

          color: 'white',

     },
     bottomButton: {
          justifyContent: 'center',
          paddingTop: WindowHeight / 20,
          backgroundColor: 'black',
     },
     onfocusInput: {
          backgroundColor: "white",
          color: "gray",
     },
     onblurInput: {
          backgroundColor: "#761D1D",
          color: "white",

     }
     ,

     hairline: {
          backgroundColor: '#d6c9c8',
          height: 2,
          width: 40
     },

     loginButtonBelowText1: {

          fontSize: 14,
          paddingHorizontal: 5,
          alignSelf: 'center',
          color: 'white',
          fontWeight: '300',
     },

});