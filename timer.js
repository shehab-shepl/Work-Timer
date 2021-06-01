import Constants from 'expo-constants';
import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { Component } from 'react';

let secondsOfWork = '00';
let minutesOfWork = 25;
let secondsOfBreak = '00';
let minutesOfBreak = 5;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      constMinutesWork:minutesOfWork,
      constsecondsWork: secondsOfWork,
      constminutesBreak: minutesOfBreak,
      constsecondsBreak: secondsOfBreak,

      minutesWork: minutesOfWork,
      secondsWork: secondsOfWork,
      counterWorkPlaying: true,
      counterBreakPlaying: false,
      minutesBreak: minutesOfBreak,
      secondsBreak: secondsOfBreak,
      running: true,
    };
  }

  componentDidMount() {
    if (this.state.running == true) {
      this.interval = setInterval(this.dec, 1000);
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // }

  dec = () => {
    if (this.state.counterWorkPlaying == true) {
      if (this.state.secondsWork == 0) {
        this.setState((prevState) => ({
          secondsWork: 60,
          minutesWork: prevState.minutesWork - 1,
        }));
      }
      this.setState((prevState) => ({
        secondsWork: prevState.secondsWork - 1,
      }));

      if (this.state.secondsWork == 0 && this.state.minutesWork == 0) {
        this.setState((prevState) => ({
          counterWorkPlaying: false,
          counterBreakPlaying: true,
          secondsWork: prevState.constsecondsWork,
          minutesWork: prevState.constMinutesWork,
        }));
      }
    } else {
      if (this.state.secondsBreak == 0) {
        this.setState((prevState) => ({
          secondsBreak: 60,
          minutesBreak: prevState.minutesBreak - 1,
        }));
      }

      if (this.state.counterBreakPlaying == true) {
        // alert("shehab")
        this.setState((prevState) => ({
          secondsBreak: prevState.secondsBreak - 1,
        }));
      }
      if (this.state.secondsBreak == 0 && this.state.minutesBreak == 0) {
        this.setState((prevState) => ({
          counterWorkPlaying: true,
          counterBreakPlaying: false,
          secondsBreak: prevState.constsecondsBreak,
          minutesBreak: prevState.constminutesBreak,
        }));
      }
    }
  };

  pause = () => {
    clearInterval(this.interval);
    this.setState({
      running: false,
    });
  };

  start = () => {
    this.interval = setInterval(this.dec, 1000);
    this.setState({
      running: true,
    });
  };

  reset = () => {
    // alert("shehab")
    clearInterval(this.interval);
    this.setState({
      running: false,
      minutesWork: minutesOfWork,
      secondsWork: secondsOfWork,
      minutesBreak: minutesOfBreak,
      secondsBreak: secondsOfBreak,
    });
  };

  onChangedminuteswork = (text) => {
    clearInterval(this.interval);
    this.setState({ 
      running: false,
      minutesWork: text,
      constMinutesWork: text, });
  };

  onChangedSecondsWork = (text) => {
    clearInterval(this.interval);
    this.setState({ secondsWork: text,
    running: false,
    constsecondsWork: text, });
  };

  onChangedSecondsBreak = (text) => {
    clearInterval(this.interval);
    this.setState({ secondsBreak: text,
    running: false,
    constsecondsBreak: text, });
  };

  onChangedMinutesBreak = (text) => {
    clearInterval(this.interval);
    this.setState({ minutesBreak: text,
    running: false,
    constminutesBreak: text, });
  };

  

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      
        {this.state.counterWorkPlaying ? (
          <>
            <Text style={styles.count}>Work Timer</Text>
            <Text style={styles.count}>
              {this.state.minutesWork} : {this.state.secondsWork}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.count}>Break Timer</Text>
            <Text style={styles.count}>
              {this.state.minutesBreak} : {this.state.secondsBreak}
            </Text>
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            width: 205,
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {this.state.running ? (
            <TouchableOpacity
              onPress={() => {
                this.pause();
              }}
              style={{
                width: 100,
                height: 50,
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{ fontSize: 30 }}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.start();
              }}
              style={{
                width: 100,
                height: 50,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{ fontSize: 30 }}>Start</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => this.reset()}
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: 350,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Minutes of work</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'00'}
            placeholderTextColor="black"
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onChangeText={(text) => this.onChangedminuteswork(text)}
            value={this.state.minutesOfWork}
            maxLength={2} //setting limit of input
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: 350,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Seconds of work</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'00'}
            placeholderTextColor="black"
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onChangeText={(text) => this.onChangedSecondsWork(text)}
            value={this.state.minutesOfWork}
            maxLength={2} //setting limit of input
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: 350,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Minutes of Break</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'00'}
            placeholderTextColor="black"
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onChangeText={(text) => this.onChangedMinutesBreak(text)}
            value={this.state.minutesOfWork}
            maxLength={2} //setting limit of input
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: 350,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Seconds of Break</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'00'}
            placeholderTextColor="black"
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onChangeText={(text) => this.onChangedSecondsBreak(text)}
            value={this.state.minutesOfWork}
            maxLength={2} //setting limit of input
          />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  count: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'Bold',
  },
  textInput: {
    width: 60,
    height: 30,
    color: 'black',
    backgroundColor: '#fff',
    marginLeft: 20,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
