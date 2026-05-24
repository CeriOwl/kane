import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import ReturnPageBtn from '../components/main/returnBtn';
import type { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Info } from 'lucide-react';
import { getUser, saveUser } from '../lib/dbUser';
import { v4 as uuid4 } from "uuid"
import { saveAccount } from '../lib/dbAccount';
import { useNavigate } from 'react-router';
import type { User, Account } from '../lib/types';

const MAX_SIZE = 2

interface Option {
  bankName: string
  performance: number
}

interface Balance extends Option {
  accountMoney: number
  accountName: string
}

function Register({ setIsAuthenticated }: { setIsAuthenticated: Dispatch<SetStateAction<boolean>> }) {
  const navigate = useNavigate()
  const [counterSteps, setCounterSteps] = useState(0)
  const [userName, setUserName] = useState("")
  const [userBalance, setUserBalance] = useState<Balance>({
    accountName: "",
    accountMoney: 0,
    bankName: "",
    performance: 0
  })

  const handlerNextPage = async () => {
    if (userName) {
      const user: User = {
        id: uuid4(),
        name: userName,
      }
      await saveUser(user)
    }
    setCounterSteps(prev => prev += 1)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value)
  }

  const options: Option[] = [
    { bankName: "Mercado Pago", performance: 13 },
    { bankName: "Nu", performance: 7 },
    { bankName: "Revolut", performance: 15 },
    { bankName: "DiDi", performance: 15 },
    { bankName: "Other", performance: 0 },
  ]

  const handleOptionClicked = (e: MouseEvent<HTMLButtonElement>) => {
    const match = options.filter(obj => Object.values(obj).includes(e.currentTarget.innerText))
    setUserBalance({ ...userBalance, accountName: match[0].bankName, bankName: match[0].bankName, performance: match[0].performance })
  }

  const handleAccountMoney = (e: ChangeEvent<HTMLInputElement>) => {
    setUserBalance({
      ...userBalance,
      accountMoney: Number(e.currentTarget.value)
    })
  }

  const handleAccountName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserBalance({
      ...userBalance,
      accountName: String(e.currentTarget.value)
    })
  }

  const handlePerformance = (e: ChangeEvent<HTMLInputElement>) => {
    setUserBalance({
      ...userBalance,
      accountName: "Other",
      performance: Number(e.target.value)
    })
  }

  const handleSendData = async () => {
    const user: User[] = await getUser()
    const account: Account = {
      id: uuid4(),
      accountName: userBalance.accountName,
      performance: userBalance.performance,
      accountType: userBalance.bankName,
      money: userBalance.accountMoney,
      userId: user[0].id
    }
    const saved = await saveAccount(account)
    if (saved) {
      setIsAuthenticated(true)
      navigate("/")
    }
  }

  return (
    <main className="relative h-screen overflow-hidden">
      <AnimatePresence>
        {
          counterSteps === 0 ?
            <motion.section
              key="step-0"
              className='absolute inset-0 w-full h-full bg-dark-primary text-white grid place-items-center p-5'
              exit={{ opacity: "0" }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transitionDelay: 0.5 }} className="flex flex-col items-center relative z-10">
                <span className="text-[80px] font-black">金</span>
                <h1 className="uppercase text-[60px] tracking-[10px] font-extrabold font-space-grotesk">Kane</h1>
                <h2 className="text-[20px] font-extralight">Your money, working in silence</h2>
              </motion.div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.5 } }} className="absolute bottom-0 w-full p-10">
                <button
                  onClick={handlerNextPage}
                  className="w-full p-5 bg-primary text-white rounded-[10px] text-[20px] font-extrabold tracking-[6px] uppercase outline-none border-none"
                >
                  start
                </button>
              </motion.div>
              <span className="absolute text-[400px] font-black opacity-10 z-0 select-none">金</span>
            </motion.section>
            : counterSteps === 1 ?
              <motion.section
                key="step-1"
                className='relative inset-0 w-full h-full flex flex-col justify-between bg-white p-5 z-10 transition-all duration-500 ease-in-out'
                initial={{ opacity: 0 }}
                animate={{ opacity: "100%" }}
                exit={{ opacity: 0 }}
              >
                <ReturnPageBtn setStarted={setCounterSteps} />
                <div className="flex flex-col pt-40 px-5 gap-5 relative z-10">
                  <span className="text-dark-primary font-bold text-[16px]">{counterSteps} / {MAX_SIZE}</span>
                  <h2 className="text-dark-primary text-[40px]">What should we call you?</h2>
                  <div className="flex flex-col gap-2.5">
                    <input
                      value={userName}
                      onChange={handleNameChange}
                      autoComplete='true'
                      id='userName'
                      name='userName'
                      type="text"
                      placeholder='Your name...'
                      className="w-full p-2.5 text-[20px] bg-transparent outline-none border-b-2 border-dark-primary"
                    />
                    <span>This is just for you</span>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    disabled={userName !== "" ? false : true}
                    onClick={handlerNextPage}
                    className="w-full p-5 bg-primary text-white rounded-[10px] text-[20px] font-extrabold uppercase outline-none border-none disabled:opacity-50"
                  >
                    continue
                  </button>
                </div>
                <span className="absolute text-[400px] font-black opacity-10 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">金</span>
              </motion.section>
              : counterSteps === 2 ?
                <motion.section
                  key="step-2"
                  className='absolute inset-0 w-full h-full bg-white p-5 z-10 transition-all duration-500 ease-in-out'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: "100%" }}
                  exit={{ opacity: 0 }}
                >
                  <ReturnPageBtn setStarted={setCounterSteps} />
                  <div className='flex flex-col justify-between h-full'>
                    <div className="flex flex-col pt-40 px-5 gap-5 relative z-10">
                      <span className="text-dark-primary font-bold text-[16px]">{counterSteps} / {MAX_SIZE}</span>
                      <h2 className="text-dark-primary text-[40px]">Where does your money live?</h2>
                      <div className='flex flex-col gap-4 py-6'>
                        <h3 className='uppercase font-bold text-mist-700'>quick presets</h3>
                        <div className="flex gap-2">
                          {
                            options.map((option) => (
                              <button key={option.bankName} onClick={handleOptionClicked} className={`${userBalance.bankName === option.bankName ? "bg-dark-primary text-white" : null} cursor-pointer p-3 text-left border-2 border-dark-primary rounded-lg text-dark-primary font-medium`}>
                                {option.bankName}
                              </button>
                            ))
                          }
                        </div>
                      </div>
                      <div>
                        <label htmlFor="nameAccount" className="text-dark-primary block mb-2">Account Name</label>
                        <input placeholder='e.g Daily Expenses' value={userBalance?.accountName ?? ""} onChange={handleAccountName} type="text" name="nameAccount" id="nameAccount" className="input-number w-full p-2.5 text-[20px] bg-transparent outline-none border-b-2 border-dark-primary" />
                      </div>
                      <div>
                        <label htmlFor="balance" className="text-dark-primary block mb-2">Current balance</label>
                        <div className="flex items-center border-b-2 border-dark-primary">
                          <span className="text-dark-primary text-[20px] pr-2">$</span>
                          <input placeholder='0.00' value={userBalance?.accountMoney ?? ""} onChange={handleAccountMoney} type="number" name="balance" id="balance" className="input-number w-full p-2.5 text-[20px] bg-transparent outline-none" />
                          <span className="text-dark-primary text-[20px] pl-2">mxn</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="apr" className="text-dark-primary">Expected Yield (APR)</label>
                        <div className="flex items-center border-b-2 border-dark-primary w-fit">
                          <input placeholder='0.00' value={userBalance.performance ?? ""} onChange={handlePerformance} type="number" name="apr" id="apr" className="input-number max-w-25 p-2.5 text-[20px] bg-transparent outline-none" />
                          <span className="text-dark-primary text-[20px] pl-2">%</span>
                        </div>
                        {
                          userBalance.name !== "Other" && userBalance.name ?
                            <div className='flex flex-row gap-2 justify-start'>
                              <Info className='shrink-0' size={20} />
                              <span>
                                {userBalance.name} <strong>{userBalance.performance}%</strong> standard rate applied based on your selection.
                              </span>
                            </div>
                            : ""
                        }
                      </div>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={() => handleSendData()}
                        className="w-full p-5 bg-primary text-white rounded-[10px] text-[20px] font-extrabold uppercase outline-none border-none disabled:opacity-50"
                      >
                        calculate
                      </button>
                    </div>
                  </div>

                </motion.section>
                : null
        }
      </AnimatePresence>
    </main>
  )
}

export default Register
