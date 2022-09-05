import {View, Text, Button} from 'react-native';
import React, {useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {MusicContext} from '../../context/MusicContext';
const PlayerScreen = () => {
  const {seekTo, pauseSong, playSong, progresValue} = useContext(MusicContext);
  const {selectedSong} = useRoute().params;
  // console.log(selectedSong);

  const handleSeek = val => {
    seekTo(val);
  };

  const handlePlay = () => {
    playSong();
  };
  const handlePause = () => {
    pauseSong();
  };

  console.log(progresValue, 'FROM COM');
  return (
    <View>
      <Text style={{color: 'black', fontSize: 18}}>
        Filename :: {selectedSong.filename}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>
        duration :: {selectedSong.duration}{' '}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>PlayerScreen</Text>

      <View
        style={{
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={selectedSong?.duration}
          value={progresValue}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSeek}
        />
      </View>

      <View style={{margin: 20}}>
        <Button title="pause" onPress={handlePause} />
        <Button title="play" onPress={handlePlay} />
      </View>
    </View>
  );
};

export default PlayerScreen;
