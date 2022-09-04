import React from 'react';
import MusicProvider from './app/context/MusicContext';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './app/navigation/MainStack';

const App = () => {
  return (
    <NavigationContainer>
      <MusicProvider>
        <MainStack />
      </MusicProvider>
    </NavigationContainer>
  );
};

export default App;
