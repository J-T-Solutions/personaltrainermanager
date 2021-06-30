import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firebaseInstance } from '../../components/Firebase'
import { nanoid } from '@reduxjs/toolkit'
import { ICustomerSummary } from 'features/customer/interfaces'
import { RootState } from 'store'
import { IAuthUser } from 'features/authentication/interfaces'

interface ICustomerState {
  customerList: ICustomerSummary[]
  summaryLoading: boolean
}

const initialState: ICustomerState = {
  customerList: [],
  summaryLoading: true,
}

export const getListOfCustomers = createAsyncThunk(
  'trainer/getListOfCustomers',

  async (authUser: IAuthUser) => {
    const list = await firebaseInstance
      .user(`${authUser.id}/customers`)
      .once('value', (snapshot) => {
        snapshot.val()
      })

    const customersRaw = list.val()

    const customers = Object.keys(customersRaw).map((id) => {
      return {
        id,
        ...customersRaw[id],
      }
    })
    return customers
  },
)

export const addCustomerToDb = createAsyncThunk(
  'trainer/addCustomerToDb',
  async (customer: any) => {
    // TODO: change any type
    const id = nanoid()
    // TODO: change nanoid to normal entry numeration (1, 2, 3, ...)
    await firebaseInstance.user(`${customer.uid}/customers/${id}`).set({
      // in fact its trainer uid   ^^^^^^^^^^^^
      firstName: customer.firstName,
      lastName: customer.lastName,
      gender: customer.gender,
      age: customer.age,
      weight: customer.weight,
      description: customer.description,
    })
  },
)

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      getListOfCustomers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.customerList = action.payload
        state.summaryLoading = false
      },
    )
  },
})

export const selectCustomersSummaryLoading = (state: RootState): boolean =>
  state.trainer.summaryLoading

export const selectCustomersSummary = (state: RootState): ICustomerSummary[] =>
  state.trainer.customerList

export default trainerSlice.reducer
