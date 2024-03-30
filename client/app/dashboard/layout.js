import NavbarDashboard from "./components/NavbarDashboard";

const DashboardLayout = ({ children }) => {
    return ( 
        // from-[#4b6cb7] to-[#182848]
        // from-[#757F9A] to-[#182848]
        <div className="bg-gradient-to-b from-[#4b6cb7] to-[#1CB5E0] min-h-screen flex w-min-full">
            <div className="w-1/6"><NavbarDashboard /></div>
            <div className="bg-slate-100 w-5/6 rounded-xl mr-2 my-2 p-4">{children}</div>
        </div>
    );
}
 
export default DashboardLayout;
