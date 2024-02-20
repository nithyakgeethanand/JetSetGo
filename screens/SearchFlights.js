import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../src/assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SearchFlights = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bookFlightText}>Book a flight</Text>
            <View style={styles.fromToContainer}>
                <View style={styles.box}>
                    <Text>from</Text>
                    <Text>DEL</Text>
                    <Text>Delhi</Text>
                </View>

                <View style={styles.circle}>
                    <MaterialCommunityIcons name="swap-horizontal" size={40} color={colors.gray} />
                </View>

                <View style={styles.box}>
                    <Text>from</Text>
                    <Text>DEL</Text>
                    <Text>Delhi</Text>
                </View>

            </View>
        </View>
    )
}

export default SearchFlights

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    bookFlightText: {
        fontWeight: "bold",
        fontSize: 35,
        marginTop: 40,
    },
    fromToContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:20
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.white,
        marginLeft: -20,
        marginRight: -20,
        zIndex: 1,
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    box: {
        flex: 0.49,
        height: 150,
        backgroundColor: colors.white,
    }
})