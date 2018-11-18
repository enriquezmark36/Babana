import React, { PureComponent } from 'react';
import * as Paper from 'react-native-paper';
import ReactNative from 'react-native';

const {
  Appbar,
  Chip,
  Input,
  TextInput,
  Surface,
  withTheme,
  TouchableRipple,
  Text,
  Button,
} = Paper;

const {
  View,
  StyleSheet,
  ScrollView,
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
    this._saveContacts = this._saveContacts.bind(this);
    this._toggleSaveIfPossible = this._toggleSaveIfPossible.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const params = { ...initialParams, ...navigation.state.params };
    return {
      header: (
        <Appbar.Header>
          <View style={{flexDirection: 'row', alignItems: 'center'}} >
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Notify" />
            <Appbar.Action
              icon="save"
              disabled={!params.canSave}
              onPress={ () => navigation.goBack()} />
          </View>
        </Appbar.Header>
      )
    }
  };

  _saveContacts(contactList, lastIndex) {
    this.setState({
      chosenContacts: contactList,
      lastIndex: lastIndex,
    });
    this._toggleSaveIfPossible();
  }

  _toggleSaveIfPossible(){
    const {chosenContacts, text} = this.state;
    const {navigation} = this.props;

    if ((chosenContacts.length !==0 ) && (text !== '')) {
      navigation.setParams({canSave: true});
      return;
    }

    if (navigation.getParam('canSave', false) == true)
      navigation.setParams({canSave: false});
  }


  render() {
    return (
      <View style={styles.container}>
        { (this.state.chosenContacts.length !== 0) && (
        <View>
          <Text>Selected Contacts:</Text>

          <ScrollView style={styles.scrollArea} >
            <TouchableRipple
              onPress={() =>
                this.props.navigation
                    .push('ContactPicker',
                          {
                            saveCallback: this._saveContacts,
                            initialList: this.state.chosenContacts,
                            lastIndex: this.state.lastIndex,
                          }
                    )
              }
            >
              <View style={styles.chipArea}>
                {this.state.chosenContacts.map((item, index) => (
                    <Chip style={styles.chip} key={item.id}>
                      <Text>{item.number}</Text>
                    </Chip>
                ))}
              </View>
            </TouchableRipple>
          </ScrollView>
        </View>
        ) || (
          <Button
            style={styles.selectContactsButton}
            mode="contained"
            onPress={() => this.props.navigation
                  .push('ContactPicker',{saveCallback: this._saveContacts,})}>
              <Text>Select Contacts</Text>
          </Button>
        )}

        <TextInput
          label='Message'
          style={styles.messageBox}
          value={this.state.text}
          multiline = {true}
          maxLength={160}
          onChangeText={text => {
            this.setState({text:text})
            this._toggleSaveIfPossible();
          }}
        />
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
  selectContactsButton: {
    margin: 16,
    backgroundColor: 'yellow',
  },
  chipArea: {
    minHeight:40,
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

export default withTheme(AlarmNotify);
