import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';

import { LogoUsaha, LaptopNavigasi, MobileMenu, LogIn, UserProfile } from '@/Components';

const navLinks = [
    { to: '/Pages/beranda', text: 'Beranda' },
    { to: '/Pages/galeri-iklan', text: 'Galeri Iklan' },
    { to: '/Pages/paket-dan-harga', text: 'Paket Iklan' },
    { to: '/Pages/cara-kerja', text: 'Cara Kerja' },
];

export function Header({ user, setUser }) {
    const navigate = useNavigate();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
        setIsMobileMenuOpen(false);
    };

    const closeAllDropdowns = () => {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
    };

    const handleLogout = () => {
        authService.logout(); 
        setUser(null);
        closeAllDropdowns();
        navigate('/Pages/galeri-iklan');
        toast.success('LogOut berhasil!');
    };

    return (
        <header className="fixed justify-between flex flex-row items-center w-full py-[10px] shadow-lg border-b border-[var(--color-base-300)] z-50 bg-[#1e2a4a]">
            <LogoUsaha />

            <div className="flex flex-row items-center space-x-4 lg:space-x-9">
                <LaptopNavigasi navLinks={navLinks} />
                
                <MobileMenu 
                    isOpen={isMobileMenuOpen} 
                    toggleMenu={toggleMobileMenu} 
                    closeAll={closeAllDropdowns} 
                    navLinks={navLinks}
                />
            </div>
            
            {user ? (
                <UserProfile 
                    user={user} 
                    isOpen={isProfileDropdownOpen}
                    toggle={toggleProfileDropdown}
                    onLogout={handleLogout} 
                />
            ) : (
                <LogIn />
            )}
            
        </header>
    );
}