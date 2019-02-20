import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';

import { Input, Card, ListItem } from 'react-native-elements';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import AwesomeButton from 'react-native-really-awesome-button';

import * as firebase from 'firebase';

import QuizScreen1 from '../screens/quizScreens/Quiz1';
import QuizScreen2 from '../screens/quizScreens/Quiz2';
import QuizScreen3 from '../screens/quizScreens/Quiz3';
import QuizScreen4 from '../screens/quizScreens/Quiz4';
import QuizScreen5 from '../screens/quizScreens/Quiz5';

export default class QuizPage extends Component {
  static navigationOptions = {
    title: 'QuizPage',
  };

  render() {
    return (
      <View style={styles.container}>
      
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Quiz1')}>
          <ListItem
            title="General Knowledge"
            subtitle={
              <View style={styles.subtitleView}>
                <Image
                  source={require('../assets/leveldifficulty/medium.png')}
                  style={styles.ratingImage}
                />
                <Text style={styles.ratingText}>Medium difficulty</Text>
              </View>
            }
            leftAvatar={{
              source: require('../assets/categories/knowledge.png'),
            }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Quiz2')}>
          <ListItem
            title="History"
            subtitle={
              <View style={styles.subtitleView}>
                <Image
                  source={require('../assets/leveldifficulty/hard.png')}
                  style={styles.ratingImage}
                />
                <Text style={styles.ratingText}>Hard difficulty</Text>
              </View>
            }
            leftAvatar={{
              source: require('../assets/categories/history.png'),
            }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Quiz3')}>
          <ListItem
            title="Mathematics"
            subtitle={
              <View style={styles.subtitleView}>
                <Image
                  source={require('../assets/leveldifficulty/medium.png')}
                  style={styles.ratingImage}
                />
                <Text style={styles.ratingText}>Medium difficulty</Text>
              </View>
            }
            leftAvatar={{
              source: require('../assets/categories/math.png'),
            }}
          />
        </TouchableHighlight>
        
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Quiz4')}>
          <ListItem
            title="Geography"
            subtitle={
              <View style={styles.subtitleView}>
                <Image
                  source={require('../assets/leveldifficulty/easy.png')}
                  style={styles.ratingImage}
                />
                <Text style={styles.ratingText}>Easy difficulty</Text>
              </View>
            }
            leftAvatar={{
              source: require('../assets/categories/geo.png'),
            }}
          />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.navigation.navigate('Quiz5')}>
          <ListItem
            title="Politics"
            subtitle={
              <View style={styles.subtitleView}>
                <Image
                  source={require('../assets/leveldifficulty/hard.png')}
                  style={styles.ratingImage}
                />
                <Text style={styles.ratingText}>Hard difficulty</Text>
              </View>
            }
            leftAvatar={{
              source: require('../assets/categories/politics.png'),
            }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 25,
    width: 25,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});
