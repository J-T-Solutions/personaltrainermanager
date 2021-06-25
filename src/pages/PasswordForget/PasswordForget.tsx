import { FormikHelpers, useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'

import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { resetPassword } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'
import { SubmitButton } from '../SignUp/styles'

interface IFormValues {
  email: string
}

const formInitialValues = {
  email: 'poczwar12@o2.pl',
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
})

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
    },
  }),
)

const PasswordForgetPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const history = useHistory()

  const formik = useFormik({
    initialValues: formInitialValues,

    validationSchema: validationSchema,
    onSubmit: async (
      values: IFormValues,
      { setSubmitting }: FormikHelpers<IFormValues>,
    ) => {
      const { email } = values
      try {
        await dispatch(resetPassword(email)).unwrap()
        setSubmitting(false)
        history.push(Routes.PasswordResetSuccess)
      } catch (err) {
        console.log(err)
      }
    },
  })

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={4}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Password Forget
            </Typography>
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

              <SubmitButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Reset My Password
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PasswordForgetPage
