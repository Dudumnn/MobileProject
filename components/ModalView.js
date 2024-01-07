import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import { Title } from "react-native-paper";

const ModalView = ({ children, title, onSubmit, cancelable, visible = false, onDismiss, submitText = "Ok" }) => {
    const handleOkPress = () => {
        if (onSubmit) {
            onSubmit();
        }
        onDismiss();
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onDismiss={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Title style={styles.modalText}>{title}</Title>
                    <View>
                        {children}
                    </View>
                    <View style={{ alignSelf: 'flex-end', alignItems: 'center',flexDirection: 'row', }}>
                        {cancelable && (<TouchableOpacity
                            style={{ ...styles.button, backgroundColor: 'white' }}
                            onPress={onDismiss}>
                            <Text style={[styles.textStyle, { color: '#f44' }]}>Cancel</Text>
                        </TouchableOpacity>)}
                        {onSubmit && cancelable && (<TouchableOpacity
                            style={styles.button}
                            onPress={handleOkPress}>
                            <Text style={styles.textStyle}>{submitText}</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        height: 320,
        width: 320,
        gap: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        paddingHorizontal: 30,
        marginTop: 20,
        backgroundColor: '#f44',
        marginLeft: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 8,
    }
});

export default ModalView