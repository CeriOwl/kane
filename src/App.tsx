import { useState, useEffect } from "react"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import { Routes, Route, useNavigate } from "react-router"
import { ProtectedRoute } from "./lib/routes/ProtectedRoute"
import type { User } from "./lib/types.ts"
import { getUser } from "./lib/dbUser"
import LayoutPages from "./components/layout/Layout"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigation = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const user: User[] = await getUser()
      if (user.length > 0 && user) {
        setIsAuthenticated(true)
        navigation("/")
        return
      }
      setIsAuthenticated(false)
      navigation("/register")
      return
    }
    checkUser()
  }, [])


  return (
    <Routes>
      <Route index path='/register' element={<Register setIsAuthenticated={setIsAuthenticated} />} />
      <Route path='/' element={<LayoutPages />}>
        <Route element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>}
        />
        <Route path="/accounts" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>}
        />
      </Route>
    </Routes>
  )
}
export default App
