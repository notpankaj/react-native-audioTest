import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
const PlayerScreen = () => {
  const {selectedSong} = useRoute().params;
  console.log(selectedSong);
  return (
    <View>
      <Text style={{color: 'black', fontSize: 18}}>
        Filename :: {selectedSong.filename}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>
        duration :: {selectedSong.duration}{' '}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>PlayerScreen</Text>
    </View>
  );
};

export default PlayerScreen;
