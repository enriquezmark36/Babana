import React from 'react';
import * as Paper from 'react-native-paper';
import ReactNative from 'react-native';

const {
  Divider,
  List,
  Caption,
  withTheme,
  IconButton,
  Colors,
} = Paper;

const {
  View,
  Text,
  StyleSheet,
  FlatList,
} = ReactNative;

export function left(props){

}


// The this.* I think assumes the caller. We only use this with a
// caller with react-navigation so this may work
export function right(props) {
  return(
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Caption {...props}> Notify Someone </Caption>
      <IconButton {...props}
        icon="chevron-right"
        size={24}
      />
    </View>
  )
}

export function onPress(props) {
  props.navigation.navigate('AlarmNotify')
};
