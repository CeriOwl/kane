import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";
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
  }, [])

  const getPerformanceToday = () => {
    const money = mainAccount.money
    const performance = mainAccount.performance
    const todayPerformance = (money * (performance * 0.01)) / 365
    return todayPerformance
  }
  const getPerformanceMontly = () => {
    const money = mainAccount.money
    const performance = mainAccount.performance
    const todayPerformance = ((money * (performance * 0.01)) / 365) * 30
    return todayPerformance
  }
  const getPerformanceYearly = () => {
    const money = mainAccount.money
    const performance = mainAccount.performance
    const todayPerformance = (money * (performance * 0.01))
    return todayPerformance
  }

  const performances = [
    { title: 'today', performance: getPerformanceToday() },
    { title: 'month', performance: getPerformanceMontly() },
    { title: 'year', performance: getPerformanceYearly() }
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
      <section className="px-4 py-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl">
          <p className="flex items-center gap-x-4 text-lg"><CircleDollarSign className="text-dark-primary" size={30} />Working for you today:</p>
          <span className="py-2 px-3 rounded-xl bg-dark-primary/10 text-dark-primary">+{mxnFormatter.format(getPerformanceToday())}</span>
        </div>
      </section>
      <section>
      </section>
    </>
  )
}

export default Dashboard
