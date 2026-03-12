// import { GraduationCap } from "lucide-react"
import Image from "next/image"
import { CardHeader } from "../ui/card"
import { Bell, CircleUser, LogOut } from "lucide-react"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import Searchbar from "./Searchbar"


const Navbar = ()=> {
  return(
    <div className="fixed flex top-0 right-0 w-full font-bold font-mono bg-[rgb(232,232,232)] dark:bg-gray-900 h-[11%]">
        <CardHeader className="w-full rounded-none h-full border-2 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="size-14 flex items-center justify-center rounded-full">
                  <Image 
                    src="/images/logo.svg"
                    alt="ECES Logo"
                    width={130}
                    height={130}
                  />
            </span>
            <h1 className="text-xl ml-3">ECES</h1>
          </div>
          <Searchbar/>
          <div className=" h-full flex items-center">
              <span className="relative ml-5 place-content-center hover:bg-gray-400 duration-300 transition-all rounded-full hover:border-5 hover:border-gray-400 place-items-center">
                <Bell size={23} className="hover:scale-115 active:scale-90 duration-300 transition-all cursor-pointer "/>
                <div className="h-2 w-2 rounded-full bg-[rgb(30,39,142)] absolute -top-1 -right-1"></div>
                <div className="h-2 w-2 rounded-full ring-1 dark:ring-white ring-blue-900 animate-ping absolute -top-1 -right-1"></div>
              </span>
              <span className="flex flex-col text-xs mx-10 dark:border-l-white border-l-gray-500  border-l-2 pl-6 items-center">
                <h1>NDANDOU Benick</h1>
                <h1>Etudiant</h1>
              </span>
              <span className="w-8 h-8 duration-300 transition-all hover:bg-gray-400 rounded-full flex justify-center items-center">
                <AnimatedThemeToggler/>
              </span>
              <CircleUser size={40} fill="gray" className="hover:scale-115 mx-7 hover:text-slate-700 hover: duration-300 transition-all cursor-pointer "/>
              <LogOut size={24} className="hover:scale-115 hover:text-slate-700 hover: duration-300 transition-all cursor-pointer active:scale-90 "/>
              
          </div>
        </CardHeader>
    </div>
  )
}

export default Navbar