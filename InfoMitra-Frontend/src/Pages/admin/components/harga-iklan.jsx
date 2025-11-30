import React, { useState, useEffect } from 'react';
import { hargaIklanService } from '../../../services/hargaIklanService';
import { toast } from 'react-hot-toast';

export function HargaIklan() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const data = await hargaIklanService.getAllPackages();
            setPackages(data || []); 
        } catch (error) {
            toast.error("Gagal memuat data paket. Pastikan server menyala.");
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (index, field, value) => {
        const newPackages = [...packages];
        
        if (field === 'label') {
            newPackages[index][field] = value.toUpperCase();
        } else {
            newPackages[index][field] = value;
        }
        
        setPackages(newPackages);
    };

    const handleDiscountChange = (pkgIndex, discIndex, value) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].discounts[discIndex].percent = parseInt(value) || 0;
        setPackages(newPackages);
    };

    const handleFeatureChange = (pkgIndex, featureIndex, value) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features[featureIndex] = value;
        setPackages(newPackages);
    };

    const addFeature = (pkgIndex) => {
        const newPackages = [...packages];
        if (!newPackages[pkgIndex].features) newPackages[pkgIndex].features = [];
        newPackages[pkgIndex].features.push("");
        setPackages(newPackages);
    };

    const removeFeature = (pkgIndex, featureIndex) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features.splice(featureIndex, 1);
        setPackages(newPackages);
    };

    const handleSave = async (pkg) => {
        try {
            await hargaIklanService.updatePackage(pkg.id, pkg);
            toast.success(`Berhasil menyimpan perubahan untuk \n${pkg.name}!`);
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.response?.data?.msg || "Gagal menyimpan data. Server tidak merespons.";
            toast.error(serverMessage);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">Memuat Data...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0f172a] px-6 py-6 text-slate-200 mt-20">
            <div className="mb-8 border-b border-slate-700 pb-4">
                <h1 className="text-2xl font-bold text-white">Pengaturan Paket & Harga</h1>
                <p className="text-slate-400 text-sm mt-1">Data ini diambil langsung dari database.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {packages.map((pkg, index) => (
                    <div key={pkg.id || index} className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg h-fit">

                        <div className="border-b border-slate-700 pb-4 mb-4">
                            <h2 className="text-xl font-semibold text-white">Edit: {pkg.name}</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Nama Paket</label>
                                <input
                                    type="text"
                                    value={pkg.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    className="w-full bg-[#0f172a] border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Harga Dasar (Rp)</label>
                                    <input
                                        type="number"
                                        value={pkg.price}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        className="w-full bg-[#0f172a] border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Badge Label</label>
                                    <input
                                        type="text"
                                        value={pkg.label}
                                        placeholder="Kosongkan jika tidak ada"
                                        onChange={(e) => handleChange(index, 'label', e.target.value)}
                                        className="w-full bg-[#0f172a] border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Daftar Fitur</label>
                                <div className="space-y-2">
                                    {(pkg.features || []).map((feature, fIndex) => (
                                        <div key={fIndex} className="flex gap-2 items-center group">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, fIndex, e.target.value)}
                                                className="flex-1 bg-[#0f172a] border border-slate-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-slate-600"
                                                placeholder="Tulis fitur..."
                                            />
                                            <button
                                                onClick={() => removeFeature(index, fIndex)}
                                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => addFeature(index)}
                                    className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors"
                                >
                                    + Tambah Fitur
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Seting Diskon Durasi</label>
                                <div className="bg-[#0f172a] border border-slate-600 rounded overflow-hidden">
                                    {(pkg.discounts || []).map((disc, dIndex) => (
                                        <div key={dIndex} className="flex items-center justify-between p-2 border-b border-slate-700 last:border-0">
                                            <span className="text-sm pl-2">{disc.duration} Bulan:</span>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={disc.percent}
                                                    onChange={(e) => handleDiscountChange(index, dIndex, e.target.value)}
                                                    className="w-16 bg-[#1e293b] border border-slate-600 rounded text-center py-1 text-sm focus:border-blue-500 focus:outline-none"
                                                />
                                                <span className="text-sm text-slate-400 pr-2">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleSave(pkg)}
                                className={`w-full mt-4 py-2 rounded font-semibold transition-colors ${pkg.label === 'POPULER'
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                    }`}
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}