import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedCustomer: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
})

export const {} = customerSlice.actions
export default customerSlice.reducer
