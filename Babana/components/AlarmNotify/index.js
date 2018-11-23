import React, { PureComponent } from 'react';
import * as NativeBase from 'native-base';
import ReactNative from 'react-native';

import Chip from './ChipArea';

const {
  Header,
  Left,
  Body,
  Right,
  Icon,
  Form,
  Textarea,
  Button,
  Text,
  Title,
} = NativeBase;

const {
  View,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} = ReactNative;

const initialParams = {
  canSave: false,
};

class AlarmNotify extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chosenContacts: [],
      lastIndex: 0,
      text: '',
    };
    this._saveContactsToState = this._saveContactsToState.bind(this);
    this._toggleSaveIfPossible = this._toggleSaveIfPossible.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const params = { ...initialParams, ...navigation.state.params };
    return {
      header: (
        <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()} >
                <Icon name="arrow-back"/>
              </Button>
            </Left>

            <Body>
              <Title>Notify</Title>
            </Body>

            <Right>
              <Button transparent
                disabled={!params.canSave}
                onPress={ () => navigation.goBack()} >
                  <Icon name="save"/>
              </Button>
            </Right>
        </Header>
      )
    }
  };

  _saveContactsToState(contactList, lastIndex) {
    this.setState({
      chosenContacts: contactList,
      lastIndex: lastIndex,
    });
    this._toggleSaveIfPossible(contactList, this.state.text);
  }

  // Don't try use the state, especially if you've used setState
  // Before this. The state would be one step back.
  _toggleSaveIfPossible(chosenContacts, text){
    const {navigation} = this.props;

    if ((chosenContacts.length !==0 ) && (text.length !== 0)) {
      navigation.setParams({canSave: true});
      return;
    }

    if (navigation.getParam('canSave', true) == true)
      navigation.setParams({canSave: false});
  }


  _showContactPicker(push) {
    push('ContactPicker',
          {
            saveCallback:  this._saveContactsToState,
            initialList: this.state.chosenContacts,
            lastIndex: this.state.lastIndex,
          }
        );
  }

  render() {
    return (
      <View style={styles.container}>
        { (this.state.chosenContacts.length !== 0) && (
          <View>
            <Text>Selected Contacts:</Text>
            <ScrollView style={styles.scrollArea} >
              <TouchableNativeFeedback
                useForeground
                style={styles.psuedoButton}
                onPress={() => this._showContactPicker(this.props.navigation.push)} >
                  <View style={styles.chipArea}>
                    {Chip(this.state.chosenContacts, true)}
                  </View>
              </TouchableNativeFeedback>
            </ScrollView>
          </View>
        ) || (
          <Button full
            style={styles.selectContactsButton}
            onPress={() => this.props.navigation
                .push('ContactPicker',
                      {saveCallback: this._saveContactsToState,})} >
              <Text>Select Contacts</Text>
          </Button>
        )}

        <Form style={styles.messageBox} >
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Message"
            value={this.state.text}
            multiline = {true}
            maxLength={160}
            onChangeText={text => {
              this.setState({text:text});
              this._toggleSaveIfPossible(this.state.chosenContacts, text);
            }} />
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  scrollArea: {
    height: 80,
    backgroundColor: 'yellow',
    borderRadius: 4,
  },
  psuedoButton: {
  },
  selectContactsButton: {
    margin: 16,
  },
  chipArea: {
    minHeight:80,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  chip: {
    margin: 2,
  },
  messageBox: {
    flex: 1,
    marginTop: 24,
    maxHeight: 300,
  }
});

export default AlarmNotify;
