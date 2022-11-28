import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

function TaskItem(props) {
  // console.log(props);
  const [inputText, setInputText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const pressHandler = () => {
    setModalIsOpen(false);
    setInputText('');
    handleUpdateItem(props.item, inputText);
    // console.log(props.item);
    // console.log('Clicked item', props.item.itemName);
    // console.log('Input data', inputText);
  }

  const handleDeleteItem = (data) => {
    props.deleteItem(data);
  }

  const handleUpdateItem = (data, text) => {
    props.updateItem(data, text)
  }

  const onModalClick = () => {
    setModalIsOpen(true)
  }

  return (

    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <Text style={styles.items}> {props.item.itemName} </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => handleDeleteItem(props.item)}
            >
              <Icon name='trash-o' size={22} color='white' style={{ margin: 4 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { onModalClick() }}
            >

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalIsOpen}
                onBackdropPress={() =>
                  setModalIsOpen(false)
                }
              >

                <View>
                  <View style={styles.modalView}>
                    <TextInput
                      placeholder='Enter text to update'
                      placeholderTextColor={'white'}
                      style={styles.input}
                      value={inputText}
                      onChangeText={text => setInputText(text)}
                    >
                    </TextInput>
                    <Pressable
                      style={[styles.button]}
                      onPress={pressHandler}
                    >
                      <Text style={styles.textStyle}> Save </Text>
                    </Pressable>
                  </View>
                </View>

              </Modal>


              <Icon name='edit' size={22} color='white' style={{ margin: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    minHeight: 55,
    backgroundColor: '#004448',
  },
  items: {
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize'
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalView: {
    margin: 15,
    backgroundColor: "#004448",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
  },
  button: {
    borderRadius: 20,
    padding: 12,
    width: '60%',
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    color: 'white',
  },

})

export default TaskItem