import 'react-app-polyfill/ie11'
import { FormikHelpers, useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { signUpUser } from '../../features/authentication/sessionSlice'
import { Routes } from '../../constants/routes'
import { TextField } from '@material-ui/core'
import { SubmitButton } from './styles'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

interface IFormValues {
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const onFormSubmit = async (
    values: IFormValues,
    { setSubmitting }: FormikHelpers<IFormValues>,
  ) => {
    const { email, password } = values
    try {
      await dispatch(signUpUser({ email, password }))
      setSubmitting(false)
    } catch (e) {
      console.log(e)
    } finally {
      console.log('####finally')
      history.push(Routes.Account)
    }
  }

  const formik = useFormik({
    initialValues: {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: onFormSubmit,
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          label="Confirm Password"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <SubmitButton
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </SubmitButton>
      </form>
    </div>
  )
}

export default SignUpForm
