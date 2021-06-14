import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useHistory } from 'react-router-dom'

import { signInUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'
import { Routes } from '../../constants/routes'

interface IFormValues {
  email: string
  password: string
}

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch()

  // const [email, setEmail] = useState('poczwar12@o2.pl')
  // const [password, setPassword] = useState('P29oczwar')

  return (
    <Formik
      initialValues={{
        password: 'P29oczwar',
        email: 'poczwar12@o2.pl',
      }}
      onSubmit={(
        values: IFormValues,
        { setSubmitting }: FormikHelpers<IFormValues>,
      ) => {
        const { email, password } = values
        dispatch(signInUser({ email, password }))

        // TODO: Move it to saga or thunk
        setSubmitting(false)
      }}
    >
      <Form>
        <label htmlFor="email">Last Name</label>
        <Field
          autoComplete="off"
          id="email"
          name="email"
          placeholder="john@acme.com"
          // value="poczwar12@o2.pl"
        />

        <label htmlFor="password">Email</label>
        <Field
          autoComplete="off"
          id="password"
          name="password"
          type="password"
          // value="P29oczwar"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
