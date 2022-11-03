import React, {useEffect, useRef} from 'react';
// import {format, compareAsc} from 'date-fns';
import {getMonth, getDate} from 'date-fns';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const mnts = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mrch',
  4: 'Aprl',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export type ItemProp = {
  note: {
    title: string;
    note: string;
    createdAt: string;
    category: string;
    id: number;
  };
  index: number;
  //   navigation:any
};

export const Item = (props: ItemProp) => {
  const navigation = useNavigation();
  const slideAnime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideIntoView();
  }, []);

  const slideIntoView = () => {
    Animated.timing(slideAnime, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: (props.index / 2) * 1000,
    }).start();
  };
  return (
    <Animated.View
      style={{
        ...style.item,
        opacity: slideAnime,
        transform: [{scale: slideAnime}],
      }}>
      <View style={style.head}>
        <Text style={style.cat}>{props.note.category || 'category'}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Note', {
              title: props.note.title,
              id: props.note.id,
            })
          }
          style={style.view}>
          <Image source={require('../../../assets/icons/visibility.png')} />
        </TouchableOpacity>
        <Text style={style.date}>
          {`${getDate(new Date(2012, 1, 29))}${
            mnts[getMonth(new Date(props.note.createdAt))]
          }`}
        </Text>
      </View>
      <View style={style.note}>
        <Text style={style.title}>{props.note.title}</Text>
        <Text style={style.noteText}>{props.note.note}</Text>
      </View>
    </Animated.View>
  );
};
const style = StyleSheet.create({
  item: {
    backgroundColor: '#BD8E00',
    marginVertical: 15,
    paddingHorizontal: 5,
    width: '48%',
    borderRadius: 12,
    alignItems: 'center',
    height: 200,
  },
  head: {
    position: 'relative',
    width: '100%',
  },
  cat: {
    color: 'white',
    fontSize: 10,
    marginLeft: 2,
  },
  view: {
    position: 'absolute',
    right: 3,
    zIndex: 4,
  },
  title: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    paddingTop: 20,
    textAlign: 'right',
    paddingHorizontal: 2,
    fontSize: 12,
  },
  note: {
    color: 'white',
    width: '100%',
    flex: 1,
    borderRadius: 12,
    padding: 5,
  },
  noteText: {
    fontSize: 12,
    color: 'white',
  },
});
