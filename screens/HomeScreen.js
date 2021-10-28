import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Button } from 'react-native-paper';

const HomeScreen = ({ route, navigation }) => {
    return (
      <View style = {styles.container }>
        <SafeAreaView>
            <View style={styles.homePageScreenView}>
              <Button style={styles.selectDocumentsButton} mode="contained" onPress={() => navigation.navigate("Select Documents")}>Select Documents</Button>
              <Button style={styles.activeMonitorsButton} mode="contained" onPress={() => navigation.navigate("Active Device Monitors")}>Active Device Monitors</Button>
            </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    homePageScreenView: {
        marginTop: 50,
        padding: 20,
    },
    selectDocumentsButton: {
      height: 40,
    },
    activeMonitorsButton: {
      marginTop: 20,
    },
  });
