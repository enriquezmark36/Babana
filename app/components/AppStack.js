import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import Home from '../containers/Home';

const AppScreens = {};

const routes = Object.keys(AppScreens)
  .map(id => ({ id, item: AppScreens[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = (props => <Comp {...props} />);

    if (typeof Comp.navigationOptions === 'undefined')
      Screen.navigationOptions = (props) => ({
        header: (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => props.navigation.goBack()} />
            <Appbar.Content title={(Comp: any).title} />
          </Appbar.Header>
        ),
      });

    return {
      ...acc,
      [id]: { screen: Screen },
    };
  }, {});

export default createStackNavigator(
  {
    Home: { screen: Home},
    ...routes,
  },
);
