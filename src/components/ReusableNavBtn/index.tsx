import Button from '@material-ui/core/Button'
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'

interface IProps {
  name: string | null | undefined
  redirect: string
  variant?: any
}

const ReusableNavBtn: React.FC<IProps> = ({ name, redirect, variant }) => {
  const handleOnClick = () => {
    //history.push(redirect)
  }

  return (
    <Link to={redirect} style={{ textDecoration: 'none', color: 'white' }}>
      <Button variant={variant} color="inherit" onClick={handleOnClick}>
        {name}
      </Button>
    </Link>
  )
}

export default ReusableNavBtn
