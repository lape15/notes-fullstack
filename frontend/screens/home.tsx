import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {InputField} from '../components/input/input';
import {URL_API} from '../../enpoint';
import {AddNoteModal} from '../components/modal/modal';
import Notes from './notes';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [addNotes, setAddNotes] = useState(false);
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        horizontal={true}>
        <View style={styles.parent}>
          <InputField
            placeholder="Search note....."
            val=""
            onChangeText={() => console.log('happier than ever')}
          />
          <Notes notes={notes} />
        </View>

        <TouchableOpacity
          onPress={() => setAddNotes(true)}
          style={styles.touchable}>
          <Image source={require('../../assets/icons/plus.png')} />
        </TouchableOpacity>
      </ScrollView>
      <AddNoteModal
        visible={addNotes}
        onHide={() => setAddNotes(false)}
        getNotes={getNotes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
    position: 'relative',
  },
  parent: {
    flex: 1,
    backgroundColor: 'white',
    height: 700,
    padding: 5,
  },
  touchable: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 2,
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default Home;
