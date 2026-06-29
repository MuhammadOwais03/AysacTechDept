import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';



// Existing Screens

import HomeScreen from './src/screens/HomeScreen';

import Communities from './src/screens/Communities';

import HeadOffice from './src/screens/HeadOffice';

import CommunityInfo from './src/screens/CommunityInfo';

import Dashboard from './src/screens/Dashboard';

import DutyOn from './src/screens/DutyOn';

import DutyOff from './src/screens/DutyOff';

import Rankings from './src/screens/Rankings';

import Wallet from './src/screens/Wallet';

import Profile from './src/screens/Profile';

import Account from './src/screens/Account';

import Settings from './src/screens/Settings';

import GettingStarted from './src/screens/GettingStarted';

import Guidelines from './src/screens/Guidelines';

import SalesTool from './src/screens/SalesTool';

import GenAI from './src/screens/GenAI';

import ContactUs from './src/screens/ContactUs';

import Chat from './src/screens/Chat';

import ParticularChat from './src/screens/ParticularChat';

import ChatSettings from './src/screens/ChatSettings';

import ArchieveChat from './src/screens/ArchieveChat';

import EngineerOfMonth from './src/screens/EngineerOfMonth';

import Notification from './src/screens/Notification';

import ContractsTemplate from './src/screens/ContractsTemplate';
import InvoiceIcon from './src/screens/InvoiceIcon';
import Preview from './src/screens/Preview';
import Editor from './src/screens/Editor';
import VisitProfile from './src/screens/VisitProfile';

import AddFromRules from './src/screens/AddFromRules';



// 1. IMPORT YOUR INVOICING SCREEN HERE (Make sure path matches your file name)

import InvoicingScreen from './src/screens/InvoicingScreen';



const Stack = createStackNavigator();



export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="People" component={Communities} />

        <Stack.Screen name="HeadOffice" component={HeadOffice} />

        <Stack.Screen name="CommunityInfo" component={CommunityInfo} />

        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen name="DutyOn" component={DutyOn} />

        <Stack.Screen name="DutyOff" component={DutyOff} />

        <Stack.Screen name="Rankings" component={Rankings} />

        <Stack.Screen name="Wallet" component={Wallet} />

        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen name="Settings" component={Settings} />

        <Stack.Screen name="Account" component={Account} />

        <Stack.Screen name="GettingStarted" component={GettingStarted} />

        <Stack.Screen name="Guidelines" component={Guidelines} />

        <Stack.Screen name="SalesTool" component={SalesTool} />

        <Stack.Screen name="GenAI" component={GenAI} />

        <Stack.Screen name="ContactUs" component={ContactUs} />

        <Stack.Screen name="Chat" component={Chat} />

        <Stack.Screen name="ParticularChat" component={ParticularChat} />
        <Stack.Screen name="VisitProfile" component={VisitProfile} />

        <Stack.Screen name="ChatSettings" component={ChatSettings} />

        <Stack.Screen name="ArchieveChat" component={ArchieveChat} />

        <Stack.Screen name="EngineerOfMonth" component={EngineerOfMonth} />

        <Stack.Screen name="Notification" component={Notification} />

        <Stack.Screen name="ContractsTemplate" component={ContractsTemplate} />
        <Stack.Screen name="InvoiceIcon" component={InvoiceIcon} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="Editor" component={Editor} />

        <Stack.Screen name="AddFromRules" component={AddFromRules} />

        {/* 2. REGISTER THE INVOICING SCREEN HERE */}

        <Stack.Screen name="InvoicingScreen" component={InvoicingScreen} />

      </Stack.Navigator>

    </NavigationContainer>

  );

}