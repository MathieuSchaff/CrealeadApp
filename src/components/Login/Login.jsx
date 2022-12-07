import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, VStack, Flex, Text } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Coopernet from "../../utils/Coopernet";
import CustomField from "./CustomField";
import "./login.css";
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Must be 5 characters atleast ")
    .required("Required"),
  password: Yup.string()
    .min(3, "Must be 5 characters atleast ")
    .required("Required"),
});
const initialValues = {
  username: "",
  password: "",
};
// schaff.mathieu
const Login = ({ handleToogle }) => {
  const navigate = useNavigate();
  const [errLogin, setErrLogin] = useState(false);
  const submitButton = async (values, helpers) => {
    try {
      Coopernet.setUsername(values.username);
      Coopernet.setPassword(values.password);
      await Coopernet.setOAuthToken();
      console.log(Coopernet.oauth);
      if (JSON.stringify(Coopernet.oauth) === "{}") {
        throw new Error("Username or Password incorrect");
      }
      navigate("/");
    } catch (err) {
      console.log("error", err);
      setErrLogin(true);
    } finally {
      helpers.resetForm();
      helpers.setSubmitting(false);
    }
  };

  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      height={{ base: "100%", sm: "50%", md: "25%" }}
      className="flex-login"
    >
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={initialValues}
          onSubmit={submitButton}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack spacing={4} align="flex-start">
                <Field
                  name="username"
                  id="username"
                  type="text"
                  placeholder="username"
                  component={CustomField}
                  variant="filled"
                />
                <Field
                  name="password"
                  id="password"
                  type="text"
                  placeholder="password"
                  component={CustomField}
                  variant="filled"
                />
                {errLogin && (
                  <Text color="red.400" fontSize="md">
                    Username or Password incorrect
                  </Text>
                )}

                <Button
                  className="sign-in-button"
                  type="submit"
                  bg="teal"
                  color="white"
                  border="2px"
                  borderColor="teal.500"
                  _hover={{
                    background: "#fff",
                    color: "teal.500",
                  }}
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Login;
