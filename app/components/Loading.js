import {View, Text} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default Loading;
