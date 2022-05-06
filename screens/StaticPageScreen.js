import React, { useState, useLayoutEffect, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, ScrollView, useWindowDimensions, Dimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { height, normalizeFont, width } from '../constants/Helper';
import images from '../constants/Images';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPage } from '../store/actions/page';
import { connect } from 'react-redux';
import decode from 'html-entities-decoder'
import ArrowBack from '../components/ArrowBack'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function StaticPageScreen({ navigation, route, static_page, dispatch }) {
    const { width } = useWindowDimensions();
    const [page, setPage] = useState('');
    const [pageContent, setPageContent] = useState('');
    const { pageNAme, content } = route.params;
    let pageContentData = content[0]?.html;

    const source = {
        html: decode(pageContentData)
    };

    const tagsStyles = {
        body: {
            whiteSpace: 'normal',
            color: 'white',
            width: '90%',
            left: '5%'
        },
        a: {
            color: 'green'
        }
    };


    useLayoutEffect(() => {
        dispatch(getPage(pageNAme))

        if (pageNAme === "about_us") {
            setPage("About Us")

        } else if (pageNAme === "privacy_policy") {
            setPage("Privacy Policy")

        } else if (pageNAme === "term_condtions") {
            setPage("Terms & Conditions")

        }
    }, [pageNAme,])

    return (


        <View style={styles.wrapper1}>
            <View style={styles.wrapper2}>
                <Image style={{ marginTop: -windowHeight / 55.15 }} source={require('../assets/images/f1.png')} />
            </View>
            <View style={{ zIndex: 1, position: 'absolute', top: windowHeight / 17 }} >
                <ArrowBack />
            </View>
            <View>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: normalizeFont(22), fontWeight: '700' }}>Terms And Conditions</Text>
            </View>
            <ScrollView style={{ padding: 13, }}>
                <RenderHtml
                    contentWidth={width / 1.2}
                    source={source}
                    tagsStyles={tagsStyles}
                />


            </ScrollView>

        </View>



        // <View style={styles.container}>
        //     <View style={styles.container_header}>
        //         <Text style={styles.title}>{page}</Text>
        //         <Image source={require('../assets/logo.png')} style={styles.imageLogoSize} />

        //     </View>
        //     <View style={styles.centeredView}>
        //         <ScrollView>
        // <RenderHtml
        //     contentWidth={width / 1.2}
        //     source={source}
        //     tagsStyles={tagsStyles}
        // />
        //             <Text style={styles.content}>

        //             </Text>
        //         </ScrollView>
        //     </View>
        // </View>
    )
}


const mapStateToProps = (state, ownProps) => {
    return ({
        static_page: state?.pages?.page
    })
}

export default connect(mapStateToProps)(StaticPageScreen)

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#040404',
    // },
    // container_header: {
    //     flex: 1,
    //     alignItems: 'center'
    // },
    // centeredView: {
    //     flex: 3,
    //     justifyContent: 'center',

    // },

    // title: {
    //     color: 'white',
    //     fontWeight: "900",
    //     fontSize: 19,
    //     marginVertical: 20
    // },
    // imageLogoSize: { borderRadius: 10, marginTop: -20, height: height / 6.5, width: height / 6.5 },
    // content: { paddingHorizontal: 25, color: 'white', fontWeight: '700', fontSize: 15 }
    wrapper1: {
        flex: 1,
        backgroundColor: '#121515'
    },
    wrapper2: {
        //  backgroundColor:"#5b0b0b",
        // flex:1,
        alignItems: 'center',
        borderBottom: 2,
        borderColor: 'white',
        // borderBottomLeftRadius: width/2,
        // borderBottomRightRadius: width/2,

    },



});

