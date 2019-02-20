import React from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/Register';
import QuizPage from './screens/QuizPage';
import User from './screens/User';
import uuid from 'uuid';

import QuizScreen1 from './screens/quizScreens/Quiz1';
import QuizScreen2 from './screens/quizScreens/Quiz2';
import QuizScreen3 from './screens/quizScreens/Quiz3';
import QuizScreen4 from './screens/quizScreens/Quiz4';
import QuizScreen5 from './screens/quizScreens/Quiz5';

import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCLGXNlJKpHZFaB_o7UjDC0duMrX_6itCc',
  authDomain: 'prog3-21ef7.firebaseapp.com',
  databaseURL: 'https://prog3-21ef7.firebaseio.com',
  projectId: 'prog3-21ef7',
  storageBucket: '',
  messagingSenderId: '549686987799',
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const AppNavigator = createStackNavigator({
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },

  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },

  UserInfo: {
    screen: User,
    navigationOptions: {
      header: null,
    },
  },

  QuizPage: {
    screen: QuizPage,
    navigationOptions: {
      header: null,
    },
  },

  Quiz1: {
    screen: QuizScreen1,
    navigationOptions: {
      header: null,
    },
  },

  Quiz2: {
    screen: QuizScreen2,
    navigationOptions: {
      header: null,
    },
  },
  Quiz3: {
    screen: QuizScreen3,
    navigationOptions: {
      header: null,
    },
  },

  Quiz4: {
    screen: QuizScreen4,
    navigationOptions: {
      header: null,
    },
  },

  Quiz5: {
    screen: QuizScreen5,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);
