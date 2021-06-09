import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useHistory } from 'react-router-dom'

import { signInUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'
import { Routes } from '../../constants/routes'

interface IFormValues {
  email: string
  password: string
}

export const SignInForm = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  // const firebase = useContext(FirebaseContext);

  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      onSubmit={(
        values: IFormValues,
        { setSubmitting }: FormikHelpers<IFormValues>,
      ) => {
        const { email, password } = values
        dispatch(signInUser({ email, password }))

        // TODO: Move it to saga or thunk
        setSubmitting(false)
        history.push(Routes.Home)
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
  )
}
