import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Platform , Button, Modal, FlatList, StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid } from "react-native";
import { Surface, Title, TextInput } from 'react-native-paper';
import ModalView from "../components/ModalView";
import { AntDesign, FontAwesome, SimpleLineIcons, Fontisto, MaterialIcons  } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageLogoo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    SignupLink,
    SignupText,
    TextLink,
    LinkContent
} from './../components/styles';

const Output = ({navigation, route}) => {
    const url = 'https://www.cocosor.online/api'
    const hey = route.params && route.params.key ? route.params.key : '';

    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [output, setOutput] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const { open } = route.params || {};
        if (open) {
          setVisible(true);
          setName(hey);
        }
    }, [route.params]);

    const handleNumberChange = (text) => {
        // Allow only numeric characters
        const numericValue = text.replace(/[^0-9]/g, '');
        setOutput(numericValue);
    };

    useEffect(() => {
        const getCurrentDate = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        setDate(getCurrentDate());
    }, []);

    /* const formatDate = (inputDate) => {
        const sanitizedInput = inputDate.replace(/[^0-9]/g, '');
    
        if (sanitizedInput.length >= 5) {
            return `${sanitizedInput.slice(0, 4)}-${sanitizedInput.slice(4, 6)}-${sanitizedInput.slice(6, 8)}`;
        }
    
        return sanitizedInput;
    };

    const handleChange = (input) => {
        setDate(formatDate(input));
    }; */

    const getOutput = () => {
        fetch("https://www.cocosor.online/api/output")
        .then((res) => res.json())
        .then(resJson => {
            //console.log('data', resJson.output)
            setData(resJson.output);
        }).catch(e => {console.log(e)})
    }

    const addOutput = (name, date, output) => {
        fetch("https://www.cocosor.online/api/addoutput", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "date": date,
                "output": output,
            })
        })
        .then((res) => res.json())
        .then(resJson => {
            //console.log('data', resJson.output)
            setData(resJson.output);
            setName("");
            //setDate("");
            setOutput("");

        }).catch(e => {console.log(e)})
    }
    const editOutput = (id, name, date, output) => {
        fetch(url + `/editOutput/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "date": date,
                "output": output,
            })
        })
        .then((res) => res.json())
        .then(resJson => {
            //console.log('data', resJson.output)
            setData(resJson.output);
            updatePost()

        }).catch(e => {console.log(e)})
    }

    const updatePost = () => {
        getOutput()
        setVisible(false);
        setName('')
        //setDate('')
        setOutput('')
        setId(0)
    }
    

    const edit = (id, name, date, output) => {
        setId(id)
        setVisible(true)
        setName(name)
        setDate(date)
        setOutput(output)
    }

    useEffect(() => {
        getOutput();
    }, [])

    AsyncStorage.getItem("user")
    .then(savedID => {
        const parsedUserId = JSON.parse(savedID);
        console.log(parsedUserId.name);
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <PageLogoo source={require('../assets/logo.png')}></PageLogoo>
                <TouchableOpacity 
                    style={styles.user}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <FontAwesome 
                        name="user-circle-o"
                        size={28}
                        color="#276749"
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.list}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const dateObject = new Date(item.date);

                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = dateObject.toLocaleDateString('en-US', options);
                    return (
                        <View style={styles.cardContainer}>
                            <View style={styles.flexContainer}>
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.output}>{formattedDate}</Text>
                                </View>
                                <View style={{flexDirection: "row", gap: 15}}>
                                    <Text style={styles.name}>Output: {item.output}</Text>
                                    <TouchableOpacity style={{alignItems: "center"}} onPress={() => edit(item.id, item.name, item.date, item.output)}>
                                        <AntDesign name="edit" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
            <ModalView
                visible={visible}
                title="Add Output"
                onDismiss={() => {
                    setVisible(false);
                    setName('');
                    //setDate('');
                    setOutput('');
                }}
                onSubmit={() => {
                    if (!name || !date || !output) {
                        alert('Please fill in all fields');
                        return;
                    }
                    if (id && name && date && output) {
                        editOutput(id, name, date, output)
                    } else {
                        addOutput(name, date, output)
                    }
                    setVisible(false);
                }}
                cancelable
            >
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    mode="outlined"
                    style={{ display: 'none' }}
                    />
                <TextInput
                    label="Date"
                    keyboardType="numeric"
                    maxLength={10}
                    value={date}
                    style={{ display: 'none' }}
                    //onChangeText={(text) => handleChange(text)}
                    mode="outlined"
                    />
                <TextInput
                    label="Output"
                    keyboardType="numeric"
                    value={output}
                    onChangeText={handleNumberChange}
                    mode="outlined"
                    />
            </ModalView>
            <View style={styles.bottom}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Home")}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#276749",
                        height: 80,
                        width: 80,
                        top: -20,
                        borderRadius: 50,
                        borderWidth: 6,
                        borderColor: "#f0fff4",
                    }}
                >
                    <Fontisto 
                        name="plus-a"
                        size={24}
                        color={
                            "#ffffff"
                        }
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Output;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        padding: 16,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ffffff',
        paddingTop: 45,
    },
    bottom: {
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f0fff4',
        bottom: 0,
        right: 0,
        left: 0,
    },
    user: {
        paddingRight: 5,
        paddingTop: 15,
    },
    button: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#276749',
    },
    buttonn: {
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#276749',
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#f7fafc',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    list: {
        width: '100%',
    },
    flexContainer: {
        flexDirection: 'row',  // Arrange children in a row
        justifyContent: 'space-between',  // Space between children
    },
    cardContainer: {
        padding: 16,
        margin: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '94%',
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      dateOutput: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
      },
      output: {
        fontSize: 16,
        color: '#333',
      },
      addButton: {
        margin: 16,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 8,
    },
  });