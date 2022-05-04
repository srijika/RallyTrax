import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import CreateProfileScreen from '../screens/User/CreateProfileScreen'
import CreateUserProfileScreen from '../screens/User/CreateUserProfileScreen'
import HomeScreen from '../screens/HomeScreen';
//import SettingScreen from '../screens/SettingScreen';
import BussinessEventHistoryDetails from '../screens/Business/BussinessEventHistoryDetails'
import DetailScreen from '../screens/DetailScreen';
import { Platform, View, Button, } from 'react-native'
import { primaryColor, secondaryColor } from '../constants/Colors';
import LoginScreen from '../screens/Auth/LoginScreen';
import UserEventDetailScreen from '../screens/User/UserEventDetailScreen';
import UserBookingConfirmScreen from '../screens/User/UserBookingConfirmScreen'
//import UserBookedEvents from '../screens/User/UserBookedEvents'
import UserEventHistoryScreen from '../screens/User/UserEventHistoryScreen'
import UserNotificationScreen from '../screens/User/UserNotificationScreen'
import UserReseveConfirmScreen from '../screens/User/UserReseveConfirmScreen'
import UserTransactionHistoryScreen from '../screens/User/UserTransactionHistoryScreen'
import UserPaymentmethodScreen from '../screens/User/UserPaymentmethodScreen'
import UserSettingScreen from '../screens/User/UserSettingScreen'
import UserTermsCondtionScreen from '../screens/User/UserTermsCondtionScreen'
import UserPrivacyPolicyScreen from '../screens/User/UserPrivacyPolicyScreen'
import UserAboutUsScreen from '../screens/User/UserAboutUsScreen'

//// business

import BussinessEventHistoryScreen from '../screens/Business/BussinessEventHistoryScreen'
import BusinessEventDetails from '../screens/Business/BusinessEventDetails'
import BusinessPokerRun from '../screens/Business/BusinessPokerRun'
import BusinessInvitePleyer from '../screens/Business/BusinessInvitePleyer'

import BusinessLiveEvents from '../screens/Business/BusinessLiveEvents'

import BusinessProfile from '../screens/Business/BusinessProfile'

import BusinessEditProfile from '../screens/Business/BusinessEditProfile'
import BusinessChangePassword from '../screens/Business/BusinessChangePassword'
import BusinessTransactionHistory from '../screens/Business/BusinessTransactionHistory'
import BussinessHomeScreen from '../screens/Business/BussinessHomeScreen'
import BusinessNotificaton from '../screens/Business/BusinessNotificaton'
import BusinessPaymentMethods from '../screens/Business/BusinessPaymentMethods'
import AddNewCardScreen from '../screens/Common/AddNewCardScreen'
import BusinessSettings from '../screens/Business/BusinessSettings'
import BusinessTermsCondtions from '../screens/Business/BusinessTermsCondtions'
import BusinessPrivacyPolicy from '../screens/Business/BusinessPrivacyPolicy'
import BusinessAboutUs from '../screens/Business/BusinessAboutUs'






const profileName = "ProfileScreen"
//const CreateProfile = "CreateProfileScreen"
// stack navigation -------


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const titleBarHeader = title => {
  return {
    title: title,
    headerStyle: {  backgroundColor: secondaryColor },
    headerTintColor: '#fff',
    headerShadowVisible: false,
  
  };
};

function HomeStack({ navigation, route }) {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
  
    const withoutBootomBar = ["CreateProfileScreen","CreateUserProfileScreen","BusinessPokerRun","BusinessInvitePleyer","BusinessEventDetails","UserEventDetailScreen","UserBookingConfirmScreen",'UserTermsCondtionScreen'];





    if (withoutBootomBar.includes(routeName)) {
      navigation.setOptions({

        tabBarStyle: {
          display: "none",
        },

      });
    } else {

      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          borderTopWidth: 0, backgroundColor: "black",
          height: Platform.OS === 'ios' ? 90 : 60
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator

      screenOptions={{
        headerShown: false,

      }}>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}


      />
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={{ title: 'Create Profile' }}
      />
       <Stack.Screen
        name="CreateUserProfileScreen"
        component={CreateUserProfileScreen}
        options={{ title: 'Create User Profile' }}
      />
     
      <Stack.Screen
        name="UserBookingConfirmScreen"
        component={UserBookingConfirmScreen}
        options={{ title: 'Booking' }}
      />
       <Stack.Screen
        name="UserEventDetailScreen"
        component={UserEventDetailScreen}
        options={{ title: 'Event Details' }}
      />
    
    
         <Stack.Screen
        name="BusinessEventDetails"
        component={BusinessEventDetails}
        options={{ title: 'Details Page' }}
      />

       <Stack.Screen
        name="BusinessPokerRun"
        component={BusinessPokerRun}
        options={{ title: 'BusinessPokerRun' }}
      />
     

     
      <Stack.Screen
        name="BusinessLiveEvents"
        component={BusinessLiveEvents}
        options={{ title: 'Live Events' }}
      />
       <Stack.Screen
        name="BusinessInvitePleyer"
        component={BusinessInvitePleyer}
        options={{ title: 'invite Events' }}
      />
      <Stack.Screen
        name="BussinessHomeScreen"
        component={BussinessHomeScreen}
        options={{ title: 'Home' }}
      />
      
      
      

    </Stack.Navigator>
  );
}

function SettingStack({ navigation, route }) {
  const state = useSelector(state => state);
  const user_data = state?.user?.user;
  
  React.useLayoutEffect(() => {
  
    const routeName = getFocusedRouteNameFromRoute(route);
    const withoutBootomBar = ["BusinessEventDetails","UserReseveConfirmScreen", "BussinessEventHistoryDetails"];

    if (withoutBootomBar.includes(routeName)) {
      navigation.setOptions({

        tabBarStyle: {
          display: "none",
        },

      });
    } else {

      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          borderTopWidth: 0, backgroundColor: "black",
          height: Platform.OS === 'ios' ? 90 : 60
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false
      }}>

        {
          user_data?.roles == 'USER' ?
          <Stack.Screen
          name="UserEventHistoryScreen"
          component={UserEventHistoryScreen}
          options={{ title: 'User Events History' }}
      />:<Stack.Screen
          name="BussinessEventHistoryScreen"
          component={BussinessEventHistoryScreen}
          options={{ title: 'Bussiness Events History' }}
        />
        }
        
        
       
       <Stack.Screen
        name="UserReseveConfirmScreen"
        component={UserReseveConfirmScreen}
        options={{ title: 'User Reserve' }}
      />
        <Stack.Screen
        name="BussinessEventHistoryDetails"
        component={BussinessEventHistoryDetails}
        options={{ title: 'Bussiness Reserve' }}
      />
      
     
      <Stack.Screen
        name="BusinessEventDetails"
        component={BusinessEventDetails}
        options={{ title: 'Details Page' }}
      />

    </Stack.Navigator>
  );
}
function ProfileStack({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
        // name="UserTermsCondtionScreen"
        // name="UserTermsCondtionScreen"
        // name="UserTermsCondtionScreen"
        const withoutBootomBar = ["BusinessEditProfile","BusinessChangePassword","BusinessTransactionHistory","BusinessPaymentMethods","AddNewCardScreen","BusinessSettings","BusinessPrivacyPolicy",'BusinessTermsCondtions','BusinessAboutUs',"UserTransactionHistoryScreen",'UserPaymentmethodScreen','UserSettingScreen','UserTermsCondtionScreen','UserPrivacyPolicyScreen','UserAboutUsScreen'];

    if (withoutBootomBar.includes(routeName)) {
      navigation.setOptions({

        tabBarStyle: {
          display: "none",
        },

      });
    } else {

      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          borderTopWidth: 0, backgroundColor: "black",
          height: Platform.OS === 'ios' ? 90 : 60
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true
      }}>
      <Stack.Screen
        name="BusinessProfile"
        component={BusinessProfile}
        // options={
        //   { title: 'ProfileScreen' }}
          options={{ headerShown: false }}

      />
      
       <Stack.Screen
        name="BusinessEditProfile"
        component={BusinessEditProfile}
          options={{ headerShown: false }}
      />
       <Stack.Screen
        name="BusinessChangePassword"
        component={BusinessChangePassword}
          options={{ headerShown: false }}
      />

<Stack.Screen
        name="BusinessTransactionHistory"
        component={BusinessTransactionHistory}
          options={{ headerShown: false }}
      />

<Stack.Screen
        name="BusinessNotificaton"
        component={BusinessNotificaton}
          options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessPaymentMethods"
        component={BusinessPaymentMethods}
          options={{ headerShown: false }}
      />
       <Stack.Screen
        name="AddNewCardScreen"
        component={AddNewCardScreen}
          options={{ headerShown: false }}
      />
       <Stack.Screen
        name="BusinessSettings"
        component={BusinessSettings}
          options={{ headerShown: false }}
      />
       <Stack.Screen
        name="BusinessTermsCondtions"
        component={BusinessTermsCondtions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessPrivacyPolicy"
        component={BusinessPrivacyPolicy}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="BusinessAboutUs"
        component={BusinessAboutUs}
        options={{ headerShown: false }}
      />
      
       <Stack.Screen
        name="UserTransactionHistoryScreen"
        component={UserTransactionHistoryScreen}
          options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserNotificationScreen"
        component={UserNotificationScreen}
          options={{ headerShown: false }}
      />
     
 <Stack.Screen
        name="UserPaymentmethodScreen"
        component={UserPaymentmethodScreen}
          options={{ headerShown: false }}
      />
          <Stack.Screen
        name="UserSettingScreen"
        component={UserSettingScreen}
          options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserTermsCondtionScreen"
        component={UserTermsCondtionScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="UserPrivacyPolicyScreen"
        component={UserPrivacyPolicyScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="UserAboutUsScreen"
        component={UserAboutUsScreen}
        options={{ headerShown: false }}
      />
      
      
    </Stack.Navigator>
  );
}



const AppStack = ({ navigation }) => {

  
  return (
    <>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "profile") {
              iconName = focused ? 'person' : "person-outline"

            }
            else if (rn === "Home2") {
              iconName = focused ? 'home' : "home-outline"
            }
            else if (rn === "Setting") {
              iconName = focused ? 'list' : "list-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarHideOnKeyboard: true,
          tabBarStyle: { borderTopWidth: 0, backgroundColor: "black", height: Platform.OS === 'ios' ? 90 : 60 },
          activeBackgroundColor: 'black',
          tabBarActiveTintColor: secondaryColor,
          //  tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
            fontWeight: "bold",

          },

          headerShown: false, // For Hide Tab Navigator Heading
          tabBarShowLabel: false
        })}

      >

        <Tab.Screen name={"Home2"}
          options={() => ({
            // tabBarStyle: {
            //   display: "none",
            // },


          })}
          component={HomeStack} />
        <Tab.Screen name={"Setting"}
          options={() => ({
            // tabBarStyle: {
            //   display: "none",
            // },

          })}
          component={SettingStack} />

        <Tab.Screen name={"profile"}
          options={() => ({
            // tabBarStyle: {
            //   display: "none",
            // },

          })}
          component={ProfileStack} />
      </Tab.Navigator>





    </>


  )
}

export default AppStack;