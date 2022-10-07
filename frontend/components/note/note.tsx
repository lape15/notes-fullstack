import React, {useEffect, useState} from 'react';
// import {format, compareAsc} from 'date-fns';
import {getMonth, getDate} from 'date-fns';

import {View, Text, StyleSheet} from 'react-native';
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

type ItemProp = {
  note: {
    title: string;
    note: string;
    createdAt: string;
    category: string;
  };
};

export const Item = (props: ItemProp) => (
  <View style={style.item}>
    <View style={style.head}>
      <Text style={style.cat}>{props.note.category || 'category'}</Text>
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
  </View>
);

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
