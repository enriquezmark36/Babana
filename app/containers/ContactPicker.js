import React, { PureComponent } from 'react';
import * as Paper from 'react-native-paper';
import ReactNative from 'react-native';
import { ActionCreators } from '../actions';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';
import Contacts from 'react-native-contacts';
import ContactsListView from '../components/ContactsListView'

const {
  Appbar,
  Chip,
  Searchbar,
  Surface,
  Subheading,
  withTheme,
} = Paper;

const {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} = ReactNative;

const initialParams = {
  number: '',
  searching: false,
  manualAdd: false,
  canSave: false,
};

function _hashCode(string){
    var hash = 0, i, chr;
    if (string.length === 0)
      return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

class ContactPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactFullList: null,
      contactList: null,
      loadingList: true,
      loadingMessage: 'Loading',
      chosenNumbers: [],
      indxCounter: 0,
    };
    this._filter = this._filter.bind(this);
    this._addNumber = this._addNumber.bind(this);
    this._writeBackContacts = this._writeBackContacts.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const params = { ...initialParams, ...navigation.state.params };
    return {
      header: (
        <Appbar.Header>
          {/*Normal Operation*/}
          { !params.searching && !params.manualAdd && (
            <View style={{flexDirection: 'row', alignItems: 'center'}} >
              <Appbar.BackAction onPress={() => navigation.pop()} />
              <Appbar.Content title="Contacts" />
              <Appbar.Action icon="search"
                onPress={ () => navigation.setParams({searching: true,})} />
              <Appbar.Action icon="dialpad"
                onPress={ () => navigation.setParams({manualAdd: true,})} />
              <Appbar.Action icon="save" disabled={!params.canSave}
                onPress={ () => {
                  params.saveFunc(navigation.getParam('saveCallback', ()=>{}));
                  navigation.pop();
                }} />
            </View>
          )}

          {/*When filtering through contacts*/}
          { params.searching && (
            <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
              <Searchbar
                style={{flex:1}}
                placeholder="Filter"
                icon="arrow-back"
                value={params.filterCont}
                onChangeText={query => {
                  navigation.setParams({
                    filterCont: query,
                  });
                  params.filter(query.toLowerCase());
                }}
                onIconPress={ () =>
                  navigation.setParams({searching: false,})}
              />
            </View>
          )}

          {/*When manually adding numbers*/}
          { params.manualAdd && (
            <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
              <Searchbar
                style={{flex:1}}
                placeholder='Add Phone Number'
                icon="arrow-back"
                keyboardType='numeric'
                value={params.number}
                onChangeText={query => {
                  if (query === '')
                    return;
                  navigation.setParams({
                    number: query,
                  });
                }}
                onIconPress={ () =>
                  navigation.setParams({manualAdd: false,})}
              />
              <Appbar.Action icon="add"
                onPress={ () => {
                  params
                    .addNumber("", params.number, _hashCode(params.number)
                        .toString());
                  navigation.setParams({
                    number: "",
                  });
                }}
              />

            </View>
          )}

        </Appbar.Header>
      )
    }
  };

  _writeBackContacts(callback) {
    const {chosenNumbers, indxCounter} = this.state;
    callback(chosenNumbers, indxCounter);
  }

  _addNumber = (name, number, id) => {
    const {chosenNumbers} = this.state;
    const {navigation} = this.props;

    if (chosenNumbers.length === 0)
      navigation.setParams({canSave: true});

    this.setState((state, props) => {
      return {
        chosenNumbers: [...state.chosenNumbers,
          {
            number: number,
            fullname: name,
            id: (_hashCode(id) + state.indxCounter).toString(),
          }
        ],
        indxCounter: state.indxCounter + 1,
      };
    })
  }

  _removeNumber = (index) => {
    const {chosenNumbers} = this.state;
    const {navigation} = this.props;

    if (chosenNumbers.length === 1)
      navigation.setParams({canSave: false});

      tmp = [...this.state.chosenNumbers];
      tmp.splice(index, 1);
      this.setState({chosenNumbers: tmp});
  }

  _filter = (query) => {
    if (typeof query !== "string")
      return;

    if (query === "") {
      this.setState({contactList: this.state.contactFullList});
    } else {
      waitup = this.state.contactFullList
            .filter((item) => {
              if (item.fullname.toLowerCase().indexOf(query) != -1)
                return true;

              return false;
            })

      this.setState({contactList: waitup});
    }

  }

  _createPreReqKeys = (err, contacts) => {
      if (err)
        throw err;

      output = contacts
            .map((item) => {

              // Add a combined name element
              familyName = (typeof item.familyName !== 'string' ? "": item.familyName );
              givenName = (typeof item.givenName !== 'string' ? "": item.givenName + " ");
              middleName = (typeof item.middleName !== 'string' ? "": item.middleName + " ");
              _fullname = givenName.concat(middleName, familyName);

              newItem={...item,
                fullname: _fullname,
              };

              return newItem;
            })
            .sort((a, b) => a.fullname.localeCompare(b.fullname));

      this.setState({
        contactList: output,
        contactFullList: output,
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

  componentDidMount() {
    const {navigation} = this.props;

    // Retrieve Contacts, in case I need to be explicit
    Contacts.getAll(this._createPreReqKeys);

    // Restore (or rehydrate) state back
    initialList = navigation.getParam('initialList', []);
    indxCounter = navigation.getParam('lastIndex', 0);
    this.setState({
        chosenNumbers: initialList,
        indxCounter: indxCounter,
    })

    // Pass callback functions to Appbar component
    navigation.setParams({
      filter: this._filter,
      addNumber: this._addNumber,
      saveFunc: this._writeBackContacts,
      canSave: (initialList.length !== 0),
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
        { (this.state.chosenNumbers.length !== 0) && (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.chipArea}
        >
          {this.state.chosenNumbers.map((item, index) => (
              <Chip
                style={styles.chip}
                key={item.id}
                onPress={() => this._removeNumber(index)}
                onClose={() => this._removeNumber(index)}
              >
                <Text>{item.number}</Text>
              </Chip>
          ))}
        </ScrollView>
        )}
        <Surface style={styles.surface}>
        { this.state.loadingList && (
          <View style={styles.loadingArea}>
            <ActivityIndicator
              size={64}
              color={this.props.theme.colors.accent}
              style={{flexDirection: 'row', alignSelf: 'center', padding: 10}}
            />
            <Subheading>{this.state.loadingMessage}</Subheading>
          </View>
        ) || (
          <ContactsListView contactList={this.state.contactList} callbackAdd={this._addNumber} />
        )
        }
        </Surface>
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

export default withTheme(ContactPicker);
