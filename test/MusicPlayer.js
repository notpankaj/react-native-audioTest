import React, {useEffect, useRef} from 'react';
import {useState} from 'react';

const SONG_URI =
  'https://ringtonestar.net/saved_ringtones/Touch_It-Ringtonestar.Net.mp3';

import {View, Text, Button} from 'react-native';
import Sound from 'react-native-sound';
const MusicPlayer = () => {
  const [music, setMusic] = useState(null);
  const [second, setSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  let intervalRef = useRef(null).current;
  const play = () => {
    let summer = new Sound(SONG_URI, null, err => {
      if (err) {
        console.log('error', err);
        return;
      }
      summer.play(success => {
        console.log('end', success);
      });
      setDuration(summer.getDuration());
    });
    console.log('summer', summer);
    setMusic(summer);
  };

  const clearTimeoutRef = () => {
    console.log('clearTimeoutRef()');
    try {
      clearInterval(intervalRef);
    } catch (error) {
      console.log(clearTimeout);
    }
  };
  useEffect(() => {
    if (music) {
      console.log(music);
      intervalRef = setInterval(() => {
        console.log('HI1');
        if (!music.isPlaying()) return;
        music.getCurrentTime((second, play) => {
          console.log('HI2', second);
          setSecond(second);
        });
      }, 100);
    }

    return () => {
      clearTimeoutRef();
    };
  }, [music]);
  const setVolume = type => {
    const volume = music.getVolume();
    console.log(volume);
    if (type == '+') {
      const newVolume = volume + 0.1;
      music.setVolume(newVolume);
    } else {
      const newVolume = volume - 0.1;
      music.setVolume(newVolume);
    }
  };
  return (
    <View>
      <Button
        title="Play"
        onPress={() => {
          play();
        }}
      />
      <Button
        title="Pause"
        onPress={() => {
          music.pause();
          clearTimeoutRef();
        }}
      />

      <Button
        title="Play"
        onPress={() => {
          music.play();
        }}
      />

      <Button
        title="Stop"
        onPress={() => {
          music.stop();
          clearTimeoutRef();
        }}
      />

      <Button
        title="Vol +"
        onPress={() => {
          setVolume('+');
        }}
      />

      <Button
        title="Vol -"
        onPress={() => {
          setVolume('-');
        }}
      />

      <Button
        title="set current Time"
        onPress={() => {
          music.setCurrentTime(12);
        }}
      />

      <Button
        title="status"
        onPress={() => {
          console.log(music.isPlaying());
        }}
      />

      <Text>
        {second} / Total Second {duration}
      </Text>
    </View>
  );
};
export default MusicPlayer;
