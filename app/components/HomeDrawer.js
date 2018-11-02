import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { TouchableRipple, Drawer } from 'react-native-paper';
import Home from '../containers/Home';

export const HomeDrawer = createDrawerNavigator(
  { Home: { screen: Home }},
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
