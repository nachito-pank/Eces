import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar role="enseignant"/>
      <div>
        <Navbar/>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}