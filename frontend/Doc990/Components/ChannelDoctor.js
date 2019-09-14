import React, { Component } from 'react';
import {Text,View,ImageBackground} from 'react-native';
class ChannelDoctor extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>
                <View>
                    <Text>Channel Doctor</Text>
                    <View>
                        <Text>Summary</Text>
                        <Text>{"Doctor Name: "+this.props.Name}</Text>
                        <Text>{"Specialization: "+this.props.Specialization}</Text>
                        <Text>{"Hospital : "+this.props.Hospital}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
const styles={
    Background:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    }
};
export default ChannelDoctor;
