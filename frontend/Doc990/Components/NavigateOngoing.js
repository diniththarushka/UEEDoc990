import React  from 'react';
import { createStackNavigator } from 'react-navigation';//install package
import OngoingNumber from "./MainOngoingPage";
import OngoingDetails from './OngoingDetails'

export default NavigateOngoing = createStackNavigator(
    //create navigation screens
    {
        First: { screen: OngoingNumber },//for main screen we have used first. Here its only type of variable.
        OngoingDetails: { screen: OngoingDetails },//second screen reference

    });