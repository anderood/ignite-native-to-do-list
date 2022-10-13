import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const result = tasks.find(item => item.title === newTaskTitle);
    
    if(result){
      Alert.alert(
        "Task Já Cadastrada",
        'Você não pode cadastrar uma task com o mesmo nome'
      )
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {

    tasks.filter(item => item.id === id).map(item => {
      item.done == false ? item.done = true : item.done = false;
      return item;
    });
    
    setTasks([...tasks])
    
  }

  function handleRemoveTask(id: number) {
    
    Alert.alert(
      'Remover Item', 
      'Tem Certeza que você deseja remover esse item?', 
      [
        {
          text: 'Não', 
        },
        {
          text: 'Sim', 
          onPress: () => removeTask()
        },
      ]

    )
    function removeTask() {
      const result = tasks.filter(item => item.id !== id);
      setTasks([...result])
    }

  } 

  function handleEditTask(taskId: number, taskNewTite: string){

    tasks.filter(item => item.id === taskId).map(item => {
      item.title == taskNewTite;
      return item;
    });

    setTasks([...tasks])
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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