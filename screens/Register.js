import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { Input, Card, Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ImagePicker, Permissions } from 'expo';

import * as firebase from 'firebase';

export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Registration',
  };

  state = {
    isLoading: 'false',
    email: '',
    password: '',
    utente: '',
    name: '',
    surname: '',
    image: '',
    currentUID: '',
    error: '',
    general_marks: 0,
    politics_marks: 0,
    math_marks: 0,
    geo_marks: 0,
    history_marks: 0,
    data: [],
  };

  _signUp = () => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (firebase.auth().currentUser) {
          const userId = firebase.auth().currentUser.uid;
          if (userId) {
            firebase
              .database()
              .ref('users/' + userId + '/user/')
              .set({
                name: this.state.name,
                email: this.state.email,
                surname: this.state.surname,
                image: this.state.image,
                general_marks: this.state.general_marks,
                politics_marks: this.state.politics_marks,
                math_marks: this.state.math_marks,
                geo_marks: this.state.geo_marks,
                history_marks: this.state.history_marks,
              });
          }
        }

        this.setState({ isLoading: false });
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
      });
  };

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  checkPhotoGalleryPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status != 'granted') {
      alert('Checking permissions gallery..');
    }
  };

  _pickImageFromGallery = async () => {
    await this.checkPhotoGalleryPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;

    return (
      <ImageBackground
        source={require('../assets/foto6.jpg')}
        style={{ width: '100%', height: '100%' }}>
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={styles.container}>
            <View style={styles.imageStyle}>
              <Button
                title="Pick an image from PhotooGallery"
                onPress={() => {
                  this._pickImageFromGallery();
                }}
              />

              <Image source={{ uri: image }} style={styles.imageStyle} />
            </View>
            <View style={styles.styleView}>
              <Input
                label="E-Mail"
                placeholder="enter a valid email"
                onChangeText={text => this.setState({ email: text })}
              />

              <Input
                label="Name"
                placeholder="enter your name"
                onChangeText={text => this.setState({ name: text })}
              />

              <Input
                label="Surname"
                placeholder="enter your surname"
                onChangeText={text => this.setState({ surname: text })}
              />

              <Input
                secureTextEntry
                label="password"
                placeholder="your password"
                onChangeText={text => this.setState({ password: text })}
              />
              <Divider style={styles.dividerStyle} />
              <View>
                <Button
                  onPress={this._signUp}
                  title="Register"
                  color="#640584"
                  style={styles.buttonStyle}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  imageStyle: {
    width: 300,
    height: 200,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 25,
  },
  buttonStyle: {},
  dividerStyle: {
    marginTop: 30,
  },

  styleView: {
    paddingTop: 50,
  },
});
