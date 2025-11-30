import { useState, useEffect } from "react";
import { X, Upload, Save, Loader2, Pencil, Calendar } from "lucide-react";
import { brosurService } from "@/services/brosurService"; 
import toast from 'react-hot-toast';

export function EditBrosurModal({ isOpen, onClose, onSuccess, editData }) {
    const [loading, setLoading] = useState(false);
    
    const [namaMitra, setNamaMitra] = useState("");
    const [kategori, setKategori] = useState("");
    const [posisi, setPosisi] = useState("");
    const [linkInput, setLinkInput] = useState(""); 
    const [statusBayar, setStatusBayar] = useState("lunas");
    
    const [tambahDurasi, setTambahDurasi] = useState(false); 
    const [durasi, setDurasi] = useState(1);

    const [fileGambar, setFileGambar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (isOpen && editData) {
            setNamaMitra(editData.nama_mitra || "");
            setKategori(editData.kategori || "");
            setPosisi(editData.posisi_iklan || "grid");
            setLinkInput(editData.link_tujuan || ""); 
            setStatusBayar(editData.status_bayar || "lunas");
            setPreviewUrl(editData.gambar_url);
            
            setDurasi(1);
            setTambahDurasi(false);
            setFileGambar(null);
        }
    }, [isOpen, editData]);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileGambar(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("nama_mitra", namaMitra);
            formData.append("kategori", kategori);
            formData.append("posisi_iklan", posisi);
            formData.append("status_bayar", statusBayar);
            
            let finalLink = linkInput.trim();
            if (finalLink && !finalLink.startsWith("http://") && !finalLink.startsWith("https://")) {
                finalLink = `https://${finalLink}`;
            }
            formData.append("link_tujuan", finalLink);

            
            if (tambahDurasi) {
                const newDate = new Date();
                newDate.setMonth(newDate.getMonth() + parseInt(durasi));
                formData.append("tanggal_berakhir", newDate.toISOString());
            } else {
                formData.append("tanggal_berakhir", editData.tanggal_berakhir);
            }
            
            if (fileGambar) {
                formData.append("gambar", fileGambar);
            }

            await brosurService.update(editData.id, formData);
            
            toast.success(`Brosur ${namaMitra} berhasil diperbarui!`);
            onSuccess();
            onClose();
            
        } catch (error) {
            const serverMessage = error.response?.data?.msg || "Gagal mengupdate data.";
            toast.error(serverMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !editData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0f1c45] border border-blue-800 w-full max-w-2xl rounded-xl shadow-2xl p-6 text-white overflow-y-auto max-h-[90vh]">
                
                <div className="flex justify-between items-center mb-6 border-b border-blue-800 pb-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Pencil size={20} className="text-blue-400"/> Edit Brosur
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Pemilik: {editData.owner_email || 'Tidak diketahui'}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition"><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nama Mitra / Usaha</label>
                            <input type="text" required value={namaMitra} onChange={(e) => setNamaMitra(e.target.value)} 
                                className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                            <input type="text" required value={kategori} onChange={(e) => setKategori(e.target.value)} placeholder="Contoh: Kuliner, Jasa"
                                className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Posisi Iklan</label>
                                <select value={posisi} onChange={(e) => setPosisi(e.target.value)} 
                                    className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none">
                                    <option value="grid">Grid (Biasa)</option>
                                    <option value="brosur_vip">VIP (Atas)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Status Bayar</label>
                                <select value={statusBayar} onChange={(e) => setStatusBayar(e.target.value)} 
                                    className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none">
                                    <option value="lunas">Lunas</option>
                                    <option value="pending">Pending</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Link Web Tujuan</label>
                            <input type="text" value={linkInput} onChange={(e) => setLinkInput(e.target.value)} 
                                placeholder="www.website.com"
                                className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="bg-blue-900/20 p-3 rounded border border-blue-800/50">
                            <div className="flex items-center gap-2 mb-2">
                                <input 
                                    type="checkbox" 
                                    id="tambahDurasi" 
                                    checked={tambahDurasi} 
                                    onChange={(e) => setTambahDurasi(e.target.checked)}
                                    className="w-4 h-4 rounded accent-blue-500"
                                />
                                <label htmlFor="tambahDurasi" className="text-sm font-semibold text-blue-300 cursor-pointer">
                                    Perpanjang Durasi?
                                </label>
                            </div>
                            
                            {tambahDurasi && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-xs text-gray-400 mb-1">Tambah durasi mulai hari ini</label>
                                    <select value={durasi} onChange={(e) => setDurasi(e.target.value)} 
                                        className="w-full bg-[#1b2b5a] border border-blue-800 rounded p-2 text-sm focus:outline-none">
                                        <option value="1">1 Bulan</option>
                                        <option value="3">3 Bulan</option>
                                        <option value="6">6 Bulan</option>
                                        <option value="12">1 Tahun</option>
                                    </select>
                                    <p className="text-[10px] text-yellow-500 mt-1">*Tanggal berakhir lama akan ditimpa.</p>
                                </div>
                            )}
                            {!tambahDurasi && (
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar size={12}/> Berakhir: {new Date(editData.tanggal_berakhir).toLocaleDateString('id-ID')}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Banner Iklan</label>
                        <div className="border-2 border-dashed border-blue-800 rounded-lg h-64 flex flex-col items-center justify-center text-center hover:bg-blue-900/30 transition relative group bg-[#0a122e]">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            
                            {previewUrl ? (
                                <div className="relative w-full h-full p-2">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded" />
                                    <div className="absolute bottom-2 left-0 right-0 text-center">
                                        <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">Klik untuk ganti</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center p-4 text-gray-400">
                                    <Upload size={32} className="mb-2 text-blue-500"/>
                                    <span className="text-sm">Klik atau drop gambar</span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Format: JPG, PNG, WEBP. Max 5MB.</p>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-blue-800 mt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded text-gray-300 hover:bg-white/10 transition">
                            Batal
                        </button>
                        <button 
                            type="submit" disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-900/50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
                            Simpan Perubahan
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}