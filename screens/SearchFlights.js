import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../src/assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { airports } from '../src/assets/airports';

const SearchFlights = () => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [departDate, setDepartDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [passenger, setPassenger] = useState([
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },

    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [box1Items, setBox1Items] = useState(['DEL', 'Delhi']);
    const [box2Items, setBox2Items] = useState(['TRV', 'Trivandrum']);
    const [selectedAirport, setSelectedAirport] = useState(null);

    const FetchAPI = async () => {
        try {
            const response = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7");
            const json = await response.json();
            setData(json.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchAPI();
    }, []);

    const swapDestinations = () => {
        const temp = [...box1Items];
        setBox1Items([...box2Items]);
        setBox2Items([...temp]);
    }

    const handleFrom = () => {
        setModalVisible(true);
    }

    const handleTo = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleAirportSelection = (airport) => {
        setSelectedAirport(airport);
        setModalVisible(false); // Close the modal after selection
    };

    const searchHandle = () => {
        navigation.navigate("ListOfFlights", { data });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.bookFlightText}>Book a flight</Text>
            <View style={styles.fromToContainer}>

                <TouchableOpacity style={styles.box} onPress={handleFrom} >
                    <Text style={styles.fromCity}>From</Text>
                    {/* <Text style={{ fontWeight: "bold", fontSize: 30 }}>{box1Items[0]}</Text> */}
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>{selectedAirport ? selectedAirport.airportCode : 'Select Airport'}</Text>
                    <Text style={styles.fromCity}>{box1Items[1]}</Text>
                </TouchableOpacity>

                <View style={styles.circle}>
                    <TouchableOpacity onPress={swapDestinations}>
                        <MaterialCommunityIcons name="swap-horizontal" size={40} color={colors.gray} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.box} onPress={handleTo}>
                    <Text style={styles.fromCity}>To</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>{box2Items[0]}</Text>
                    <Text style={styles.fromCity}>{box2Items[1]}</Text>
                </TouchableOpacity>

            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                //style={{ marginVertical: "15%" }}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: "100%" }}>
                            <Text>modal</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={{ fontSize: 20 }}
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChangeText={(text) => setSearchQuery(text)}
                                />
                            </View>
                            {airports.map((item) => (
                                <TouchableOpacity key={item.id} 
                                onPress={() => handleAirportSelection(item)}
                                 style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 10,
                                    alignItems: "center"
                                    }}>
                                    <View>
                                        <Text>{item.city}</Text>
                                        <Text>{item.airportName}</Text>
                                    </View>
                                    <View>
                                        <Text>{item.airportCode}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.datePickerContainer}>
                <Feather name="calendar" size={26} color="gray" />
                <DateTimePicker
                    value={departDate}
                    onChange={(event, date) => setDepartDate(date || new Date())}
                    minimumDate={new Date()}
                />
                <Text style={{ fontSize: 20, color: 'gainsboro', marginLeft: 10 }}>
                    |
                </Text>
                <DateTimePicker
                    value={returnDate}
                    onChange={(event, date) => setReturnDate(date || new Date())}
                    minimumDate={departDate}
                />
            </View>

            <View style={styles.passengers}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={passenger}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setPassenger}
                    placeholder={'Select number of passengers'}
                />
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={searchHandle}>
                    <Text style={styles.buttonText}>Search Flights</Text>
                </TouchableOpacity>
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
        marginTop: 20
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.white,
        marginLeft: -20,
        marginRight: -20,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
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
        alignItems: "center",
        justifyContent: "center"
    },
    fromCity: {
        color: colors.gray, fontSize: 20
    },
    datePickerContainer: {
        borderWidth: 0,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 25,

    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        height: 50,
        backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20,
        color: colors.white,
    },
    passengers: {
        borderWidth: 0,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10,
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
})