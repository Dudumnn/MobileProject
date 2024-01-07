import React from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper;