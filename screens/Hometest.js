import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList ,Alert, Modal, Pressable, Dimensions, ScrollView } from 'react-native'
import { Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 600;

class Home extends Component {
  constructor(props) {
    super(props);
   }
  state ={
    data:[],
    modalVisible: false
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  fetchData= async()=>{
    const response = await fetch('http://192.168.1.100:2100/homepage');
    const users = await response.json();
    this.setState({data: users});
  }
  componentDidMount(){
    this.fetchData();
  }
  render () {
  const { modalVisible } = this.state;
    return (
      <View style = { styles.container }>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
    <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>

       <View>
      <Text style={styles.displayname}>{item.Model}</Text>
    </View>
       }/>
      </View>
        )
  }
   
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  header: {
    backgroundColor: 'white',
    height: 50,
    elevation: 10,
    shadowColor: 'black',
    flexDirection: 'row'
  },
  logoimg: {
    width: 110,
    height: 30,
    margin: 10,
    marginTop: 10,
  },
  rightImage: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    position: 'relative',
    flex: 1,
  },
  avatarimg: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 150,
    flexDirection: "row",
    justifyContent: "flex-end",
    position: 'relative',
  },
  detailsbelowadbanner: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    marginTop: 60,
    borderRadius: 5,
    elevation: 10,
    shadowColor: 'black',
    paddingBottom: 50,
  },
  productimg: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 150,
    marginTop: -60,
    alignSelf: 'center',
  },
  displayname: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  displaydescription: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 10,
    lineHeight: 22,
    width: 350,
  },
  enddate: {
    padding: 10,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'grey',
    fontSize: 12,
  },
  joinBtn: {
    marginTop: 30,
    width: 300,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  Modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 20,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  heading: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
   title: {
     fontSize: 20,
     padding: 10,
   },
   facebookbutton: {
     width: 250,
     height: 50,
   },
   buttonViews: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
   },
   touchableopacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
   },
   agreeButton: {
    width: 300,
    paddingVertical: 6,
    alignSelf : 'center',
    borderRadius: 25,
    margin: 20,
   },
   modledescriptiontxt: {
    fontSize: 13,
    lineHeight: 20,
   },
   scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  });

  export default function RootFunction (){
    const navigation = useNavigation() // extract navigation prop here 
    
     return <Home navigation={navigation} /> //pass to your component.
    
      }