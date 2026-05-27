import type { ReactNode } from "react"
import { Navigate } from "react-router"

const ProtectedRoute = ({ children, isAuthenticated, isAuthChecked }: { isAuthChecked: boolean, children: ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthChecked) return null
  if (!isAuthenticated) <Navigate to="/register" replace />
  return children
}

export { ProtectedRoute }
