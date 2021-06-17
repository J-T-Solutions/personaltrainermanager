import 'react-app-polyfill/ie11'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import Firebase from '../Firebase'
import { useAppDispatch } from '../../hooks'
import { signUpUser } from '../../features/authentication/sessionSlice'

interface IProps {
  firebase?: Firebase | null
}

interface IFormValues {
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export const SignUpForm: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmit={(
          values: IFormValues,
          { setSubmitting }: FormikHelpers<IFormValues>
        ) => {
          const { email, password, userName } = values
          dispatch(signUpUser({ email, password, userName }))
          console.log('data sent!')
          setSubmitting(false)
          }
      }
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />

          <label htmlFor="passwordConfirmation">Confirm password</label>
          <Field
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
