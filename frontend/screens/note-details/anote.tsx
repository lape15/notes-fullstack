import React, {useEffect} from 'react';
import {URL_API} from '../../../enpoint';
import {View, Text, StyleSheet} from 'react-native';

const ANote = ({route}) => {
  console.log(route);

  const getNote = async () => {
    try {
      const response = await fetch(`${URL_API}notes/:${route.params.id}`);
      const json = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <View>
      <Text>A single Note here</Text>
    </View>
  );
};

export default ANote;
