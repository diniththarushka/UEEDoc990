import React,{Component} from 'react';
import axios from 'axios';
import {Text, View,ImageBackground,Dimensions,TextInput,Image,Button,Modal, TouchableHighlight, Alert} from "react-native";

const Serv_PORT=4000;

export default class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            results:false,
            DoctorName:''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.SearchDoctor = this.SearchDoctor.bind(this);
    }

    toggleModal(){
        this.setState({
            results:!this.state.results
        })
    }

    onChangeName(e){
        this.setState({
            DoctorName:e.nativeEvent.text
        })
    }
    SearchDoctor(){
        this.toggleModal();
        console.log("herer");
        axios.get('http://localhost:4000/doctor').then((res)=>{
            console.log("herers");
           console.log(res);
        }).catch((err)=>{
            console.error(err);
        });
        console.log('Button Click: '+this.state.DoctorName);
    }

    render() {
        return(
            <ImageBackground source={require('./assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>

                <View style={{marginTop:22}} >
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.results}
                        onRequestClose={() => {
                            Alert.alert('Results window has been closed.');
                        }}>
                        <View style={{marginTop: 22}}>
                            <View style={styles.ModalParams}>
                                <Text style={styles.ModalTextParams}>Results</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.toggleModal();
                                    }}>
                                    <Text style={{color:'#fc9097'}}>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.LogoContainer} >
                    <Image source={require('./assets/Home/Logo.png')} style={styles.Logo} resizeMode={'contain'}/>
                </View>
                <View style={styles.View}>
                <Text style={styles.TextHeading}>Doctor Search</Text>
                    <View style={styles.TextInputBox}>
                        <Image source={require('./assets/Home/searchicon.png')} style={styles.InputBoxIcon} resizeMode={'stretch'}/>
                        <TextInput style={styles.InputBox} onChange={this.onChangeName} value={this.state.DoctorName} placeholder={' Enter Doctor name here'} placeholderTextColor="#000"/>
                    </View>
                    <View style={styles.SearchBtn}>
                        <Button title={'Search Doctor'} onPress={()=>{this.SearchDoctor()}} color={'#7BA6EF'}/>
                    </View>
                </View>
            </ImageBackground>

        );
    }
}
const styles={
    LogoContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    Logo:{
        width:'45%',
        height:'45%'
    },
    Background:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    View:{
        position:'absolute',
        backgroundColor:'black',
        opacity:0.5,
        width:(Dimensions.get('window').width/4)*3,
        height:Dimensions.get('window').height/3,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 0.5,
        zIndex:-1,
        marginTop:Dimensions.get('window').height/2.5,
        marginLeft:(Dimensions.get('window').width/4)-(Dimensions.get('window').width/8)
    },
    TextHeading:{
        paddingLeft:(Dimensions.get('window').width/5),
        color:'white',
        fontWeight:'bold',
        fontFamily:'sans-serif',
        textDecorationLine: 'underline',
        fontSize:20,
        marginTop:Dimensions.get('window').height/20,
    },
    TextInputBox:{
        height:Dimensions.get('window').height/25,
        marginTop:Dimensions.get('window').height/25,
        marginLeft:(Dimensions.get('window').width/15),
        width:(Dimensions.get('window').width/4)*2.4,
        borderColor: 'black',
        backgroundColor:'white',
        borderWidth: 1,
        borderRadius: 8,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    InputBox:{
        position:'absolute',
        width:(Dimensions.get('window').width/4)*2,
        color:'black',
        marginTop:0,
        marginLeft:(Dimensions.get('window').width/4)*2.4 - (Dimensions.get('window').width/4)*2
    },
    InputBoxIcon:{
        height:Dimensions.get('window').height/25,
        width:Dimensions.get('window').height/25
    },
    SearchBtn:{
        marginLeft:((Dimensions.get('window').width/4)*3 - (Dimensions.get('window').width/4)*2)/2,
        marginTop:Dimensions.get('window').height/25,
        width:(Dimensions.get('window').width/4)*2,
        borderWidth:0.5,
        borderRadius:8
    },
    ModalParams:{
        height:Dimensions.get('window').height/2,
        borderWidth:0.5,
        borderRadius:8,
        backgroundColor:'black',
        opacity:0.8
    },
    ModalTextParams:{
        color:'white',
        textAlign:'center',
        fontSize: 20,
        textDecorationLine: 'underline',
    }
};
