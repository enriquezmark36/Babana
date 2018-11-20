import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Container, Content, Button, Header, Input, Item, Left} from 'native-base';

import RNGGooglePlaces from 'react-native-google-places';
export default class SearchBox extends Component{

    // function handleInput(key,val){
    //     getInputData({
    //         key,
    //         value: val
    //     });
    // }

    render(){
        return(
            <Header searchBar rounded>
                <Item>
                    <Input placeholder="Search" />
                </Item>
            </Header>
        );
    }
}
