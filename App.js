import React, {useState} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {MapsAPI} from './src/Config';//chave da api

const App = () => {

  const [address, setAddress] = useState({});
  const [visible, setVisible] = useState(false);

  const handleAddress = (address, location) => {    

    if(address && location) {
      setVisible(true);
      const loc = {
        endereco:address,
        center:{
          latitude:99959,
          longitude:9898989
        }
      }
      setAddress(loc);
    }
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      placeholder= "Para Onde"
      minLength={2}
      onPress={(data, { geometry }) => {
        //console.log(data, geometry);
        let address = data.description;
        let location = geometry.location;
        handleAddress(address, location)
      }}
      autoFocus={false}  
      query={{
        key: MapsAPI,
        language: 'pt', // language of the results
      }}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false
      }}
      fetchDetails={true}
      enablePoweredByContainer={false}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
      }}
      currentLocation={false}
    />

    {visible &&  
      <View style={styles.addresss}>
        <Text> {address.endereco} </Text>
        {/* <Text> {address.center.latitude} </Text> */}
      </View>
    }
    {console.log(address)}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  addresss:{
    position:"absolute",
    top:"40%",
    margin:20
  }
})

export default App;
