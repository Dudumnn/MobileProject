import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ActivityIndicator } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Colors } from "./../components/styles"
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import axios from 'axios';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const {primary, brand, darkLight} = Colors;

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, {setSubmitting, resetForm}) => {
        handleMessage(null);
        const apiUrl = 'https://cocosor-online.preview-domain.com/api/signup';
        axios
            .post(apiUrl, credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if(response.status == 200) {
                    AsyncStorage.setItem("user", JSON.stringify(response.data.user));
                    AsyncStorage.getItem("user")
                    .then(savedID => {
                        const parsedUserId = JSON.parse(savedID);
                    })
                    resetForm(); 
                    navigation.navigate('Output');
                    alert('User Login Successfully');
                }
            })
            .catch(error => {
            console.error(error);
            setSubmitting(false);
            handleMessage("Wrong username or password, try again");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageLogo source={require('../assets/logo.png')}></PageLogo>
                    <Formik 
                        initialValues={{name: '', username: '', password: ''}}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            if(values.name == '' || values.username == '' || values.password == '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, {setSubmitting, resetForm});
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                            <MyTextInput 
                                label="Name"
                                icon="person-fill"
                                placeholder="Enter your name"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('name')}
                                onBlur = {handleBlur('name')}
                                value = {values.name}
                            />
                            <MyTextInput 
                                label="Username"
                                icon="person"
                                placeholder="Enter your username"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('username')}
                                onBlur = {handleBlur('username')}
                                value = {values.username}
                            />
                            <MyTextInput 
                                label="Create Password"
                                icon="lock"
                                placeholder="* * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('password')}
                                onBlur = {handleBlur('password')}
                                value = {values.password}
                                secureTextEntry = {hidePassword}
                                isPassword = {true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Sign Up
                                </ButtonText>
                            </StyledButton>}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            )}
                            <Line />
                            <SignupLink>
                                <SignupText>Already have an account? </SignupText>
                                <TextLink onPress={() => navigation.navigate("Login")}>
                                    <LinkContent>Login Here</LinkContent>
                                </TextLink>
                            </SignupLink>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isPassword2, hideConfirmPassword, setHideCofirmPassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30 } color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
            {isPassword2 && (
                <RightIcon onPress={() => setHideCofirmPassword(!hideConfirmPassword)}>
                    <Ionicons name={hideConfirmPassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;