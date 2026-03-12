// import Navbar from "@/components/etudiant/Navbar";
// import Sidebar from "@/components/etudiant/Sidebar";
import TabsDemo from "@/components/tabs-demo";

const DashboardPage = () => {
  return (<>
      {/* <Sidebar/>
      <Navbar/> */}
      <div className="place-items-center bg-[rgb(232,232,232)] dark:bg-gray-900 overflow-scroll overflow-x-hidden fixed right-0 bottom-0 h-[89%] w-full">
      <TabsDemo/>
    </div>
    </>
  );
}

export default DashboardPage;