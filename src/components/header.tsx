import { Bell } from "lucide-react"
import { useEffect, useState } from "react"
import type { User } from "../lib/types.ts"
import { useNavigate } from "react-router"
import { getUser } from "../lib/dbUser"

const Header = () => {
  const [userLetter, setUserLetter] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      const user: User[] = await getUser()
      if (user.length <= 0 && !user) {
        navigate("/register")
      }
      setUserLetter(user[0].name[0])
    }
    checkUser()

  }, [])
  return (
    <header>
      <div className="grid grid-cols-[15%_1fr_15%] items-center justify-items-center px-10 py-4">
        <div className="flex items-center justify-center text-xl uppercase rounded-full bg-dark-primary font-bold text-white text-center w-12 h-auto aspect-square p-2">{userLetter}</div>
        <h2 className="uppercase text-center text-[35px] tracking-[10px] font-extrabold font-space-grotesk">Kane</h2>
        <Bell className="size-8" />
      </div>
    </header>
  )
}

export default Header
