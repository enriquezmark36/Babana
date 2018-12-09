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

const SettingAsyncKey = 'RingtoneSettings';

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
      (errcode, errmsg) => {console.log(errcode, errmsg);},
      (title, uri, is_null) => {
        if (is_null === true) {
          uri = null;
          title = "Silent";
        }

        state = {RingtoneURI: uri, RingtoneName: title};
        this.setState(state);
        AsyncStorage.setItem(SettingAsyncKey, JSON.stringify(state))
          .catch ((error) =>{console.log(error)});
      }
    );

  }

  async _loadSavedRingtone(obj) {
    state = JSON.parse(obj);
    this.setState(state);
    BabanaRingtone
      .loadRingtone(state.RingtoneURI)
      .catch((error) => {
        console.log(error);
      });
  }

  _loadDefaultRingtone() {
    BabanaRingtone.loadDefaultRingtone();

    BabanaRingtone.getLoadedRingtone(
      (errcode, errmsg) => {
        /* I dunno how this code path would be reached */
        console.log(errmsg+ '(\'' + errcode + '\')')
      },
      (title, uri, is_null) => {
        if (is_null === true) {
          this.setState({RingtoneURI: null, RingtoneName: "Silent"});
        } else {
          this.setState({RingtoneURI: uri, RingtoneName: title});
        }
      }
    );
  }

  componentWillMount() {
    AsyncStorage.getItem(SettingAsyncKey)
      .then((value) => {
        if(value) { // Success, key matched
          this._loadSavedRingtone(value);
        } else { // Still Success, but key didn't matched
          this._loadDefaultRingtone();
        }
      }).catch ((error) =>{console.log(error)});
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
