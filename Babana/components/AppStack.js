import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as NativeBase from 'native-base';

import App from '../components/App'

const {
  Header,
  Body,
  Left,
  Button,
  Icon,
  Title,
  Right,
} = NativeBase;

// Define your additional Screens/Pages here
// You may write it something like this:
// const AppScreens = {
//   About: About,
//   Settings: Settings
// };
const AppScreens = {
};

const routes = Object.keys(AppScreens)
  .map(id => ({ id, item: AppScreens[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = (props => <Comp {...props} />);

    if (typeof Comp.navigationOptions === 'undefined')
      Screen.navigationOptions = (props) => ({
        header: (
          <Header>
            <Left>
              <Button transparent onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{id}</Title>
            </Body>
            <Right />
          </Header>
        )
      });
    else
      Screen.navigationOptions = Comp.navigationOptions;

    return {
      ...acc,
      [id]: { screen: Screen },
    };
  }, {});


// Just for the picky, removes header by default
// if navigationOptions is undefined
function disableHeaderIfUndef(Comp) {
  if (typeof Comp.navigationOptions === 'undefined')
    Comp.navigationOptions = (props) => ({
      header: null
    });
  return Comp;
}

const AppStack = createStackNavigator(
  {
    App: { screen: disableHeaderIfUndef(App)},
    ...routes,
  },
)

export default createAppContainer(AppStack);
