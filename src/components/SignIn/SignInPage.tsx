/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  CardContent,
  Card,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from '@material-ui/core'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { SignInWithGoogle, SignInWithFacebook } from '.'
import SignInWithEmail from './SignInWithEmail'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
  }),
)

const SignInPage: React.FC = () => {
  const classes = useStyles()

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
            <h1>SignIn</h1>
            <SignInWithEmail />
            <SignInWithGoogle />
            <SignInWithFacebook />
            <SignUpLink />
            <PasswordForgetLink />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SignInPage
