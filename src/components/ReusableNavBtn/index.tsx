import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

interface IProps {
  name: string | null | undefined
  redirect: string
  variant?: any
}

const ReusableNavBtn: React.FC<IProps> = ({ name, redirect, variant }) => {
  return (
    <Link to={redirect} style={{ textDecoration: 'none', color: 'white' }}>
      <Button variant={variant} color="inherit">
        {name}
      </Button>
    </Link>
  )
}

export default ReusableNavBtn
