import { CornerDownLeft } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

const ReturnPageBtn = ({ setStarted }: { setStarted: Dispatch<SetStateAction<number>> }) => {
  return (<button className="absolute bg-transparent top-10 left-10 z-20 p-2 rounded-md border-2 border-dark-primary                                                                                                                                                                                                                                       " onClick={() => setStarted(prev => prev -= 1)}>
    <CornerDownLeft size={30} color='#004785' />
  </button>)
}

export default ReturnPageBtn