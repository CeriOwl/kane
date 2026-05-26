import { Outlet } from "react-router"
import Header from "../header"

const LayoutPages = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutPages
