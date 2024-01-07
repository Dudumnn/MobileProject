//LOGIN CODE
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

import { user_login } from "../api/user_api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {primary, brand, darkLight} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {

        /**user_login({
            username:credentials.username,
            password:credentials.password,
        }).then((result) => {
            if(result.status == "SUCCESS") {
                AsyncStorage.setItem("token", result.data.token);
                navigation.navigate('Home', {...user[0]});
            }
        }).catch(err => {
            console.error(err);
            setSubmitting(false);
            handleMessage("An error occured. Check your network and try again");
        });
        */

        handleMessage(null);
        const url = 'https://cocosor-online.preview-domain.com/api/login';

        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.user;
                const {message, status, user, token} = result;

                if(status != 'SUCCESS'){
                    handleMessage(message, status);
                } else {
                    navigation.navigate('Home', {...user[0]});
                }
                setSubmitting(false);
            })
            .catch(error => {
            console.log(JSON.stringify(error));
            setSubmitting(false);
            handleMessage("An error occured. Check your network and try again");
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
                    <PageTitle>Cocosor Inc.</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik 
                        initialValues={{username: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if(values.username == '' || values.password == '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                            <MyTextInput 
                                label="Username"
                                icon="person"
                                placeholder="john"
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
                                    Login
                                </ButtonText>
                            </StyledButton>}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            )}

                            <Line />
                            <SignupLink>
                                <SignupText>Don't have an account already? </SignupText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <LinkContent>Signup</LinkContent>
                                </TextLink>
                            </SignupLink>
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


<TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                    <Text style={styles.buttonText}>Add Post</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonn}
                onPress={() => {navigation.navigate("Login"), alert('User Logout Successfully')}}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>