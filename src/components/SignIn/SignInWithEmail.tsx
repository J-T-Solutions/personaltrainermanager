import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useHistory } from 'react-router-dom'
import { Routes } from '../../constants/routes'

import { signInUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'

interface IFormValues {
  email: string
  password: string
}

const formInitialValues = {
  password: 'P29oczwar',
  email: 'poczwar12@o2.pl',
}

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const onSubmit = async (
    values: IFormValues,
    { setSubmitting }: FormikHelpers<IFormValues>,
  ) => {
    const { email, password } = values
    try {
      await dispatch(signInUser({ email, password })).unwrap()
      setSubmitting(false)
    } catch (err) {
      console.log(err)
    } finally {
      history.push(Routes.Account)
    }
  }

  return (
    <Formik initialValues={formInitialValues} onSubmit={onSubmit}>
      <Form>
        <label htmlFor="email">Last Name</label>
        <Field
          autoComplete="off"
          id="email"
          name="email"
          placeholder="john@acme.com"
        />

        <label htmlFor="password">Email</label>
        <Field
          autoComplete="off"
          id="password"
          name="password"
          type="password"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
