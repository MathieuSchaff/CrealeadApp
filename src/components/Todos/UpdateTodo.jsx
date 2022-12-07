import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import Coopernet from "../../utils/Coopernet";
function UpdateTodo({ todo, updateTodo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState("");

  const initialRef = React.useRef();

  const queryClient = useQueryClient();

  const { mutate: modifyTodo } = useMutation(Coopernet.updateTask, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  const handleMutationTodo = async () => {
    modifyTodo({
      ...todo,
      description: body,
    });
    onClose();
  };
  return (
    <>
      <IconButton icon={<FiEdit />} isRound="true" onClick={onOpen} />
      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Update your task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Enter your task"
                defaultValue={todo.description}
                onChange={(e) => setBody(e.target.value)}
                onFocus={(e) => setBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={(e) => handleMutationTodo()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTodo;
