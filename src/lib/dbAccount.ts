import type { Account } from "./types.ts"
import { openDB } from "./dbUser.ts"

const STORE_NAME = "account"

const saveAccount = async (account: Account): Promise<Account> => {
  const db = await openDB()
  const transaction = db.transaction(STORE_NAME, "readwrite")
  const store = transaction.objectStore(STORE_NAME)
  store.put(account)
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(account)
    transaction.onerror = () => reject("Error adding user")
  })
}

const getAccount = async (): Promise<Account[]> => {
  const db = await openDB()
  const transaction = db.transaction(STORE_NAME, "readonly")
  const user = transaction.objectStore(STORE_NAME)
  const request = user.getAll()

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject("Error reading user")
  })
}

export { saveAccount, getAccount }
