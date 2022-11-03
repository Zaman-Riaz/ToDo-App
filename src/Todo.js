import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import TaskItem from './TaskItem'
import InputField from './InputField'
import axios from 'axios';

function Todo() {
  const [list, setList] = useState([]);

  // Function to add data in database
  const addItem = async (task) => {
    console.log('Data', task);

    let apiUrl = "http://172.18.3.198:3001/todo/save";
    let formData = {
      itemName: task ? task : ''
    };

    try {
      let response = await axios({
        method: 'POST',
        url: apiUrl,
        data: formData
      });
      console.log(response);
    }

    catch (error) {
      console.log('Error Found: ', error.response);
    };
  };

  // Function to display data from database
  const userList = async () => {
    let userUrl = 'http://172.18.3.198:3001/todo_list';

    try {
      let response = await axios({
        method: 'GET',
        url: userUrl,
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

  useEffect(() => {
    userList();
  }, []);

  return (
    <View style={styles.container}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Text style={styles.heading}>
          ToDo List
        </Text>
        <TouchableOpacity
        // onPress={deleteAll}
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
                    <TaskItem item={item} />
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
  heading: {
    margin: 25,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  taskContainer: {
    marginTop: 10
  },
  deleteAll: {
    color: 'white',
    marginTop: 50,
    padding: 14,
    paddingVertical: 8,
    borderRadius: 14,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#004448',
    justifyContent: 'center'
  }
})

export default Todo

