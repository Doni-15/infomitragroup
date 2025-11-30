import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { brosurService } from '@/services/brosurService';
import { authService } from '@/services/authService';
import { 
    User, Mail, Shield, Calendar, Loader2, 
    ImageIcon, AlertCircle, ArrowLeft, Home, X, MessageSquare 
} from 'lucide-react';

import { TestimoniModal } from '@/components';

export function UserDetailProfil({ user, setUser }){
    const navigate = useNavigate(); 
    const [myBrosurs, setMyBrosurs] = useState([]);
    const [loadingBrosur, setLoadingBrosur] = useState(true);

    const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);
    
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const storedUser = authService.getCurrentUser(); 
    const activeUser = user || storedUser; 

    useEffect(() => {
        const fetchMyBrosurs = async () => {
            try {
                const data = await brosurService.getMyBrosurs();
                setMyBrosurs(data);
            } catch (error) {
                console.error("Gagal ambil brosur:", error);
            } finally {
                setLoadingBrosur(false);
            }
        };
        if (activeUser) fetchMyBrosurs();
    }, [activeUser]);

    const openLightbox = (url) => { 
        setSelectedImage(url); setIsLightboxOpen(true); 
    };

    const closeLightbox = () => { 
        setIsLightboxOpen(false); setSelectedImage(null); 
    };

    const formatJoinDate = (d) => d 
        ? new Date(d).toLocaleDateString('id-ID', {
            month:'long', year:'numeric'
    }) : "-";
    
    const getStatusInfo = (s, e) => {
        if (new Date(e) < new Date()){ 
            return { 
                label: "Expired", 
                className: "bg-red-100 text-red-600 border-red-200" 
            };
        }

        if (s === 'lunas'){ 
            return { 
                label: "Aktif", 
                className: "bg-green-100 text-green-600 border-green-200" 
            };
        }

        return { 
            label: "Pending", 
            className: "bg-yellow-100 text-yellow-600 border-yellow-200" 
        };
    };

    if (!activeUser){ 
        return( 
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            
            <div className="h-64 bg-gradient-to-r from-[#0f1c45] to-blue-900 relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-6 left-6 z-20">
                    <button onClick={() => navigate('/Pages/galeri-iklan')} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all text-sm font-medium group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Kembali ke Galeri
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-4">
                            <div className="pt-8 pb-6 px-6 flex flex-col items-center text-center border-b border-gray-100">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-blue-600 flex items-center justify-center text-5xl font-bold text-white mb-4">
                                    {activeUser.nama ? activeUser.nama.charAt(0).toUpperCase() : <User size={48} />}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeUser.nama || "Pengguna"}</h2>
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 uppercase">{activeUser.role || "User"}</span>
                                    {activeUser.role === 'mitra' && <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1"><Shield size={12} /> Verified</span>}
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div><label className="text-xs font-semibold text-gray-400 uppercase">Email Akun</label><div className="flex items-center gap-3 mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100"><Mail size={18} className="text-blue-500"/><span className="truncate text-sm">{activeUser.email || "Email tidak tersedia"}</span></div></div>
                                <div><label className="text-xs font-semibold text-gray-400 uppercase">Member Sejak</label><div className="flex items-center gap-3 mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100"><Calendar size={18} className="text-blue-500"/><span className="text-sm">{activeUser.created_at ? formatJoinDate(activeUser.created_at) : "-"}</span></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6 lg:mt-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2 drop-shadow-md">
                                    <ImageIcon className="text-blue-200"/> Brosur & Iklan Saya
                                </h3>
                                <p className="text-blue-100 text-sm mt-1 drop-shadow-sm font-medium">Kelola iklan usaha Anda yang terhubung dengan akun ini.</p>
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <button 
                                    onClick={() => setIsTestiModalOpen(true)}
                                    className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 text-sm"
                                >
                                    <MessageSquare size={18} /> Bagikan Pengalaman
                                </button>
                                <div className="bg-white/95 backdrop-blur px-5 py-2 rounded-lg shadow-lg border border-white/20 text-right">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Total Iklan</p>
                                    <p className="text-2xl font-bold text-blue-600 leading-none">{myBrosurs.length}</p>
                                </div>
                            </div>
                        </div>

                        {loadingBrosur ? (
                            <div className="bg-white rounded-xl p-16 shadow-sm flex justify-center mt-6"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
                        ) : myBrosurs.length === 0 ? (
                            <div className="bg-white border-dashed border-2 border-gray-200 rounded-xl p-12 text-center mt-6">
                                <ImageIcon size={40} className="mx-auto text-gray-300 mb-4"/>
                                <h4 className="text-lg font-bold">Belum Ada Iklan</h4>
                                <p className="text-gray-500 text-sm">Hubungi admin untuk pasang iklan.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                                {myBrosurs.map((brosur) => {
                                    const status = getStatusInfo(brosur.status_bayar, brosur.tanggal_berakhir);
                                    return (
                                        <div key={brosur.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all">
                                            <div className="h-48 relative overflow-hidden bg-gray-100 cursor-zoom-in" onClick={() => openLightbox(brosur.gambar_url)}>
                                                <img src={brosur.gambar_url} alt="Brosur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90"></div>
                                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${status.className}`}>{status.label}</div>
                                                <div className="absolute bottom-3 left-4 text-white"><p className="text-[10px] font-bold text-blue-300 bg-blue-900/50 px-2 py-0.5 rounded">{brosur.kategori}</p><h4 className="text-lg font-bold line-clamp-1">{brosur.nama_mitra}</h4></div>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between text-sm border-b border-gray-100 pb-2"><span className="text-gray-500 text-xs">Posisi</span><span className="font-bold text-xs uppercase text-gray-700">{brosur.posisi_iklan === 'brosur_vip' ? '👑 VIP' : 'Grid'}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-gray-500 text-xs flex gap-1"><Calendar size={14}/> Berakhir</span><span className="font-medium text-xs">{new Date(brosur.tanggal_berakhir).toLocaleDateString('id-ID')}</span></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <TestimoniModal 
                isOpen={isTestiModalOpen} 
                onClose={() => setIsTestiModalOpen(false)} 
            />

            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in" onClick={closeLightbox}>
                    <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition"><X size={28} /></button>
                    <img src={selectedImage} alt="Detail Brosur" className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
};