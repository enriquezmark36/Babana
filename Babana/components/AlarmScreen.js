import React, {Component} from 'react';
import * as ReactNative from 'react-native';
import {Container, Title, Header, Body, Button, Text} from 'native-base';
import CountdownCircle from 'react-native-countdown-circle'
import BabanaRingtone from 'react-native-babana-ringtone';

const {
  StyleSheet,
  View,
  Vibration,
  TouchableNativeFeedback,
  ToastAndroid,
  AsyncStorage,
  BackHandler,
  Linking,
} = ReactNative ;

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
  }

  //Disables the header bar
  static navigationOptions = ({ navigation }) => ({header:null,});

  _OK() {
    const {navigation} = this.props;
    Vibration.cancel();

    this._sendSms();

    BabanaRingtone.stopRingtone()
      .catch ((error) =>{console.log(error)});

    navigation.goBack();
  }

  // Ignore all back button presses
  _handleBackPress() {
    return true;
  }

  componentWillUnmount() {
    // Remove the back blocker, try saying that five times fast.
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentDidMount(){
    const {navigation} = this.props;

    //vibration pattern, 400ms vibrate, 400ms sleep ...
    const PATTERN = [400, 400];

    //map navigation params to state
    contactList = navigation.getParam('contactList', []);
    message = navigation.getParam('message', '');

    // Set play the Ringtone
    // Or try loading it first then play if it fails
    BabanaRingtone.playRingtone()
        .catch ((error) =>{console.log(error)});

    // Disallow the usage of back button
    // Seriously, We need the user to hit the OK button or something
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);

    // Aparently, there's only one case we won't
    // Activate vibration:
    //     it succeeds getting a key that has a value of '0'
    AsyncStorage.getItem('wouldVibrate')
      .then((value) => {
        if (value) {
          // Merging this above would complicate things
          if (value === '1')
            Vibration.vibrate(PATTERN, true);
        } else {
          // Even so the value is not present, we enable vibration
          Vibration.vibrate(PATTERN, true);
        }
      })
      .catch((err) => {
        //Even if the query failed, we still enable vibration
        console.log(err)
        Vibration.vibrate(PATTERN, true);
      })
    ;

    this.setState({contactList, message});
  }

  _cancelSms() {
    if (this.state.isSent === true)
      return;

    this.setState({sendCanceled: true, isSent: true});
  }

  _sendSms() {
    const {contactList, message} = this.state;
    let url = 'smsto:';

    if (this.state.isSent === true)
      return;

    contactList.forEach((person) => {
      url += `${person.number},`;
    });
    url = url.substring(0, url.length - 1) + `?body=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then(supported => {
      if(supported)
        Linking.openURL(url).catch(err => ToastAndroid.show(err, ToastAndroid.LONG));
    }).catch(err => ToastAndroid.show(err, ToastAndroid.LONG));

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
                  seconds={5}
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
      return(
        <View style={styles.smsCancel}>
          <Text>Opened the default messaging app.</Text>
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
