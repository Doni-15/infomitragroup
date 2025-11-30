import { useState, useEffect } from "react";
import { testimoniService } from "@/services/testimoniService"; 
import { Star, User, Quote, Loader2 } from "lucide-react";

export function KomentarBox() {
    const [testimonis, setTestimonis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonis = async () => {
            try {
                const data = await testimoniService.getPublic(); 
                setTestimonis(data);
            } 
            catch (error) {
            } 
            finally {
                setLoading(false);
            }
        };
        fetchTestimonis();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="w-full px-4 md:px-12 lg:px-20 py-12 bg-gray-50/50">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Apa Kata Mitra Kami?</h2>
                <p className="text-gray-500 mt-2 text-sm">Pengalaman asli dari para pengusaha yang telah bergabung.</p>
                <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
            ) : testimonis.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-400">Belum ada ulasan. Jadilah yang pertama!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {testimonis.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                        >
                            <Quote className="absolute top-4 right-4 text-blue-50/80 rotate-180" size={60} />
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                                    {item.nama ? item.nama.charAt(0).toUpperCase() : <User size={16}/>}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.nama}</h4>
                                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                                        {item.user_role === 'mitra' ? 'MITRA RESMI' : 'USER'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <div className="flex mb-3">{renderStars(item.rating)}</div>
                                <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-4">
                                    "{item.isi_text}"
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                                <span>Diposting pada</span>
                                <span>{formatDate(item.created_at)}</span>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}