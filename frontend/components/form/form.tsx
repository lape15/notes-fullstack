import React, {useRef, useEffect} from 'react';
import {
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {Formik} from 'formik';
import {URL_API} from '../../../enpoint';

type FormProps = {
  visible: boolean;
  getNotes: () => void;
};
const noteValues = {title: '', note: '', category: ''};
export const Form = (props: FormProps) => {
  const slideAnime = useRef(new Animated.Value(-50)).current;
  const slideLeft = useRef(new Animated.Value(-2000)).current;
  const {visible, getNotes} = props;
  useEffect(() => {
    if (visible) {
      slideIntoView();
    }
  }, [visible]);

  const slideIntoView = () => {
    Animated.timing(slideAnime, {
      toValue: 30,
      duration: 1000,
      useNativeDriver: true,
    }).start(({finished}) => {
      slideFromLeft();
    });
  };

  const slideFromLeft = () => {
    Animated.timing(slideLeft, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{translateY: slideAnime}],
      }}>
      <Formik
        initialValues={noteValues}
        validate={values => {
          const errors = {};
          if (!values.note) {
            errors.note = 'Note cannot be empty';
          }
        }}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
          setSubmitting(false);
          try {
            const data = await fetch(`${URL_API}note`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            console.log(data, 'EEEE');
            resetForm();
            getNotes();
          } catch (err) {
            console.log(err);
          }
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Add new note</Text>
            <View style={styles.inputWraper}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                value={values.title}
                onChangeText={handleChange('title')}
                placeholder="Title"
                name="title"
                style={styles.input}
              />
              {errors.title && touched.title && <Text>{errors.title}</Text>}
            </View>
            <View style={styles.inputWraper}>
              <Text style={styles.label}>Note</Text>
              <TextInput
                value={values.note}
                onChangeText={handleChange('note')}
                style={styles.input}
                name="note"
              />
              {errors.note && touched.note && <Text>{errors.note}</Text>}
            </View>
            <View style={styles.inputWraper}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                value={values.category}
                onChangeText={handleChange('category')}
                style={styles.input}
                name="category"
              />
            </View>
            <Animated.View
              style={{
                ...styles.someview,
                transform: [{translateX: slideLeft}],
              }}>
              <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text style={styles.text}>Add note</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </Formik>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  form: {
    height: 700,
    padding: 10,
    marginTop: 10,
    // alignItems: 'center',
    paddingTop: 100,
  },
  someview: {
    width: 130,
    height: 50,
  },
  inputWraper: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input: {
    padding: 5,
    paddingVertical: 10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 24,
    marginVertical: 15,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  btn: {
    backgroundColor: '#BD8E00',
    color: 'white',
    marginTop: 5,
    borderRadius: 10,
    width: 120,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '50%',
    // padding:5
  },
});
