import React from 'react'
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function AggrementModal({ visible, closeModal }) {
    return (

        <Modal animationType="fade" transparent={true} visible={visible} >
            <TouchableOpacity onPress={() => closeModal()} style={styles.modal}>


                <View style={styles.container}>

                    <Image source={require('../assets/logo.png')} height={100} width={100} style={{ borderRadius: 50, marginTop: -40 }} />

                    <View style={styles.header}>
                        <Text style={styles.heading}> Pick N' Drop </Text>
                        <Text style={styles.subheading}> Companion Aggrement </Text>
                    </View>

                    <View style={styles.body}>
                        <Text style={styles.paragraph}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to rallytraxnstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </View>



                    <View style={styles.footer} >
                        <TouchableOpacity style={styles.loginButton} onPress={() => { alert('dfg') }}>
                            <Text style={[styles.buttonText, { color: "white" }]}> I AGREE </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </TouchableOpacity>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: '#383a40', borderRadius: 10, marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
    footer: { paddingHorizontal: 60, marginTop: 30, paddingVertical: 20 }
});