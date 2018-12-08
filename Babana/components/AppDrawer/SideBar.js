import React, {PureComponent} from 'react';
import { View, StyleSheet, ScrollView, SectionList } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Container, Content, Text, ListItem, Left, Body, Right, Button, Icon, Separator } from "native-base";

import SettingRingtone from './SettingRingtone'
import SettingVibrate from './SettingVibrate'


class SideBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: 0,
    };
  }

  _renderRoutesOnPress = (item, index) => {
    this.setState({selectedKey: index});
    this.props.navigation.navigate(item);
  }

  _renderRoutes = ({ item, index, section: { title, data } }) => (
    <ListItem
      key={index}
      button
      noBorder
      noIndent
      onPress={() => this._renderRoutesOnPress(item, index)}
      style={this.state.selectedKey === index ? styles.selectedListItem : {}}
    >
      <Text
        style={this.state.selectedKey === index ? styles.selectedText : {}}
      >
        {item}
      </Text>
    </ListItem>
  );

  _renderSettings = ({ item, index, section: { title, data } }) => {
    if (typeof item !== 'function')
      return null;
    return item(this.props);
  }

  componentWillMount() {
    this.setState({
      sections: [
        { title: null,
          data: ['Home', 'About'],
          renderItem: this._renderRoutes,
          keyExtractor: (item, index) => (index.toString())
        },
        { title: 'Settings',
          data: [
            (props) => (<SettingRingtone {...props}/>),
            (props) => (<SettingVibrate {...props}/>),
          ],
          renderItem: this._renderSettings,
          keyExtractor: (item, index) => (index.toString())
        },
      ]
    });
  }
  _sectionHeader({section: { title, data }}) {
    if (title === null) {
      return null;
    } else {
      return (
        <Separator>
          <Text>{title}</Text>
        </Separator>
      );
    }
  }

  render() {
    return (
      <Container>
        <Content style={{marginTop:8}}>
          <SectionList
            renderItem={() => {return null}}
            sections={this.state.sections}
            renderSectionHeader={this._sectionHeader}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  selectedListItem: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  selectedText:{
    color: "#d500f9",
  },
});
export default SideBar;
