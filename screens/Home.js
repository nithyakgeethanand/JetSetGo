import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import home_bg from "../images/home_bg.jpg"
import { colors } from '../src/assets/colors'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const bookAFlightHandle = () => {
        navigation.navigate("SearchFlights");
    }

    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <ImageBackground source={home_bg} resizeMode="cover" style={styles.image}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.welcomeBanner}>Welcome to JetSetGo</Text>
                        <Text style={styles.tagLine}>Let's elevate travel together!</Text>
                    </View>
                    <TouchableOpacity onPress={bookAFlightHandle}>
                        <View style={styles.bookAFlightButton}>
                            <Text style={{ fontSize: 20, color: colors.gray }}> Book a flight</Text>
                            <MaterialIcons name="flight" size={24} color={colors.gray} />
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.contentContainer}>
                {/* Content with white background */}
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginLeft: 20,
        // padding: 10,
        // marginTop: 100,
        // backgroundColor: "red"
    },
    backgroundContainer: {
        flex: 0.6,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 0.4,
        backgroundColor: colors.white,
    },
    headerContainer: {
        marginLeft: 15,
        padding: 5,
    },
    welcomeBanner: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.white,
    },
    tagLine: {
        fontSize: 25,
        color: colors.white,
        marginTop: 5
    },
    bookAFlightButton: {
        marginTop: 30,
        flexDirection: 'row',
        padding: 10,
        height: 60,
        justifyContent: 'space-between',
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: colors.white,
        marginLeft: 15,
        marginRight: 15,
    },
})