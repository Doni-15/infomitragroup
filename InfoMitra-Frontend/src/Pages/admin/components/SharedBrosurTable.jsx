import { useEffect, useState } from "react";
import { Search } from "./search.jsx";
import { Kategori } from "./kategori.jsx";

import { TambahBrosurModal } from "./TambahBrosurModal"; 
import { EditBrosurModal } from "./EditBrosurModal"; 

import { brosurService } from "@/services/brosurService"; 
import { Trash2, ExternalLink, RefreshCw, Plus, SquarePen } from "lucide-react";
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

export function SharedBrosurTable({ title, filterRule, badgeLabel }) {
    const [dataBrosur, setDataBrosur] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    
    const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try { 
            const response = await brosurService.getAllAdmin(); 
            const filteredResponse = response.filter(filterRule);
            
            setDataBrosur(filteredResponse);
            setFilteredData(filteredResponse);
        } 
        catch (error) {
            toast.error("Gagal memuat data dari server.");
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            let results = dataBrosur;

            if (selectedCategory) {
                results = results.filter(item => item.kategori === selectedCategory);
            }

            if (searchTerm) {
                const lowerTerm = searchTerm.toLowerCase();
                results = results.filter(item => 
                    (item.nama_mitra && item.nama_mitra.toLowerCase().includes(lowerTerm)) ||
                    (item.kategori && item.kategori.toLowerCase().includes(lowerTerm))
                );
            }

            setFilteredData(results);
        }, 500);
        
        return () => clearTimeout(delayDebounce);
    }, [searchTerm, selectedCategory, dataBrosur]);

    useEffect(() => {
        loadData();
    }, []);

    const handleOpenTambah = () => {
        setIsTambahModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = async (id, nama) => {
        const result = await Swal.fire({
            title: `Hapus ${nama}?`,
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            background: '#1e293b',
            color: '#fff'
        });

        if (result.isConfirmed) {
            await toast.promise(
                brosurService.delete(id),
                {
                    loading: 'Menghapus data...',
                    success: () => {
                        loadData();
                        return 'Berhasil dihapus!';
                    },
                    error: (err) => { 
                        const msg = err.response?.data?.msg || "Gagal menghapus data. Periksa koneksi.";
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

    const getStatusInfo = (tglBerakhir) => {
        const today = new Date();
        const end = new Date(tglBerakhir);
        
        if (today > end) {
            return { 
                label: "Expired", 
                color: "text-red-500 font-bold bg-red-500/10 rounded px-2 py-1 inline-block" 
            };
        }
        return { 
            label: "Aktif", 
            color: "text-green-400 font-bold bg-green-500/10 rounded px-2 py-1 inline-block" 
        };
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "2-digit", month: "2-digit", year: "numeric"
        });
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            
            <div className="flex justify-between items-center mt-10 mb-8">
                <h1 className="text-2xl font-semibold tracking-wide text-white">{title}</h1>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-5 justify-between">
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <Search value={searchTerm} onChange={setSearchTerm} />
                    <Kategori value={selectedCategory} onChange={setSelectedCategory} />
                </div>

                <div className="flex gap-3 ml-auto">
                    <button 
                        onClick={handleOpenTambah}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-white shadow-lg flex items-center gap-2 transition"
                    >
                        <Plus size={18} /> Tambah Brosur
                    </button>

                    <button 
                        onClick={() => {
                            const promise = loadData();
                            toast.promise(promise, {
                                loading: 'Merefresh data...',
                                success: 'Data terupdate!',
                                error: 'Gagal refresh',
                            }, { id: 'refresh-toast' });
                        }} 
                        className="p-2 bg-blue-900/50 border border-blue-700 rounded-lg hover:bg-blue-800 text-white flex gap-2 text-sm items-center transition"
                    >
                        <RefreshCw size={16} /> <span className="hidden md:inline">Refresh</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-blue-800/50 shadow-2xl">
                <table className="min-w-full text-left">
                    <thead className="bg-[#1a237e] text-blue-100 border-b border-blue-700">
                        <tr>
                            <th className="px-6 py-4">Nama Usaha</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Mulai</th>
                            <th className="px-6 py-4">Berakhir</th>
                            <th className="px-6 py-4">Link & Gambar</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-800/30">
                        {loading ? (
                            <tr><td colSpan="7" className="text-center py-10 text-gray-400">Loading data...</td></tr>
                        ) : filteredData.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-10 text-gray-400">{searchTerm ? `Tidak ditemukan data "${searchTerm}"` : `Belum ada ${title.toLowerCase()}.`}</td></tr>
                        ) : (
                            filteredData.map((item, index) => {
                                const status = getStatusInfo(item.tanggal_berakhir);
                                const isEven = index % 2 === 0;
                                
                                return (
                                    <tr key={item.id} className={`${isEven ? "bg-[#0f172a]" : "bg-[#1e293b]"} hover:bg-blue-900/20 transition duration-200`}>
                                        <td className="px-6 py-4 font-medium text-white">{item.nama_mitra}<div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{badgeLabel}</div></td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{item.kategori || "-"}</td>
                                        <td className="px-6 py-4 text-sm"><span className={status.color}>{status.label}</span></td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{formatDate(item.tanggal_mulai)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{formatDate(item.tanggal_berakhir)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-16 bg-gray-700 rounded overflow-hidden border border-gray-600">
                                                    <img src={item.gambar_url} alt="thumb" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                                </div>
                                                {item.link_tujuan && (<a href={item.link_tujuan} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-500/20 rounded" title={item.link_tujuan}><ExternalLink size={18} /></a>)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleOpenEdit(item)}
                                                className="text-green-400 hover:text-green-300 p-2 hover:bg-green-900/20 rounded transition"
                                                title="Edit Iklan"
                                            >
                                                <SquarePen size={18} />
                                            </button>

                                            <button 
                                                onClick={() => handleDelete(item.id, item.nama_mitra)}
                                                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-900/20 rounded transition"
                                                title="Hapus Iklan"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <TambahBrosurModal 
                isOpen={isTambahModalOpen} 
                onClose={() => setIsTambahModalOpen(false)} 
                onSuccess={() => {
                    loadData(); 
                    toast.success("Brosur berhasil ditambahkan!");
                }} 
            />

            {isEditModalOpen && (
                <EditBrosurModal 
                    isOpen={isEditModalOpen} 
                    onClose={handleCloseEdit}
                    editData={editingItem}
                    onSuccess={() => {
                        loadData(); 
                        toast.success("Data berhasil diupdate!");
                    }} 
                />
            )}
        </>
    );
}