import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'

export class ActiveDeviceMonitors extends Component {
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
  render() {
    return (
      <View style={styles.container}>
        <FlatList
        data={this.state.data}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) =>
      <View style={styles.detailsbelowadbanner}>
        <Text style={styles.displayname}>{item.Devicename}</Text>
        <View style={styles.datesStyle}>
        <Text style={styles.enddate}>Created Date :- {item.createdDate}</Text>
        <Text style={styles.enddate}>Last Active Date :- {item.lastActivedate}</Text>
        </View>
        <Text style={styles.displaydescription}>IP Address : {item.ipAddress}</Text>
        <Text style={styles.displaydescription}>Model : {item.model}</Text>
        <Text style={styles.displaydescription}>Device ID : {item.deviceId}</Text>
        <Text style={styles.displaydescription}>Brand : {item.brand}</Text>
      </View>
       }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  detailsbelowadbanner: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
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
  datesStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default ActiveDeviceMonitors
