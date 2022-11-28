import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import TaskItem from './TaskItem'
import InputField from './InputField'
import axios from 'axios'

function Todo() {
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);

  // Function to display/get data from database
  const itemList = async () => {
    let apiUrl = 'http://172.18.3.16:3000/todo_list';
    try {
      let response = await axios({
        method: 'GET',
        url: apiUrl,
      });
      console.log(response);
      if (response.status == 200) {
        let { data } = response;
        if (data) setList(data);
      }
    }
    catch (error) {
      console.log('Error Found: ', error.response);
    };
  }


  // Function to add data in database
  const addItem = async (task) => {
    console.log('Data', task);

    if (task.trim().length == '') {
      ToastAndroid.show('Input cannot be empty', ToastAndroid.SHORT)
    }
    else {
      let apiUrl = "http://172.18.3.16:3000/post";
      let formData = {
        itemName: task ? task : ''
      };
      console.log(formData)
      try {
        let response = await axios({
          method: 'POST',
          url: apiUrl,
          data: formData
        });
        console.log(response);
        ToastAndroid.show('Item added successfully', ToastAndroid.SHORT)
        setCounter(counter + 1);
      }
      catch (error) {
        console.log('Error Found: ', error);
      };
    }
  };


  // Function to delete data from database
  const deleteItem = async (data) => {
    console.log('Data: ', data);
    let { _id } = data;
    let apiUrl = `http://172.18.3.16:3000/delete_item/${_id}`;
    try {
      let response = await axios({
        method: 'DELETE',
        url: apiUrl,
      });
      console.log(response);
      ToastAndroid.show('Item deleted successfully', ToastAndroid.SHORT)
      setCounter(counter + 1)
    }
    catch (error) {
      console.log('Error: ', error.response);
    };
  };


  // Function to update data
  const updateItem = async (data, text) => {
    console.log(text)
    if (text.trim().length == '') {
      ToastAndroid.show('Input cannot be empty', ToastAndroid.SHORT)
    }
    else {
      let { _id } = data;
      let apiUrl = "http://172.18.3.16:3000/update_item";
      let updateData = {
        id: _id,
        itemName: text,
      };
      try {
        let response = await axios({
          method: 'POST',
          url: apiUrl,
          data: updateData,
        });
        console.log(response);
        ToastAndroid.show('Item updated successfully', ToastAndroid.SHORT)
        setCounter(counter + 1)
      }
      catch (error) {
        console.log('Error: ', error.response);
      };
    }
  };


  // Function to delete all list items 
  const deleteAll = async () => {
    let apiUrl = 'http://172.18.3.16:3000/delete_all';
    if (list.length == 0) {
      ToastAndroid.show('List is already empty', ToastAndroid.SHORT)
    }
    else {
      try {
        let response = await axios({
          method: 'DELETE',
          url: apiUrl
        })
        console.log(response)
        ToastAndroid.show('Data deleted successfully', ToastAndroid.SHORT)
        setCounter(counter + 1)
      }
      catch (error) {
        console.log('Error found: ', error)
      }
    }
  }


  useEffect(() => {
    itemList();
  }, [counter]);


  return (

    <View style={styles.container}>

      {/* Header view */}
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.heading}>
          ToDo List
        </Text>
        <Text style={styles.text}>
          Simple app to manage your daily to-dos
        </Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={deleteAll}
        >
          <Text style={styles.deleteAll}>
            Delete All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display data using map */}
      <ScrollView>
        {
          (list && list.length > 0)
            ?
            (
              list.map((item, index) => {
                return (
                  <View
                    style={styles.taskContainer}
                    key={index}
                  >
                    <TaskItem item={item} deleteItem={deleteItem} updateItem={updateItem} />
                  </View>
                );
              })
            )
            :
            (null)
        }
      </ScrollView>

      <InputField addItem={addItem} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b2d'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 16,
    margin: 5,
    marginBottom: 8,
  },
  taskContainer: {
    marginTop: 10
  },
  deleteAll: {
    color: 'white',
    margin: 8,
    padding: 14,
    paddingVertical: 8,
    borderRadius: 14,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#004448',
    // justifyContent: 'center',
    // textAlign: 'center',
    // width: '40%'
  },

})

export default Todo

