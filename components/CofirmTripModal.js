import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';


export default function ConfirmTripModal({ visible, closeModal }) {
    return (

        <Modal animationType="fade" transparent={true} visible={visible} >
            <View style={styles.container}>

                <View style={{ flex: 1 }}>
                    <View style={{ paddingVertical: 30 }}>
                        <Text style={{ color: '#4cbe46', textAlign: 'center', fontSize: 22 }}> New Request! </Text>

                        <Icon onPress={() => { closeModal() }} style={{ textAlign: 'right', marginRight: 20, marginTop: -26 }} name='times-circle' size={28} color={'grey'} />
                    </View>

                    <View style={{ marginTop: 0, paddingHorizontal: 30, paddingVertical: 20, justifyContent: 'center' }}>

                        <View
                            style={{ backgroundColor: 'rgba(14, 16, 14, 1)', height: 325,  padding: 40, borderRadius: 300 / 2, justifyContent: 'center' }}
                        >
                            <View
                                style={{
                                    backgroundColor: 'rgba(28, 28, 28, 1)', height: 240, padding: 0, paddingHorizontal: 20, borderRadius: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >

                                <View style={{ marginTop: 34 }}>
                                    <Avatar rounded size={150}
                                        source={{
                                            uri: 'https://randomuser.me/api/portraits/women/44.jpg',
                                        }}
                                    />
                                    <Text style={{ color: "white", fontSize: 18, marginTop: 7, marginLeft: 14 }}> Sarah Rhynes </Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={{ marginTop: 0, paddingHorizontal: 50 }}>
                        <View>
                            <Text style={styles.label}> Destination </Text>
                            <Text style={styles.value}> 1234 Sample Street </Text>
                        </View>

                        <View style={styles.bodyView}>
                            <View>
                                <Text style={styles.label}> Arrival Date </Text>
                                <Text style={styles.value}> 12/02/2021 </Text>
                            </View>
                            <View>
                                <Text style={styles.label}> Arrival Time </Text>
                                <Text style={styles.value}> 6:45 PM </Text>
                            </View>
                        </View>

                        <View style={styles.bodyView}>
                            <View>
                                <Text style={styles.label}> Smoking </Text>
                                <Text style={styles.value}> Non-Smoking </Text>
                            </View>
                            <View>
                                <Text style={styles.label}> Seats Needed </Text>
                                <Text style={styles.value}> 2 </Text>
                            </View>
                        </View>

                    </View>

                </View>
                <View style={{ flexDirection: 'row', flex: 0.1 }}>
                    <View style={[styles.footerView, { backgroundColor: '#00c488', }]}>
                        <TouchableOpacity>
                            <Text style={styles.button}> Accept Request </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.footerView, { backgroundColor: '#ff5353'}]}>
                        <TouchableOpacity>
                            <Text style={styles.button}> Decline Request </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </Modal>
    )
}

var width = Dimensions.get('window').width; 

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(8, 10, 8, 1)',
    },
    loginButton: {
        borderRadius: 30, backgroundColor: "#2d9100", padding: 10, marginTop: 15,
        paddingHorizontal: 40
    },
    buttonText: {
        textAlign: "center", fontSize: 16, fontWeight: "bold"
    },
    header: { marginTop: 20, alignItems: 'center' },
    heading: { color: 'white', fontSize: 20, fontWeight: "bold" },
    subheading: { color: '#51ba49', fontSize: 14, fontWeight: "bold" },

    body: { marginTop: 35, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 35 },

    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 25, color: '#dfe7ed', fontWeight: "bold"
    },
    footer: { paddingHorizontal: 60, marginTop: 30, paddingVertical: 20 },
    label: { color: '#4cbe46', fontSize: 12, fontWeight: 'bold', textAlign: 'left' },
    value: {
        color: 'white', fontSize: 18
    },
    bodyView: {
         justifyContent: 'space-between', 
         flexDirection: 'row', 
         marginTop: 20          
    },
    footerView: {
        padding: 10, 
        justifyContent: 'center', alignItems: 'center' , 
        width: width / 2, 
    },  
    button: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }

});