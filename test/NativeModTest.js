import {View, Button} from 'react-native';
import React from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';
const {CalendarModule: CM} = NativeModules;

const eventEmitter = new NativeEventEmitter(CM);
const NativeModTest = () => {
  const nModPromise = async () => {
    try {
      const res = await CM.createCalendarEventPromise();
      console.log(res);
    } catch (error) {
      console.log({error});
    }
  };

  React.useEffect(() => {
    CM.createCalendarEvent(res => console.log({res}));

    eventEmitter.addListener('EventCount', eventCount =>
      console.log({eventCount}),
    );
    return () => {
      eventEmitter?.removeAllListeners();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="promise" onPress={nModPromise} />
    </View>
  );
};

export default NativeModTest;
