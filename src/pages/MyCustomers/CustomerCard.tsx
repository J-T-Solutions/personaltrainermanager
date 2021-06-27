import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { Routes } from 'constants/routes'

const useStyles = makeStyles({
  root: {
    paddingTop: 70,
    width: 200,
    height: 250,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

export default function OutlinedCard() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardActions className={classes.btn}>
          <Button onClick={() => history.push(Routes.AddCustomerPage)}>
            <Typography className={classes.pos} color="textSecondary">
              Add customer
            </Typography>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
