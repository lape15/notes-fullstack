import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Form} from '../form/form';

type ModalProp = {
  visible: boolean;
  onHide: () => void;
  getNotes: () => void;
};
export const AddNoteModal = (props: ModalProp) => {
  const {visible, onHide, getNotes} = props;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onHide}>
      <View style={styles.centeredView}>
        <TouchableOpacity style={styles.closeBtn} onPress={onHide}>
          <Image source={require('../../../assets/icons/close.png')} />
        </TouchableOpacity>
        <View>
          <Form
            visible={visible}
            getNotes={() => {
              onHide();
              getNotes();
            }}
          />
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 50,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    width: 30,
    justifyContent: 'center',
  },
});
