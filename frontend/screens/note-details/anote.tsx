import React, {useEffect, useState, useRef} from 'react';
import {URL_API} from '../../../enpoint';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import {EditForm} from '../../components/form/edit_note';

type Note = {
  title: string;
  note: string;
  createdAt: string;
  category: string;
  id: number;
};
const ANote = ({route}) => {
  const [note, setNote] = useState<null | Note>(null);
  const tiny = useRef(new Animated.Value(0.8)).current;
  const [showEdit, setShowEdit] = useState(false);

  const getNote = async () => {
    try {
      const response = await fetch(`${URL_API}notes/:${route.params.id}`);
      const json = await response.json();
      setNote(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  const scaleUp = () => {
    Animated.timing(tiny, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const scaleDown = () => {
    console.log('I tried toscream');
    Animated.timing(tiny, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <SafeAreaView style={styles.area}>
      {/* <View style={styles.col}>
        <Text style={styles.sub}>Title</Text>
        <Text style={styles.text}>{note?.title}</Text>
      </View> */}
      <View style={styles.col}>
        <Text style={styles.sub}>Category</Text>
        <Text style={styles.text}>{note?.category || 'category'}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.text}>{note?.note}</Text>
      </View>
      <Animated.View style={{...styles.wrap, transform: [{scale: tiny}]}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            scaleUp();
            setShowEdit(true);
          }}
          //   onPressOut={scaleDown}
        >
          <Text style={styles.btnText}>Edit note</Text>
          <Image source={require('../../../assets/icons/edit.png')} />
        </TouchableOpacity>
      </Animated.View>
      <Modal
        visible={showEdit}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowEdit(false)}>
        <View style={styles.centeredView}>
          <EditForm
            visible={showEdit}
            note={{
              title: note?.title ?? '',
              category: note?.category ?? '',
              note: note?.note ?? '',
              id: note?.id,
            }}
            getNote={() => {
              getNote();
              setShowEdit(false);
            }}
            close={() => setShowEdit(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ANote;
const styles = StyleSheet.create({
  area: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 100,
  },
  centeredView: {
    flex: 1,
    position: 'relative',
    marginTop: 22,
    backgroundColor: '#212329',
  },
  text: {
    color: 'grey',
    marginTop: 3,
  },
  sub: {
    color: '#333',
    fontWeight: 'bold',
  },
  col: {
    marginVertical: 10,
    padding: 10,
  },
  wrap: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 25,
    padding: 10,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BD8E00',
    width: 100,
    gap: 5,

    height: 45,
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 12,
  },
});
