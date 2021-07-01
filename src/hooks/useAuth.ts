import { firebaseInstance } from 'services/Firebase'
import { useEffect } from 'react'
import { setAuthUser } from 'features/authentication/sessionSlice'
import { setShowDrawer } from 'features/views/viewsSlice'
import { useAppDispatch } from 'hooks'
import { LocalStorageKey } from 'constants/localStorage'
import { serialiseUser } from 'features/authentication/helpers'

export default function (): void {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const authUserFromLocalStorage = localStorage.getItem(
      LocalStorageKey.AuthUser,
    )

    if (authUserFromLocalStorage) {
      dispatch(setAuthUser(JSON.parse(authUserFromLocalStorage)))
    }

    const listener = firebaseInstance.onAuthUserListener(
      (authUser) => {
        localStorage.setItem(LocalStorageKey.AuthUser, JSON.stringify(authUser))
        dispatch(setAuthUser(serialiseUser(authUser)))
      },
      () => {
        dispatch(setShowDrawer(false))
        localStorage.removeItem(LocalStorageKey.AuthUser)
      },
    )
    // removes listener
    return function cleanup() {
      listener()
    }
  }, [dispatch])
}
