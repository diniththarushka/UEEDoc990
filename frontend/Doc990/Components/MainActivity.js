import React, { Component } from 'react';
import { Text, View, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
// import StyleSheet from "../static/cssScripts/common" //create custom cssScript

export default class MainActivity extends Component {
	static navigationOptions = {
		//set title on phonescreen on the top view.
		title: 'MY PROFILE',
	};

	OpenMyBookings = () =>
		//Its using for navigate second screen which is present on App.js.
		{
			this.props.navigation.navigate('bookings');
		};

	DownloadReceipt = () =>
		//Its using for navigate second screen which is present on App.js.
		{
			this.props.navigation.navigate('DownloadReciept');
		};

	ResendSMS = () =>
		//Its using for navigate second screen which is present on App.js.
		{
			alert('SMS is sent.');
		};
	newBookings = () => {
		this.props.navigation.navigate('newBookings');
	};
	render() {
		return (
			<ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>
				<View style={{ marginTop: 90 }}>
					{/* <Button style={styles.ButtonA} onPress={this.OpenMyBookings} title="My Bookings" />
					<Button color="#f194ff" onPress={this.DownloadReceipt} title="Download Booking Receipt" />
					<Button
						style={{ backgroundColor: '#dc143c', padding: 10 }}
						onPress={this.ResendSMS}
						title="Resend Last Booking SMS"
					/>
					<Button style={styles.ButtonA} onPress={this.newBookings} title="New Bookings" /> */}
					<TouchableOpacity
						onPress={this.OpenMyBookings}
						style={{ backgroundColor: '#000000', padding: 10, borderRadius: 8, opacity: 0.5 ,width : (Dimensions.get('window').width/4)*3.5,marginLeft :20}}
					>
						<Text style={{ color: '#f5f5dc', textAlign: 'center' }}>My Bookings</Text>
					</TouchableOpacity>
					<Text>{'\n'}</Text>
					<TouchableOpacity
						onPress={this.DownloadReceipt}
						style={{ backgroundColor: '#000000', padding: 10, borderRadius: 8 , opacity: 0.5 ,width :(Dimensions.get('window').width/4)*3.5,marginLeft :20}}
					>
						<Text style={{ color: '#f5f5dc', textAlign: 'center' }}>Download Booking Receipt</Text>
					</TouchableOpacity>
					<Text>{'\n'}</Text>
					<TouchableOpacity
						onPress={this.ResendSMS}
						style={{ backgroundColor: '#000000', padding: 10, borderRadius: 8 , opacity: 0.5 ,width :(Dimensions.get('window').width/4)*3.5,marginLeft :20}}
					>
						<Text style={{ color: '#f5f5dc', textAlign: 'center' }}>Resend Last Booking SMS</Text>
					</TouchableOpacity>
					<Text>{'\n'}</Text>
					<TouchableOpacity
						onPress={this.newBookings}
						style={{ backgroundColor: '#000000', padding: 10, borderRadius: 8 , opacity: 0.5 ,width :(Dimensions.get('window').width/4)*3.5 ,marginLeft :20}}
					>
						<Text style={{ color: '#f5f5dc', textAlign: 'center' }}>New Bookings</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		);
	}
}

const styles = {
	Background: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	ButtonA: {
		backgroundColor: '#00aeef',
		borderColor: 'red',
		borderWidth: 5,
		borderRadius: 15,
	},
};
