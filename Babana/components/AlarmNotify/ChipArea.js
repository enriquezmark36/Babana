import React, { PureComponent } from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import theme from '../../native-base-theme/variables/material';

const Chip = (array, isDisabled) => (
  array.map((item, index) => (
    <Button light small rounded
      disabled={isDisabled}
      style={styles.chip}
      key={item.id} >
        <Text>{item.number}</Text>
    </Button>
    ))
)

const styles = StyleSheet.create({
  chip: {
    margin: 2,
  },
});

export default Chip;
