import { Grid, Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { columns } from './tableColumns'

import { useEffect } from 'react'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import {
  getListOfCustomers,
  selectCustomersSummary,
  selectCustomersSummaryLoading,
} from '../../features/trainer/trainerSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { IAuthUser } from 'features/authentication/interfaces'
import { AddCustomerButton } from './AddCustomerButton'

export const MyCustomers: React.FC = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => selectAuthUser(state))
  const customers = useAppSelector((state) => selectCustomersSummary(state))
  const isLoadingCustomersSummary = useAppSelector((state) =>
    selectCustomersSummaryLoading(state),
  )

  const getCustomers = async (authUser: IAuthUser) => {
    return await dispatch(getListOfCustomers(authUser))
  }

  useEffect(() => {
    if (!authUser) return
    getCustomers(authUser)
  }, [authUser])

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Customers</Typography>
        <AddCustomerButton />
      </Grid>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={isLoadingCustomersSummary}
          rows={customers}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </div>
    </>
  )
}

export default MyCustomers
