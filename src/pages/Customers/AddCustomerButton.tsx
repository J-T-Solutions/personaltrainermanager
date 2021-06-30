import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import PersonAdd from '@material-ui/icons/PersonAdd'
import { Routes } from 'constants/routes'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginBottom: theme.spacing(1),
    },
  }),
)

export const AddCustomerButton: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      startIcon={<PersonAdd />}
      onClick={() => history.push(Routes.AddCustomer)}
    >
      Add Customer
    </Button>
  )
}
