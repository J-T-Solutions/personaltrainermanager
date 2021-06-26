import { firebaseInstance } from '../../components/Firebase'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { getListOfCustomers } from '../../features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const MyCustomers = () => {
  const dispatch = useAppDispatch()
  const authUser: any = useAppSelector((state) => selectAuthUser(state))
  if (!authUser) return null

  const customerList = async (authUser: any) =>
    await dispatch(getListOfCustomers(authUser))

  customerList(authUser)

  const customers = () => {
    const list = useAppSelector((state) => state.trainer.customerList)
    console.log(list)
  }

  return (
    <div>
      <h1>My Customers</h1>
      {/* {customers.map(customer => <div key={customer.firstName}>)} */}
    </div>
  )
}

export default MyCustomers
