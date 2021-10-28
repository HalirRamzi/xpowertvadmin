import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { TextInput  } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import * as SecureStore from 'expo-secure-store';



export class CompanyNameScreen extends Component {
    
    constructor(props)
    {
        super(props);
        this.inputRefs = {firstTextInput: null,};
        this.state={CompanyName: '',};
    }
    state = {  
        choosenIndex: 0,
        data:[],
    };

    InsertRecord = async () => {
            const userId = await SecureStore.getItemAsync("userTb");
            if (userId) {
          var CompanyName = this.state.CompanyName;
          
          
          if (!CompanyName.trim()){
            alert("fileds empty");
            return;
          } else {
            fetch('http://192.168.1.100:2100/CompanyName', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: {
                    CompanyName:CompanyName, 
                    userId:userId
                  }
              })
    
              })
                .then(response => response.json())
                .then(serverResponse => console.warn(serverResponse))
                .catch((error) => console.warn(error)),
                this.props.navigation.navigate('AddressInput')   
          }
        }
       
      }

    render() {
        return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <SafeAreaView style={styles.SafeAreaView}>
                 <View style={styles.companyMainDesignView}>
                  <Text style={styles.whatsCompanynameText}> What's your Company Name? </Text>
                  <TextInput style={styles.CompanyNameInput} label='' mode='outlined' onChangeText = {CompanyName => 
                  this.setState({
                    CompanyName
                  })}/>
                  <Text style={styles.agreementAndConditionsText}>By inserting company name and clicking next you agree to our terms and conditions offered by PowerSoft</Text>
                  <TouchableOpacity style={styles.nextButtonBackgroundView} onPress={(CompanyName) => {
                      this.InsertRecord(CompanyName)}}>
                  <Image style={styles.nextButton} source={require('../assets/arrowright.png')}/>
                  </TouchableOpacity>
                 </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: 'white',
    },
    SafeAreaView: {
        marginTop: 30
    },
    companyMainDesignView: {
        alignSelf: 'center',
        marginTop: 50,
    },
    whatsCompanynameText: {
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: '400',
    },
    CompanyNameInput: {
        backgroundColor: 'white',
        width: 370,
        marginTop: 15,
        alignSelf: 'center',
    },
    agreementAndConditionsText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        padding: 10,
        color : 'gray',
    },
    nextButtonBackgroundView: {
        backgroundColor: 'yellow',
        borderRadius: 150,
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginTop: 80
    },
    nextButton: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginTop: 15
    },
});

export default function RootFunction (){
    const navigation = useNavigation()
    return <CompanyNameScreen navigation={navigation} /> 
}