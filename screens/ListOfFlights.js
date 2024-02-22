import { View, Text, StyleSheet, FlatList, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../src/assets/colors';
import { FontAwesome } from '@expo/vector-icons';
import { setDate } from 'date-fns';

const ListOfFlights = ({ route }) => {
    const { data } = route.params;
    const [searchText, setSearchText] = useState('');
    // const [sortByPrice, setSortByPrice] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');

    const arraysFromJson = data.map(obj => ({
        id: obj.id,
        fare: obj.fare,
        sourceCityName: obj.displayData.source.airport.cityName,
        desinationCityName: obj.displayData.destination.airport.cityName,
        totalDuration: obj.displayData.totalDuration,
        stopInfo: obj.displayData.stopInfo,
        airlineCode: obj.displayData.airlines.map(item => item.airlineCode)[0],
        airlineName: obj.displayData.airlines.map(item => item.airlineName)[0],
        departureTime: obj.displayData.source.depTime.substring(11, 16),
        arrivalTime: obj.displayData.destination.arrTime.substring(11, 16),
    }));


    const handleSortByPrice = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        // setSortByPrice((prevSortByPrice) => !prevSortByPrice);
    };

     // Sorting function to sort data by price
    const sortByPrice = (a, b) => a.fare - b.fare;


  // Function to sort data based on the current sort criteria and order
  const sortData = () => {
    let sortedData = [...arraysFromJson];
    sortedData = sortedData.sort(sortByPrice);

    if (sortOrder === 'desc') {
      sortedData.reverse();
    }
    return sortedData;
  };

    // const sortedFlights = sortByPrice
    //     ? [...arraysFromJson].sort((a, b) => a.fare - b.fare)
    //     : arraysFromJson;

    // if (sortOrder === 'desc') {
    //     sortedFlights.reverse();
    // }

    console.log(data);
    const filteredFlights = sortData().filter(
        (flight) =>
            flight.airlineName.toLowerCase().includes(searchText.toLowerCase())
    );


    const renderItem = ({ item }) => {
        return (
            <View style={styles.boxContainer}>
                <View style={{
                    paddingBottom: 10
                }}>
                    <Text>{item.airlineName}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <View>
                        <Text style={styles.timeandfare}>{item.departureTime}</Text>
                        <Text>{item.sourceCityName}</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text>{item.totalDuration}</Text>
                        <View style={styles.line}></View>
                        <Text style={{ color: colors.gray }}>{item.stopInfo}</Text>
                    </View>
                    <View>
                        <Text style={styles.timeandfare}>{item.arrivalTime}</Text>
                        <Text>{item.desinationCityName}</Text>
                    </View>
                    <View>
                        <Text style={styles.timeandfare}>₹ {item.fare}</Text>
                        <Text style={{ color: colors.gray }}>per adult</Text>
                    </View>
                </View>

            </View>
        )
    }

    //console.log(airlines[0].airlineCode);
    return (
        <View style={styles.container}>
            {/* <Text>ListOfFlights</Text> */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search by airline"
                    onChangeText={setSearchText}
                    value={searchText}
                />
            </View>
            <TouchableOpacity style={styles.sortingContainer}
                onPress={handleSortByPrice}>
                <Text>Sort by price</Text>
                <FontAwesome name="sort" size={18} color={colors.gray} style={{paddingLeft: 5}} />
            </TouchableOpacity>
            <FlatList
                data={filteredFlights}
                keyExtractor={(item) => item.id}
                renderItem={renderItem} />

        </View>
    )
}

export default ListOfFlights

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    boxContainer: {
        backgroundColor: colors.white,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,

    },
    timeandfare: {
        fontWeight: "bold",
        fontSize: 20
    },
    line: {
        width: '100%',
        height: 3,
        backgroundColor: "#69E1DD", // You can change the color as needed
        borderRadius: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        height: 50,
    },
    sortingContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingBottom: 10,
    }
})