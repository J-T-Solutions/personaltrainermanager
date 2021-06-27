import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firebaseInstance } from '../../components/Firebase'
import { AuthUser } from '../../interfaces'
import { nanoid } from '@reduxjs/toolkit'

interface IInitial {
  customerList: any
}

const initialState: IInitial = {
  customerList: [],
}

export const getListOfCustomers = createAsyncThunk(
  'trainer/getListOfCustomers',

  async (authUser: AuthUser) => {
    const renderedList: any = []
    // TODO: change ANY type
    await firebaseInstance
      .user(`${authUser.uid}/customers`)
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const name = childSnapshot.val()
          renderedList.push(name)
        })
      })

    return renderedList
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
        // Add user to the state array
        state.customerList.push(action.payload)
      },
    )
  },
})

export default trainerSlice.reducer
