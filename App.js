import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Alert, Image } from 'react-native';
import { color } from 'react-native-reanimated';
// import Logo from './src/logo.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import History from './src/History';

var sendHistory = [];
function Home({ navigation }) {
  const [price, setPrice] = useState('Enter price?');
  const [discount, setDiscount] = useState('Enter discount%?');
  const [priceResult, setpriceResult] = useState(null);
  const [discountResult, setdiscountResult] = useState(null);
  const [history, setHistory] = useState([]);


  onChangePrice = (text) => {
    setPrice(text.replace(/[^0-9]/g, ''));
  }

  onChangeDiscount = (text) => {

    setDiscount(text.replace(/[^0-9]/g, ''));

    if (text >= 100) {
      Alert.alert('Discount cannot be greater than 100');
      setDiscount('Enter discount?');

    }
  }


  checkDiscount = () => {
    if ((price || discount) != '') {
      let newPrice = (price - (price * (discount / 100))).toFixed(2);
      let totalDiscount = (price - newPrice).toFixed(2);
      setpriceResult(newPrice);
      setdiscountResult(totalDiscount);

    }
  }
  saveResult = () => {
    console.log("new price is " + priceResult);
    console.log("discount is " + discountResult);
    if (priceResult == null) {
      Alert.alert('Calculate discount first');
    }
    else {
      var array = { price: price, discount: discount, priceResult: priceResult };
      var newStateArray = history.slice();
      newStateArray.push(array);
      setHistory(newStateArray);
      sendHistory = history;
      setPrice('Enter price?');
      setDiscount('Enter discount%?');
      setpriceResult(null);
      setdiscountResult(null);

    }
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./src/logo.jpg')}
      />
      <Text style={styles.heading}>Discount-Meter</Text>
      <View style={styles.textInputBox}>
        <TextInput style={styles.textInput} value={price} onChangeText={(text) => this.onChangePrice(text)} ></TextInput>
        <TextInput style={styles.textInput} value={discount} onChangeText={(text) => this.onChangeDiscount(text)}></TextInput>
      </View>
      <View style={styles.resultBox}>
        <View style={{ width: '37%', marginRight: '1%' }}><Text style={styles.resultText}>{priceResult == null ? <Text>You saved $</Text> : <Text>You saved {discountResult}$</Text>}</Text></View>
        <View style={{ width: '37%', marginRight: '1%' }}><Text style={styles.resultText}>{priceResult == null ? <Text>Final price $</Text> : <Text>Final price {priceResult}$</Text>}</Text></View>
        <View style={styles.saveButton}>
          <Button
            title="Save"
            color='lightblue'
            onPress={this.saveResult}

          />
        </View>
      </View>
      <View style={styles.checkButton}>
        <Button
          title="Check"
          color='lightgray'
          onPress={this.checkDiscount}
        />
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  tinyLogo: {
    width: 150,
    height: 150,
    alignContent: 'center',
    marginTop: '-55%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '-1%',
    marginLeft: '-2%'
  },
  resultText: {
    color: '#484848',
    height: 35,
    padding: 7,
    textAlign: 'center',
    shadowColor: "#000",
    backgroundColor: '#F0F8FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,

  },
  historyButton: {
    position: 'absolute',
    top: '5.5%',
    left: '82%',
    color: 'black',
  },
  saveButton: {
    marginLeft: '0.5%'
  },
  checkButton: {
    position: 'absolute',
    top: '50.5%',
    left: '82%',
    color: 'black',
    width: 68,
  },
  resetButton: {
    position: 'absolute',
    top: '40.5%',
    left: '82%',
    color: 'black',
    width: 68,
  },
  textInput: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
    marginTop: 15,
    color: '#484848',
    borderRadius: 10,
    fontSize: 18,
    padding: 15,
    textAlign: 'left',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textInputBox: {
    alignContent: 'center',
    marginTop: '10%'
  },
  viewstyle: {
    flexDirection: 'row',
    top: '10%',
    marginTop: '5%',
    height: '4%',
  },
  resultBox: {
    top: '6%',
    display: 'flex',
    flexDirection: 'row',
    left: '3%'
  },
  result: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#001529',
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

  }

});



const Stack = createStackNavigator();
export default function App() {
  onPressMe = () => {
    console.log('i m clicked');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
      // screenOptions={{

      // }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Discount-Meter",
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerRight: () => (
              <Button
                title="History"
                onPress={() => navigation.navigate('History', { history: sendHistory })}
                color='lightblue'
              />)
          })}

        />
        <Stack.Screen name="History"
          component={History}
          options={({ navigation }) => ({
            title: "Discount-Meter",
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerRight: () => (
              <Button
                title="Clear all"
                onPress={()=> 
                  {Alert.alert(
                  'Confirmation',
                  'Do you want to delete the complete history?',
                  [
                    {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                    {text: 'YES', onPress: () => {sendHistory=[]} },
                  ]   
                )}}
                color='lightblue'
              />)
          })}

        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}


