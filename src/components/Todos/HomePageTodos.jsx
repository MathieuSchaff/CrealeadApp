import React, { useEffect, useState } from "react";
import { queryClient } from "../../index.js";
import Coopernet from "../../utils/Coopernet";
import { Badge, StackDivider, Text, VStack, Flex } from "@chakra-ui/react";
import { TodoListItem } from "./TodoListItem";
import { TodoForm } from "./TodoForm";
import { useQuery, useMutation } from "react-query";
function HomePageTodos() {
  const vStackProps = {
    p: "4",
    w: "100%",
    maxW: { base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" },
    borderColor: "gray.100",
    borderWidth: "2px",
    borderRadius: "lg",
    alignItems: "stretch",
    divider: <StackDivider />,
  };
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery("todos", async () => Coopernet.getTasks(), {
    initialData: [],
  });

  return (
    <VStack alignItems="center" mt={2}>
      <TodoForm />
      {todos.length === 0 ? (
        <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
          Pas de todo.
        </Badge>
      ) : null}
      {error && <Text> An error occured</Text>}
      {isLoading && <Text>Chargement ... </Text>}

      {todos.length > 0 && (
        <VStack {...vStackProps}>
          <Text>Faites</Text>
          {todos
            .filter((todo) => todo.isValidate === "1")
            .map((todo) => (
              <TodoListItem todo={todo} indexKey={todo.id} />
            ))}
        </VStack>
      )}
      {todos.length > 0 && (
        <VStack {...vStackProps}>
          <Text>A faire</Text>
          {todos
            .filter((todo) => todo.isValidate === "0")
            .map((todo) => (
              <TodoListItem todo={todo} indexKey={todo.id} />
            ))}
        </VStack>
      )}
    </VStack>
  );
}

export default HomePageTodos;
