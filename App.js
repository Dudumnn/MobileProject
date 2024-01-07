import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View , Text, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Welcome from './screens/Welcome';

import Controller from './navigators/Controller';

export default function App() {
  return (
    <Controller />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
