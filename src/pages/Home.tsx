import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    tasks.filter(item => item.id === id).map(item => {
      item.done == false ? item.done = true : item.done = false;
      return item;
    });
    
    setTasks([...tasks])
    
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const result = tasks.filter(item => item.id !== id);
    setTasks([...result])

  } 

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})