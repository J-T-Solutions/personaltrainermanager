export interface ICustomerSummary {
  name: string
  age: number
  weight: number
  height: number
  gender: string
}

export interface ICustomer extends ICustomerSummary {
  note: string
}
