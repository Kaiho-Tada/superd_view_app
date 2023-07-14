// サインアップ
export type SignUpData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  confirm_success_url: string
}

// サインイン
export type SignInData = {
  email: string
  password: string
}

// ユーザー
export type User = {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
}
