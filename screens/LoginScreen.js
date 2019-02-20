import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  ImageBackground,
} from 'react-native';
import { Input, Card, Divider } from 'react-native-elements';

import * as firebase from 'firebase';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'LoginScreen',
  };

  state = {
    isLoading: 'false',
    email: 'iragazzi@g.it',
    password: 'Ciao1234',
    error: '',
    list: [],
  };

  _login = () => {
    console.log('You press login...');
    this.setState({ isLoading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('UserInfo'); //dovrebbe andare su Main
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
      });
    console.log('Login function finish ---//');
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/foto4.jpg')}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Input
            label="E-Mail"
            placeholder="enter a valid email"
            onChangeText={text => this.setState({ email: text })}
          />

          <Input
            secureTextEntry
            label="password"
            placeholder="your password"
            onChangeText={text => this.setState({ password: text })}
          />

          <View style={styles.button}>
            <Button onPress={this._login} title="Login" color="#841584" />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => this.props.navigation.navigate('Register')}
              title="Registration"
              color="#841584"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    paddingTop: 25,
    width: 300,
    marginLeft: 28,
  },
});

export default LoginScreen;
