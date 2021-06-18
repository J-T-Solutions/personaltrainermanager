import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/authentication/sessionSlice'
import viewsReducer from './features/views/viewsSlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    views: viewsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
