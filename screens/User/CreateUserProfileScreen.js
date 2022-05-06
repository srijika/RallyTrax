import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, TextInput, Platform, Alert,
    ImageBackground, Dimensions, ActivityIndicator, KeyboardAvoidingView, Image,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import { Avatar, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'react-native-axios';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userAction from '../../store/actions/users';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextErrorMessage from '../../components/TextErrorMessage';
import { BASEURL } from '../../constants/Helper';
import { staticBackImage } from '../../constants/Images'
import UserBackground from '../../components/UserBackground';
import ActionSheet from 'react-native-actionsheet'
import ScreenLoader from '../../components/ScreenLoader';
import { CameraPermission } from '../../constants/CameraPermission';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import input_styles from "../Auth/Styles"
import { normalizeFont } from '../../constants/Helper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const schema = yup
    .object({
        user_name: yup.string().required(),
        poker_skill_lavel: yup.string().required(),
        mobile_number: yup.string().required(),

    })
    .required();



export default function CreateUserProfileScreen({ navigation }) {
    const dispatch = useDispatch();
    const [imageUri, setImageUri] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [userBackground, setUserBackground] = useState(staticBackImage);
    const [imgBackgrounds, setImgBackgrounds] = useState([]);
    const state = useSelector(state => state);
    const user_data = state?.user?.user;

    const [isFocused, setIsFocused] = useState({
        user_name: false,
        poker_skill_lavel: false,
        mobile_number: false,

    })
    // handlers
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

    const handleUserBackground = (item) => {
        setUserBackground(item)
    }


    useEffect(() => {

        if (user_data) {

            setImageUri(user_data?.avatar);

            setValue('user_name', user_data?.user_name)
            setValue('poker_skill_lavel', user_data?.poker_skill_lavel)
            setValue('mobile_number', user_data?.mobile_number)
        }



    }, [])


    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const launchImageLibraryFun = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response.assets) {
                const data = response.assets[0].uri;
                setImageUri(data);

            }
        });
    };


    const launchCameraFun = async () => {

        console.log('camera launched')
        const granted = CameraPermission();
        launchCamera({
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.5,
        }, response => {
            if (response.assets) {
                const data = response.assets[0].uri;
                setImageUri(data);
            }
        });

    };



    const onSubmit = async data => {

        setIsloading(true);

        try {
            let formData = new FormData();
            if (imageUri) {
                let uri = imageUri;
                let fileType = uri.substring(uri.lastIndexOf('.') + 1);
                formData.append('avatar', {
                    uri:
                        Platform.OS === 'android'
                            ? imageUri
                            : imageUri.replace('file://', ''),
                    name: `photo.${fileType}`,
                    type: `image/*`,
                });
            }
            const storedUserData = await AsyncStorage.getItem('userAuthData');



            let userData = JSON.parse(storedUserData);

            formData.append('user_name', data.user_name);
            formData.append('poker_skill_lavel', data.poker_skill_lavel);
            formData.append('mobile_number', data.mobile_number);

            if (userData?.user?._id) {
                formData.append('user_id', userData?.user?._id);
            } else {
                formData.append('user_id', userData?.user);
            }
            formData.append('userType', "USER");


            await dispatch(userAction.editProfile(formData));

            navigation.navigate('Home');
        } catch (error) {
            Alert.alert("", error.message)
            // setError(error.message);
        }
        setIsloading(false);
    };

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
        }
    }, [error]);



    return (

        <ScrollView style={{ backgroundColor: "black" }}>
            <AuthStackGradientContainer>
                <View style={styles.avatarView}>
                    <ScreenHeader name="Create Profile" />
                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                        {imageUri ?
                            <View style={styles.cardImage}>
                                <TouchableOpacity onPress={() => {
                                    this.ActionSheet.show()
                                }} >
                                    <Image style={styles.image} source={{ uri: imageUri }} resizeMode={"cover"} />
                                </TouchableOpacity>
                            </View>

                            :
                            <View>
                                <Icon onPress={() => {
                                    this.ActionSheet.show()
                                }} style={styles.icon} name="plus" size={100} color="#c9c9c9" />
                                <Text style={{ color: '#c9c9c9', marginTop: windowHeight / 70, justifyContent: 'center', alignSelf: 'center' }}>Add Image</Text>
                            </View>
                        }


                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Which one do you like ?'}
                            options={['Camera', 'Photo Library', 'Cancel']}
                            cancelButtonIndex={2}
                            onPress={(buttonIndex) => {
                                switch (buttonIndex) {
                                    case 0:
                                        launchCameraFun()
                                        break;
                                    case 1:
                                        launchImageLibraryFun()
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        />
                    </View>
                </View>

                <View >
                    <View>

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[[input_styles.input, { paddingLeft: windowWidth / 20, alignSelf: 'center' }], isFocused.user_name ? styles.onfocusInput : styles.onblurInput]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Your Name'
                                    placeholderTextColor={isFocused.user_name ? "gray" : "white"}
                                    onFocus={() => handleInputFocus('user_name')}
                                    onBlur={() => handleInputBlur('user_name')}
                                />
                            )}
                            name="user_name"
                        />
                        <TextErrorMessage error={errors?.user_name?.message ? 'Name is required' : ''} />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[[input_styles.input, { paddingLeft: windowWidth / 20, alignSelf: 'center' }], isFocused.mobile_number ? styles.onfocusInput : styles.onblurInput]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Mobile Number'
                                    placeholderTextColor={isFocused.mobile_number ? "gray" : "white"}
                                    onFocus={() => handleInputFocus('mobile_number')}
                                    onBlur={() => handleInputBlur('mobile_number')}
                                    keyboardType='numeric'
                                    maxLength={10}

                                />
                            )}
                            name="mobile_number"
                        />
                        <TextErrorMessage error={errors?.mobile_number?.message ? 'Mobile Number is required' : ''} />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[[input_styles.input, { paddingLeft: windowWidth / 20, alignSelf: 'center' }], isFocused.poker_skill_lavel ? styles.onfocusInput : styles.onblurInput]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Poker Skill Lavel'
                                    placeholderTextColor={isFocused.poker_skill_lavel ? "gray" : "white"}
                                    onFocus={() => handleInputFocus('poker_skill_lavel')}
                                    onBlur={() => handleInputBlur('poker_skill_lavel')}

                                />
                            )}
                            name="poker_skill_lavel"
                        />

                        <TextErrorMessage error={errors?.poker_skill_lavel?.message ? 'Power Sill Level is required' : ''} />
                    </View>


                </View>


                <View style={{ marginTop: windowHeight / 200 }}>
                    {!isLoading ? (
                        <TouchableOpacity
                            style={[styles.createButton, { marginBottom: windowHeight / 40 }]}
                            onPress={handleSubmit(onSubmit)}>
                            <Text style={[styles.buttonText, { color: 'white', }]}> Create </Text>
                        </TouchableOpacity>) : (<ActivityIndicator style={[styles.createButton, { marginBottom: windowHeight / 17.5 }]} size="small" color="white" />)}
                </View>



            </AuthStackGradientContainer>
            <View>

                <TouchableOpacity style={styles.bottomButton}>

                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    topBox: {
        alignItems: 'center'
    },

    avatarView: { marginTop: windowHeight / 18, marginBottom: windowHeight / 20 },
    createButton: {
        width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: buttonColor, padding: windowWidth / 18, marginTop: windowHeight / 15, fontWeight: '700',
    },
    buttonText: {
        textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
    },
    alertModel: {
        borderRadius: 45,
        backgroundColor: 'white',
        padding: windowWidth / 18,
        marginHorizontal: windowHeight / 70
    },

    modalAlertText: {
        marginTop: windowHeight / 35,
        textAlign: 'center',
        paddingHorizontal: windowWidth / 24,
        fontSize: normalizeFont(17),
        fontWeight: 'bold'
    },

    icon: {
        marginTop: windowHeight / 35,
        borderWidth: 1.5,
        borderColor: 'white',
        padding: windowWidth / 18,
        width: 140,
        height: 140,
        borderRadius: 70,
        paddingLeft: 31,
        paddingTop: 22,
    },
    onfocusInput: {
        backgroundColor: "white",
        color: "gray",
    },
    onblurInput: {
        backgroundColor: "#761D1D",
        color: "white",
    },
    image: {
        marginTop: 20,
        width: windowWidth / 2.4,
        height: windowWidth / 2.4,
        borderWidth: 2,
        borderRadius: windowWidth / 4.8
    },
});