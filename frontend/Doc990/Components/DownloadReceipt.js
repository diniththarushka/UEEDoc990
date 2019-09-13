import React, { Component } from 'react';
import axios from 'axios/index';
import {
	Text,
	View,
	ImageBackground,
	Dimensions,
	TextInput,
	Image,
	Button,
	Modal,
	TouchableHighlight,
	Alert,
	ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Serv_PORT = 4000;

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Number: '',
			nic: '',
		};

		// this.onChangeName = this.onChangeName.bind(this);
		// this.toggleModal = this.toggleModal.bind(this);
		// this.SearchDoctor = this.SearchDoctor.bind(this);
	}

	// toggleModal(){
	//     this.setState({
	//         results:!this.state.results
	//     })
	// }

	// onChangeName(e){
	//     this.setState({
	//         DoctorName:e.nativeEvent.text
	//     })
	// }
	downloadReceipt() {
		const { Number, nic } = this.state;

		if (Number == '') {
			this.setState({ Error: 'The reference field is required.' });
		} else if (nic == '') {
			this.setState({ Error: 'The NIC or Passport field is required.' });
		} else {
			this.clearText();
			this.setState({ Error: ' Thank you,your booking receipt is downloaded' });
		}
	}

	clearText() {
		this._textInput1.setNativeProps({ text: ' ' });
		this._textInput2.setNativeProps({ text: ' ' });
		setTimeout(() => {
			this._textInput1.setNativeProps({ text: '' });
			this._textInput2.setNativeProps({ text: '' });
		}, 3);
	}
	newBookings = () => {
		this.props.navigation.navigate('newBookings');
	};

	render() {
		// let Results=this.state.resultsArr.map((result,key)=>{
		//     return<View style={Result.ResultContainer} key={key}>
		//         <View>
		//             <Text style={Result.ResultTextImp}>{result.Name}</Text>
		//             <Text style={Result.ResultTextNormal}>{result.Email}</Text>
		//             <Text style={Result.ResultTextNormal}>{result.Specialization}</Text>
		//         </View>
		//         <View style={Result.ChannelBtn}>
		//             <Button title={'Channel'} color={'#FD7474'}/>
		//         </View>
		//     </View>
		// });

		return (
			<ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>
				{/* <View style={{marginTop:22}} >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.results}
                        onRequestClose={() => {
                            Alert.alert('Results window has been closed.');
                        }}>

                        <View style={{marginTop: 22}}>
                            <View style={ModalStyles.ModalParams}>
                                <Text style={Result.ResultTextImp}>{this.state.DoctorName}</Text>
                                <Text style={Result.ResultTextNormal}>{this.state.DoctorSpec}</Text>
                                <TouchableHighlight style={{position:'absolute',marginLeft:Dimensions.get('window').height/2-Dimensions.get('window').height/25}}
                                    onPress={() => {
                                        this.toggleModal();
                                    }}>
                                    <Image style={ModalStyles.CloseIcon} source={require('../assets/Home/Modal/close.png')}/>
                                </TouchableHighlight>

                                <ScrollView id={'resultList'}>
                                    {
                                        Results
                                    }
                                </ScrollView>
                            </View>
                        </View>

                    </Modal>
                </View> */}

				<View style={styles.LogoContainer}>
					<Image source={require('../assets/Home/Logo.png')} style={styles.Logo} resizeMode={'contain'} />
				</View>
				<View style={styles.View}>
					<KeyboardAwareScrollView>
						<Text style={styles.TextHeading}>DOWNLOAD BOOKING RECEIPT</Text>
						<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.Error}</Text>
						<View style={styles.TextInputBox}>
							<Image
								source={require('../assets/man.png')}
								style={styles.InputBoxIcon}
								resizeMode={'stretch'}
							/>
							<TextInput
								style={styles.InputBox}
								onChangeText={Number => this.setState({ Number })}
								placeholder={' Reference Number - Required'}
								placeholderTextColor="#000"
								ref={component => (this._textInput1 = component)}
								clearButtonMode="always"
							/>
						</View>
						<View style={styles.TextInputBox}>
							<Image
								source={require('../assets/nic.png')}
								style={styles.InputBoxIcon}
								resizeMode={'stretch'}
							/>

							<TextInput
								style={styles.InputBox}
								onChangeText={nic => this.setState({ nic })}
								placeholder={' NIC / Passport - Required'}
								placeholderTextColor="#000"
								ref={component => (this._textInput2 = component)}
								clearButtonMode="always"
							/>
						</View>
						<View style={styles.SearchBtn}>
							<Button
								title={'SEARCH'}
								onPress={() => {
									this.downloadReceipt();
								}}
								color={'#000000'}
							/>
						</View>
					</KeyboardAwareScrollView>
				</View>
			</ImageBackground>
		);
	}
}

const styles = {
	LogoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: Dimensions.get('window').height / 40,
	},
	Logo: {
		width: '40%',
		height: '40%',
	},
	Background: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	View: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.5,
		width: (Dimensions.get('window').width / 4) * 3,
		height: Dimensions.get('window').height / 2.5,
		borderColor: '#ffffff',
		borderRadius: 8,
		borderWidth: 0.5,
		marginTop: Dimensions.get('window').height / 3,
		marginLeft: Dimensions.get('window').width / 4 - Dimensions.get('window').width / 8,
	},
	TextHeading: {
		// paddingLeft: Dimensions.get('window').width / 5,
		color: 'white',
		fontWeight: 'bold',
		// fontFamily:'sans-serif',
		textDecorationLine: 'underline',
		fontSize: 20,
		textAlign: 'center',
		marginTop: Dimensions.get('window').height / 28,
	},
	TextInputBox: {
		height: Dimensions.get('window').height / 25,
		marginTop: Dimensions.get('window').height / 25,
		marginLeft: Dimensions.get('window').width / 15,
		width: (Dimensions.get('window').width / 4) * 2.4,
		borderColor: 'black',
		backgroundColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		shadowOffset: { width: 10, height: 10 },
		shadowColor: 'black',
		shadowOpacity: 1.0,
	},
	InputBox: {
		position: 'absolute',
		width: (Dimensions.get('window').width / 4) * 2,
		color: 'black',
		marginTop: 0,
		marginLeft: (Dimensions.get('window').width / 4) * 2.4 - (Dimensions.get('window').width / 4) * 2,
	},
	InputBoxIcon: {
		height: Dimensions.get('window').height / 28,
		width: Dimensions.get('window').height / 25,
		borderRadius: 8,
	},
	SearchBtn: {
		backgroundColor: '#87cefa',
		opacity: 0.9,
		marginLeft: ((Dimensions.get('window').width / 4) * 3 - (Dimensions.get('window').width / 4) * 2) / 2,
		marginTop: Dimensions.get('window').height / 25,
		width: (Dimensions.get('window').width / 4) * 2,
		borderWidth: 0.5,
		borderRadius: 8,
	},
};

const ModalStyles = {
	ModalParams: {
		height: Dimensions.get('window').height / 2,
		maxHeight: Dimensions.get('window').height / 1.5,
		borderWidth: 0.5,
		borderRadius: 8,
		backgroundColor: 'black',
		opacity: 0.8,
	},
	ModalTextParams: {
		marginTop: Dimensions.get('window').height / 30,
		color: 'white',
		fontSize: 20,
	},
	CloseIcon: {
		marginTop: 10,
		width: Dimensions.get('window').height / 25,
		height: Dimensions.get('window').height / 25,
	},
};

const Result = {
	ResultContainer: {
		marginTop: 5,
		backgroundColor: 'grey',
		opacity: 0.7,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: 'white',
	},
	ResultTextImp: {
		marginLeft: 10,
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
	},
	ResultTextNormal: {
		marginLeft: 10,
		color: 'white',
		fontSize: 18,
	},
	ChannelBtn: {
		position: 'absolute',
		marginTop: Dimensions.get('window').height / 50,
		marginLeft: Dimensions.get('window').width - (Dimensions.get('window').width / 3 + 5),
		width: Dimensions.get('window').width / 3,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: 'red',
	},
};
