import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firebaseInstance } from '../../components/Firebase'
import { AuthUser } from '../../interfaces'

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
