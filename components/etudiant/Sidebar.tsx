import { Bell, Calendar, LayoutDashboard, StickyNote, UserRound, Wallet } from "lucide-react"
import { Card } from "../ui/card"
import Link from "next/link"

const Sidebar = ()=> {
  return(
      <div className="fixed  dark:bg-gray-950 bottom-0 left-0 w-[25%] h-[89%]">
        <Card className="w-full dark:bg-gray-900 bg-[rgb(232,232,232)] h-full py-5 duration-300 hover:border-r-6 rounded-none hover:border-r-[rgb(30,39,142)] hover:rounded-br-lg hover:rounded-tr-lg">
          <ul className="py-40 h-full dark:text-white cursor-pointer text-gray-700 font-semibold justify-center flex flex-col gap-4 font-mono text-[17px] ">
            <Link href="/etudiant/dashboard">
            <li className="w-full hover:bg-[rgb(30,39,142)] hover:text-white flex flex-row gap-2 hover:rounded-lg duration-300 hover:translate-x-3 py-3 px-10 hover:border-blue-400 rounded-lg">
              <LayoutDashboard/>
              <h2 className="tracking-tight">Dashboard</h2>
            </li>
            </Link>
            <Link href="/etudiant/edt">
            <li className="w-full hover:bg-[rgb(30,39,142)] hover:text-white flex flex-row gap-2 hover:rounded-lg duration-300 hover:translate-x-3 py-3 px-10 hover:border-blue-400 rounded-lg">
              <Calendar/>
              <h2 className="tracking-tight ">EDT Cours</h2>
            </li>
            </Link>
            <Link href="/etudiant/notes">
            <li className="w-full hover:bg-[rgb(30,39,142)] hover:text-white flex flex-row gap-2 hover:rounded-lg duration-300 hover:translate-x-3 py-3 px-10 hover:border-blue-400 rounded-lg">
              <StickyNote/>
              <h2 className="tracking-tight">Notes & Moyenne</h2>
            </li>
            </Link>
            <Link href="/etudiant/paiements">
            <li className="w-full hover:bg-[rgb(30,39,142)] hover:text-white flex flex-row gap-2 hover:rounded-lg duration-300 hover:translate-x-3 py-3 px-10 hover:border-blue-400 rounded-lg">
              <Wallet/>
              <h2 className="tracking-tight">Paiements</h2>
            </li>
            </Link>
            <Link href="/etudiant/notifications">
            <li className="w-full hover:bg-[rgb(30,39,142)] hover:text-white flex flex-row gap-2 hover:rounded-lg duration-300 hover:translate-x-3 py-3 px-10 hover:border-blue-400 rounded-lg">
              <Bell/>
              <h2 className="tracking-tight">Notification</h2>
            </li>
            </Link>
            <Link href="/etudiant/profil">
            <li className="w-full hover:bg-[rgb(30,39,142)] hover:text-white flex flex-row gap-2 hover:rounded-lg duration-300 hover:translate-x-3 py-3 px-10 hover:border-blue-400 rounded-lg">
              <UserRound/>
              <h2 className="tracking-tight">Profile</h2>
            </li> 
            </Link>
          </ul>
        </Card>
      </div>
  )
}

export default Sidebar