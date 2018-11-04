import React, { Component } from 'react';
import {
  Button,
  Appbar,
  Text,
  Divider,
  List,
  Switch,
  FAB,
  Portal,
  IconButton,
  TextInput,
} from 'react-native-paper';
import {
  View,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  Image,
  StyleSheet,
  NativeModules
} from 'react-native';
import AlarmListView from '../components/AlarmListView';

// Redux + thunk, functions as actions
import { ActionCreators } from '../actions';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    alarmLister: state.alarmLister,
    alarmCounter: state.alarmCounter
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testAddAlarmName: '',
    };
    something = this;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: Home._header(navigation),
    }
  };

  static _header(navigation) {
    return (<Appbar.Header style={styles.topBar}>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Babana Home" />
      <Appbar.Action
        icon="add"
        onPress={() =>{
          console.log(navigation);
          navigation.push('AddAlarm');
        }}
      />
    </Appbar.Header>);
  }

  _addAlarm() {
    if (this.state.testAddAlarmName === '')
      return;
    this.props.insertAlarm({
      name: this.state.testAddAlarmName,
      switch: false,
      location: "location",
      id: this.props.alarmCounter,
    });
    this.state.testAddAlarmName = '';
  }

  _enumerateAlarms() {
    return Object.keys(this.props.alarmLister).map(key => this.props.alarmLister[key])
  }

  render() {
    return (
      <View style={styles.container}>
        {/*
          * TESTING: Add alarm by name
          */}
        <View style={styles.addAlarmSection} >
          <TextInput
            style={styles.addAlarmTestInput}
            label='Add alarm'
            returnKeyType='search'
            placeholder='alarm name'
            onChangeText={(testAddAlarmName) => this.setState({testAddAlarmName})}
            value={this.state.testAddAlarmName}
          />
          <Text>
            Alarms created: {this.props.alarmCounter}
          </Text>
        </View>

        {/*
          * Lists all alarms
          */}
        <AlarmListView {...this.props} style={styles.addAlarmSection} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAlarmSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAlarmTestInput: {
    width: 100,
  },
  alarmListSection: {
    flex:1,
    alignSelf:'stretch',
  },
  alarmItem: {
    paddingLeft: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
