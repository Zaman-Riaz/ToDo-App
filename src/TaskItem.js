import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, TextInput } from 'react-native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

function TaskItem(props) {
  // console.log(props);
  const [inputText, setInputText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to delete data from database
  const deleteItem = async (data) => {
    console.log('Data: ', data);
    let { _id } = data;
    let apiUrl = `http://172.18.3.198:3001/todo_item/delete/${_id}`;

    try {
      let response = await axios({
        method: 'DELETE',
        url: apiUrl,
      });
      console.log(response);
    }

    catch (error) {
      console.log('Error: ', error.response);
    };
  };

  // Function to update data 
  const updateItem = async (data, text) => {
    console.log(text)
    
    let { _id } = data;
    let apiUrl = `http://172.18.3.198:3001/todo_item/update/${_id}`;
    let updateData = {
      itemName: text,
      id: _id
    };

    try {
      let response = await axios({
        method: 'PUT',
        url: apiUrl,
        data: updateData,
      });
      console.log(response);
    }

    catch (error) {
      console.log('Error: ', error.response);
    };
  };

  const ModalCall = () => {

    return (
      <View>

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
              {/* <Text style={styles.modalText}> Hello world !!!</Text> */}
              <Pressable
                style={[styles.button]}
                onPress={pressHandler}
              >
                <Text style={styles.textStyle}> Save </Text>
              </Pressable>
            </View>
          </View>

        </Modal>

      </View>
    );
  }

  const pressHandler = () => {
    setModalIsOpen(false);
    setInputText('');
    updateItem(props.item, inputText);
    console.log(props.item);
    console.log('Clicked item', props.item.itemName);
    console.log('Input data', inputText);
  }

  const onClick = () => {
    setModalIsOpen(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.items}> {props.item.itemName} </Text>
        <View style= {styles.iconContainer}>
          <TouchableOpacity
            onPress={() => deleteItem(props.item)}
          >
            <Icon name='trash-o' size={22} color='white' style={{margin: 4}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onClick() }}
          >
            <ModalCall />
            <Icon name='edit' size={22} color='white' style={{margin: 4}} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
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
  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
    margin: 5
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