import type { ReactNode } from "react"
import { Navigate } from "react-router"

const ProtectedRoute = ({ children, isAuthenticated }: { children: ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />
  }
  return children
}

export { ProtectedRoute }
