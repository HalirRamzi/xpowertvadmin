import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { TextInput  } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";

export class CompanyWebsteInputScreen extends Component {
    constructor(props)
    {
        super(props);
        this.inputRefs = {firstTextInput: null,};
        this.state={companywebsite: '',};
    }
    state = {  
        choosenIndex: 0,
        data:[],
    };

    InsertRecord = () => {
        this.setState({ ActivityIndicator_Loading : true }, () =>{
          var companywebsite = this.state.companywebsite;
    
          if (!companywebsite.trim()){
            alert("fileds empty");
            return;
          } else {
            fetch('http://192.168.1.100:2100/companywebsite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                companywebsite:companywebsite,
              }
          })

          })
            .then(response => response.json())
            .then(serverResponse => console.warn(serverResponse))
            .catch((error) => console.warn(error))
            this.props.navigation.navigate('CompanyLogoScreen')
          }
        });
      }
    render() {
        return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <SafeAreaView style={styles.SafeAreaView}>
                <View style={styles.companyMainDesignView}>
                <Text style={styles.whatsCompanynameText}> What's the Company Website? </Text>
                <TextInput style={styles.CompanyNameInput} maxLength={14} label='' mode='outlined' onChangeText = {companywebsite => 
                this.setState({
                    companywebsite
                })}/>
                <Text style={styles.hintText}>Ex : example@gmail.com</Text>
                <TouchableOpacity style={styles.nextButtonBackgroundView} onPress={(UserAddress) => {
                    this.InsertRecord(UserAddress)}}>
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
    hintText: {
        color: 'gray',
        marginTop: 5,
        margin: 20,
        fontSize: 14,
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
    return <CompanyWebsteInputScreen navigation={navigation} /> 
}