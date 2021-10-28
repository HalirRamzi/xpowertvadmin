import React, { useState, useEffect } from 'react';
import { Button, View, Platform, StyleSheet, Text, TouchableOpacity, ScrollView,Image, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Tooltip } from 'react-native-elements';

export function SelectDocumentsScreen() {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fDate, setfDate] = useState();
  const [tDate, settDate] = useState();
  const [fTime, setfTime] = useState();
  const [tTime, setttime] = useState();
  const [dateType, setType] = useState();
  const [text, onChangeText] = React.useState();
  const [imgetext, onimgChangeText] = React.useState();

  const FromonChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' +"00"

    if(dateType == 'fDate'){
      setfDate(fDate);
    }else if(dateType == 'tDate'){
      settDate(fDate);
    }else if(dateType == 'fTime'){
      setfTime(fTime);
    }else if(dateType == 'tTime'){
      setttime(fTime);
    }
  };

  const showMode = (currentMode, timeType) => {
    setShow(true);
    setMode(currentMode);
    setType(timeType);
  };
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

  const uploadVideo = async (videourl) => {
    const userId = await SecureStore.getItemAsync("userTb");
    const comId = await SecureStore.getItemAsync("comId");
    var RandomNumber = Math.floor(Math.random() * 1000) + 1 ;

    var imageNm = userId+"_"+comId+"_"+RandomNumber+".mp4"

    fetch('http://192.168.1.100:2100/SelectedDocuments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            imageNm: imageNm,
            userId: userId,
            comId: comId,
            fDate: fDate,
            tDate: tDate,
            fTime: fTime,
            tTime: tTime,
            text: text,
            imgetext: imgetext
            
          }
      })

      })
      .then(response => response.json())
      .then((json) => {
        let base_url = 'http://192.168.1.100/ServerUploadfile/index.php';
    let uploadData = new FormData();
    uploadData.append('submit', 'ok');

    uploadData.append('file', {type:"video/mp4", uri: videourl, name:imageNm})

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
      })
      .catch((error) => console.error(error))
  }

  const uploadImage = async (imageurl) => {
    const userId = await SecureStore.getItemAsync("userTb");
    const comId = await SecureStore.getItemAsync("comId");
    var RandomNumber = Math.floor(Math.random() * 1000) + 1 ;

    var imageNm = userId+"_"+comId+"_"+RandomNumber+".png"

    fetch('http://192.168.1.100:2100/SelectedDocuments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            imageNm: imageNm,
            userId: userId,
            comId: comId,
            fDate: fDate,
            tDate: tDate,
            fTime: fTime,
            tTime: tTime,
            text: text,
            imgetext: imgetext
            
          }
      })

      })
      .then(response => response.json())
      .then((json) => {
        let base_url = 'http://192.168.1.100/ServerUploadfile/index.php';
        let uploadData = new FormData();
        uploadData.append('submit', 'ok');

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
      })
      .catch((error) => console.error(error))
  }

    return (
      <ScrollView style={styles.container}>
        <View style={{margin: 20}}>
          <Button title="Pick an image or a video" onPress={pickImage} />
        </View>
        <View style={styles.imageDescriptionRow}>
          <Text style={styles.imageDescriptionText}>Image or Video Description : </Text>
          <TextInput style={styles.inputcountry} onChangeText={onimgChangeText} multiline={true} numberOfLines={10} label='' mode='outlined'/>
        </View>
        <View style={styles.datePeriodTextStyle}>
          <Text style={styles.datePeriodText}>Date Period</Text>
          <TouchableOpacity style={styles.nextButtonBackgroundView}>
            <Tooltip backgroundColor={"#d9d9d9"} height={80} width={200} popover={<Text>Select (From Date) and (To Date) to display the post within a date range. </Text>}>
            <Image style={styles.nextButton} source={require('../assets/questionmark_info.png')}/>
            </Tooltip>
          </TouchableOpacity>
        </View>
      <View style={{flexDirection:'row', margin: 5, alignSelf: 'center'}}>
        <View>
        <Text>From Date :   </Text>
        <TouchableOpacity onPress={() => showMode('date', 'fDate')}>
          <View style={styles.inputdate}>
            <Text style={styles.inputdatedata}>{fDate}</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={{left: 10}}>
        <Text>From Time :   </Text>
        <TouchableOpacity onPress={() => showMode('time', 'fTime')}>
          <View style={styles.inputdate}>
            <Text style={styles.inputdatedata}>{fTime}</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.datePeriodTextStyle}>
        <Text style={styles.datePeriodText}>Time Period</Text>
      <TouchableOpacity style={styles.nextButtonBackgroundView}>
        <Tooltip backgroundColor={"#d9d9d9"} height={80} width={200} popover={<Text>Select (From Date) and (To Date) to display the post within a date range. </Text>}>
          <Image style={styles.nextButton} source={require('../assets/questionmark_info.png')}/>
        </Tooltip>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', margin: 5, alignSelf: 'center'}}>
        <View>
        <Text>To Date :   </Text>
        <TouchableOpacity onPress={() => showMode('date', 'tDate')}>
          <View style={styles.inputdate}>
            <Text style={styles.inputdatedata}>{tDate}</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={{left: 10}}>
        <Text>To Time :   </Text>
        <TouchableOpacity onPress={() => showMode('time', 'tTime')}>
          <View style={styles.inputdate}>
            <Text style={styles.inputdatedata}>{tTime}</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.datePeriodTextStyle}>
      <Text style={styles.durationPeriodText}>Duration</Text>
      <TouchableOpacity style={styles.nextButtonBackgroundView}>
        <Tooltip backgroundColor={"#d9d9d9"} height={80} width={200} popover={<Text>Select (From Date) and (To Date) to display the post within a date range. </Text>}>
          <Image style={styles.nextButton} source={require('../assets/questionmark_info.png')}/>
        </Tooltip>
      </TouchableOpacity>
      </View>
      <TextInput style={styles.durationTextInput} onChangeText={onChangeText} maxLength={2} keyboardType="numeric" label='' mode='outlined'/>
      <View style={{margin: 20}}>
        <Button title="upload Image" onPress={()=>uploadImage(image)} />
        <Button title="upload Video" onPress={()=>uploadVideo(image)} />
      </View>
      {show && (<DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={FromonChange}/>)}
    <View style={styles.container}>
    </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  companyLogoTextStyle: {
      alignSelf: 'center',
      fontSize: 23,
      fontWeight: '400',
  },
  viewAfterInnerViewStyle: {
      alignSelf: 'center',
  },
  pickImageBtn: {
      paddingVertical: 20,
      height: 80,
      alignSelf: 'center',
      flexDirection: "row",
  },
  uploadImageBtn:{
      marginTop: 20,
      paddingVertical: 10,
      height: 50,
      alignSelf: 'center',
  },
  additionalOptionsStyle: {
      marginTop: 20,
      margin: 20,
  },
  additionOptionsText: {
      fontSize: 23,
      fontWeight: 'bold',
  },
  imageDescriptionRow: {
      margin: 10,
  },
  imageDescriptionText: {
      fontSize: 15
  },
  inputcountry: {
      height: 100,
      backgroundColor: 'white',
      borderWidth: 1,
      marginTop: 10,
      padding: 5,
      borderRadius: 5,
  },
  showDateText: {
      fontSize: 18,
      fontWeight: '500',
      marginTop: 5,
  },
  fromTimeDateStyle: {
      marginTop: 10,
      flexDirection: 'row',
  },
  timePickerStyle: {
      marginTop: 20
  },
nextButtonBackgroundView: {
      backgroundColor: 'lightyellow',
      borderRadius: 150,
      width: 30,
      height: 30,
      alignSelf: 'center',
      left: 10
},
nextButton: {
      width: 10,
      height: 15,
      alignSelf: 'center',
      marginTop: 7,
},
inputdate: {
      backgroundColor: "white",
      borderWidth: 1,
      height: 50,
      borderRadius: 5
},
inputdatedata: {
      alignSelf: 'center',
      width: 180,
      marginTop: 5,
},
datePeriodTextStyle: {
    margin: 20,
    flexDirection: 'row',
},
datePeriodText: {
    fontSize: 23,
    fontWeight: "bold",
},
durationTextInput: {
    width: 380,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: -20,
    borderWidth: 1,
    borderRadius: 5,
},
durationPeriodText: {
    fontSize: 23,
    fontWeight: 'bold',
    margin: 10,
},
selectvid: {
    position: 'relative',
    top: 20,
}
});

export default SelectDocumentsScreen

