import React, { Component } from 'react';
import Paper from 'react-native-paper';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
import { ActionCreators } from '../actions';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  map: {
    height: 300,
    width: 300,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlarm);
