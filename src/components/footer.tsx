import { SearchAlert, House, Wallet, ArrowLeftRight, CreditCard } from "lucide-react"
import { cloneElement } from "react"
import { Link } from "react-router"
import { useLocation } from "react-router"

const Footer = () => {
  const location = useLocation()
  const menu = [
    { icon: <House />, title: 'home', link: '/' },
    {
      icon: < Wallet />, title: 'accounts', link: '/accounts'
    },
    { icon: <ArrowLeftRight />, title: 'moves', link: '/moves' },
    { icon: <CreditCard />, title: 'cards', link: '/cards' },
    { icon: <SearchAlert />, title: 'insights', link: '/insights' },
  ]

  return (
    <footer>
      <div className="flex gap-x-2 justify-between px-10 py-4">
        {menu.map(e => (
          <Link to={e.link} key={e.title} className="max-w-16 w-full flex flex-col gap-y-2 items-center justify-center cursor-pointer">
            {
              location.pathname === e.link ?
                <div className="w-full h-1 bg-dark-primary"></div>
                :
                <div className="w-full h-1 bg-transparent"></div>
            }
            {cloneElement(e.icon, { className: location.pathname === e.link ? "text-dark-primary" : "" })}
            <span className={`${location.pathname === e.link ? "text-dark-primary" : null} uppercase text-xs font-bold`}>{e.title}</span>
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer
