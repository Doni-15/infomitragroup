import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { InputBox, SideBarAunt } from "@/components";
import { authService } from "@/services/authService"; 

export function SignIn({ setUser }){
    const navigate = useNavigate();  

    const [form, setForm] = useState({
        email : "",
        password : "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        if(error) setError("");
    };

    const handleSubmit = async (e) => {
        if(e) e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            const msg = "Email dan Password wajib diisi!";
            setError(msg);
            toast.error(msg);
            return;
        }

        setIsLoading(true);

        try {
            const cleanEmail = form.email.trim();
            const response = await authService.login(cleanEmail, form.password);
            const loggedInUser = response.user; 

            if(setUser){ 
                setUser(loggedInUser);
            }

            if (loggedInUser.role && loggedInUser.role.toLowerCase() === 'admin') {
                toast.success(`Login Admin Berhasil! Halo ${loggedInUser.nama}`);
                
                setTimeout(() => {
                    navigate("/admin", { replace: true }); 
                }, 100);
            }
            else {
                toast.success(`Login Berhasil! \nHalo ${loggedInUser.nama}`);
                setTimeout(() => {
                    navigate("/Pages/galeri-iklan", { replace: true });
                }, 100);
            }
        } 
        catch (err) {
            const msg = err.response?.data?.message || "Gagal Login. Periksa Email/Password.";
            setError(msg);
            toast.error(msg);
        }
        finally {
            setIsLoading(false);
        }
    }

    return(
        <>
            <section className="w-screen h-screen bg-[var(--color-base-400)] flex flex-col items-center justify-center">
                <div className="flex px-15 my-5 w-full">
                    
                    <div className="w-1/2 rounded-l-4xl py-10 px-8 bg-[var(--warna-netral-abu)]">
                        <h1 className="text-2xl font-bold tracking-wider mb-5 text-center">LOGIN</h1>
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center text-sm font-semibold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mb-10'>
                            <InputBox
                                id="email"
                                name="email"
                                type="email"
                                placeholder="contoh: usaha@gmail.com"
                                judul="Email"
                                value={form.email}
                                autoComplete="username"
                                onChange={handleChange}
                                disabled={isLoading}
                            />
    
                            <InputBox
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Masukkan Password"
                                judul="Password"
                                value={form.password}
                                autoComplete="current-password"
                                onChange={handleChange}
                                disabled={isLoading}
                            />

                            <button type="submit" className="hidden" disabled={isLoading} />
                        </form>
                        
                        <SideBarAunt 
                            buttonText={isLoading ? "Memproses..." : "Sign In"}
                            tombolKiri={false}
                            onClick={handleSubmit}
                        />
                    </div>

                    <SideBarAunt 
                        title="Belum Memiliki Akun?"
                        subTitle="Sign Up Untuk Memulai"
                        buttonText="Sign Up"
                        buttonLink="/auth/sign-up"
                        navigate={navigate}
                        tombolKiri={true}
                    />
                </div>
            </section>
        </>
    );
}