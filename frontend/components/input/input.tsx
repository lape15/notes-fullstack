import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';

type InputProp = {
  keyboardType?: KeyboardTypeOptions;
  val: string;
  onChangeText: (val: string) => void;
  placeholder?: string;
};
export const InputField = (props: InputProp) => {
  const {keyboardType, val, onChangeText, placeholder} = props;
  const [value, setValue] = useState(val);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeUpAnim = useRef(new Animated.Value(-20)).current;

  const fadeIn = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();

  const fadeUp = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeUpAnim, {
      toValue: 10,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: Platform.OS === 'android' ? 30 : 50,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeUp();
    () => fadeOut();
  }, []);

  const handleChange = (e: string) => {
    setValue(e);
    onChangeText(e);
  };
  return (
    <Animated.View
      style={{
        ...styles.wrapper,
        transform: [
          {translateY: fadeUpAnim},
          //  {scale: fadeAnim}
        ],
      }}>
      <TextInput
        keyboardType={keyboardType || 'default'}
        value={value}
        onChangeText={(text: string) => handleChange(text)}
        style={styles.input}
        placeholder={placeholder}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    flexDirection: 'column',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  input: {
    padding: 5,
    paddingVertical: 10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 24,
  },
});
