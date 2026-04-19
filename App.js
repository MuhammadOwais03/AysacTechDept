import React, { useState } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import {
  HomeScreen,
  Screen1_Notifications,
  Screen2_Profile,
  Screen3_NewList,
  Screen4_ReportSent,
  Screen5_Settings,
  Screen6_AddNewData,
  Screen7_Communities,
  C,
} from './screens';

export default function App() {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    const back = () => setScreen('home');
    switch (screen) {
      case 'notifications': return <Screen1_Notifications onBack={back} />;
      case 'profile':       return <Screen2_Profile onBack={back} />;
      case 'newlist':       return <Screen3_NewList onBack={back} />;
      case 'report':        return <Screen4_ReportSent onBack={back} />;
      case 'settings':      return <Screen5_Settings onBack={back} />;
      case 'addnewdata':    return <Screen6_AddNewData onBack={back} />;
      case 'communities':   return <Screen7_Communities onBack={back} />;
      default:              return <HomeScreen onNavigate={setScreen} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      {renderScreen()}
    </View>
  );
}
