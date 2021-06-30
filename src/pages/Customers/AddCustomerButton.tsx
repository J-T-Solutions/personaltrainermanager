import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import PortraitIcon from '@material-ui/icons/Portrait'
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
      startIcon={<PortraitIcon />}
      onClick={() => history.push(Routes.AddCustomer)}
    >
      Add Customer
    </Button>
  )
}
