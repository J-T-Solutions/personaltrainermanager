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
  note: string
}
