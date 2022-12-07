import React from "react";
import { ErrorMessage } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
const CustomField = ({ field, form, ...props }) => {
  let isError = form.errors[field.name] && form.touched[field.name];
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Username</FormLabel>
      <Input type="text" {...field} {...props} />
      {isError && (
        <ErrorMessage name={field.name}>
          {(msg) => <FormErrorMessage color="#C53030">{msg}</FormErrorMessage>}
        </ErrorMessage>
      )}
    </FormControl>
  );
};
export default CustomField;
