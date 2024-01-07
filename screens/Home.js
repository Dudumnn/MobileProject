import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Home = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not Yet Scanned')

    const askForCameraPermission = () => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == 'granted')
        })()
    }

    //For Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    //Scanning
    const handleBarcodeScanned = ({type, data}) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data)
    }

    //
    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text>Requesting Camera Permission</Text>
        </View>
        )
    }

    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text>No Access to Camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <View style={styles.barcodebox}>
                <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                style={{height: 550, width: 400}} />
                </View>
            </View>
            <Text style={styles.maintext} url={text} >
                {text}
            </Text>
            

            {scanned && 
                <View style={{justifyContent:'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: 'white' }}
                        title={'Scan Again?'} onPress={() => setScanned(false)}>
                        <Text style={[styles.textStyle, { color: '#f44' }]}>Scan Again?</Text>
                    </TouchableOpacity>
                    <Text>   </Text>
                    <TouchableOpacity
                        style={styles.button}
                        title={'Proceed'} onPress={() => navigation.navigate("Output", { key: text, open: true })}>
                        <Text style={styles.textStyle}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 10,
        borderWidth: 3,
        height: 320,
        width: 320,
        borderStyle: 'dashed',
        borderColor: '#276749',
    },
    barcodebox: {
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    maintext: {
        fontSize: 16,
        margin: 20,
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
});

export default Home;