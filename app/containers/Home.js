import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        * Application Bar
        */}
        <Appbar.Header style={styles.topBar}>
          <Appbar.Action
            icon="menu"
            onPress={() =>{
              console.log('Pressed menu');
              this.props.navigation.toggleDrawer();
            }}
          />
          <Appbar.Content title="Babana" />
          <Appbar.Action
            icon="add"
            onPress={() =>{
              console.log('Going to add an Alarm');
              this._addAlarm();
            }}
          />
        </Appbar.Header>

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

export default connect(mapStateToProps)(Home);
