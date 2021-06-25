import * as yup from 'yup'
import { Button, withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'
import { Routes } from '../../constants/routes'

import { signInUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'
import { FormikHelpers, useFormik } from 'formik'

interface IFormValues {
  email: string
  password: string
}

const formInitialValues = {
  password: 'P29oczwar',
  email: 'poczwar12@o2.pl',
}

const SubmitButton = withStyles(() => ({
  root: {
    marginTop: '15px',
  },
}))(Button)

const SignInWithEmail: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: formInitialValues,

    validationSchema: validationSchema,
    onSubmit: async (
      values: IFormValues,
      { setSubmitting }: FormikHelpers<IFormValues>,
    ) => {
      const { email, password } = values
      try {
        await dispatch(signInUser({ email, password })).unwrap()
        setSubmitting(false)
        history.push(Routes.Account)
      } catch (err) {
        console.log(err)
      } finally {
        // history.push(Routes.Account)
      }
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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

export default SignInWithEmail
