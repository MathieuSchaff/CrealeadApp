import React, { useState, useRef, useEffect, FC } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../auth/authSlice";
import { useLoginMutation } from "./loginApiSlice";
import CustomField from "./CustomField";
import "./Login.scss";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Spinner from "../../components/Spinner/Spinner";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(5, "Must be 5 characters atleast ")
    .required("Required"),
  rememberMe: Yup.boolean().required(),
});
const initialValues = {
  email: "",
  rememberMe: false,
  password: "",
};
const Login = ({ handleToogle }) => {
  //REACT ROUTER DOM
  const navigate = useNavigate();

  // DOM REFS
  const formContainer = useRef(null);
  const errRef = useRef(null);

  const [spinner, setSpinner] = useState(false);
  // error catched
  const [errorMsg, setErrorMsg] = useState("");

  const submitButton = async (values, helpers) => {
    setErrorMsg("");
    setSpinner(true);

    try {
      const tokenResponse = await futureLogin();

      if (tokenResponse) {
      } else {
        throw new Error("la tete a toto");
      }

      handleToogle();
      // navigate("/profile");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg("An unexpected error occurred");
        errRef?.current?.focus();
        return "An unexpected error occurred";
        // 👉️ err is type Error here
      } else {
        setErrorMsg(error);
        errRef?.current?.focus();
      }
    } finally {
      helpers.resetForm();
      helpers.setSubmitting(false);
      setSpinner(false);
    }
  };

  return (
    <main className="main bg-dark modal-sign-in">
      <section className="sign-in-content" ref={formContainer}>
        <FontAwesomeIcon icon={faCircleUser} id="user__svg" />
        <h1>Sign In</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitButton}
          validateOnMount
        >
          {({ isSubmitting, dirty, isValid, handleBlur }) => {
            return (
              <Form>
                {errorMsg && (
                  <p ref={errRef} className="errmsg">
                    {errorMsg}
                  </p>
                )}
                {spinner ? (
                  <Spinner />
                ) : (
                  <>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      component={CustomField}
                      label="Email"
                      onBlur={handleBlur}
                    />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      component={CustomField}
                      label="Password"
                      autoComplete="on"
                      onBlur={handleBlur}
                    />
                    <div className="input-remember">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button
                      className="sign-in-button"
                      type="submit"
                      disabled={!(dirty && isValid) || isSubmitting}
                    >
                      Submit
                    </button>
                  </>
                )}
              </Form>
            );
          }}
        </Formik>
      </section>
    </main>
  );
};

export default Login;
