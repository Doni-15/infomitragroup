import { useEffect, useState } from "react";
import { brosurService } from "@/services/brosurService"; 
import { SearchingBrosur } from "@/Components"; 

export function BrosurKecil(){
    const [brosurList, setBrosurList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await brosurService.getGrid();
                setBrosurList(data);
                setFilteredData(data);
            } catch (error) {
                console.error("Gagal memuat brosur:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!searchTerm) {
                setFilteredData(brosurList);
            } else {
                const lowerTerm = searchTerm.toLowerCase();
                const results = brosurList.filter(item => 
                    (item.nama_mitra && item.nama_mitra.toLowerCase().includes(lowerTerm)) ||
                    (item.kategori && item.kategori.toLowerCase().includes(lowerTerm))
                );
                setFilteredData(results);
            }
        }, 500);
        
        return () => clearTimeout(delayDebounce);

    }, [searchTerm, brosurList]);

    if (loading) return <div className="text-center py-10">Memuat Brosur...</div>;

    return (
        <>
            <div className="mx-17 flex flex-row border-b-2 items-end justify-between">
                <h1 className="font-bold text-3xl">Daftar Brosur</h1>
                <SearchingBrosur value={searchTerm} onChange={setSearchTerm} />
            </div>

            {filteredData.length === 0 ? (
                <div className="h-40 mx-17 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mt-10 bg-gray-50 mb-10 select-none">
                    <p className="text-gray-500 font-medium text-lg">Brosur tidak ditemukan.</p>
                </div>
            ) : (
                <div className="grid my-5 grid-cols-3 gap-5 mx-17 max-h-screen min-h-50 overflow-y-scroll">
                    {filteredData.map((brosur) => (
                        <div
                            key={brosur.id}
                            onClick={() => window.open(brosur.link_tujuan || "#", "_blank")}
                            className="border-2 cursor-pointer relative"
                        >
                            <img
                                src={brosur.gambar_url}
                                alt={`Brosur ${brosur.nama_mitra}`}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <span className="text-white font-semibold px-5 py-2 bg-blue-600/80 rounded-full text-sm backdrop-blur-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                    Kunjungi {brosur.nama_mitra}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}