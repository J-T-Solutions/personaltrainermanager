/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  CardContent,
  Card,
  createStyles,
  makeStyles,
  Grid,
} from '@material-ui/core'

import SignUpForm from '../SignUp/SignUpForm'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { useAppSelector } from '../../hooks'
import { Redirect } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
    },
  }),
)

const SignUpPage: React.FC = () => {
  const classes = useStyles()
  const authUser = useAppSelector((state) => selectAuthUser(state))

  if (authUser) return <Redirect to="/" />
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
              Sign Up
            </Typography>
            <SignUpForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SignUpPage
