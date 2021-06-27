import { FormikHelpers, useFormik } from 'formik'

import TextField from '@material-ui/core/TextField'
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import { Gender } from 'constants/roles'
import { SubmitButton } from 'pages/SignUp/styles'
import { Routes } from 'constants/routes'
import { addCustomerToDb } from 'features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useHistory } from 'react-router-dom'
import { selectAuthUser } from 'features/authentication/sessionSlice'

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    minWidth: 275,
    maxWidth: 500,
  },
})

export const AddCustomerPage = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const uid = useAppSelector((state) => selectAuthUser(state))?.uid

  const onFormSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    const { firstName, lastName, gender, age, weight, description } = values
    try {
      await dispatch(
        addCustomerToDb({
          uid,
          firstName,
          lastName,
          gender,
          age,
          weight,
          description,
        }),
      )
      setSubmitting(false)
      history.push(Routes.Customers)
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      age: '',
      weight: '',
      description: '',
    },
    onSubmit: onFormSubmit,
  })

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Add New Customer
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ paddingTop: '30px' }}>
                Gender:
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value={Gender.Male}
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value={Gender.Female}
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              id="weight"
              name="weight"
              label="Body Weight"
              type="number"
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rowsMax={6}
              rows={2}
              type="number"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
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
        </CardContent>
      </Card>
    </div>
  )
}
