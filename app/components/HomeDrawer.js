import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { TouchableRipple, Drawer, withTheme } from 'react-native-paper';
import AppStack from '../components/AppStack';

export default createDrawerNavigator(
  { Home: { screen: AppStack }},
  {
    contentComponent: () => (
        <View>
          <Drawer.Section title="Section Label">
            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Drawer.Item label="Settings?" />
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Drawer.Item label="Leche Ayaw ko na" />
            </TouchableRipple>
          </Drawer.Section>
        </View>
    ),
  }
);
