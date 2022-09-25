import React, {useContext, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import {MusicContext} from '../context/MusicContext';
import Loading from '../components/Loading';
import DetailScreen from '../screens/Details/DetailScreen';
import PlayerScreen from '../screens/player/PlayerScreen';
import {Dimensions, ScrollView, View} from 'react-native';

const Stack = createNativeStackNavigator();

const WIDTH = Dimensions.get('window').width;
const MainStack = () => {
  const {isReady} = useContext(MusicContext);

  if (!isReady) return <Loading />;

  // return (
  //   <ScrollView horizontal style={{flex: 1}}>
  //     <HomeScreen />
  //     <PlayerScreen />
  //     {/*  <View style={{backgroundColor: 'green', flex: 1, width: WIDTH}} /> */}
  //   </ScrollView>
  // );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
