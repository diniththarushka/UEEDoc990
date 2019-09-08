import React from 'react';
import { createStackNavigator,createAppContainer } from 'react-navigation'; //install package
import MainActivity from './MainActivity';
import DownloadReciept from './DownloadReceipt';
import ResendSMS from './ResendSMS';
import MyBookings from './BookingDetails';
import OngoingNumber from './OngoingNumber';
import OngoingDetails from './OngoingDetails';
import SearchDoctor from './Home';

export default Profile = createStackNavigator(
    //create navigation screens
    {
        First:{screen: MainActivity},//for main screen we have used first. Here its only type of variable.
        DownloadReciept: { screen: DownloadReciept },//second screen reference
        resendSMS : {screen : ResendSMS},
        bookings : {screen : MyBookings},
        newBookings : {screen : SearchDoctor},
        // OngoingNumber : {screen : OngoingNumber},
        OngoingDetails : {screen : OngoingDetails}
    }
    
    );



