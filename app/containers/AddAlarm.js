import React, { Component } from 'react';
import * as Paper from 'react-native-paper';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
import { ActionCreators } from '../actions';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';
import AddAlarmOptions from '../components/AddAlarmOptions';

const {
  Appbar,
  Chip,
} = Paper;

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

class AddAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlarmName: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header:(
        <Appbar.Header style={styles.topBar}>
          <Appbar.BackAction onPress={() => navigation.pop()} />
          <Appbar.Content title="Add Alarm" />
          <Appbar.Action
            disabled={true}
            icon="add"
            onPress={() =>{
              console.log(navigation);
            }}
          />
        </Appbar.Header>
      )
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <Text> Dummy map </Text>
        {/*<MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView> */}
        </View>
        <Chip style={styles.etaChip}
              onPress={() => console.log('Pressed')}
        >
          Time to Destination: 59 minutes
        </Chip>
        <View style={styles.listContainer}>
          <AddAlarmOptions {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
  },
  map: {
    flex: 11,
    alignSelf: 'stretch',
  },
  listContainer: {
    flex: 13,
  },
  etaChip: {
    alignSelf: 'center',
    backgroundColor: 'yellow',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlarm);
