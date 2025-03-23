export type UserSchema = {
  id?: string
  username: string
  email: string
  account_type: 'admin' | 'user'
}
