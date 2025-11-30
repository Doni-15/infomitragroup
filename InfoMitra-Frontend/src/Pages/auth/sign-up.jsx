import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { InputBox, SideBarAunt } from "@/components";
import { authService } from "@/services/authService";
import "../../Components/style-global/form-style.css";

export function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama: '',
        email: '',
        password: '',
        confPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!form.nama || !form.email || !form.password) {
            toast.error("Semua data wajib diisi!");
            return;
        }

        if (form.password !== form.confPassword) {
            toast.error("Password dan Konfirmasi Password tidak cocok!");
            return;
        }

        setIsLoading(true);

        try {
            const cleanEmail = form.email.trim();
            await authService.register({
                nama: form.nama,
                email: cleanEmail,
                password: form.password
            });

            toast.success("Registrasi Berhasil! Silakan Login.");
            navigate('/auth/sign-in');

        } catch (err) {
            const msg = err.response?.data?.message || "Gagal Mendaftar. Coba lagi.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="w-screen h-screen bg-[var(--color-base-400)] flex items-center justify-center">
                <div className="flex px-15 my-5 w-full">
                    
                    <div className="w-1/2 rounded-l-4xl py-10 px-8 bg-[var(--warna-netral-abu)]">
                        <h1 className="text-4xl font-bold tracking-wider mb-8 text-center">REGISTRASI</h1>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <InputBox 
                                id="nama"
                                name="nama"
                                type="text" 
                                placeholder="Nama Lengkap" 
                                value={form.nama}
                                onChange={handleChange}
                                variant="bold"
                                disabled={isLoading}
                            />
                            <InputBox 
                                id="email"
                                name="email"
                                type="email" 
                                placeholder="usaha@gmail.com" 
                                value={form.email}
                                onChange={handleChange}
                                variant="bold"
                                disabled={isLoading}
                            />
                            <InputBox 
                                id="password"
                                name="password"
                                type="password" 
                                placeholder="Buat Password Kuat" 
                                value={form.password}
                                onChange={handleChange}
                                variant="bold"
                                disabled={isLoading}
                            />
                            <InputBox 
                                id="confPassword"
                                name="confPassword"
                                type="password" 
                                placeholder="Konfirmasi Password" 
                                value={form.confPassword}
                                onChange={handleChange}
                                variant="bold"
                                disabled={isLoading}
                            />
                            
                            <button type="submit" className="hidden" disabled={isLoading} />
                        </form>

                        <div className='mt-10'>
                            <SideBarAunt 
                                buttonText={isLoading ? "Memproses..." : "Sign Up"}
                                tombolKiri={false}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>

                    <SideBarAunt 
                        title="Sudah Memiliki Akun?"
                        subTitle="Sign In Untuk Masuk"
                        buttonText="Sign In"
                        buttonLink="/auth/sign-in"
                        navigate={navigate}
                        tombolKiri={true} 
                    />
                </div>
            </section>
        </>
    );
}