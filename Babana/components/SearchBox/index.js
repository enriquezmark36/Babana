import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Container, Content, Button, Header, Input, Item} from 'native-base';

export default class SearchBox extends Component{
    render(){
        return(
            <Header searchBar rounded>
                <Item>
                    <Input placeholder="Search"></Input>
                </Item>
            </Header>
        );
    }
}
