import React, { Component } from 'react';
import * as Paper from 'react-native-paper';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
import { ActionCreators } from '../actions';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

const {
  Appbar,
} = Paper;

const {
  View,
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
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        <View style={styles.swipeContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  map: {
    flex: 41,
    alignSelf: 'stretch',
  },
  swipeContainer: {
    flex: 28,
    backgroundColor: 'green',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlarm);
