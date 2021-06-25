import { Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

interface IProps {
  title: string
  to: string
}

export const NavButton: React.FC<IProps> = ({ title, to }) => (
  <Button color="inherit" component={RouterLink} to={to}>
    {title}
  </Button>
)
