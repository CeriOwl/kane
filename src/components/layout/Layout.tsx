import { Outlet } from "react-router"
import Header from "../header"
import Footer from "../footer.tsx"

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
