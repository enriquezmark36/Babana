import React, {Component} from 'react';
import {Platform, StyleSheet, View, Vibration, TouchableNativeFeedback, ToastAndroid} from 'react-native';
import {Container, Title, Header, Body, Button, Text} from 'native-base';
import CountdownCircle from 'react-native-countdown-circle'
import SendSMS from 'react-native-sms-x';

export default class AlarmScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        isSent: false,
        sendCanceled: false,
        contactList: [],
        message: '',
      };
      this._sendSms = this._sendSms.bind(this);
      this._smsCallback = this._smsCallback.bind(this);
  }

  //Disables the header bar
  static navigationOptions = ({ navigation }) => ({header:null,});

  _OK() {
    const {navigation} = this.props;
    Vibration.cancel();

    this._sendSms();
    navigation.goBack();
  }

  componentDidMount(){
    const {navigation} = this.props;

    //enable vibration
    const PATTERN = [400, 400];
    Vibration.vibrate(PATTERN, true);

    //map navigation params to state
    contactList = navigation.getParam('contactList', []);
    message = navigation.getParam('message', '');

    this.setState({contactList, message});
  }

  _cancelSms() {
    this.setState({sendCanceled: true, isSent: true});
    const {sendCanceled, isSent} = this.state;

    if (this.state.isSent === true)
      return;
  }

  _smsCallback(msg, recipient) {
    if (msg === 'SMS sent')
      return;

    if (recipient.fullname !== '')
      name = recipient.fullname + " - ";

    name = name + recipient.number;

    ToastAndroid.show('Failed to Send to ' + name + ": " + msg,
                      ToastAndroid.LONG);
  }

  _sendSms() {
    const {contactList, message} = this.state;

    if (this.state.isSent === true)
      return;

    contactList.forEach((person) => {
      SendSMS.send(
        Number(person.id),
        person.number,
        message,
        (msgId, msg) => this._smsCallback(msg, person));
    });

    this.setState({isSent:true});
  }

  _countdownButton() {
    if (this.state.isSent === false) {
      return (
        <View style={styles.smsCancel}>
          <Text> Press the countdown </Text>
          <Text> to prevent sending SMS </Text>
          <TouchableNativeFeedback
                useForeground={true}
                onPress={() => this._cancelSms()}
          >
            <View>
              <CountdownCircle
                  seconds={8}
                  radius={32}
                  borderWidth={8}
                  color="#D500F9"
                  bgColor="yellow"
                  textStyle={{ fontSize: 20 }}
                  onTimeElapsed={() => this._sendSms()}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else if(this.state.sendCanceled === true ) {
      return (
        <View style={styles.smsCancel}>
          <Text> Sending Cancelled </Text>
        </View>
      );
    } else {
      if (this.state.contactList.length === 1){
        if (this.state.contactList[0].fullname !== ''){
          peopleText = this.state.contactList[0].fullname.trim();
        } else {
          peopleText = "one person";
        }
      } else {
        peopleText = this.state.contactList.length + " people";
      }
      return(
        <View style={styles.smsCancel}>

          <Text> Message sent to {peopleText}.</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const {contactList, message} = this.state;

      return (
        <Container style={styles.container}>
          <View style={styles.message}>
            <Text> You are almost at your destination</Text>
            <Button style={styles.okButton}rounded light onPress={()=> this._OK()}>
                <Text>    OK    </Text>
            </Button>
          </View>

          <View style={{flex: 1}}>
              {(this.state.contactList.length !== 0) &&
                (this._countdownButton())}
          </View>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  message: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  smsCancel: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  okButton: {
    alignSelf: 'center',
  },
});
