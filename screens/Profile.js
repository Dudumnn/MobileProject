import React, {useState} from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "./../components/styles";
const {primary, brand, darkLight} = Colors;
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({navigation}) => {
    const url = 'https://www.cocosor.online/api';
    const [userID, setUser] = useState('');
    AsyncStorage.getItem("user")
    .then(savedID => {
        setUser(JSON.parse(savedID));
    })
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);

    const editProfile = (id, name, username, password) => {
        fetch(url + `/editProfile/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "username": username,
                "password": password,
            })
        })
        .then((res) => res.json())
        .then(resJson => {
            console.log('data', resJson.user)
            AsyncStorage.setItem("user", JSON.stringify(resJson.user));
            AsyncStorage.getItem("user")
            .then(savedID => {
                setUser(JSON.parse(savedID));
            })
            setData(resJson.user);
            setName(resJson.user.name);
            setUsername(resJson.user.username);
        }).catch(e => {console.log(e)})
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}
        >
            <View
                style={{
                    marginHorizontal: 12,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                }}
            >
                <Text style={styles.font}>Account</Text>
            </View>
            <View 
                style={{marginBottom: 12}}
                onSubmit={() => {
                    if (!name || !username || !password) {
                        alert('Please fill in all fields');
                        return;
                    }
                    editProfile(id, name, username, password);
                }}
            >
                <Text style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    fontSize: 30,
                    fontWeight: "light",
                    }}>Profile Settings</Text>
                <View style={{
                    borderRadius: 12,

                }}>
                    <View style={{
                        flexDirection: "column",
                        marginBottom: 6,
                        marginHorizontal: 12,
                    }}>
                        <Text>Name</Text>
                        <View style={{
                            height: 44,
                            width: "100%",
                            borderColor: darkLight,
                            borderWidth: 1,
                            borderRadius: 4,
                            marginVertical: 6,
                            justifyContent: "center",
                            paddingLeft: 8,
                        }}>
                            <TextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholder={userID.name}
                                color={'gray'}
                            >
                                
                            </TextInput>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: "column",
                        marginBottom: 6,
                        marginHorizontal: 12,
                    }}>
                        <Text>Username</Text>
                        <View style={{
                            height: 44,
                            width: "100%",
                            borderColor: darkLight,
                            borderWidth: 1,
                            borderRadius: 4,
                            marginVertical: 6,
                            justifyContent: "center",
                            paddingLeft: 8,
                        }}>
                            <TextInput
                                label="Username"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                placeholder={userID.username}
                                color={'gray'}
                            >
                                
                            </TextInput>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "column",
                        marginBottom: 6,
                        marginHorizontal: 12,
                    }}>
                        <Text>Password</Text>
                        <View style={{
                            height: 44,
                            width: "100%",
                            borderColor: darkLight,
                            borderWidth: 1,
                            borderRadius: 4,
                            marginVertical: 6,
                            justifyContent: "center",
                            paddingLeft: 8,
                        }}>
                            <TextInput
                                value={password}
                                onChangeText={(text) => (setPassword(text), setID(userID.id))}
                                secureTextEntry = {true}
                                placeholder="*******"
                                color={'gray'}
                            >
                                
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        title={'Proceed'} 
                        onPress={() => {
                            if (!name || !username || !password) {
                                alert('Please fill in all fields');
                                return;
                            }
                            editProfile(id, name, username, password);
                        }}>
                        <Text style={styles.textStyle}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom: 12}}>
                <Text style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    fontSize: 30,
                    fontWeight: "light",
                    }}>Logout Account</Text>
                <View style={{
                    borderRadius: 12,

                }}>
                    <TouchableOpacity
                        style={styles.buttonn}
                        title={'Proceed'} 
                        onPress={() => {navigation.navigate("Login"), alert('User Logout Successfully'), AsyncStorage.setItem("user", "");}}>
                        <Text style={styles.textStyle}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    font:{
        fontSize: 20,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 1,
        marginTop: 10,
        backgroundColor: '#276749',
        marginHorizontal: 12,
    },
    buttonn: {
        borderRadius: 10,
        padding: 12,
        elevation: 1,
        marginTop: 10,
        backgroundColor: 'tomato',
        marginHorizontal: 12,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});


export default Profile;