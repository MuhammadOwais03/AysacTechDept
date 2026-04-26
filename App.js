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
import ChatSettings from './src/screens/ChatSettings';
import ArchieveChat from './src/screens/ArchieveChat';
import EngineerOfMonth from './src/screens/EngineerOfMonth'; 
import Notification from './src/screens/Notification';

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
        <Stack.Screen name="ChatSettings" component={ChatSettings} />
        <Stack.Screen name="ArchieveChat" component={ArchieveChat} />
        <Stack.Screen name="EngineerOfMonth" component={EngineerOfMonth} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}