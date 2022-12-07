import React, { useState } from "react";
import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Coopernet from "../../utils/Coopernet";
import { useMutation, useQueryClient } from "react-query";

export const TodoForm = () => {
  const [newTodo, setNewTodo] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation(Coopernet.addTask, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({
      label: newTodo.label,
      description: newTodo.description,
      ended: newTodo.ended,
      isValidate: 0,
    });
    setNewTodo({
      label: null,
      description: null,
      isValidate: null,
    });
    onClose();
  };
  const handleDescription = (e) => {
    setNewTodo({ ...newTodo, description: e.target.value });
  };
  const handleDate = (e) => {
    setNewTodo({ ...newTodo, ended: e.target.value });
  };
  const handleLabel = (e) => {
    setNewTodo({ ...newTodo, label: e.target.value });
  };
  return (
    <>
      <Button type="button" colorScheme="teal" px="8" onClick={onOpen}>
        Nouvelle tâche
      </Button>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Creer une nouvelel tâche</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task description</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Enter your task description"
                  onChange={(e) => handleDescription(e)}
                  onFocus={(e) => handleDescription(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Task label</FormLabel>

                <Input
                  placeholder="Enter your task label"
                  onChange={(e) => handleLabel(e)}
                  onFocus={(e) => handleLabel(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Task date</FormLabel>

                <Input
                  type="date"
                  placeholder="Enter your task end date"
                  onChange={(e) => handleDate(e)}
                  onFocus={(e) => handleDate(e)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
