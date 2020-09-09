import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from 'react-native';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "88e51676d67e6e8b94593cf94673b21d";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async (latitude, longitude) => {
    const { data: { main: { temp }, weather } } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, condition: weather[0].main, temp });
    //console.log(data);
  }
  getLocation = async () => {
    try {

      await Location.requestPermissionsAsync();

      //console.log(response);
      const { coords: { latitude, longitude } } = await await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
      //console.log(coords.latitude, coords.longitude);

    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }

  }

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
