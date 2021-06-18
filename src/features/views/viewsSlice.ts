import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const initialState = {
  showDrawer: false,
}

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    setShowDrawer: (state, action: PayloadAction<boolean>) => {
      state.showDrawer = action.payload
    },
  },
})

export const { setShowDrawer } = viewsSlice.actions
export default viewsSlice.reducer

export const selectShowDrawer = (state: RootState): boolean =>
  state.views.showDrawer
