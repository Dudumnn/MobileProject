import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Home from './../screens/Home';
import Output from '../screens/Output';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const Controller = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor:'transparent',
                        height: 0,
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Output" component={Output} />
                <Stack.Screen options={{ headerShown: true, headerTintColor: 'black' }} name="Profile" component={Profile} />
                <Stack.Screen options={{ headerShown: true, headerTintColor: tertiary }} name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Controller;