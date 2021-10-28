import React from "react";
import { StyleSheet, View, Button, SafeAreaView, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: ``,
        androidClientId: `765092923029-legddgail8fbutn48eo8lu83ok9d6469.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // navigation.navigate("CompanyName", { user });
       
        var profileimage = user.photoUrl;
          fetch('http://192.168.1.100:2100/userdetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                  email: user.email,
                  name : user.name,
                  profileimage : profileimage,
              }
          })

          })
          .then((response) => response.json())
          .then((json) => {
            SecureStore.setItemAsync("userTb", ""+json.userId);
            SecureStore.setItemAsync("comId", ""+json.comId);
            
            if(json.comName != ''){
              navigation.navigate('Home');
            }else{
              navigation.navigate('CompanyName');
            }
            
          })
          .catch((error) => console.error(error))
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style = {styles.container }>
        <SafeAreaView>
          <Text style={styles.appNameView}>XPowerTvAdmin</Text>
         <View style={styles.googleLoginBtnView}>
          <Button title="Login with Google" onPress={signInWithGoogle} />
         </View>
        </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    appNameView: {
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 250,
    },
    googleLoginBtnView: {
        marginTop: 20,
        width: 200,
        height: 100,
        alignSelf: 'center',
    }
});