import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Switch } from 'react-native';
import Constants from 'expo-constants';

let todoId = 0;

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: []
    }
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text style={styles.header}>React TODO App</Text>
        <Text>
          Item count: {this.state.todos.length}
        </Text>
        <Text>
          Unchecked count: {this.state.todos.filter(todo => !todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title="New Todo"></Button>
        <ScrollView style={styles.fill}>
          {this.state.todos.map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => this.removeTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          )}
        </ScrollView>
      </View>
    );
  }

  addTodo() {
    todoId++;
    const text = `Todo number ${todoId}`;
    const currentTodos = this.state.todos.slice(); // This is the convention from the React tutorial

    this.setState({
      todos: currentTodos.concat([{
        id: todoId,
        text: text,
        checked: false
      }])

      // An alternative to the .slice/.concat would be to do the following which pulls all the values out of the old array and creates a new one with those values:
      //todos: [...this.state.todos, {id: todoId++, text: text, checked: false}]
    });
  }

  removeTodo(id) {
    const currentTodos = this.state.todos.slice();

    this.setState({
      todos: currentTodos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    const currentTodos = this.state.todos.slice();

    this.setState({
      todos: currentTodos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        }
      })
    });
  }
}

const Todo = props => (
    <View style={styles.todoContainer}>
      <Switch value={props.todo.checked} onValueChange={props.onToggle} />
      <Button onPress={props.onDelete} title="Delete"></Button>
      <Text>{props.todo.text}</Text>
    </View>
);


export default function App() {
  return (
    <TodoList />
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: Constants.statusBarHeight,
    textAlign: "center"
  },
  header: {
    fontSize: 18
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  fill: {
    flex: 1
  }
});
