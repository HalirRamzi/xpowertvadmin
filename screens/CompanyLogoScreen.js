import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image,Button } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

export function CompanyLogoScreen() {
    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  
    const uploadImage = async (imageurl) => {
      let base_url = 'http://192.168.1.100/ServerUploadfile/index.php';
      let uploadData = new FormData();
      uploadData.append('submit', 'ok');
  
      const userId = await SecureStore.getItemAsync("userTb");
      const comId = await SecureStore.getItemAsync("comId");
   
      var imageNm = userId+"_"+comId+"_logo.png"
      uploadData.append('file', {type:"image/jpeg", uri: imageurl, name:imageNm})
  
      fetch(base_url,{
        method:'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body:uploadData
      }).then(res => res.text())
      .then(response => {
        console.log(response);
        console.log("done");
      })
      fetch('http://192.168.1.100:2100/SelectedDocument', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: {
                  imageNm: imageNm
                }
            })
  
            })
            .then(response => response.json())
            .then(serverResponse => console.warn(serverResponse))
            .catch((error) => console.warn(error))
    }
    return (
    <View style={styles.container}>
        <Text style={styles.companyLogoTextStyle}>Select your Company Logo</Text>
        <View style={styles.pickImageBtn}>
            <Button  title="Pick an image" onPress={pickImage}></Button>
        </View>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 40, }} />}
        <TouchableOpacity style={styles.nextButtonBackgroundView} onPress={()=>uploadImage(image)}>
            <Image style={styles.nextButton} source={require('../assets/arrowright.png')}/>
        </TouchableOpacity>
    </View>
      )
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nextButtonBackgroundView: {
        backgroundColor: 'yellow',
        borderRadius: 150,
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginTop: 100
    },
    nextButton: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginTop: 15
    },
    companyLogoTextStyle: {
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: '400',
        marginTop: 100,
    },
    viewAfterInnerViewStyle: {
        alignSelf: 'center',
        marginTop: 100,
    },
    pickImageBtn: {
        marginTop: 100,
        paddingVertical: 20,
        height: 50,
        alignSelf: 'center',
    },
});
//userTb_companyTb_imagetb.png/mp4
export default function RootFunction (){
    const navigation = useNavigation()
    return <CompanyLogoScreen navigation={navigation} /> 
}
