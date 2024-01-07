import styled from "styled-components";
import { View, Text, Image, TextInput, Touchable } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#276749",
    green: "#10B981",
    red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
    height: 150vh;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding-top: 50px;
`;


export const PageLogo = styled.Image`
    width: 250px;
    height: 150px;
    resize-mode: contain;
`;

export const PageLogoo = styled.Image`
    width: 100px;
    height: 50px;
    resize-mode: contain;
`;

export const PageTitle = styled.Text`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    font-weight: bold;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 32px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 32px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`;
export const StyledButtonn = styled.TouchableOpacity`
    padding: 15px;
    width: 50px;
    background-color: 'tomato';
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`;
export const StyledButtonnn = styled.TouchableOpacity`
    padding: 15px;
    width: 50px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const SignupLink = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const SignupText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const LinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;
//Table
export const TableContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Table = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const TableCell = styled.View`
  flex: 1;
  padding: 8px;
`;

export const TableCellHeader = styled(TableCell)`
  font-weight: bold;
`;

export const TableRow = styled.View`
  flex-direction: row;
`;

export const TableCellData = styled(TableCell)`
  background-color: #f9f9f9;
`;