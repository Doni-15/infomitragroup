import { Link, useNavigate } from 'react-router-dom';
import { logoSrc } from "@/assets/logo";
import { UserIcon } from "@heroicons/react/24/outline";
import { Navigate } from 'react-router-dom';

const ArrowRightOnRectangleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);

export function MobileMenu({ isOpen, toggleMenu, closeAll, navLinks }) {
    return (
        <section className="lg:hidden">
            <p onClick={toggleMenu} className="text-3xl font-bold px-2 overflow-hidden cursor-pointer text-white">
                ☰
            </p>
            {isOpen && (
                <div className="bg-amber-400 fixed w-[200px] h-96 top-[52px] right-0 m-0 z-50 shadow-lg rounded-bl-xl">
                    <ul className="flex flex-col justify-center items-start px-4 w-full mt-5">
                        {navLinks.map((link) => (
                            <li key={link.text} className="font-bold text-black hover:text-white w-full my-2 py-2 border-b border-amber-500 hover:border-white transition" >
                                <Link to={link.to} onClick={closeAll}>
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export function LogoUsaha() {
    const handleLogoClick = () => {
        window.location.reload();
    };

    return (
        <section>
            <img src={logoSrc} alt="Logo Bisnis" onClick={handleLogoClick}
                className="h-[50px] cursor-pointer ml-0 lg:ml-5" />
        </section>
    );
}

export function LaptopNavigasi({ navLinks }) {
    return (
        <section className="text-lg xl:text-xl hidden lg:flex text-white">
            <ul className="flex flex-row justify-center space-x-6 xl:space-x-10">
                {navLinks.map((link) => (
                    <li key={link.text} className="font-semibold hover:text-yellow-400 transition hover:underline decoration-2 underline-offset-4">
                        <Link to={link.to}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
  
export function LogIn() {
    return(
        <section className='flex gap-2 lg:gap-3 mr-4 lg:mr-8'>
            <Link to={'/auth/sign-in'}>
                <div className='py-1 px-4 lg:px-5 rounded-lg text-sm lg:text-base cursor-pointer text-white font-medium bg-yellow-500 border-2 border-yellow-500 hover:bg-transparent hover:border-white transition'>Sign In</div>
            </Link>
            <Link to={'/auth/sign-up'}>
                <div className='hidden md:block py-1 px-5 rounded-lg text-base cursor-pointer text-white font-medium border-2 border-yellow-500 hover:border-white transition'>Sign Up</div>
            </Link>
        </section>
    );
}

export function UserProfile({ user, onLogout, isOpen, toggle }) {
    const initial = user?.nama ? user.nama.charAt(0).toUpperCase() : "U";
    const navigate = useNavigate();

    return (
        <div className="relative mr-4 lg:mr-8 select-none">
            <div onClick={toggle} className="cursor-pointer flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition shadow-md">
                    {initial}
                </div>
            </div>

            {isOpen && <div className="fixed inset-0 z-40" onClick={toggle}></div>}

            <div className={`
                fixed w-70 rounded-xl pt-3 pb-5 bg-[var(--warna-netral-putih)] z-50 right-10 top-20
                transition-all duration-100 shadow-xl/30 ease-in-out origin-top
                ${isOpen 
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
                    }
            `}>
                <div>
                    <section className="border-b px-4 pb-3">
                        <h1 className="text-left text-lg font-bold text-gray-800 truncate">{user?.nama}</h1>
                        <div className="text-left text-sm font-medium text-gray-500 mb-1 text-wrap">
                            <p>{user?.email}</p> 
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold uppercase">
                            {user?.role || 'User'}
                        </span>
                    </section>

                    <div 
                        onClick={() => navigate("/mitra/user-profil")}
                        className='mt-2 px-4 flex items-center mx-2 cursor-pointer py-2 rounded-lg hover:bg-gray-100 text-black transition'
                    >
                        <div className='size-6 border border-gray-200 bg-white rounded-full mr-3 flex items-center justify-center'>
                            <UserIcon className='size-4'/>
                        </div>
                        <h1 className='text-sm font-bold'>Profil</h1>
                    </div>

                    <div 
                        onClick={onLogout}
                        className='mt-2 px-4 flex items-center mx-2 cursor-pointer py-2 rounded-lg hover:bg-red-50 text-red-600 transition'
                    >
                        <div className='size-6 border border-red-200 bg-white rounded-full mr-3 flex items-center justify-center'>
                            <ArrowRightOnRectangleIcon className='size-4'/>
                        </div>
                        <h1 className='text-sm font-bold'>Sign Out</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}