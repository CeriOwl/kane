interface User {
  id: string
  name: string
}

interface Account {
  id: string
  userId: string
  accountName: string
  accountType: string
  money: number
  performance: number
}

export type { User, Account }
