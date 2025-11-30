import { LogoUsaha } from '@/Components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const menu = [
    {
        id : 1,
        label : "Brosur Mitra VIP",
        link : "/admin/brosur-mitra-vip"
    },
    {
        id : 2,
        label : "Brosur Mitra Biasa",
        link : "/admin/brosur-mitra-biasa"
    },
    {
        id : 3,
        label : "Harga Iklan",
        link : "/admin/harga-iklan"
    },
    {
        id : 4,
        label : "Komentar",
        link : "/admin/komentar-user"
    },   
    
];

export function SideBar(){
    const [aktif, setAktif] =  useState(false);

    return(
        <>
            <section className="w-2/8 py-10 px-5 border-r-2 border-[var(--color-base-200)] fixed min-h-screen">
                <LogoUsaha />

                <section className='mt-15 text-lg font-semibold flex flex-col gap-2'>
                    {menu.map((item) => (
                        <NavLink 
                            key={item.id}
                            to={item.link}
                            className={({ isActive }) => `
                                px-5 rounded-sm py-1 cursor-pointer
                                ${isActive
                                    ? "bg-[var(--color-base-200)] text-white"
                                    : "hover:bg-[var(--color-base-200)]"
                                }
                            `}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </section>
            </section>
        </>
    );
}