import type { ReactNode } from "react"
import { Navigate } from "react-router"

const GuestRoute = ({ children, isAuthenticated, isAuthChecked }: { isAuthChecked: boolean, children: ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthChecked) return null
  if (isAuthenticated) <Navigate to="/" replace />
  return children
}

export { GuestRoute }
