import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ModalProp = {
  visible: boolean;
  onHide: () => void;
};
export const AddNoteModal = (props: ModalProp) => {
  const {visible, onHide} = props;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onHide}>
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            onHide();
            console.log('help');
          }}>
          <Image source={require('../../../assets/icons/close.png')} />
        </TouchableOpacity>
        <View>
          <Text>Hello Modal</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'relative',
    marginTop: 22,
    backgroundColor: '#212329',
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    top: 12,
    backgroundColor: 'yellow',
  },
});
