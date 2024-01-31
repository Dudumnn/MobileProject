import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ActivityIndicator } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Colors } from "./../components/styles";
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

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, {setSubmitting, resetForm}) => {
        handleMessage(null);
        const apiUrl = 'https://www.cocosor.online/api/login';
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
                        initialValues={{username: '', password: ''}}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            if(values.username == '' || values.password == '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, {setSubmitting, resetForm});
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                            <MyTextInput 
                                label="Username"
                                icon="person"
                                placeholder="Username"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('username')}
                                onBlur = {handleBlur('username')}
                                value = {values.username}
                            />
                            <MyTextInput 
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * * * *"
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
                                    Sign In
                                </ButtonText>
                            </StyledButton>}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            )}

                            {/*<Line />
                            <SignupLink>
                                <SignupText>Don't have an account already? </SignupText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <LinkContent>Signup</LinkContent>
                                </TextLink>
                            </SignupLink>*/}
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
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
        </View>
    )
}

export default Login;