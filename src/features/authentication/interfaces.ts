export interface IAuthUser {
  email: string | null
  id: string | null
}

export interface ICreateUserPayload {
  firstName: string
  email: string
  password: string
  role: string
}

export interface IDbUser extends ICreateUserPayload {
  uid: string
}

export interface IUserCredentials {
  email: string
  password: string
}
