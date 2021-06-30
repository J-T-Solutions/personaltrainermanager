export interface ICustomerSummary {
  id: string
  firstName: string
  lastName: string
  age: number
  weight: number
  gender: string
  description: string
}

export interface ICustomer extends ICustomerSummary {
  trainerId: string
}

export type ICreateCustomerPayload = Omit<ICustomer, 'id'>
