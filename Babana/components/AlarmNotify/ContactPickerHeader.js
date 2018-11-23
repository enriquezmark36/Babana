import React, { PureComponent } from 'react';
import ReactNative from 'react-native';
import * as NativeBase from 'native-base';

const {
  Left,
  Body,
  Right,
  Icon,
  Button,
  Header,
  Title,
  Item,
  Input,
} = NativeBase;

function _hashCode(string){
  var hash = 0, i, chr;
  if (string.length === 0)
    return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const NormalHeader = (navigation) => (
  <Header>
    <Left>
      <Button transparent onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" />
      </Button>
    </Left>

    <Body>
      <Title>Contacts</Title>
    </Body>

    <Right>
      <Button transparent
        onPress={ () => navigation.setParams({searching: true,})}>
          <Icon name="search" />
      </Button>
      <Button transparent
        onPress={ () => navigation.setParams({manualAdd: true,})}>
          <Icon name="dialpad" />
      </Button>
      <Button transparent
        disabled={!navigation.getParam('canSave', false)}
        onPress={ () => {
            navigation.getParam('saveFunc', () => {})
                      (navigation.getParam('saveCallback', ()=>{}));
            navigation.pop();
        }} >
          <Icon name="save" />
      </Button>
    </Right>
  </Header>
);

{/*When filtering through contacts*/}
export const SearchingHeader = (navigation) => (
  <Header searchBar rounded >
    <Item>
      <Button transparent small
        onPress={ () =>
            navigation.setParams({searching: false,})} >
        <Icon name="arrow-back" />
      </Button>

      <Input
        placeholder="Filter"
        value={navigation.getParam('filterCont', '')}
        onChangeText={query => {
          navigation.setParams({
            filterCont: query,
          });
          navigation.getParam('filter', () => {})(query.toLowerCase());
        }}/>
    </Item>
  </Header>
);

{/*When manually adding numbers*/}
export const ManualHeader = (navigation) => (
  <Header searchBar rounded>
    <Item>
      <Button transparent small
        onPress={ () =>
            navigation.setParams({manualAdd: false,})} >
        <Icon name="arrow-back" />
      </Button>

      <Input
        placeholder="Add Phone Number"
        keyboardType='numeric'
        value={navigation.getParam('number', '')}
        onChangeText={query => {
          if (query === '')
            return;
          navigation.setParams({number: query});
        }}
      />

      <Button transparent small
        onPress={ () => {
          navigation.getParam('addNumber', () => {})
            ("",
             navigation.getParam('number', ''),
             _hashCode(navigation.getParam('number', '')).toString());
          navigation.setParams({number: ""});
        }} >
        <Icon name="add" />
      </Button>
    </Item>
  </Header>
);
