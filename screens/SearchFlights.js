import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../src/assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

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
    const [box1Items, setBox1Items] = useState(['DEL']);
    const [box2Items, setBox2Items] = useState(['TRV']);

    const FetchAPI = async () => {
        try {
            const response = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7");
            const json = await response.json();
            // const airportCode = json?.data?.result[0]?.displayData?.source?.airport;
            // setData(airportCode);
            setData(json.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchAPI();
    }, []);

    //console.log(data);
    //console.log("airlinesssss",data.fare);

    const swapDestinations = () => {
        const temp = [...box1Items];
        setBox1Items([...box2Items]);
        setBox2Items([...temp]);
    }

    const renderItem = ({ data }) => {
        //console.log("hellooooooo",data.airportCode);
        return <View>
            {/* {data.filter((item) => <Text>{item.airportCode}</Text>)}  */}
        </View>
    }

    const searchHandle = () => {
        navigation.navigate("ListOfFlights", { data });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.bookFlightText}>Book a flight</Text>
            <View style={styles.fromToContainer}>

                <TouchableOpacity style={styles.box} onPress={null} >
                    <View>
                        <Text style={styles.fromCity}>From</Text>
                        {box1Items.map((item, index) => (<Text style={{ fontWeight: "bold", fontSize: 30 }}>{item}</Text>))}
                        <Text style={styles.fromCity}>Delhi</Text>
                    </View>
                </TouchableOpacity>



                <View style={styles.circle}>
                    <TouchableOpacity onPress={swapDestinations}>
                        <MaterialCommunityIcons name="swap-horizontal" size={40} color={colors.gray} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.fromCity}>To</Text>
                    {box2Items.map((item, index) => (<Text style={{ fontWeight: "bold", fontSize: 30 }}>{item}</Text>))}
                    <Text style={styles.fromCity}>Trivandrum</Text>
                </TouchableOpacity>

            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                style={{ maxHeight: "55%", marginVertical: "15%" }}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text>modal</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                        {console.log(data)}
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            //keyExtractor={(item) => item.id}
                            style={{ maxHeight: 300 }}
                        />
                    </View>
                </View>
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

            <View>
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
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        padding: 5,
        borderRadius: 8,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 25,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,

    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
})