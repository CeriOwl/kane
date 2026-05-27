import { useState, useEffect } from "react"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import { Routes, Route } from "react-router"
import { ProtectedRoute } from "./lib/routes/ProtectedRoute"
import type { User } from "./lib/types.ts"
import { getUser } from "./lib/dbUser"
import LayoutPages from "./components/layout/Layout"
import { GuestRoute } from "./lib/routes/GuestRoute.tsx"

const App = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const user: User[] = await getUser()
      if (user.length > 0 && user) {
        setIsAuthenticated(user.length > 0)
        setIsAuthChecked(true)
        return
      }
    }
    checkUser()
  }, [])


  return (
    <Routes>
      <Route path='/register' element={
        <GuestRoute isAuthChecked={isAuthChecked} isAuthenticated={isAuthenticated}>
          <Register setIsAuthenticated={setIsAuthenticated} />
        </GuestRoute>
      }
      />
      <Route path='/' element={<LayoutPages />}>
        <Route index element={
          <ProtectedRoute isAuthChecked={isAuthChecked} isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>}
        />

      </Route>
    </Routes>
  )
}
export default App
