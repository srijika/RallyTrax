import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ProfileScreen from './ProfileScreen'
import TripsScreen from './TripsScreen'
import NearByScreen from './NearByScreen'
import { Platform } from 'react-native'

const profileName = "ProfileScreen"
const tripsName = "TripsScreen"
const nearByName = "NearByScreen"

const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === profileName) {
                        iconName = focused ? 'person' : "person-outline"
                    } else if (rn === tripsName) {
                        iconName = focused ? 'car' : "car-outline"
                    } else if (rn === nearByName) {
                        iconName = focused ? 'location' : "location-outline"
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarStyle: { backgroundColor :"#2e3133", height: Platform.OS === 'ios' ? 90 : 60 },
                activeBackgroundColor: 'black',
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 10, 
                    fontWeight: "bold"
                },

                headerShown: false, // For Hide Tab Navigator Heading
            })}

        >

            <Tab.Screen name={profileName} component={ProfileScreen} />
            <Tab.Screen name={tripsName} component={TripsScreen} />
            <Tab.Screen name={nearByName} component={NearByScreen} />
        </Tab.Navigator>

    )
}
