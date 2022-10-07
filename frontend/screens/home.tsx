import React, {useState} from 'react';
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
import {AddNoteModal} from '../components/modal/modal';
import Notes from './notes';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [addNotes, setAddNotes] = useState(false);
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
          <Notes />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setAddNotes(true)}
            style={styles.touchable}>
            <Image source={require('../../assets/icons/plus.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AddNoteModal visible={addNotes} onHide={() => setAddNotes(false)} />
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
    backgroundColor: '#BD8E00',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
});
export default Home;
