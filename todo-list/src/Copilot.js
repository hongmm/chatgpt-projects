//create a todo list with the following features:
// 1. add todo
// 2. delete todo
// 3. mark todo as done
// rewrite this code without using react-native and @expo/vector-icons

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// const Copilot = () => {

//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setTodos([...todos, newTodo]);
//         setNewTodo('');
//     };
    
//     const handleDelete = (index) => {
//         setTodos(todos.filter((_, i) => i !== index));
//     };

//     const handleEdit = (index, newTodo) => {
//         setTodos(todos.map((todo, i) => (i === index ? newTodo : todo)));
//     };


import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Copilot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            text: ''
        }
    }

    addTodo = () => {
        let newTodo = {
            text: this.state.text,
            done: false
        }
        let newTodoList = [...this.state.todoList, newTodo]
        this.setState({ todoList: newTodoList, text: '' })
    }

    deleteTodo = (index) => {
        let newTodoList = [...this.state.todoList]
        newTodoList.splice(index, 1)
        this.setState({ todoList: newTodoList })
    }

    markTodo = (index) => {
        let newTodoList = [...this.state.todoList]
        newTodoList[index].done = !newTodoList[index].done
        this.setState({ todoList: newTodoList })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Todo List</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <TouchableOpacity onPress={this.addTodo}>
                        <Ionicons name="md-add" size={32} color="green" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.todoList}
                    renderItem={({ item, index }) =>
                        <View style={styles.todoContainer}>
                            <TouchableOpacity onPress={() => this.markTodo(index)}>
                                <Ionicons name={item.done ? "md-checkbox" : "md-square-outline"} size={32} color="green" />
                            </TouchableOpacity>
                            <Text style={[styles.todoText, { textDecorationLine: item.done ? 'line-through' : 'none' }]}>{item.text}</Text>
                            <TouchableOpacity onPress={() => this.deleteTodo()}>
                                <Ionicons name="md-trash" size={32} color="red" />
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}