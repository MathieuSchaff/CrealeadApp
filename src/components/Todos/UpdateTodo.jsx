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
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import Coopernet from "../../utils/Coopernet";
function UpdateTodo({ todo }) {
  const [checkedItem, setCheckedItem] = React.useState(
    todo.isValidate ?? false
  );
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
      label: body.label ?? todo.label,
      description: body.description ?? todo.description,
      ended: body.ended ?? todo.ended,
      isValidate: body.isValidate ?? todo.isValidate,
    });
    setBody({
      label: null,
      description: null,
      isValidate: null,
    });
    onClose();
  };

  const handleDescription = (e) => {
    modifyTodo({ ...body, description: e.target.value });
  };
  const handleDate = (e) => {
    modifyTodo({ ...body, ended: e.target.value });
  };
  const handleLabel = (e) => {
    modifyTodo({ ...body, label: e.target.value });
  };
  const handleValidate = (e) => {
    setCheckedItem(e.target.checked);
    const validate = checkedItem === false ? "0" : "1";
    modifyTodo({ ...body, isValidate: validate });
  };
  return (
    <>
      {todo && (
        <>
          {" "}
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
                  <FormLabel>Task description</FormLabel>

                  <Input
                    ref={initialRef}
                    placeholder="Enter your task"
                    defaultValue={todo.description}
                    onChange={(e) => handleDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Task label</FormLabel>

                  <Input
                    placeholder="Enter your task label"
                    onChange={(e) => handleLabel(e)}
                    onFocus={(e) => handleLabel(e)}
                    defaultValue={todo.label}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Task date</FormLabel>

                  <Input
                    type="date"
                    placeholder="Enter your task end date"
                    onChange={(e) => handleDate(e)}
                    onFocus={(e) => handleDate(e)}
                    defaultValue={todo.ended}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Is your task done? </FormLabel>

                  <Checkbox
                    onChange={(e) => handleValidate(e)}
                    isChecked={checkedItem}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={(e) => handleMutationTodo()}
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default UpdateTodo;
