import React, {Component} from 'react';

import {
    View,
    Image
} from 'react-native';

export default class Splash extends Component {
    render() {
        return (
            <View>
                <Image source={require('../../assets/Home/Logo.png')} style={Style.Logo}/>
            </View>
        )
    }
}

const Style={
    Logo:{
        width:'45%',
        height:'45%'
    },
};
