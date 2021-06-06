import { useContext } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { setAuthUser } from "../../features/authentication/sessionSlice";
import { useAppDispatch } from "../../hooks";
import { FirebaseContext } from "../Firebase";
import { Routes } from "../../constants/routes";

interface IFormValues {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      onSubmit={(
        values: IFormValues,
        { setSubmitting }: FormikHelpers<IFormValues>
      ) => {
        const { email, password } = values;
        firebase &&
          firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((user) => {
              // TODO: handle setSubmiting and route redirection properly in saga or thunk
              dispatch(setAuthUser(user));
              setSubmitting(false);
              history.push(Routes.Home);
            })
            .catch((error) => {
              // TODO: handle error case
              console.error(error);
            });
      }}
    >
      <Form>
        <label htmlFor="email">Last Name</label>
        <Field id="email" name="email" placeholder="john@acme.com" />

        <label htmlFor="password">Email</label>
        <Field id="password" name="password" type="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
