import { AuthUser } from 'interfaces'
import { useEffect } from 'react'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import {
  getListOfCustomers,
  selectCustomersSummaryLoading,
} from '../../features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import CustomerCard from './CustomerCard'

export const MyCustomers: React.FC = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => selectAuthUser(state))
  const isLoadingCustomersSummary = useAppSelector((state) =>
    selectCustomersSummaryLoading(state),
  )

  const getCustomers = async (authUser: AuthUser) => {
    return await dispatch(getListOfCustomers(authUser))
  }

  useEffect(() => {
    if (!authUser) return
    getCustomers(authUser)
  }, [authUser])

  if (isLoadingCustomersSummary) return <div>Loading...</div>

  return (
    <div>
      <CustomerCard />
    </div>
  )
}

export default MyCustomers
