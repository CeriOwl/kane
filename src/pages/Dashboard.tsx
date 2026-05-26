import { useEffect, useState } from "react";
import { getAccount } from "../lib/dbAccount";
import type { Account } from "../lib/types";

const hrdcAccount: Account = {
  id: "",
  userId: "",
  accountName: "",
  accountType: "",
  money: 0,
  performance: 0
}

const Dashboard = () => {
  const [mainAccount, setMainAccount] = useState<Account>(hrdcAccount)
  const dt = new Date()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const shortMonths = (dt: Date) => months[dt.getMonth()]
  const mxnFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  useEffect(() => {
    const getAccountData = async () => {
      const data = await getAccount()
      setMainAccount(data[0])
    }
    getAccountData()
    console.log(mainAccount)
  }, [])

  const getPerformanceToday = async () => {
    const mainAccount: Account[] = await getAccount()
    const money = mainAccount[0].money
    const performance = mainAccount[0].performance
    const todayPerformance = (money * performance) / 365
    return todayPerformance.toFixed(2)
  }

  const performances = [
    { title: 'today', performance: getPerformanceToday().then(result => result) },
    { title: 'month', performance: getPerformanceToday().then(result => result) },
    { title: 'year', performance: getPerformanceToday().then(result => result) }
  ]

  return (
    <>
      <section className="px-4">
        <div className="relative flex flex-col gap-16 p-6 bg-dark-primary text-white rounded-xl font-light">
          <span className="absolute opacity-30 right-0 top-8 text-[160px] font-black">金</span>
          <div className="flex justify-between items-center">
            <p className="capitalize text-lg">total balance</p>
            <span className="py-2 px-6 rounded-full bg-white/30 uppercase text-sm">{shortMonths(dt)} {mainAccount?.performance}%</span>
          </div>
          <span className="font-space-grotesk text-4xl font-bold">{mxnFormatter.format(mainAccount?.money)}</span>
        </div>
      </section>
      <section className="px-4">
        <div>
          <h2>Your money is earning</h2>
          <div>
            {
              performances.map(e => (
                <div>
                  <p>{e.title}</p>
                  <span>{e.performance}</span>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
