import { useEffect } from 'react'
import { firebaseInstance } from '../../components/Firebase'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { getListOfCustomers } from '../../features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import CustomerCard from './CustomerCard'

export const MyCustomers = () => {
  const dispatch = useAppDispatch()
  const authUser: any = useAppSelector((state) => selectAuthUser(state))
  if (!authUser) return null

  useEffect(() => {
    const customerList = (authUser: any) =>
      dispatch(getListOfCustomers(authUser))
    customerList(authUser)
  }, [])

  return (
    <div>
      <CustomerCard />
    </div>
  )
}

export default MyCustomers
