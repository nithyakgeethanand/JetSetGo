import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { airports } from '../src/assets/airports';

const AirportListModal = ({ visible }) => {
    return (
        <View>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: "100%" }}>
                        <Text>Model</Text>
                    </View>
                </View>
            </Modal>
            {/* <Modal
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
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal> */}
        </View>
    )
}

export default AirportListModal