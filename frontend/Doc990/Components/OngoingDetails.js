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

const Serv_PORT = 4000;

export default class OngoingDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			resultsArr: [],
			results: false,
			DoctorName: '',
			DoctorSpec: '',
		};

		this.onChangeName = this.onChangeName.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.SearchDoctor = this.SearchDoctor.bind(this);
	}

	toggleModal() {
		this.setState({
			results: !this.state.results,
		});
	}

	onChangeName(e) {
		this.setState({
			DoctorName: e.nativeEvent.text,
		});
	}
	SearchDoctor() {
		axios({
			method: 'get',
			url: 'http://10.0.2.2:' + Serv_PORT + '/doctor',
			timeout: 3000, // Let's say you want to wait at least 180 seconds
		})
			.then(res => {
				this.setState({
					resultsArr: res.data,
					DoctorName: res.data[0].Name,
					DoctorSpec: res.data[0].Specialization,
				});
				this.toggleModal();
			})
			.catch(err => {
				if (err) {
					Alert.alert('Error', err);
				} else {
					Alert.alert(
						'Error',
						'Error Fetching data from the server. Please check the name and your internet connection'
					);
				}
			});
		console.log('Button Click: ' + this.state.DoctorName);
	}

	render() {
		let Results = this.state.resultsArr.map((result, key) => {
			return (
				<View style={Result.ResultContainer} key={key}>
					<View>
						<Text style={Result.ResultTextImp}>{result.Name}</Text>
						<Text style={Result.ResultTextNormal}>{result.Email}</Text>
						<Text style={Result.ResultTextNormal}>{result.Specialization}</Text>
					</View>
					<View style={Result.ChannelBtn}>
						<Button title={'Channel'} color={'#FD7474'} />
					</View>
				</View>
			);
		});
		return (
			<ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>
				<View style={{ marginTop: 22 }}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.results}
						onRequestClose={() => {
							Alert.alert('Results window has been closed.');
						}}
					>
						<View style={{ marginTop: 22 }}>
							<View style={ModalStyles.ModalParams}>
								<Text style={Result.ResultTextImp}>{this.state.DoctorName}</Text>
								<Text style={Result.ResultTextNormal}>{this.state.DoctorSpec}</Text>
								<TouchableHighlight
									style={{
										position: 'absolute',
										marginLeft:
											Dimensions.get('window').height / 2 - Dimensions.get('window').height / 25,
									}}
									onPress={() => {
										this.toggleModal();
									}}
								>
									<Image
										style={ModalStyles.CloseIcon}
										source={require('../assets/Home/Modal/close.png')}
									/>
								</TouchableHighlight>

								<ScrollView id={'resultList'}>{Results}</ScrollView>
							</View>
						</View>
					</Modal>
				</View>

				<View style={styles.LogoContainer}>
					<Image source={require('../assets/Home/Logo.png')} style={styles.Logo} resizeMode={'contain'} />
				</View>
				<View style={styles.View}>
					<Text style={styles.TextHeading}>
						Ongoing Number
					</Text>
					<View style={styles.container}>
						<Text style={{ fontWeight: 'bold' }}>
							<Text style={{ color: '#6b8e23', fontSize: 20 }}>DOCTOR :</Text>{' '}
							<Text style={{ color: '#000000', fontSize: 20 }}>R.M.NITHMALI</Text>
							{'\n'}
							<Text style={{ color: '#6b8e23', fontSize: 20 }}>SPECIALIZATION :</Text>{' '}
							<Text style={{ color: '#000000', fontSize: 20 }}> ENT SURGEON</Text>
							{'\n'}
							<Text style={{ color: '#6b8e23', fontSize: 20 }}>HOSPITAL :</Text>{' '}
							<Text style={{ color: '#000000', fontSize: 20 }}> ASIRI, HOSPITAL</Text>
							{'\n'}
							<Text style={{ color: '#6b8e23', fontSize: 20 }}>ONGOING NUMBER :</Text>{' '}
							<Text style={{ color: '#000000', fontSize: 25, backgroundColor: '#cd5c5c' }}> 8</Text>
						</Text>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const styles = {
	container: {
		fontSize: 20,
		fontWeight: 'bold',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f8ff',
		borderRadius: 8,
		marginTop: 3,
		marginLeft: 2.5,
		marginRight: 2.5,
		opacity: 0.9,
	},
	LogoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: Dimensions.get('window').height / 50,
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
		height: Dimensions.get('window').height / 3,
		borderColor: '#ffffff',
		borderRadius: 8,
		borderWidth: 0.5,
		marginTop: Dimensions.get('window').height / 2.5,
		marginLeft: Dimensions.get('window').width / 4 - Dimensions.get('window').width / 8,
	},
	TextHeading: {
		// paddingLeft: Dimensions.get('window').width / 5,
		color: 'white',
		fontWeight: 'bold',
		// fontFamily:'sans-serif',
		textDecorationLine: 'underline',
		textAlign: 'center',
		fontSize: 25,
		marginTop: Dimensions.get('window').height / 20,
		marginLeft: Dimensions.get('window').width / 30,
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
