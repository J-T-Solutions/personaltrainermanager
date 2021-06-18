import 'react-app-polyfill/ie11'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import Firebase from '../../components/Firebase'

interface Values {
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
}

interface IProps {
  firebase: Firebase | null
}

export const SignUpForm: React.FC<IProps> = ({ firebase }) => {
  const onFormSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const { email, password } = values
    try {
      // eslint-disable-next-line react/prop-types
      const authUser = await firebase?.doCreateUserWithEmailAndPassword(
        email,
        password,
      )
      setSubmitting(false)
      console.log('###authUser', authUser)
    } catch (err) {
      console.error(err)
    }
  }

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
        onSubmit={onFormSubmit}
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
