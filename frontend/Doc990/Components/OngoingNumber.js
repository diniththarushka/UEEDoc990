import React, { Component } from 'react';
import { View, ImageBackground, Text, Dimensions, Image, Button, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class OngoingNumber extends Component {
	static navigationOptions = {
		//set title on phonescreen on the top view.
		title: 'gg',
	};
	constructor(props) {
		super(props);
		this.state = {
			Number: '',
			hospital: '',
		};
	}

	SearchNumber = () => {
		const { Number, hospital } = this.state;
		if (Number == '') {
			this.setState({ Error: 'The doctor name field is required.' });
		} else if (hospital == '') {
			this.setState({ Error: ' Select the hospital.' });
		} else {
			this.setState({
				hospital: '',
				Number: '',
			});
			this.props.navigation.navigate('OngoingDetails');
		}
	};

	render() {
		let data = [
			{
				value: 'Base Hospital Colombo East',
			},
			{
				value: 'Asiri hospital Colombo3',
			},
			{
				value: 'Hemas hospital waththala',
			},
			{
				value: 'Royal hospital Anuradhapura',
			},
			{
				value: 'Narammala Hospital Anuradhapura',
			},
			{
				value: 'Central Hospital Nawinne',
			},
			{
				value: 'Miracle Health Anuradhapura',
			},
			{
				value: 'Royal hospital Anuradhapura',
			},
		];

		return (
			<ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>
				<View style={styles.LogoContainer}>
					<Image source={require('../assets/Home/Logo.png')} style={styles.Logo} resizeMode={'contain'} />
				</View>

				
					<View style={styles.View}>
						<Text style={styles.TextHeading}>SEARCH ONGOING NUMBER</Text>

						<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.Error}</Text>
						<KeyboardAwareScrollView>
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
								/>
							</View>

							<Dropdown
								style={{ marginLeft: Dimensions.get('window').width / 15, borderRadius: 8 }}
								placeholder="select hospital"
								// placeholderTextColor="black"
								placeholderTextColor="black"
								backgroundColor="white"
								color="black"
								itemTextStyle={{ textColor: 'black' }}
								textAlign="center"
								data={data}
								onChangeText={hospital => this.setState({ hospital })}
							/>
							{/* <Image
							source={require('../assets/man.png')}
							style={styles.InputBoxIcon}
							resizeMode={'stretch'}

			/> */}

							<View style={styles.SearchBtn}>
								<Button
									title={'Search'}
									onPress={() => {
										this.SearchNumber();
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
		height: Dimensions.get('window').height / 2.4,
		borderColor: '#ffffff',
		borderRadius: 8,
		borderWidth: 0.5,
		marginTop: Dimensions.get('window').height / 3,
		marginLeft: Dimensions.get('window').width / 4 - Dimensions.get('window').width / 8,
	},
	InputBox: {
		position: 'absolute',
		width: (Dimensions.get('window').width / 4) * 3,
		color: 'black',
		marginTop: 0,
		marginLeft: (Dimensions.get('window').width / 4) * 2.4 - (Dimensions.get('window').width / 4) * 2,
	},
	InputBoxIcon: {
		height: Dimensions.get('window').height / 28,
		width: Dimensions.get('window').height / 25,
		borderRadius: 8,
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
