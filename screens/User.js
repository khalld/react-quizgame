import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';

import QuizPage from '../screens/QuizPage';

import { Input, Card, ListItem } from 'react-native-elements';

import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import * as firebase from 'firebase';

class User extends Component {
  static navigationOptions = {
    title: 'UserInfo',
    header: null,
  };

  state = {
    user: [],
  };

  // Controllare qui
  componentDidMount() {
    //leggere array dal db
    const currentUID = firebase.auth().currentUser.uid;
    const path = '/users/' + currentUID;
    console.log('Si è connesso :' + currentUID);
    const users = firebase.database().ref(path);
    users.on('value', snap => {
      //ciclo
      var elenco = [];
      snap.forEach(child => {
        elenco.push({
          name: child.val().name,
          surname: child.val().surname,
          email: child.val().email,
          image: child.val().image,
          general_marks: child.val().general_marks,
          politics_marks: child.val().politics_marks,
          math_marks: child.val().math_marks,
          geo_marks: child.val().geo_marks,
          history_marks: child.val().history_marks,
        });
      });
      this.setState({ user: elenco });
    });
  }
  render() {
    return (
      <ScrollView>
        <StatusBar hidden />
        {this.state.user &&
          this.state.user.map((l, i) => (
            <View style={styles.view1}>
              <Image style={styles.imageStyle} source={{ uri: l.image }} />
            </View>
          ))}

        {this.state.user &&
          this.state.user.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
              subtitle={l.surname}
              leftAvatar={{ source: require('../assets/user-icon.png') }}
            />
          ))}
          <Text style={styles.textStyle}>Last Marks</Text>
        {this.state.user &&
          this.state.user.map((l, i) => (
            <ListItem
              key={i}
              title={"General Knowledge"}
              subtitle={l.general_marks}
              leftAvatar={{ source: require('../assets/trophy.png') }}
            />
          ))}
          {this.state.user &&
          this.state.user.map((l, i) => (
            <ListItem
              key={i}
              title={"Politics"}
              subtitle={l.politics_marks}
              leftAvatar={{ source: require('../assets/trophy.png') }}
            />
          ))}
          {this.state.user &&
          this.state.user.map((l, i) => (
            <ListItem
              key={i}
              title={"Mathematics"}
              subtitle={l.math_marks}
              leftAvatar={{ source: require('../assets/trophy.png') }}
            />
          ))}
          {this.state.user &&
          this.state.user.map((l, i) => (
            <ListItem
              key={i}
              title={"Geography"}
              subtitle={l.geo_marks}
              leftAvatar={{ source: require('../assets/trophy.png') }}
            />
          ))}
          {this.state.user &&
          this.state.user.map((l, i) => (
            <ListItem
              key={i}
              title={"History"}
              subtitle={l.history_marks}
              leftAvatar={{ source: require('../assets/trophy.png') }}
            />
          ))}
      </ScrollView>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  UserInfo: User,
  QuizScreen: QuizPage,
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  view1: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    //marginLeft: 150,
    borderRadius: 100,
    marginTop: 15,
  },
   textStyle: {
    marginLeft: 10,
    fontSize: 20,
  },
});