import "../../Components/style-global/form-style.css"

import { Outlet } from "react-router-dom";

import { SideBar } from "./components/sidebar.jsx"
import { AdminProfil } from './components/admin-profil.jsx';


export default function AdminDashboard({user, setUser}){

    return(
        <>
            <div className="flex bg-[var(--warna-utama)] text-[var(--color-text)] min-h-screen max-h-screen overflow-y-auto">
                <SideBar />
                <div className="w-full bg-[var(--color-base-100)] py-10 pl-5 pr-10 ">
                    <AdminProfil user={user} />

                    <div className="mt-5 pl-85">
                        <div className="mt-5 pb-10">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}