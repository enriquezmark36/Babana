import React, {Component} from 'react';
import * as ReactNative from 'react-native'
import * as NativeBase from 'native-base';
import * as RNPackage from '../../package.json';

import DevsFragment from './DevsFragment';
import RNCFragment from './RNCFragment';

const {
  StyleSheet,
  View,
  Image,
  Linking,
  TouchableNativeFeedback,
  ScrollView,
} = ReactNative;

const {
  Container,
  Title,
  Header,
  Body,
  Text,
  Button,
  Left,
  Right,
  Icon,
  Card,
  CardItem,
  List,
} = NativeBase;

const {
  dependencies,
  name,
  version,
} = RNPackage;

const GithubRepo = "https://github.com/enriquezmark36/Babana";
const IssueTracker = GithubRepo + "/issues";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

   static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()} >
                <Icon name="arrow-back"/>
              </Button>
            </Left>

            <Body>
              <Title>About</Title>
            </Body>

            <Right>
            </Right>
        </Header>
      )
    }
  };

  // Honestly, I didn't like the CardItem button
  // So we're using the venerable TouchableNativeFeedback
  // Since this app is only for android.
  render() {
    return (
      <Container>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <CardItem header bordered>
            <Image style={styles.banner}
              source={require('../../resources/banner.png')}
            />
            <Title> Location-based Alarm </Title>
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="info-outline" />
              <Body>
                <Text> Version </Text>
                <Text note> {version} </Text>
              </Body>
            </Left>
          </CardItem>
          <TouchableNativeFeedback onPress={()=>{Linking.openURL(GithubRepo)}}>
            <CardItem>
              <Left>
                <Icon name="github-circle" type="MaterialCommunityIcons" />
                <Text> Fork on github </Text>
              </Left>
            </CardItem>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={()=>{Linking.openURL(IssueTracker)}}>
          <CardItem>
            <Left>
              <Icon name="bug-report" />
              <Text> Report an Issue </Text>
            </Left>
          </CardItem>
          </TouchableNativeFeedback>
        </Card>

      <DevsFragment/>

      <RNCFragment/>
      </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  banner:{
    height: 40,
    width: 100,
  },
});
