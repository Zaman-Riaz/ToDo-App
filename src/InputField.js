import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

function InputField(props) {
    const [task, setTask] = useState('');

    const handleAddItem = (value) => {
        props.addItem(value);
        setTask('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter task'
                    placeholderTextColor={'white'}
                    style={{ color: 'white' }}
                    value={task}
                    onChangeText={text => setTask(text)}
                >
                </TextInput>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={() => handleAddItem(task)}
                >
                    <Icon name='plus' color='white' size={22} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 20,
        marginHorizontal: 20,
        justifyContent: 'space-around',
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#004448',
    },
    iconContainer: {
        height: 55,
        width: 55,
        backgroundColor: '#004448',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default InputField