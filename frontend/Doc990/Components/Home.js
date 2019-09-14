import React, { Component } from 'react';
import axios from 'axios/index';
import { Linking, Platform, AsyncStorage, ToastAndroid, Text, View, ImageBackground, Dimensions, TextInput, Image, Button, Modal, TouchableHighlight, Alert, ScrollView, TouchableOpacity } from "react-native";
import {
    PulseIndicator
} from 'react-native-indicators';


//const localAddress='10.0.2.2';
const localAddress='192.168.1.4';

const Serv_PORT = 4000;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorNames: [],
            doctorList:[],
            doctorListVisible:false,
            isLoading: true,
            styleObj: {
                opacity: 0
            },
            isModelLoading: false,
            appointmentsMaxed: false,
            resultsArr: [],
            results: false,
            payments: false,
            paymentObj: {
                Doctor: '',
                Specialization: '',
                Hospital: '',
                Start: '',
                End: '',
                YourNum: 0,
                Price: 0
            },
            displayPaymentSummary: false,
            paymentStatus: {
                paymentMessage: '',
                paymentStatusImage: require('../assets/Home/Modal/fail.png'),
                reference: ''
            },
            cardNum: '',
            Promo: '',
            DoctorName: '',
            DoctorSpec: '',
            ChannelID: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.togglePaymentsModal = this.togglePaymentsModal.bind(this);
        this.togglePaymentStatusModal = this.togglePaymentStatusModal.bind(this);
        this.SearchDoctor = this.SearchDoctor.bind(this);
        this.ChannelDoctor = this.ChannelDoctor.bind(this);
        this.onPressPaymentFinalize = this.onPressPaymentFinalize.bind(this);
        this.setNameToTB = this.setNameToTB.bind(this);

        this.onChangeCardNum = this.onChangeCardNum.bind(this);
        this.onChangePromoCode = this.onChangePromoCode.bind(this);
    }

    onChangeCardNum(e) {
        this.setState({
            cardNum: e.nativeEvent.text
        });
    }

    onChangePromoCode(e) {
        this.setState({
            Promo: e.nativeEvent.text
        })
    }

    setNameToTB(name){
        this.setState({
            DoctorName:name,
            doctorListVisible:false
        })
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: 'http://'+localAddress+':' + Serv_PORT + '/doctor/',
            timeout:2000
        }).then((res) => {
            if(res.data.length===0){
                let blankArr=[];
                blankArr.push({
                    "Name":"Doctors Not Available",
                    "Spec":"Server has returned an empty response."
                });
                this.setState({
                    doctorList:blankArr
                });
            }else{
                let resData = res.data;
                let doctorArr = [];

                for (let k = 0; k < resData.length; k++) {
                    doctorArr.push(
                        {
                            "Name":resData[k].Name,
                            "Spec":resData[k].Specialization
                        });
                    if (doctorArr.length === resData.length) {
                        this.setState({
                            doctorList: doctorArr
                        })
                    }
                }
            }
        }).catch((err) => {
            let blankArr=[];
            blankArr.push({
                "Name":"Doctors Not Available",
                "Spec":"Server has returned an empty response."
            });
            this.setState({
                doctorList:blankArr
            });
            console.log(err);
        })
    }

    toggleDoctorList(){
        this.setState({
            doctorListVisible: !this.state.doctorListVisible
        })
    }

    toggleModal() {
        this.setState({
            results: !this.state.results
        })
    }

    togglePaymentsModal() {
        this.setState({
            payments: !this.state.payments
        })
    }

    togglePaymentStatusModal() {
        this.setState({
            displayPaymentSummary: !this.state.displayPaymentSummary
        });
    }

    onChangeName(e) {
        this.setState({
            DoctorName: e.nativeEvent.text
        })
    }

    onPressPaymentFinalize() {
        if (this.state.cardNum.length >= 16) {
            if (this.state.Promo.length === 6) {
                AsyncStorage.multiGet(['email', 'name', 'phone']).then((data) => {
                    if (data[0][1]) {

                        let dataObj = {
                            "Name": data[1][1],
                            "Doctor": this.state.paymentObj.Doctor,
                            "Email": data[0][1],
                            "Price": this.state.paymentObj.Price,
                            "Phone": data[2][1],
                            "ChannelId": this.state.ChannelID
                        };
                        axios({
                            method: 'post',
                            url: 'http://'+localAddress+':' + Serv_PORT + '/payment/add',
                            data: dataObj
                        }).then((res) => {
                            let ref = res.data.ref;
                            this.setState({
                                paymentStatus: {
                                    paymentMessage: "\t**Discount will be added when the amount is charged.\n\nPlease check your email address," + data[0][1] + " for the detailed channelling information.\n\n Your reference number is: " + ref,
                                    paymentStatusImage: require('../assets/Home/Modal/success.png'),
                                }
                            });
                            this.togglePaymentStatusModal();
                            this.togglePaymentsModal();
                            this.toggleModal();
                        }).catch((err) => {
                            this.setState({
                                paymentStatus: {
                                    paymentMessage: "There was an error while processing your payment. You can call our hotline for assistance. Thank you for using Doc990.!",
                                    paymentStatusImage: require('../assets/Home/Modal/fail.png'),
                                }
                            });
                            this.togglePaymentStatusModal();
                            Alert.alert("Error", err.message + ", Please contact our hotline", [{ 'text': 'Cancel' }, {
                                'text': 'Hotline', onPress: () => {
                                    let phoneNumber = '';
                                    if (Platform.OS === 'android') {
                                        phoneNumber = 'tel:${0117990990}';
                                    }
                                    else {
                                        phoneNumber = 'telprompt:${0117990990}';
                                    }

                                    Linking.openURL(phoneNumber);
                                }
                            }]);
                            console.log(err);
                        });
                    } else {
                        Alert.alert('Not signed-in', 'We cannot verify your payment unless you have signed up. Please navigate to Profile Section and Sign-in to continue');
                    }
                });
            } else if (this.state.Promo.length === 0) {
                AsyncStorage.multiGet(['email', 'name', 'phone']).then((data) => {
                    if (data[0][1]) {

                        let dataObj = {
                            "Name": data[1][1],
                            "Doctor": this.state.paymentObj.Doctor,
                            "Email": data[0][1],
                            "Price": this.state.paymentObj.Price,
                            "Phone": data[2][1],
                            "ChannelId": this.state.ChannelID
                        };
                        axios({
                            method: 'post',
                            url: 'http://'+localAddress+':' + Serv_PORT + '/payment/add',
                            data: dataObj
                        }).then((res) => {
                            let ref = res.data.ref;
                            this.setState({
                                paymentStatus: {
                                    paymentMessage: "Please check your email address," + data[0][1] + " for the detailed channelling information.\n\n Your reference number is: " + ref,
                                    paymentStatusImage: require('../assets/Home/Modal/success.png'),
                                }
                            });
                            this.togglePaymentStatusModal();
                            this.togglePaymentsModal();
                            this.toggleModal();
                        }).catch((err) => {
                            this.setState({
                                paymentStatus: {
                                    paymentMessage: "There was an error while processing your payment. You can call our hotline for assistance. Thank you for using Doc990.!",
                                    paymentStatusImage: require('../assets/Home/Modal/fail.png'),
                                }
                            });
                            this.togglePaymentStatusModal();
                            Alert.alert("Error", err.message + ", Please contact our hotline", [{ 'text': 'Cancel' }, {
                                'text': 'Hotline', onPress: () => {
                                    let phoneNumber = '';
                                    if (Platform.OS === 'android') {
                                        phoneNumber = 'tel:${0117990990}';
                                    }
                                    else {
                                        phoneNumber = 'telprompt:${0117990990}';
                                    }

                                    Linking.openURL(phoneNumber);
                                }
                            }]);
                            console.log(err);
                        });
                    } else {
                        Alert.alert('Not signed-in', 'We cannot verify your payment unless you have signed up. Please navigate to Profile Section and Sign-in to continue');
                    }
                });
            } else
                Alert.alert('Promo-code Invalid', 'Promo code should be atleast 6 digits long.');
        } else
            Alert.alert('Card Number Invalid', 'Card number should be atleast 16 digits long.');
    }

    ChannelDoctor(resultObj) {
        if (resultObj.Appointments === 10) {
            this.setState({
                appointmentsMaxed: true,
                ChannelID: resultObj._id,
                paymentObj: {
                    Doctor: this.state.DoctorName,
                    Specialization: this.state.DoctorSpec,
                    Hospital: '',
                    Start: '',
                    End: '',
                    YourNum: (0)
                }
            });
        } else {
            this.setState({
                ChannelID: resultObj._id,
                paymentObj: {
                    Doctor: this.state.DoctorName,
                    appointmentsMaxed: false,
                    Specialization: this.state.DoctorSpec,
                    Hospital: '',
                    Start: '',
                    End: '',
                    YourNum: (0)
                }
            });
        }

        if (resultObj.Price) {
            if (resultObj.Appointments === 10) {
                this.setState({
                    paymentObj: {
                        Doctor: this.state.DoctorName,
                        Specialization: this.state.DoctorSpec,
                        Hospital: resultObj.Hospital.Name,
                        Start: resultObj.StartTime,
                        End: resultObj.EndTime,
                        YourNum: 'No more appointments can be made',
                        appointmentsMaxed: true,
                        Price: resultObj.Price
                    }
                });
            } else {
                this.setState({
                    paymentObj: {
                        Doctor: this.state.DoctorName,
                        Specialization: this.state.DoctorSpec,
                        Hospital: resultObj.Hospital.Name,
                        Start: resultObj.StartTime,
                        End: resultObj.EndTime,
                        YourNum: (resultObj.Appointments + 1),
                        appointmentsMaxed: false,
                        Price: resultObj.Price
                    }
                });
            }
        } else {
            if (resultObj.Appointments === 10) {
                this.setState({
                    paymentObj: {
                        Doctor: this.state.DoctorName,
                        Specialization: this.state.DoctorSpec,
                        Hospital: resultObj.Hospital.Name,
                        Start: resultObj.StartTime,
                        End: resultObj.EndTime,
                        YourNum: ('No more appointments can be made'),
                        appointmentsMaxed: true,
                        Price: 2500
                    }
                });
            } else {
                this.setState({
                    paymentObj: {
                        Doctor: this.state.DoctorName,
                        Specialization: this.state.DoctorSpec,
                        Hospital: resultObj.Hospital.Name,
                        Start: resultObj.StartTime,
                        End: resultObj.EndTime,
                        appointmentsMaxed: false,
                        YourNum: (resultObj.Appointments + 1),
                        Price: 2500
                    }
                });
            }
        }
        this.togglePaymentsModal();
    }

    SearchDoctor() {
        if (this.state.DoctorName) {
            this.setState({
                isModelLoading: true,
                styleObj: {
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    backgroundColor: 'black',
                    opacity: 0.7,
                    zIndex: 2
                }
            });
            axios({
                method: 'get',
                url: 'http://'+localAddress+':' + Serv_PORT + '/availability/byName/' + this.state.DoctorName,
                timeout: 4000,
            }).then((res) => {
                let Obj = res.data;
                this.setState({
                    resultsArr: Obj.Availability,
                    DoctorName: Obj.Doctor.Name,
                    DoctorSpec: Obj.Doctor.Specialization
                });
                this.setState({
                    isModelLoading: false,
                    styleObj: {
                        opacity: 0
                    }
                });
                this.toggleModal();

            }).catch((err) => {
                console.log(err);
                if (err) {
                    this.setState({
                        isModelLoading: false,
                        styleObj: {
                            opacity: 0
                        }
                    });
                    Alert.alert("Error", "Requested Doctor's availability records are not found in the server. Please check Doctors name.");
                } else {
                    this.setState({
                        isModelLoading: false,
                        styleObj: {
                            opacity: 0
                        }
                    });
                    Alert.alert(
                        "Error",
                        "Error Fetching data from the server. Please check the name and your internet connection"
                    );
                }
            });
        } else {
            Alert.alert('Invalid Doctor name', 'Doctor name cannot be empty.')
        }
    }

    render() {
        let Results = this.state.resultsArr.map((result, key) => {
            return <View style={Result.ResultContainer} key={key}>
                <View>
                    <Text style={Result.ResultTextImp}>{result.Hospital.Name}</Text>
                    <Text style={Result.ResultTextNormal}>{result.Hospital.Address}</Text>
                    <Text style={Result.ResultTextNormal}>{result.StartTime}</Text>
                </View>
                <View style={Result.ChannelBtn}>
                    <Button title={'Channel'} onPress={() => { this.ChannelDoctor(result) }} color={'#FD7474'} />
                </View>
            </View>
        });
        let DocResults = this.state.doctorList.map((result, key) => {
            return <View style={Result.ResultContainer} key={key}>
                <TouchableOpacity onPress={()=>{this.setNameToTB(result.Name)}}>
                    <Text style={Result.ResultTextImp}>{result.Name}</Text>
                    <Text style={Result.ResultTextNormal}>{result.Spec}</Text>
                </TouchableOpacity>
            </View>
        });
        return (
            <ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>

                <View style={{ marginTop: 22 }} >
                <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.doctorListVisible}
                        onRequestClose={() => {
                            this.toggleDoctorList();
                            ToastAndroid.show('Doctor list have been closed.', ToastAndroid.SHORT);
                        }}>

                        <View style={{ marginTop: 22 }}>
                            <View style={ModalStyles.ModalParams}>
                                <TouchableHighlight style={{zIndex:1,position: 'absolute', marginLeft: Dimensions.get('window').height / 2 - Dimensions.get('window').height / 25 }}
                                    onPress={() => {
                                        this.toggleDoctorList();
                                    }}>
                                    <Image style={ModalStyles.CloseIcon} source={require('../assets/Home/Modal/close.png')} />
                                </TouchableHighlight>
                                <ScrollView >
                                    {
                                        DocResults
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.results}
                        onRequestClose={() => {
                            this.toggleModal();
                            ToastAndroid.show('Results have been closed.', ToastAndroid.SHORT);
                        }}>

                        <View style={{ marginTop: 22 }}>
                            <View style={ModalStyles.ModalParams}>
                                <Text style={Result.ResultTextImp}>{this.state.DoctorName}</Text>
                                <Text style={Result.ResultTextNormal}>{this.state.DoctorSpec}</Text>
                                <TouchableHighlight style={{ position: 'absolute', marginLeft: Dimensions.get('window').height / 2 - Dimensions.get('window').height / 25 }}
                                    onPress={() => {
                                        this.toggleModal();
                                    }}>
                                    <Image style={ModalStyles.CloseIcon} source={require('../assets/Home/Modal/close.png')} />
                                </TouchableHighlight>

                                <ScrollView >
                                    {
                                        Results
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.payments}
                        onRequestClose={() => {
                            this.togglePaymentsModal();
                            ToastAndroid.show('Payment discarded.', ToastAndroid.SHORT);
                        }}>

                        <View style={{ marginTop: 22 }}>
                            <View style={ModalStyles.ModalLongParams}>
                                <Text style={{ marginLeft: Dimensions.get('window').width / 3, color: 'white', textDecorationLine: 'underline' }}>Channel Doctor</Text>
                                <Text style={{ marginLeft: 10, color: 'white', textDecorationLine: 'underline', fontSize: 20 }}>Summary</Text>
                                <Text style={Result.ResultTextNormal}>{"\nName: " + this.state.DoctorName}</Text>
                                <Text style={Result.ResultTextNormal}>{"Specialization: " + this.state.paymentObj.Specialization}</Text>
                                <Text style={Result.ResultTextNormal}>{"Hospital: " + this.state.paymentObj.Hospital}</Text>
                                <Text style={Result.ResultTextImp}>{"\nYour Number: " + this.state.paymentObj.YourNum}</Text>
                                <Text style={Result.ResultTextImp}>{"Remarks: Please bring your previous medical records if available."}</Text>
                                <Text style={{ marginLeft: 10, color: 'white', textDecorationLine: 'underline', fontSize: 20 }}>{"\nPayment\n"}</Text>
                                <View style={{width:Dimensions.get('window').width/2,height:Dimensions.get('window').width/6}}>
                                <Image source={require('../assets/Home/Modal/ccIcons.png')} style={{flex: 1,width: null,height: null,resizeMode: 'contain'}}/>
                                </View>
                                <Text style={Result.ResultTextImp}>{"Amount: LKR." + this.state.paymentObj.Price + "/="}</Text>
                                <Text style={Result.ResultTextImp}>{"Pay By: "}</Text>
                                <TextInput keyboardType={'numeric'} style={styles.TextInputBoxModal} onChange={this.onChangeCardNum} placeholder={'xxxxxxxxxxxxxxxx'} placeholderTextColor={'#000000'} />
                                <Text style={Result.ResultTextImp}>{"Promo-code(if any): "}</Text>
                                <TextInput keyboardType={'numeric'} style={styles.TextInputBoxModal} onChange={this.onChangePromoCode} placeholder={'xxxxxxx'} placeholderTextColor={'#000000'} />
                                <Text>{"\n"}</Text>
                                <Button disabled={this.state.appointmentsMaxed} style={styles.SearchBtn} onPress={() => { this.onPressPaymentFinalize() }} title={'Confirm Payment'} />
                                <TouchableHighlight style={{ position: 'absolute', marginLeft: Dimensions.get('window').height / 2 - Dimensions.get('window').height / 25 }}
                                    onPress={() => {
                                        this.togglePaymentsModal();
                                    }}>
                                    <Image style={ModalStyles.CloseIcon} source={require('../assets/Home/Modal/close.png')} />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.displayPaymentSummary}
                        onRequestClose={() => {
                            this.togglePaymentStatusModal();
                            ToastAndroid.show('Your payment has been discarded.', ToastAndroid.SHORT);
                        }}>

                        <View style={{ marginTop: 22 }}>
                            <View style={ModalStyles.ModalLongParams}>
                                <Text style={{ marginBottom: 10, marginTop: Dimensions.get('window').height / 12, marginLeft: Dimensions.get('window').width / 3.5, color: 'white', textDecorationLine: 'underline', fontSize: 20 }}>{"Payment Summary"}</Text>
                                <View style={{ marginLeft: Dimensions.get('window').width / 3 }}>
                                    <Image style={{ resizeMode: 'contain', width: '40%', height: '40%' }} source={this.state.paymentStatus.paymentStatusImage} />
                                </View>
                                <View style={{ marginBottom: Dimensions.get('window').height / 8 }}>
                                    <Text style={Result.ResultTextImp}>{this.state.paymentStatus.paymentMessage}</Text>
                                </View>
                                <Button style={{ color: '#5f4cba', borderRadius: 8, borderWidth: 0.5, marginTop: 40, width: (Dimensions.get('window').width / 4) * 2 }} title={'Take me to my bookings'} />
                                <TouchableHighlight style={{ position: 'absolute', marginLeft: Dimensions.get('window').height / 2 - Dimensions.get('window').height / 25 }}
                                    onPress={() => {
                                        this.togglePaymentStatusModal();
                                    }}>
                                    <Image style={ModalStyles.CloseIcon} source={require('../assets/Home/Modal/close.png')} />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={this.state.styleObj}>
                    <PulseIndicator size={100} animating={this.state.isModelLoading} color={'white'} />
                </View>
                <View style={styles.LogoContainer} >
                    <Image source={require('../assets/Home/Logo.png')} style={styles.Logo} resizeMode={'contain'} />
                </View>
                <View style={styles.View}>
                    <Text style={styles.TextHeading}>Doctor Search</Text>
                    <View style={styles.TextInputBox}>
                        <Image source={require('../assets/Home/searchicon.png')} style={styles.InputBoxIcon} resizeMode={'stretch'} />
                        <TextInput style={styles.InputBox} onChange={this.onChangeName} value={this.state.DoctorName} placeholder={' Enter Doctor name here'} placeholderTextColor="#000"/>
                    </View>
                    <View style={styles.SearchBtn}>
                        <Button title={'Search Doctor'} onPress={() => { this.SearchDoctor() }} color={'#7BA6EF'} />
                    </View>
                    <View style={styles.SearchBtn}>
                        <Button title={'Doctors List'} onPress={() => { this.toggleDoctorList() }} color={'#8867e0'} />
                    </View>
                </View>
            </ImageBackground>

        );
    }
}


const styles = {
    LogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0
    },
    Logo: {
        width: '45%',
        height: '45%',
    },
    Background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    View: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        width: (Dimensions.get('window').width / 4) * 3,
        height: Dimensions.get('window').height / 2.6,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 0.5,
        marginTop: Dimensions.get('window').height / 2.5,
        marginLeft: (Dimensions.get('window').width / 4) - (Dimensions.get('window').width / 8)
    },
    TextHeading: {
        paddingLeft: (Dimensions.get('window').width / 5),
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textDecorationLine: 'underline',
        fontSize: 20,
        marginTop: Dimensions.get('window').height / 20,
    },
    TextInputBoxModal: {
        height: Dimensions.get('window').height / 25,
        width: (Dimensions.get('window').width / 4) * 2.4,
        marginLeft: 10,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    TextInputBox: {
        height: Dimensions.get('window').height / 25,
        marginTop: Dimensions.get('window').height / 25,
        marginLeft: (Dimensions.get('window').width / 15),
        width: (Dimensions.get('window').width / 4) * 2.4,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    InputBox: {
        position: 'absolute',
        width: (Dimensions.get('window').width / 4) * 2,
        color: 'black',
        marginTop: 0,
        marginLeft: (Dimensions.get('window').width / 4) * 2.4 - (Dimensions.get('window').width / 4) * 2
    },
    InputBoxIcon: {
        height: Dimensions.get('window').height / 25,
        width: Dimensions.get('window').height / 25
    },
    SearchBtn: {
        marginLeft: ((Dimensions.get('window').width / 4) * 3 - (Dimensions.get('window').width / 4) * 2) / 2,
        marginTop: Dimensions.get('window').height / 25,
        width: (Dimensions.get('window').width / 4) * 2,
        borderWidth: 0.5,
        borderRadius: 8
    },
};

const ModalStyles = {
    ModalParams: {
        height: Dimensions.get('window').height / 2,
        maxHeight: Dimensions.get('window').height / 1.5,
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: 'black',
        opacity: 0.8
    },
    ModalLongParams: {
        maxHeight: Dimensions.get('window').height / 1.1,
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: 'black',
        opacity: 0.8
    },
    ModalTextParams: {
        marginTop: Dimensions.get('window').height / 30,
        color: 'white',
        fontSize: 20,
    },
    CloseIcon: {
        marginTop: 10,
        width: Dimensions.get('window').height / 25,
        height: Dimensions.get('window').height / 25
    }
};

const Result = {
    ResultContainer: {
        marginTop: 5,
        backgroundColor: 'grey',
        opacity: 0.7,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'white'
    },
    ResultTextImp: {
        marginLeft: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    ResultTextNormal: {
        marginLeft: 10,
        color: 'white',
        fontSize: 18
    },
    ChannelBtn: {
        position: 'absolute',
        marginTop: Dimensions.get('window').height / 50,
        marginLeft: Dimensions.get('window').width - (Dimensions.get('window').width / 3 + 5),
        width: Dimensions.get('window').width / 3,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'red'
    }
};
