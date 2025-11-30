import { useState, useEffect } from "react";
import { testimoniService } from "@/services/testimoniService";
import { Trash2, Star, User, Search, AlertTriangle, Loader2, Quote } from "lucide-react";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

export function KomentarUser() {
    const [testimonis, setTestimonis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await testimoniService.getAllAdmin(); 
            setTestimonis(data);
        } 
        catch (error) {
            toast.error("Gagal mengambil data komentar. Periksa koneksi.");
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id, namaUser) => {
        const result = await Swal.fire({
            title: `Hapus komentar dari "${namaUser}"?`,
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            background: '#1e293b',
            color: '#fff',
            iconColor: '#facc15'
        });

        if (result.isConfirmed) {
            const deletePromise = testimoniService.delete(id);

            await toast.promise(
                deletePromise,
                {
                    loading: 'Menghapus data...',
                    success: () => {
                        fetchData();
                        return 'Berhasil dihapus!';
                    },
                    error: (err) => {
                        const msg = err.response?.data?.msg || 'Gagal menghapus data.';
                        return msg;
                    },
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };

    const filteredList = testimonis.filter(item => {
        const name = item.user_nama || item.nama || "";
        const text = item.isi_text || "";
        const email = item.email || ""; 
        
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               text.toLowerCase().includes(searchTerm.toLowerCase()) ||
               email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="p-6 min-h-screen text-white bg-[#0a122e] mt-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <AlertTriangle className="text-yellow-500" /> Pengawasan Testimoni
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Pantau umpan balik user dan hapus konten yang tidak pantas.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Cari nama user, email, atau isi pesan..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1b2b5a] border border-blue-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 text-sm placeholder-gray-500 transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            ) : filteredList.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-700 rounded-xl bg-[#0f1c45]/50 text-gray-400">
                    <p>Tidak ada komentar yang ditemukan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredList.map((item) => {
                        const userName = item.user_nama || item.nama || "User";
                        const userRole = item.user_role || item.role || "user";
                        const userEmail = item.email || "Email tidak tersedia";
                        const text = item.isi_text || "";

                        return (
                            <div 
                                key={item.id} 
                                className="bg-[#0f1c45] border border-blue-900 rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:border-blue-600 transition-all group"
                            >
                                <div className="flex items-center md:items-start gap-4 md:w-64 md:shrink-0 md:border-r border-blue-900/50 pr-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-xl font-bold shrink-0 shadow-lg">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-white truncate" title={userName}>{userName}</h4>
                                        <p className="text-xs text-gray-500 truncate" title={userEmail}>{userEmail}</p> {/* Tampilkan Email */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded border uppercase ${userRole === 'mitra' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-blue-900/30 text-blue-400 border-blue-800'}`}>
                                                {userRole}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 relative">
                                    <Quote className="absolute -top-1 -left-1 text-blue-800/30 rotate-180" size={32} />
                                    <div className="flex gap-1 mb-2 pl-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={14} 
                                                className={i < item.rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-700 text-gray-700"} 
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed pl-6 italic">
                                        "{text}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-end md:justify-center border-t md:border-t-0 md:border-l border-blue-900/50 pt-4 md:pt-0 pl-4">
                                    <button 
                                        onClick={() => handleDelete(item.id, userName)}
                                        className="bg-red-500/10 hover:bg-red-600 hover:text-white text-red-500 p-3 rounded-lg transition-all flex items-center gap-2 group-hover:scale-105"
                                        title="Hapus Komentar Toxic"
                                    >
                                        <Trash2 size={20} />
                                        <span className="md:hidden text-sm font-bold">Hapus</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}