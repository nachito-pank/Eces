import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <Sidebar role="admin"/>
    <div className="flex-1 flex flex-col">
      <Navbar userRole="admin"/>
      <main className="p-4">{children}</main>
    </div>
    </div>
  );
}
