import { AuthUser } from 'interfaces'
import { useEffect } from 'react'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { getListOfCustomers } from '../../features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import CustomerCard from './CustomerCard'

export const MyCustomers = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => selectAuthUser(state))
  if (!authUser) return null

  useEffect(() => {
    const customerList = (authUser: AuthUser) =>
      dispatch(getListOfCustomers(authUser))
    customerList(authUser)
  }, [])

  const list = Object.values(
    useAppSelector((state) => state.trainer.customerList),
  )
  console.log(list)

  return (
    <div>
      <CustomerCard />
    </div>
  )
}

export default MyCustomers
