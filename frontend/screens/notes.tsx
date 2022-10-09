import React from 'react';

import {FlatList, View, StyleSheet} from 'react-native';
import {Item} from '../components/note/note';

type NotesProp = {
  notes: Array<any>;
};
const Notes = ({notes}: NotesProp) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={notes}
        renderItem={({item}) => <Item note={item} />}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.listWrapper}
        numColumns={2}
        horizontal={false}
        initialNumToRender={4}
      />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    marginVertical: 30,
    backgroundColor: 'white',
  },
  listWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 5,
  },
});
