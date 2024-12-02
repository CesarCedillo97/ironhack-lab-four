import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: taskInput, completed: false },
    ]);
    setTaskInput("");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((taskInput) =>
        taskInput.id === id
          ? { ...taskInput, completed: !taskInput.completed }
          : taskInput
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((taskInput) => taskInput.id !== id));
  };

  return (
    <View>
      <TextInput
        placeholder="New Task"
        value={taskInput}
        onChangeText={setTaskInput}
        testID="taskInput"
      />
      <Button title="Add Task" onPress={addTask} testID="addButton" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
              testID={`taskText-${item.id}`}
            >
              {item.text}
            </Text>
            <Button
              title="Complete"
              onPress={() => toggleComplete(item.id)}
              testID={`completeButton-${item.id}`}
            />
            <Button
              title="Delete"
              onPress={() => deleteTask(item.id)}
              testID={`deleteButton-${item.id}`}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;