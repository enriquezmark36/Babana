import React, {PureComponent} from 'react';
import * as ReactNative from 'react-native';
import * as NativeBase from "native-base";
import BabanaRingtone from 'react-native-babana-ringtone';

import CommonStyles from "./styles";

const {
  AsyncStorage,
  View,
} = ReactNative;

const {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Content,
} = NativeBase;

export default class ringtone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      RingtoneURI: "",
      RingtoneName: "Default ringtone",
    };
    this._pickRingtone = this._pickRingtone.bind(this);
  }

  async _pickRingtone(){
    await BabanaRingtone
        .pickRingtone()
        .catch((errcode, errmsg) => {
          console.log(errcode, errmsg);
    });

    // Would this cause a double error message?
    BabanaRingtone.getLoadedRingtone(
      (errcode, errmsg) => {},
      (title, uri) => {
        this.setState({RingtoneURI: uri, RingtoneName: title})
        AsyncStorage.setItem('RingtoneUri', uri)
          .catch ((error) =>{console.log(error)});
      }
    );

  }

  componentWillMount() {
    AsyncStorage.getItem('RingtoneUri')
      .then((value) => {
        if(value) { // Success, key matched
          BabanaRingtone
              .loadRingtone(value)
              .then(() =>{
                BabanaRingtone.getLoadedRingtone(
                  (errcode, errmsg) => {/* can only fail if invalid */},
                  (title, uri) => {
                    this.setState({RingtoneURI: uri, RingtoneName: title})
                  }
                );
              }).catch((error) => {
                console.log(error, "1")
              });
        } else { // Still Success, but key didn't matched
          BabanaRingtone
              .loadDefaultRingtone()
              .then(() => {
                BabanaRingtone.getLoadedRingtone(
                  (errcode, errmsg) => {
                    /* I dunno how this code path would be reached */
                    console.log(errmsg+ '(\'' + errcode + '\')')
                  },
                  (title, uri) => {
                    this.setState({RingtoneURI: uri, RingtoneName: title})
                  }
                );
              }).catch((error) =>{
                console.log(error)
              });
        }
      })
      .catch ((error) =>{console.log(error)});
  }

  render() {
    return (
      <View
        style={CommonStyles.settingsItem}
      >
        <ListItem
          icon button noBorder
          onPress={this._pickRingtone}
          style={CommonStyles.item}
        >
          <Left>
            <Icon
              name="bell"
              type="MaterialCommunityIcons"
            />
          </Left>
          <Body style={{height: null}}>
            <Text>{this.state.RingtoneName}</Text>
          </Body>
          <Right/>
        </ListItem>
      </View>
    );
  }
}
