import { Routes } from '../../constants/routes'
import { useAppSelector } from '../../hooks'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { firebaseInstance } from '../../components/Firebase'

interface ChildComponentProps {
  history: any
}

const Account: React.FC<ChildComponentProps> = ({ history }) => {
  const authUser: any = useAppSelector((state) => selectAuthUser(state))

  if (!authUser) return null

  let accountRole
  const userRole = (userName: any) =>
    firebaseInstance.user(userName.uid).on(
      'value',
      (data) => (accountRole = data.val().role),
      (err) => console.log(err),
    )

  userRole(authUser)

  if (!authUser) {
    history.push(Routes.SignIn)
    console.log('non-authorized')
  }

  return (
    <div>
      <h1>Account Type:{accountRole}</h1>
      <h4>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nisi,
        labore veniam eos odit deserunt illo expedita! Aliquam obcaecati
        incidunt impedit amet. Nesciunt, nam error consectetur eveniet, in
        voluptas illum distinctio a ea modi accusantium temporibus cumque
        similique praesentium perferendis maxime inventore facilis. Dolore
        tempora unde vero eius ab voluptatibus?
      </h4>
    </div>
  )
}

export default Account
