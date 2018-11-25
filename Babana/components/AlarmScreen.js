import React, {Component} from 'react';
import {Platform, StyleSheet, View, Vibration} from 'react-native';
import {Container, Title, Header, Body, Button, Text} from 'native-base';

export default class AlarmScreen extends Component {
  constructor(props){
      super(props);
  }

  //Disables the header bar
  static navigationOptions = ({ navigation }) => ({header:null,});

  _OK() {
    const {navigation} = this.props;
    Vibration.cancel();

    navigation.goBack();
  }

  componentDidMount(){
    //enable vibration
    const PATTERN = [400, 400];
    Vibration.vibrate(PATTERN, true);
  }


  render() {
      return (
        <Container style={styles.container}>
         <Text> You are almost at your destination</Text>
         <Button style={styles.okButton}rounded light onPress={()=> this._OK()}>
            <Text>    OK    </Text>
         </Button>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButton: {
    alignSelf: 'center',
  },
});
