import type { User } from "./types.ts"

const DB_NAME = "kaneDB"
const USER_NAME = "user"
const ACCOUNT_NAME = "account"

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = (e) => {
      const db = e.target?.result as IDBDatabase
      if (!db.objectStoreNames.contains(USER_NAME)) {
        db.createObjectStore(USER_NAME, { keyPath: "id" })
        db.createObjectStore(ACCOUNT_NAME, { keyPath: "id" })
      }
    }

    request.onerror = () => {
      reject("Error opening db")
    }

    request.onsuccess = (e) => {
      resolve((e.target as IDBRequest).result)
    }
  })
}

const saveUser = async (user: User): Promise<User> => {
  const db = await openDB()
  const transaction = db.transaction(USER_NAME, "readwrite")
  const store = transaction.objectStore(USER_NAME)
  store.put(user)
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(user)
    transaction.onerror = () => reject("Error adding user")
  })
}

const getUser = async (): Promise<User[]> => {
  const db = await openDB()
  const transaction = db.transaction(USER_NAME, "readonly")
  const user = transaction.objectStore(USER_NAME)
  const request = user.getAll()

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(request.result)
    transaction.onerror = () => reject("Error reading user")
  })
}

export { saveUser, getUser, openDB }
