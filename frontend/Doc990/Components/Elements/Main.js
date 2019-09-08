import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Hospitals from "../Hospitals";
import Home from "../Home";
import OngoingNumber from "../OngoingNumber";
import Refund from "../Refund";
import Profile from "../Profile";
import About from "../About";
import MobileRefund from "../MobileRefund";
import BankRefund from "../BankRefund";


import {Image} from "react-native";

//NavBar Component
const navOpt = {
    Home:{
        title: 'Home',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/ichome.png')} style={{width:24,height:24}}/>
        }
    },
    About:{
        title: 'About',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/icabout.png')} style={{width:24,height:24}}/>
        }
    },
    Hospitals:{
        title: 'Hospitals',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/ichospitals.png')} style={{width:24,height:24}}/>
        }
    },
    OngoingNumber:{
        title: 'Ongoing Number',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/icongoing.png')} style={{width:24,height:24}}/>
        }
    },
    Profile:{
        title: 'Profile',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/icprofile.png')} style={{width:24,height:24}}/>
        }
    },
    Refund:{
        title: 'Refund',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/icrefund.png')} style={{width:24,height:24}}/>
        }
    },
    MobileRefund:{
        title: 'MobileRefund',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/icrefund.png')} style={{width:24,height:24}}/>
        }
    },

    BankRefund:{
        title: 'BankRefund',
        tabBarIcon:()=>{
            return <Image source={require('../../assets/Navbar/icrefund.png')} style={{width:24,height:24}}/>
        }
    },

};


export default createMaterialBottomTabNavigator({

    // MobileRefund : MobileRefund,
    // BankRefund : BankRefund,
    Home:{screen:Home,
          navigationOptions: navOpt.Home
        },
    OngoingNumber:{screen:OngoingNumber,
        navigationOptions: navOpt.OngoingNumber
    },
    Hospitals:{screen:Hospitals,
        navigationOptions: navOpt.Hospitals
    },
    Refund:{screen:Refund,
        navigationOptions: navOpt.Refund
    },
    Profile:{screen:Profile,
        navigationOptions: navOpt.Profile
    },
    About:{screen:About,
        navigationOptions: navOpt.About,
    },
    // MobileRefund:{screen:MobileRefund,
    //     navigationOptions:navOpt.MobileRefund
    // },
    // BankRefund:{screen:BankRefund,
    //     navigationOptions:navOpt.BankRefund
    // }
},{
    initialRouteName: 'Home',
    barStyle: { backgroundColor: '#000000' },
    activeColor: '#0348BD',
    inactiveColor: '#3e2465',
})
