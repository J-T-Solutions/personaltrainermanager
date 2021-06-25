import 'react-app-polyfill/ie11'
import { FormikHelpers, useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import {
  createUser,
  signUpUser,
} from '../../features/authentication/sessionSlice'
import { Routes } from '../../constants/routes'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core'
import { SubmitButton } from './styles'
import * as Yup from 'yup'
import { useState } from 'react'

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
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  role: string
}

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const onFormSubmit = async (
    values: IFormValues,
    { setSubmitting }: FormikHelpers<IFormValues>,
  ) => {
    const { firstName, email, password, role } = values
    console.log(role)
    try {
      await dispatch(signUpUser({ firstName, email, password, role }))
      setSubmitting(false)
      history.push(Routes.Account)
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      role: 'trainer',
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

        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ paddingTop: '30px' }}>
            Choose your role
          </FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="trainer"
              control={<Radio />}
              label="Trainer"
            />
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Customer"
            />
          </RadioGroup>
        </FormControl>
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
