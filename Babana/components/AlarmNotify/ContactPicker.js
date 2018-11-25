import React, { PureComponent } from 'react';
import ReactNative from 'react-native';
import Contacts from 'react-native-contacts';
import * as NativeBase from 'native-base';

import ContactsListView from './ContactsListView'
import * as ContactPickerHeader from './ContactPickerHeader'
import Chip from './ChipArea';

const {
  NormalHeader,
  SearchingHeader,
  ManualHeader,
} = ContactPickerHeader;

const {
  Text,
  ListItem,
  Left,
  Body,
  Right,
  List,
  Icon,
  Input,
  Button,
  Header,
  Title,
  Spinner,
  Item,
} = NativeBase;

const {
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
} = ReactNative;

const initialParams = {
  number: '',
  searching: false,
  manualAdd: false,
  canSave: false,
};

class ContactPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactsCopy: null,
      contacts: null,
      loadingList: true,
      loadingMessage: 'Loading',
      contactList: [],
      lastIndex: 0,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = { ...initialParams, ...navigation.state.params };
    return {
      header: (
        <View>
        { (params.searching && (
            SearchingHeader(navigation)
          )) || (params.manualAdd && (
            ManualHeader(navigation)
          )) || (
            NormalHeader(navigation)
          )
        }
        </View>
      ),
    };
  };

  _addNumber = (name, number, id) => {
    const {contactList} = this.state;
    const {navigation} = this.props;

    if (contactList.length === 0)
      navigation.setParams({canSave: true});

    this.setState((state, props) => {
      return {
        contactList: [...state.contactList,
          {
            number: number,
            fullname: name,
            id: state.lastIndex.toString() + id,
          }
        ],
        lastIndex: state.lastIndex + 1,
      };
    })
  }

  _removeNumber = (index) => {
    const {contactList} = this.state;
    const {navigation} = this.props;

    if (contactList.length === 1)
      navigation.setParams({canSave: false});

    tmp = [...this.state.contactList];
    tmp.splice(index, 1);
    this.setState({contactList: tmp});
  }

  _filter = (query) => {
    if (typeof query !== "string")
      return;

    if (query === "") {
      this.setState({contacts: this.state.contactsCopy});
    } else {
      contacts = this.state.contactsCopy
          .filter((item) => {
            if (item.fullname.toLowerCase().indexOf(query) != -1)
              return true;

            return false;
          });

      this.setState({contacts});
    }
  }

  _createPreReqKeys = (err, contacts) => {
      if (err)
        throw err;

      output = contacts
          .map((item) => {
            // Add a combined name element
            familyName =
                (typeof item.familyName !== 'string' ? "": item.familyName );
            givenName =
                (typeof item.givenName !== 'string' ? "": item.givenName + " ");
            middleName =
                (typeof item.middleName !== 'string' ? "": item.middleName + " ");
            _fullname = givenName.concat(middleName, familyName);

            newItem={ ...item, fullname: _fullname };

            return newItem;
          }).sort((a, b) => a.fullname.localeCompare(b.fullname));

      this.setState({
        contacts: output,
        contactsCopy: output,
        loadingList: false,
      });
  }

  _handleBackPress = () => {
    const {state, setParams} = this.props.navigation;
    const {searching, manualAdd} = state.params;

    if (searching) {
      setParams({ searching: false})
      return true;
    }
    if (manualAdd) {
      setParams({ manualAdd: false})
      return true;
    }
    return false;
  }

  _save() {
    const {navigation} = this.props;
    const {contactList, lastIndex} = this.state;

    callback = navigation.getParam('mapStateToParent', () => {});

    callback(contactList, message, lastIndex);
  }

  componentDidMount() {
    const {navigation} = this.props;

    // Retrieve Contacts, in case I need to be explicit
    Contacts.getAll(this._createPreReqKeys);

    // Restore (or rehydrate) state back
    contactList = navigation.getParam('contactList', []);
    lastIndex = navigation.getParam('lastIndex', 0);
    this.setState({
      contactList: contactList,
      lastIndex: lastIndex,
    })

    // Pass functions to Appbar component
    navigation.setParams({
      filter: this._filter.bind(this),
      addNumber: this._addNumber.bind(this),
      saveFunc: this._save.bind(this),
      canSave: (contactList.length !== 0),
    });

    // Allow going back to default app bar using the
    // hw back button.
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  render() {
    return (
      <View style={styles.container}>
        { (this.state.contactList.length !== 0) && (
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.chipArea} >
              {this.state.contactList.map((item, index) => (
                  <Button rounded light small
                    style={styles.chip}
                    key={item.id}
                    onPress={() => this._removeNumber(index)}
                    onClose={() => this._removeNumber(index)}
                  >
                    <Text style={{color:'black'}} >{item.number}</Text>
                  </Button>
              ))}
          </ScrollView>
        )}
        <View style={styles.surface}>
          { this.state.loadingList && (
            <View style={styles.loadingArea}>
              <Spinner
                size={64}
                style={styles.spinner} />
              <Text>{this.state.loadingMessage}</Text>
            </View>
          ) || (
            <ContactsListView
              contacts={this.state.contacts}
              callbackAdd={this._addNumber} />
          )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollArea: {
    maxHeight: 80,
    flex: 1,
    backgroundColor: 'yellow',
  },
  chipArea: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  chip: {
    margin: 2,
  },
  spinner: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
  },
  surface: {
    flex: 1,
    elevation: 32,
  },
  loadingArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
});

export default ContactPicker;
