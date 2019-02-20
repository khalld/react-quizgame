import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Switch,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
// import { RadioButtons } from 'react-native-radio-buttons';
import { Icon, Button } from 'react-native-elements';
import AwesomeButton from 'react-native-really-awesome-button';
import CheckBox from 'react-native-modest-checkbox';
import * as firebase from 'firebase';
import { MaterialIcons } from '@expo/vector-icons';
import RadioButton from 'radio-button-react-native';

class QuizScreen5 extends Component {

  static navigationOptions = {
    title: 'Quiz5',
  };

  constructor() {
    super();
    this.state = {
      selectedOption: 'Option 1',
      show: true,
      num: 0,
      answers: [],
      ansOf: '----------',
      done: false,
      politics_marks: 0,
    };
  }
  handleOnPress(value) {
    this.setState({ value: value });
    console.log(value);
  }

  componentDidMount() {
    this.listData();
  }

  listData = () => {
    const { show, list } = this.state;
    const th = this;
    fetch(
      'https://opentdb.com/api.php?amount=10&category=24&difficulty=hard&type=multiple'
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson.results);
        var arr = myJson.results;
        arr = arr.map(temp => {
          temp.incorrect_answers.splice(
            Math.floor(Math.random() * (temp.incorrect_answers.length + 1)),
            0,
            temp.correct_answer
          );
          return temp;
        });
        th.setState({ list: arr }, () => {
          console.log(arr);
          console.log('------ list avail now --------');
        });
      });
  };

  render() {
    const { list, num, show, ansOf, answers } = this.state;
    return (
      <ScrollView style={styles.container}>
      <View>
          
            {show &&
              list &&
              list.length && (
                <View>
                  <Text style={styles.titleText}>{list[num].question}</Text>
                  {list[num].incorrect_answers.map(res => {
                    return (
                      <View style={styles.questionStyle}>
                        <RadioButton /*questi vanno cambiati con checkBox*/
                          currentValue={this.state.ansOf}
                          value={res}
                          onPress={() => {
                            this.setState({ ansOf: res }, () => {
                              console.log(res);
                            });
                          }}>
                          <Text style={styles.textStyle}>{res}</Text>
                        </RadioButton>
                      </View>
                    );
                  })}
                  {num < list.length - 1 && (
                    <Button
                      style={styles.buttonStyle}
                      onPress={() => {
                        console.log('next');
                        let ls = answers;
                        ls.push(ansOf);
                        this.setState(
                          {
                            num: num + 1,
                            answers: ls,
                            ansOf: '--------------',
                          },
                          () => {
                            console.log(answers);
                          }
                        );
                      }}
                      title="Next"
                    />
                  )}
                  {num == list.length - 1 && (
                    <Button
                      style={styles.buttonStyle}
                      onPress={() => {
                        console.log('next');
                        let ls = answers;
                        console.log('premute', ls);
                        if (answers.length < list.length) {
                          ls.push(ansOf);
                          this.setState(
                            { answers: ls, ansOf: '--------------' },
                            () => {
                              console.log(answers);

                              var marks2 = this.state.politics_marks;
                              list.map((res, ind) => {
                                if (res.correct_answer == answers[ind]) {
                                  marks2++;
                                 // this.setState({ marks: marks });
                                  console.log('Tot inside map: ' + marks2);
                                }
                              });
                              const userId = firebase.auth().currentUser.uid;
                              console.log('Finito di contare tutto, cerco di aggiungere al db...')
                              firebase
                                .database()
                                .ref('users/' + userId + '/user/')
                                .update({politics_marks: marks2});

                              Alert.alert(
                                'You completed the test and you got ' +
                                  marks2 +
                                  ' marks out of ' +
                                  answers.length + 'of Politics'
                              );
                              //this.props.result(marks,list.incorrect_answers);
                            }
                          );
                        }
                        this.props.navigation.navigate('UserInfo');
                      }}
                      title="Finish"
                    />
                  )}
                </View>
              )}
          </View>
      </ScrollView>
    );
  }
}

export default QuizScreen5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#606f7b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  questionStyle: {
    paddingTop: 25,
    marginLeft: 10,
    marginBottom: 10,
  },

  textStyle: {
    marginLeft: 10,
    fontSize: 20,
    color: '#dae1e7',
    fontWeight: 'bold',
  },

  buttonStyle: {
    fontSize: 10,
    borderRadius: 1,
    borderWidth: 0.5,
    color: '#dae1e7',
    marginTop: 70,
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    color: '#dae1e7',
    backgroundColor: '#3d4852',
    overflow: 'hidden',
  },
});