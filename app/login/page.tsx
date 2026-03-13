"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowLeftFromLine, Eye, EyeOff, Lock, MoreHorizontal, MoreVertical, UserCircle, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { act, useId, useRef, useState } from "react";

type form = {
    matricule:string,
    password:String
}

export default function LoginEtudiant(){
    const classBtn :string = "bg-blue-700 hover:ring-2 hover:ring-gray-200 hover:text-blue-800 hover:bg-blue-100! hover:border-2! hover:border-blue-700! transition-colors duration-75 hover:bg-blue-600 min-h-12 mx-20 hover:scale-105  min-w-60"
    const [show , setShwo] =  useState(false)
    const [active,setactive] = useState(0)
    const [selector,setSelector] = useState("")
    const router = useRouter()
    const matriculeRef = useRef<HTMLInputElement>(null)
    const passwordRef =  useRef<HTMLInputElement>(null)
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data :form = {
            matricule : matriculeRef.current?.value || "inconnu",
            password: passwordRef.current?.value ||"inconnu"

        }
        // verification de api en attend d'une reponse avant de laisse passe sur cette section
        console.log("login data ", data)
        switch (selector) {
            case"Admin" :
                router.push("admin")
                break;
            case"sous admin":
                router.push("sous-admin")
            case "Enseignants":
                router.push("enseignant")
                break
            case "Etudiant":
                router.push("etudiant")
                break
            default:
                break;
        }
        e.currentTarget.reset()
    }    
    return(
    <div style={{backgroundImage: "url('/IMG-20260312-WA0069.jg')"}} className="flex items-center h-min-screen justify-center p-4 bg-slate-50">
        <div className="flex  h-170 w-97  overflow-x-hidden  shadow-xl">
        <div className={`flex   w-full transition-transform  duration-300    ${active ===0 ?"translate-x-0" :"-translate-x-full"}`}>
        <Card className="min-w-full bg-blue-300 border-b-4 h-full  border-b-blue-400 border-t-4 border-t-blue-400 flex items-center h-min-screen justify-center " >
            <h1 className="text-2xl">faite votre choix selon votre fonction</h1>
            <Button className={classBtn} onClick={()=>{ setactive(active === 0 ?1:0); setSelector("Admin")}}>Admin</Button>
            <Button className={classBtn} onClick={()=>{ setactive(active === 0 ?1:0); setSelector("Sous Admin")}}>Sous Admin</Button>
            <Button className={classBtn} onClick={()=>{ setactive(active === 0 ?1:0); setSelector("Enseignants")}}>Enseignants</Button>
            <Button className={classBtn} onClick={()=>{ setactive(active === 0 ?1:0); setSelector("Etudiant")}}>Etudiant</Button>
        </Card>
        <Card className="min-w-full bg-blue-00 border-b-4 h-full border-b-blue-400 border-t-4 border-t-blue-400 flex flex-col font-serif text-lg gap-4   p-8">
            <span className="inline max-w-5 " onClick={()=>{ setactive(active === 0 ?1:0)}}> <ArrowLeft/></span>
        <div className="text-center mb-8">
          <div className="border-none!  flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4  shadow-primary/20">
                <Image 
                src={"/logo.webp"}
                alt="logo"
                width={100}
                height={100}

                />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Eces</h1>
          <p className="text-slate-500 font-medium mt-1">Connectez-vous à votre compte</p>
        </div>
        <form onSubmit={handleSubmit} className="h-full w-full flex flex-col  gap-4" action="">
            <label className={`relative ${selector === "Admin" ? "hidden":""}`} htmlFor="">
                <span className="absolute  top-10 text-gray-300 hover:text-gray-500  left-3">
                    <UserRound/>
                </span>
                Matricule
                <Input 
                ref={matriculeRef}
                className="px-10 min-h-12  hover:ring-4 hover:ring-blue-100 focus:bg-blue-100 border p-2 " 
                placeholder="Entre votre Matricule" />
            </label>
            <label className="relative" htmlFor="">
                <span onClick={()=>{setShwo(show ?false :true)}} className="absolute text-gray-300 hover:text-gray-500   00 top-10 right-3">
                    {show ? <Eye/> : <EyeOff />}
                </span >
                <span className="absolute top-10 text-gray-300 hover:text-gray-500  left-3" >
                    <Lock/>
                </span>
                {selector === "Admin" ? "Code Administrateur" :"Mots de passe"}
                <Input 
                ref={passwordRef}
                type={show ? 'text' : 'password'} 
                className=" min-h-12 hover:ring-4 hover:ring-blue-100 focus:bg-blue-100 border p-2 " placeholder="Entre votre mots de passe"/>
            </label>
            <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
              <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm font-bold text-primary hover:text-blue-600 hover:underline">Mot de passe oublié ?</a>
            </div>
            <Button type="submit" className="bg-blue-700 hover:ring-2 hover:ring-gray-200 transition-colors duration-75 hover:bg-blue-600 min-h-12 mx-20 hover:scale-105 my-10 max-w-60">
                Se Connecter</Button>
        </form>
        </Card>
        </div>
        
    
      </div>
    </div>
    );
};