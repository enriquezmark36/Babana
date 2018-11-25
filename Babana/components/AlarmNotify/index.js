import React, { PureComponent } from 'react';
import * as NativeBase from 'native-base';
import ReactNative, {PermissionsAndroid} from 'react-native';

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
      contactList: [],
      lastIndex: 0,
      message: '',
    };
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
                onPress={ () => {
                  params.saveFunc();
                  navigation.goBack();}} >
                    <Icon name="save"/>
              </Button>
            </Right>
        </Header>
      )
    }
  };

  _mapChildToState(contactList, lastIndex) {
    this.setState({contactList, lastIndex});
    this._toggleSaveIfPossible(contactList, this.state.message);
  }

  // Don't try use the state, especially if you've used setState
  // Before this, The state would be one step back.
  _toggleSaveIfPossible(contactList, message){
    const {navigation} = this.props;

    if ((contactList.length !==0 ) && (message.length !== 0)) {
      navigation.setParams({canSave: true});
      return;
    }

    if (navigation.getParam('canSave', true) == true)
      navigation.setParams({canSave: false});
  }


  _showContactPicker(push) {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(
        response => {
            if(response === true){
                const { contactList, lastIndex } = this.state;
                const mapStateToParent = this._mapChildToState.bind(this);

                push('ContactPicker',
                      {mapStateToParent, contactList, lastIndex});
            }else{
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
            }
        }
    )

  }

  _save() {
    const {navigation} = this.props;
    const {contactList, message, lastIndex} = this.state;

    callback = navigation.getParam('mapStateToParent', () => {});

    callback(contactList, message, lastIndex);
  }

  componentDidMount() {
    const {navigation} = this.props;

    // Restore (or rehydrate) state back
    contactList = navigation.getParam('contactList', []);
    message = navigation.getParam('message', '');
    lastIndex = navigation.getParam('lastIndex', 0);
    saveFunc = navigation.getParam('mapComponentToProps', () => {});
    this.setState({
        contactList: contactList,
        message: message,
        lastIndex: lastIndex,
    })

    // Pass callback functions to Appbar component
    navigation.setParams({
      saveFunc: this._save.bind(this),
      canSave: (contactList.length !== 0),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { (this.state.contactList.length !== 0) && (
          <View>
            <Text>Selected Contacts:</Text>
            <ScrollView style={styles.scrollArea} >
              <TouchableNativeFeedback
                useForeground
                style={styles.psuedoButton}
                onPress={() => this._showContactPicker(this.props.navigation.push)} >
                  <View style={styles.chipArea}>
                    {Chip(this.state.contactList, true)}
                  </View>
              </TouchableNativeFeedback>
            </ScrollView>
          </View>
        ) || (
          <Button full
            style={styles.selectContactsButton}
            onPress={() => this._showContactPicker(this.props.navigation.push)}>
              <Text>Select Contacts</Text>
          </Button>
        )}

        <Form style={styles.messageBox} >
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Message"
            value={this.state.message}
            multiline = {true}
            maxLength={160}
            onChangeText={message => {
              this.setState({message});
              this._toggleSaveIfPossible(this.state.contactList, message);
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
