import { Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { columns } from './tableColumns'

import { AuthUser } from 'interfaces'
import { useEffect } from 'react'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import {
  getListOfCustomers,
  selectCustomersSummary,
  selectCustomersSummaryLoading,
} from '../../features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const MyCustomers: React.FC = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => selectAuthUser(state))
  const customers = useAppSelector((state) => selectCustomersSummary(state))
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

  return (
    <>
      <Typography>Customers</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={isLoadingCustomersSummary}
          rows={customers}
          columns={columns}
          pageSize={5}
          //checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  )
}

export default MyCustomers