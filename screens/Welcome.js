import React, {useState} from 'react';
import { StyleSheet, View , Text, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';


const Welcome = () => {
    const [list, setList] = useState([]);
    const url = "http://127.0.0.1:8000/api/users";

    axios
        .get(url)
        .then((response) => {
            setList(response.user)
        })
        .catch(error => {
        console.log(JSON.stringify(error));
        })

    return (
        <SafeAreaView>
            <ScrollView>
                {list.map((item,id)=>{
                    return (
                        <View>
                            <Text>Parot</Text>
                            <ScrollView>
                                {list.map((item,id)=>{
                                    return (
                                        <View key={id}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
