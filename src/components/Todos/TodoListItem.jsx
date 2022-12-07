import React, { useState } from "react";
import { Checkbox, HStack, IconButton, Spacer, Text } from "@chakra-ui/react";
import UpdateTodo from "./UpdateTodo";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import Coopernet from "../../utils/Coopernet";

export const TodoListItem = ({
  todo,
  toggleComplete,
  removeTodo,
  editTodo,
  indexKey,
}) => {
  const buttonProps = {
    icon: <FaTrash />,
    isRound: true,
    "aria-label": "delete",
  };

  const queryClient = useQueryClient();

  const { mutate: setCheck } = useMutation(Coopernet.updateTask, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  const handleOnchangeCheck = async () => {
    console.log(todo.isValidate);
    const changedChecked = todo.isValidate == "1" ? "0" : "1";
    setCheck({
      ...todo,
      isValidate: changedChecked,
    });
  };
  const { mutate: deleteTodo } = useMutation(Coopernet.deleteTask, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  return (
    <HStack key={indexKey}>
      <Checkbox colorScheme="teal" onChange={handleOnchangeCheck} />
      <Text>{todo.description}</Text>
      <Spacer />
      <UpdateTodo todo={todo} updateTodo={editTodo} />
      <IconButton onClick={() => deleteTodo(todo.id)} {...buttonProps} />
    </HStack>
  );
};
