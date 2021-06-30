import firebase from 'firebase/app'
import { IAuthUser } from './interfaces'

export const serialiseUser = (userData: firebase.User): IAuthUser => {
  const { email, uid } = userData
  return {
    email,
    id: uid,
  }
}
