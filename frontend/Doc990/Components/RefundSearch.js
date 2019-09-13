import React,{Component} from 'react';
import axios from 'axios/index';
import {Text, View,ImageBackground,Dimensions,TextInput,Image,Button,Modal, TouchableHighlight, TouchableOpacity,Alert,KeyboardAvoidingView,ScrollView} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Serv_PORT=4000;

export default class RefundSearch extends Component{
    // static navigationOptions = {
    //     title : 'Refund',
    // };
    constructor(props){
        super(props);

        this.state={
            resultsArr:[],
            results:false,
            // DoctorName:'',
            // DoctorSpec:'',


            RefNumber:'',
            NicOrPassport:''

        };

        // this.onChangeName = this.onChangeName.bind(this);
        // this.toggleModal = this.toggleModal.bind(this);
        // this.SearchDoctor = this.SearchDoctor.bind(this);

        this.onChangeRefNumber = this.onChangeRefNumber.bind(this);
        this.onChangeNicOrPassport = this.onChangeNicOrPassport.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.bankRefund = this.bankRefund.bind(this);
        this.mobileRefund = this.mobileRefund.bind(this);
        this.SearchRefund = this.SearchRefund.bind(this);

    }



    toggleModal(){
        this.setState({
            results:!this.state.results
        })
    }



    // onChangeName(e){
    //     this.setState({
    //         DoctorName:e.nativeEvent.text
    //     })
    // }

    onChangeRefNumber(e){
        this.setState({
            RefNumber:e.nativeEvent.text,
        })
    }

    onChangeNicOrPassport(e){
        this.setState({
            NicOrPassport:e.nativeEvent.text,
        })
    }

    bankRefund = () => {
        this.props.navigation.navigate('BankRefund');
    };

    mobileRefund= () => {
        this.props.navigation.navigate('MobileRefund');
    };




    SearchRefund(){

        const { RefNumber, NicOrPassport } = this.state;

        if(RefNumber == '' ){
            this.setState({Error:"The Reference Field is required" });
        }else if(NicOrPassport == '' ) {
            this.setState({Error:"The NIC OR PASSPORT Field is required"});
        } else {
            this.clearText();

        }


        // axios({
        //     method: 'get',
        //     url: 'http://10.0.2.2:'+Serv_PORT+'/doctor',
        //     // timeout: 3000, // Let's say you want to wait at least 180 seconds
        // }).then((res)=>{
        //     this.setState({
        //         resultsArr:res.data,
        //         // DoctorName:res.data[0].Name,
        //         // DoctorSpec:res.data[0].Specialization
        //
        //         RefNumber:res.data[0].Name,
        //         NicOrPassport:res.data[0].Nicorpassport
        //     });
        //     this.toggleModal();
        //
        // }).catch((err)=>{
        //     if(err){
        //         Alert.alert(
        //             "Error",
        //             err
        //         );
        //     }else{
        //         Alert.alert(
        //             "Error",
        //             "Error Fetching data from the server. Please check the name and your internet connection"
        //         );
        //     }
        // });
        // console.log('Button Click: '+this.state.RefNumber);


        this.toggleModal();
        console.log("herer");
        axios.get('http://localhost:4000/doctor').then((res)=>{
            console.log("herers");
            console.log(res);
        }).catch((err)=>{
            console.error(err);
        });
        console.log('Button Click: '+this.state.RefundName);

    }

    clearText(){
        this._textInput1.setNativeProps({text:''});
        this._textInput2.setNativeProps({text:''});

        setTimeout( ()=> {
            this._textInput1.setNativeProps({text:''});
            this._textInput2.setNativeProps({text:''});
        },3);
    }

    render() {
        // const { navigate } = this.props.navigation;
        let Results=this.state.resultsArr.map((result,key)=>{
            return<View style={Result.ResultContainer} key={key}>
                <View>
                    <Text style={Result.ResultTextImp}>{result.Name}</Text>
                    <Text style={Result.ResultTextNormal}>{result.NicOrpassport}</Text>
                    <Text style={Result.ResultTextNormal}>{result.Amount}</Text>
                </View>
                <View style={Result.ChannelBtn}>
                    <Button title={'Channel'} color={'#FD7474'}/>
                </View>
            </View>
        });
        return(
            <ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>


                <View style= {styles.View1}>


                    <TouchableOpacity
                        // onPress={()=> navigate('MobileRefund')}
                        onPress = {this.mobileRefund}
                        style={{ backgroundColor: '#6A6767', padding: 24,borderColor: '#ffffff',
                            borderRadius: 8,
                            borderWidth:1}}>
                        <Text style = {styles.NavigationHeaderText}>Mobile Bill/ Reload Refund</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={ ()=> navigate('BankRefund')}
                        onPress = {this.bankRefund}
                        style={{ backgroundColor: '#373636', padding: 24,borderColor: '#ffffff',
                            borderRadius: 8,
                            borderWidth:1,
                        marginTop:5}}>
                        <Text style = {styles.NavigationHeaderText}>Bank Refund</Text>
                    </TouchableOpacity>

                </View>

                <View style={{marginTop:22}} >



                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.results}
                        onRequestClose={() => {
                            Alert.alert('Results window has been closed.');
                        }}>

                        {/*<View style={{marginTop: 22}}>*/}
                        {/*<View style={ModalStyles.ModalParams}>*/}


                        {/*<Text style={Result.ResultTextImp}>{this.state.RefNumber}</Text>*/}
                        {/*<Text style={Result.ResultTextNormal}>{this.state.NicOrPassport}</Text>*/}
                        {/*<TouchableHighlight style={{position:'absolute',marginLeft:Dimensions.get('window').height/2-Dimensions.get('window').height/25}}*/}
                        {/*onPress={() => {*/}
                        {/*this.toggleModal();*/}
                        {/*}}>*/}
                        {/*<Image style={ModalStyles.CloseIcon} source={require('../assets/Home/Modal/close.png')}/>*/}
                        {/*</TouchableHighlight>*/}

                        {/*<ScrollView id={'resultList'}>*/}
                        {/*{*/}
                        {/*Results*/}
                        {/*}*/}
                        {/*</ScrollView>*/}
                        {/*</View>*/}
                        {/*</View>*/}


                        <View style={{marginTop: 30}}>
                            <View style={ModalStyles.ModalParams}>
                                <Text style={Result.ResultTextImp}>Results</Text>

                                <View style = {Result.ResultContainer}>
                                    <Text style={{color:'#161244',fontWeight:'bold',
                                        fontFamily:'Arial',
                                        fontSize:20,}}>Nawaloka Hospitals</Text>
                                    <Text style={Result.ResultText2}>Type = Channel Refund </Text>
                                    <Text style={Result.ResultText2}>Refund Amount - Rs.2000</Text>
                                    <Text style={Result.ResultText2}>Status = Refunded</Text>

                                </View>
                                <View style = {Result.ResultContainer}>
                                    <Text style={{color:'#161244',fontWeight:'bold',
                                        fontFamily:'Arial',
                                        fontSize:20,}}>Asiri Hospitals</Text>
                                    <Text style={Result.ResultText2}>Type = Channel Refund </Text>
                                    <Text style={Result.ResultText2}>Refund Amount - Rs.1000</Text>
                                    <Text style={Result.ResultText2}>Status = Refunded</Text>

                                </View>
                                <View style = {Result.ResultContainer}>
                                    <Text style={{color:'#161244',fontWeight:'bold',
                                        fontFamily:'Arial',
                                        fontSize:20,}}>Nawaloka Hospitals</Text>
                                    <Text style={Result.ResultText2}>Type = Channel Refund </Text>
                                    <Text style={Result.ResultText2}>Refund Amount - Rs.1500</Text>
                                    <Text style={Result.ResultText2}>Status = Refunded</Text>

                                </View>
                                <View style={ModalStyles.closeBtn}>
                                <TouchableHighlight
                                    onPress={() => {this.toggleModal();}}>
                                    <Text style={{color:'#fc9097',fontWeight:'bold',
                                        fontFamily:'Arial',
                                        fontSize:22,}}>Close</Text>
                                </TouchableHighlight>
                                </View>
                            </View>
                        </View>


                    </Modal>
                </View>

                <View style={styles.LogoContainer} >
                    <Image source={require('../assets/Home/Logo.png')} style={styles.Logo} resizeMode={'contain'}/>
                    {/*<Text style={{color:'red',textAlign: 'center'}}>{this.state.Error}</Text>*/}
                </View>

                <View style={styles.View}>

                    <KeyboardAwareScrollView>
                    <Text style={styles.TextHeading}>Refund Search</Text>
                    <Text style={styles.TextHeading3}>Reference Number</Text>
                    <View style={styles.TextInputBox}>
                        <Image source={require('../assets/Home/searchicon.png')} style={styles.InputBoxIcon} resizeMode={'stretch'}/>
                        <TextInput style={styles.InputBox} onChange={this.onChangeRefNumber} value={this.state.RefNumber} placeholder={'Reference Number'} ref={component => (this._textInput1 = component)} clearButtonMode = "always" placeholderTextColor="#000"/>
                    </View>

                    <Text style={styles.TextHeading3}>NIC/Passport</Text>
                    <View style={styles.TextInputBox}>
                        <Image source={require('../assets/Home/searchicon.png')} style={styles.InputBoxIcon} resizeMode={'stretch'}/>
                        <TextInput style={styles.InputBox} onChange={this.onChangeNicOrPassport} value={this.state.NicOrPassport} placeholder={'NIC/Passport'} ref={component => (this._textInput2 = component)} clearButtonMode = "always" placeholderTextColor="#000"/>
                    </View>

                    <View style={styles.SearchBtn}>
                        <Button color="#000000" title={'Search Refunds'} onPress={()=>{this.SearchRefund()}}/>
                    </View>
                    </KeyboardAwareScrollView>
                </View>


            </ImageBackground>

        );
    }
}


const styles={
    LogoContainer:{
        // justifyContent:'center',
        // alignItems:'center'
        width:250,
        height:250
    },
    Logo:{
        // width:'45%',
        // height:'45%'
        marginTop:Dimensions.get('window').height/24,
        width:'35%',
        height:'35%'
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
        height:Dimensions.get('window').height/2,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 0.5,
        // zIndex:-1,
        marginTop:Dimensions.get('window').height/3.8,
        marginLeft:(Dimensions.get('window').width/4)-(Dimensions.get('window').width/8)
    },

    View1:{
        position:'absolute',
        // backgroundColor: '#a9a9a9',
        opacity:1,
        width:(Dimensions.get('window').width/4)*2.8,
        height:Dimensions.get('window').height/6.1,
        // borderColor: '#ffffff',
        // borderRadius: 8,
        // borderWidth: 0.01,
        marginTop:60,
        // marginTop:Dimensions.get('window').height/25,
        marginLeft:(Dimensions.get('window').width/4)-(Dimensions.get('window').width/30)
    },
    TextHeading:{
        paddingLeft:(Dimensions.get('window').width/5),
        color:'white',
        fontWeight:'bold',
        fontFamily:'Arial',
        textDecorationLine: 'underline',
        fontSize:20,
        marginTop:Dimensions.get('window').height/20,
    },
    TextHeading2:{
        paddingLeft:(Dimensions.get('window').width/6),
        color:'white',
        fontWeight:'bold',
        fontFamily:'Arial',
        textDecorationLine: 'underline',
        fontSize:15,
        marginTop:Dimensions.get('window').height/30,
    },
    TextHeading3:{
        paddingLeft:(Dimensions.get('window').width/6),
        color:'white',
        fontWeight:'bold',
        fontFamily:'Arial',
        textDecorationLine: 'underline',
        fontSize:18,
        marginTop:Dimensions.get('window').height/50,

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
    NavigationHeaderText:{
        color:'white',
        fontWeight:'bold',
        fontFamily:'Arial',
        fontSize:15,
    },
    InputBox:{
        position:'absolute',
        width:(Dimensions.get('window').width/4)*2,
        height:Dimensions.get('window').height/25,
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
        marginTop:Dimensions.get('window').height/12,
        width:(Dimensions.get('window').width/4)*2,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#373636',
        borderRadius:8,
        opacity:1,

    },
};

const ModalStyles={
    ModalParams:{
        marginTop:Dimensions.get('window').height/5,
        height:Dimensions.get('window').height/2,
        maxHeight:Dimensions.get('window').height/1.5,
        borderWidth:0.5,
        borderRadius:8,
        backgroundColor:'black',
        opacity:0.9
    },
    ModalTextParams:{
        marginTop:Dimensions.get('window').height/30,
        color:'white',
        fontSize: 20,
    },
    closeBtn:{
        marginTop:20,
        padding: 24,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth:1,
        backgroundColor:'white',
        fontSize:18,
        justifyContent: 'center',
        alignItems: 'center',
        opacity:1,
    },
    CloseIcon:{
        marginTop:10,
        width:Dimensions.get('window').height/25,
        height:Dimensions.get('window').height/25
    }
};

const Result={
    ResultContainer:{
        marginTop:5,
        backgroundColor:'grey',
        opacity:0.7,
        borderRadius:6,
        borderWidth:1,
        borderColor:'white'
    },
    ResultTextImp:{
        marginTop:4,
        marginLeft:10,
        color:'white',
        fontWeight: 'bold',
        fontSize:18
    },
    ResultText2:{
        marginTop:4,
        marginLeft:10,
        marginRight:10,
        color:'black',
        fontWeight: 'bold',
        fontSize:15
    },
    ResultTextNormal:{
        marginLeft:10,
        color:'white',
        fontSize:18
    },
    ChannelBtn:{
        position:'absolute',
        marginTop:Dimensions.get('window').height/50,
        marginLeft:Dimensions.get('window').width-(Dimensions.get('window').width/3 + 5),
        width:Dimensions.get('window').width/3,
        borderRadius:6,
        borderWidth:1,
        borderColor:'red'
    }
};


