import { useState, useEffect } from "react";
import { X, Upload, Save, Loader2, User, Plus, AlertCircle } from "lucide-react";
import { brosurService } from "@/services/brosurService"; 
import toast from 'react-hot-toast';

const KATEGORI_OPTIONS = ["Kuliner", "Jasa", "Fashion", "Properti", "Pendidikan", "Lainnya"];
const POSISI_OPTIONS = [
    { value: "brosur_vip", label: "VIP (Atas)" },
    { value: "grid", label: "Grid (Biasa)" }
];

export function TambahBrosurModal({ isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [emailUser, setEmailUser] = useState(""); 
    const [namaMitra, setNamaMitra] = useState("");
    const [kategori, setKategori] = useState("Kuliner");
    const [posisi, setPosisi] = useState("brosur_vip");
    const [durasi, setDurasi] = useState(1);
    const [linkInput, setLinkInput] = useState(""); 
    
    const [emailStatus, setEmailStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const [fileGambar, setFileGambar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (isOpen) {
        } else {
            resetForm();
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const resetForm = () => {
        setEmailUser("");
        setNamaMitra("");
        setKategori("Kuliner");
        setPosisi("brosur_vip");
        setDurasi(1);
        setLinkInput("");
        setFileGambar(null);
        setPreviewUrl(null);
        setEmailStatus("idle");
        setErrorMessage("");
    };

    const handleEmailChange = (e) => {
        setEmailUser(e.target.value);
        if (emailStatus === 'error') {
            setEmailStatus('idle');
            setErrorMessage("");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Ukuran gambar maksimal 5MB!");
                return;
            }
            setFileGambar(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!fileGambar) {
            toast.error("Wajib upload gambar banner!");
            return;
        }

        setLoading(true);
        setEmailStatus("idle");

        try {
            let finalLink = linkInput;
            const BASE_URL = window.location.origin;
            const cleanBase = BASE_URL.replace(/\/$/, "");

            if (linkInput.startsWith("/")) {
                finalLink = `${cleanBase}${linkInput}`;
            } 
            else if (linkInput.length > 0 && !linkInput.startsWith("http")) {
                finalLink = `${cleanBase}/${linkInput}`;
            }

            const formData = new FormData();
            formData.append("email_user", emailUser);
            formData.append("nama_mitra", namaMitra);
            formData.append("kategori", kategori);
            formData.append("posisi_iklan", posisi);
            formData.append("durasi_bulan", durasi);
            formData.append("link_tujuan", finalLink);
            formData.append("gambar", fileGambar);

            await brosurService.create(formData);
            
            toast.success("Brosur berhasil diterbitkan!");
            onSuccess();
            onClose();

        } catch (error) {
            const status = error.response?.status;
            const msg = error.response?.data?.msg || "Gagal membuat brosur.";

            if (status === 404) {
                setEmailStatus("error");
                setErrorMessage("Email tidak ditemukan! Pastikan user sudah mendaftar.");
                toast.error("Gagal: Email user tidak valid.");
                
                document.getElementById('email-input-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } 
            else {
                toast.error(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0f1c45] border border-blue-800 w-full max-w-3xl rounded-xl shadow-2xl p-6 text-white overflow-y-auto max-h-[90vh]">
                
                <div className="flex justify-between items-center mb-6 border-b border-blue-800 pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Plus className="text-blue-400" /> Tambah Brosur Baru
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-4">
                        
                        <div 
                            id="email-input-container"
                            className={`p-3 rounded border transition-colors duration-300 ${
                                emailStatus === 'error' 
                                ? 'bg-red-900/20 border-red-500' 
                                : 'bg-blue-900/20 border-blue-800/50'
                            }`}
                        >
                            <label className={`block text-sm font-semibold mb-1 flex items-center gap-2 ${
                                emailStatus === 'error' ? 'text-red-400' : 'text-blue-300'
                            }`}>
                                <User size={14}/> Email Pemilik (User)
                            </label>
                            
                            <input 
                                type="email" 
                                required
                                value={emailUser}
                                onChange={handleEmailChange}
                                placeholder="mitra@gmail.com"
                                className={`w-full bg-[#1b2b5a] border rounded p-2 focus:outline-none focus:ring-2 ${
                                    emailStatus === 'error' 
                                    ? 'border-red-500 focus:ring-red-500 text-red-100 placeholder:text-red-300/50' 
                                    : 'border-blue-600 focus:ring-blue-500'
                                }`}
                            />
                            
                            {emailStatus === 'error' ? (
                                <div className="flex items-center gap-1 text-[11px] text-red-400 mt-2 animate-pulse">
                                    <AlertCircle size={12}/> {errorMessage}
                                </div>
                            ) : (
                                <p className="text-[10px] text-gray-400 mt-1">
                                    Sistem akan otomatis menghubungkan brosur ke akun ini.
                                </p>
                            )}
                        </div>

                        {/* Nama Mitra */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nama Mitra / Usaha</label>
                            <input 
                                type="text" required value={namaMitra} onChange={(e) => setNamaMitra(e.target.value)}
                                placeholder="Contoh: Toko Berkah"
                                className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                                <select value={kategori} onChange={(e) => setKategori(e.target.value)}
                                    className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none">
                                    {KATEGORI_OPTIONS.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Posisi Iklan</label>
                                <select value={posisi} onChange={(e) => setPosisi(e.target.value)}
                                    className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none">
                                    {POSISI_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Durasi Paket</label>
                            <select value={durasi} onChange={(e) => setDurasi(e.target.value)}
                                className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none">
                                <option value="1">1 Bulan</option>
                                <option value="3">3 Bulan</option>
                                <option value="6">6 Bulan</option>
                                <option value="12">1 Tahun</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Link Web Tujuan</label>
                            <input type="text" value={linkInput} onChange={(e) => setLinkInput(e.target.value)}
                                placeholder="/mitra/nama-toko" 
                                className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Upload Banner</label>
                        <div className={`border-2 border-dashed rounded-lg h-[300px] flex flex-col items-center justify-center text-center transition relative group bg-[#0a122e] overflow-hidden ${
                             emailStatus === 'error' ? 'border-red-900/50' : 'border-blue-800 hover:bg-blue-900/30'
                        }`}>
                            <input 
                                type="file" accept="image/*" onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            
                            {previewUrl ? (
                                <div className="relative w-full h-full bg-black/40 p-2">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                                        <span className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs px-3 py-1 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all">
                                            Ganti Gambar
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center p-4 text-gray-400 group-hover:text-blue-300 transition-colors">
                                    <div className="bg-blue-900/50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <Upload size={32} className="text-blue-400"/>
                                    </div>
                                    <span className="text-sm font-medium text-white">Klik atau drop gambar</span>
                                    <span className="text-xs text-gray-500 mt-1">Max 5MB</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-blue-800 mt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded text-gray-300 hover:bg-white/10 transition">
                            Batal
                        </button>
                        <button 
                            type="submit" disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-900/50 transition-all active:scale-95"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
                            Simpan Brosur
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}