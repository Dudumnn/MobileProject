import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Header = (props) => {

    return (
        <View style={styles.header}>
            <View style={styles.itemsLeft}>
                <Text style={styles.title}>My Notes</Text>
                <TouchableOpacity style={styles.circular}>
                    <Entypo style={styles.icon} name="dots-three-vertical" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 25,
    },
    itemsLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 25,
    }
});

export default Header;