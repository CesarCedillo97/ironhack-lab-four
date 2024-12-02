import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TodoScreen from "../TodoScreen";

test("1 .- add new task", () => {
  const { getByText, getByTestId } = render(<TodoScreen />);
  fireEvent.changeText(getByTestId("taskInput"), "task-1");
  fireEvent.press(getByText("Add Task"));
  expect(getByText("task-1")).toBeTruthy();
});

test("2.- mark task as completed", () => {
  const { getByText, getByTestId } = render(<TodoScreen />);

  // Agregar una tarea
  fireEvent.changeText(getByTestId("taskInput"), "task-1");
  fireEvent.press(getByText("Add Task"));

  // El usuario presiona "Complete" en la tarea
  fireEvent.press(getByTestId(/completeButton-/));

  // El texto del task debe tacharse
  const completedTask = getByText("task-1");
  expect(completedTask.props.style).toEqual(
    expect.objectContaining({
      textDecorationLine: "line-through",
    })
  );
});

test("3.- remove task", () => {
  const { getByText, getByTestId, queryByText } = render(<TodoScreen />);

  // se agrega tarea
  fireEvent.changeText(getByTestId("taskInput"), "task-1");
  fireEvent.press(getByText("Add Task"));

  // checamos que la tarea se haya agregado
  expect(getByText("task-1")).toBeTruthy();

  // el usuario presiona "Delete" en la tarea
  fireEvent.press(getByTestId(/deleteButton-/));

  // la tarea no debe estar en la lista
  expect(queryByText("task-1")).toBeNull();
});
