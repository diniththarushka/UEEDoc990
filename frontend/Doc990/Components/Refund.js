import React from 'react';
import { createStackNavigator} from 'react-navigation';
import MainActivity from './RefundSearch';
import BankRefund from './BankRefund';
import MobileRefund from './MobileRefund';

export default Profile = createStackNavigator(
    //create navigation options
    {
        First:{screen: MainActivity,
            navigationOptions: {
                header: null,
            }},
        BankRefund:{screen:BankRefund,
            navigationOptions: {
                header: null,
            }},
        MobileRefund:{screen:MobileRefund,
            navigationOptions: {
                header: null,
            }},


    },
);
