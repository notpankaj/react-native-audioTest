import React, {useContext, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import {MusicContext} from '../context/MusicContext';
import Loading from '../components/Loading';
import DetailScreen from '../screens/Details/DetailScreen';
import PlayerScreen from '../screens/player/PlayerScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {isReady} = useContext(MusicContext);

  if (!isReady) return <Loading />;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
