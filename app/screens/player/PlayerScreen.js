import {View, Text, Button} from 'react-native';
import React, {useContext} from 'react';
import Slider from '@react-native-community/slider';
import {MusicContext} from '../../context/MusicContext';
import {useProgress} from 'react-native-track-player';

const PlayerScreen = () => {
  const {
    seekTo,
    pauseSong,
    playSong,
    progresValue,
    nextSong,
    prevSong,
    activeSongObj,
  } = useContext(MusicContext);

  const handleSeek = val => {
    seekTo(val);
  };

  const handlePlay = () => {
    playSong();
  };
  const handlePause = () => {
    pauseSong();
  };

  const handleNext = () => {
    nextSong();
  };

  const handlePrev = () => {
    prevSong();
  };

  console.log(progresValue, 'FROM COM');
  return (
    <View>
      <Text style={{color: 'black', fontSize: 18}}>
        Filename :: {activeSongObj.filename}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>
        duration :: {activeSongObj.duration}{' '}
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
          maximumValue={activeSongObj?.duration}
          value={progresValue}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSeek}
        />
      </View>

      <View style={{margin: 20}}>
        <Button title="pause" onPress={handlePause} />
        <Button title="play" onPress={handlePlay} />
        <Button title="next" onPress={handleNext} />
        <Button title="prev" onPress={handlePrev} />
      </View>
    </View>
  );
};

export default PlayerScreen;
