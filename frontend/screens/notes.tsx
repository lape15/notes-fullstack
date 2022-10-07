import React, {useEffect, useState} from 'react';

import {FlatList, View, Text, StyleSheet} from 'react-native';
import {URL_API} from '../../enpoint';
import {Item} from '../components/note/note';

const Notes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const getNotes = async () => {
    try {
      const response = await fetch(`${URL_API}notes`);
      const json = await response.json();
      setNotes(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={notes}
        renderItem={({item}) => <Item note={item} />}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.listWrapper}
        numColumns={2}
        horizontal={false}
      />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 30,
  },
  listWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 5,
  },
});
