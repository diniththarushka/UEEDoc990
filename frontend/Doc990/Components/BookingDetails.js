import React, { Component } from 'react';
import {
	StyleSheet,
	Button,
	View,
	ScrollView,
	Text,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

export default class BookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['Ref No', 'App No.', 'Name', 'Time', 'Hospital', 'Doctor', 'Session', 'Re-book'],
			widthArr: [120, 120, 120, 120, 120, 120, 120, 120],
			tableData: [
				['001110', '1', 'mithula', '8.00p.m', 'Asiri colombo3', 'R.M.deva', '1', 'no'],
				['002212', '19', 'dinith', '10.00p.m', 'Nawaloka colombo3', 'L.M.diva', '1', 'no'],
				['011990', '34', 'damsak', '9.00p.m', 'Henms waththla', 'T.desa', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
				['003333', '9', 'miuru', '1.00p.m', 'ragaama hospital', 'R.M.deva', '1', 'no'],
			],
		};
	}

	SearchNumber = () => {
		this.props.navigation.navigate('newBookings');
	};
	newBookings = () => {
		this.props.navigation.navigate('newBookings');
	};
	render() {
		const state = this.state;
		// const tableData = [];
		// for (let i = 0; i < 5; i += 1) {
		//   const rowData = [['mm']];
		//   for (let j = 0; j < 8; j += 1) {
		//     rowData.push(`${i}${j}`);
		//   }
		//   tableData.push(rowData);
		// }

		return (
			<ImageBackground source={require('../assets/darkned.jpg')} style={styles.Background} resizeMode={'stretch'}>
				{/* <View style={styles.container}> */}
				<View>
					<TouchableOpacity
						onPress={this.newBookings}
						style={{
							marginTop: Dimensions.get('window').width / 6,
							backgroundColor: '#000000',
							padding: 10,
							borderRadius: 8,
							opacity: 0.5,
							width: (Dimensions.get('window').width / 4) * 1.5,

							marginLeft: (Dimensions.get('window').width / 4) * 2.1,
						}}
					>
						<Text style={{ color: '#f5f5dc', textAlign: 'center', fontWeight: 'bold' }}>
							{' '}
							+ NEW BOOKINGS
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Image source={require('../assets/jj.png')} style={styles.InputBoxIcon} resizeMode={'stretch'} />
					<Text style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }} resizeMode={'stretch'}>
						MY BOOKINGS
					</Text>
				</View>
				<View style={styles.container}>
					<ScrollView horizontal={true}>
						<View>
							<Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
								<Row
									data={state.tableHead}
									widthArr={state.widthArr}
									style={styles.header}
									textStyle={styles.text}
								/>
							</Table>
							<ScrollView style={styles.dataWrapper}>
								<Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
									<Rows
										style={{ backgroundColor: '#F7F6E7' }}
										widthArr={state.widthArr}
										data={state.tableData}
										textStyle={styles.text}
									/>
								</Table>
							</ScrollView>
						</View>
					</ScrollView>
				</View>
				{/* </View> */}
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	Background: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		// backgroundColor : 'black'
	},
	InputBoxIcon: {
		height: Dimensions.get('window').height / 25,
		width: Dimensions.get('window').height / 25,
		marginLeft: Dimensions.get('window').width / 2.2,
		marginTop: 20,
	},
	container: { flex: 1, padding: 16, paddingTop: 30 },
	header: { height: 50, backgroundColor: '#537791' },
	text: { textAlign: 'center', fontWeight: '100' },
	dataWrapper: { marginTop: -1 },
	row: { height: 40, backgroundColor: '#E7E6E1' },
});
