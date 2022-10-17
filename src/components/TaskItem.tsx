import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pen/edit.png';
import { Task } from "./TasksList";

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTite: string ) => void;
  }

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps){

    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)


    function handleStartEditing(){
        setIsEditing(true)

    }
    
    function handleCancelEditing(){

      setIsEditing(false)
      setTaskNewTitleValue(task.title)
    }

    function handleSubmitEditing(id: number){
      
      editTask(id, taskNewTitleValue)
      setIsEditing(false)
    }

    useEffect(() => {
        if(textInputRef.current){
            if(isEditing){
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return(
        <>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  style={ task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                    ref={textInputRef}
                    style={ task.done ? styles.taskTextDone : styles.taskText}
                    value={taskNewTitleValue}
                    editable={isEditing}
                    onChangeText={setTaskNewTitleValue}
                    onSubmitEditing={() => handleSubmitEditing(task.id)}
                />
              </TouchableOpacity>
            </View>
            <View style={ styles.iconsContainer } >
              { isEditing ? (
                <TouchableOpacity
                  onPress={handleCancelEditing}
                >
                  <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleStartEditing}
                >
                  <Image source={editIcon} />
                </TouchableOpacity>
              ) }

              <View 
                style={ styles.iconsDivider }
              />

              <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(task.id)}
              >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
              </TouchableOpacity>
            </View>
            
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }, 
    iconsContainer: {
      flexDirection: 'row',
      paddingRight: 24
    },
    iconsDivider: {
      height: 24,
      width: 1,
      color: 'rgba(196, 196, 196, 0.24)'
    }
    
  })