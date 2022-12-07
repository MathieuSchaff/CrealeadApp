import React, { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import Coopernet from "../../utils/Coopernet";
import { useMutation, useQueryClient } from "react-query";

export const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation(Coopernet.addTask, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enter submit create Todo");

    createTodo({
      label: "toto",
      description: newTodo,
      isValidate: 0,
    });
    setNewTodo("");
    onClose();
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
              <div>BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</div>

              <button
                onClick={() => {
                  createTodo({
                    label: "aaaaaaaaaa",
                    description: "RORORORORO",
                    isValidate: 0,
                  });
                }}
              >
                Add Todo
              </button>
              <FormControl>
                <Input
                  ref={initialRef}
                  placeholder="Enter your task"
                  onChange={(e) => setNewTodo(e.target.value)}
                  onFocus={(e) => setNewTodo(e.target.value)}
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
