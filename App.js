import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CompanyNameScreen from "./screens/CompanyNameScreen";
import AddressInputScreen from "./screens/AddressInputScreen";
import SelectDocumentsScreen from "./screens/SelectDocumentsScreen";
import ActiveDeviceMonitors from "./screens/ActiveDeviceMonitors";
import Hometest from './screens/Hometest';
import MobileNumberInputScreen from "./screens/MobileNumberInputScreen";
import EmailAddressInputScreen from "./screens/EmailAddressInputScreen";
import CompanyWebsteInputScreen from "./screens/CompanyWebsteInputScreen";
import SpecialNoteInputScreen from "./screens/SpecialNoteInputScreen";
import ProfileScreen from "./screens/ProfileScreen ";
import testfile from "./screens/testfile";
import CompanyLogoScreen from "./screens/CompanyLogoScreen";
import datetimetestfile from "./screens/datetimetextfile";

//React Navigation Setup
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="CompanyName" component={CompanyNameScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddressInput" component={AddressInputScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Select Documents" component={SelectDocumentsScreen}/>
        <Stack.Screen name="Active Device Monitors" component={ActiveDeviceMonitors}/>
        <Stack.Screen name="Hometest" component={Hometest}/>
        <Stack.Screen name="MobileNumberInputScreen" component={MobileNumberInputScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EmailAddressInputScreen" component={EmailAddressInputScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CompanyWebsteInputScreen" component={CompanyWebsteInputScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SpecialNoteInputScreen" component={SpecialNoteInputScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="testfile" component={testfile}/>
        <Stack.Screen name="datetimetestfile" component={datetimetestfile}/>
        <Stack.Screen name="CompanyLogoScreen" component={CompanyLogoScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;