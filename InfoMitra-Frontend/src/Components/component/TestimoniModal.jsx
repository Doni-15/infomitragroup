import { useState } from 'react';
import { X, MessageSquare, Star, Send, Loader2 } from 'lucide-react';
import { testimoniService } from '@/services/testimoniService';
import toast from 'react-hot-toast';

export default function TestimoniModal({ isOpen, onClose }) {
    const [rating, setRating] = useState(5);
    const [ulasan, setUlasan] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await testimoniService.create({ 
                isi_text: ulasan, 
                rating: rating 
            });
            
            toast.success("Terima kasih! Ulasan Anda berhasil dikirim.");
            
            setUlasan("");
            setRating(5);
            onClose();

        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.msg || "Gagal mengirim ulasan.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                
                <div className="bg-[#0f1c45] p-4 flex justify-between items-center border-b border-blue-900">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <MessageSquare size={20} className="text-yellow-400"/> Bagikan Pengalaman
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24}/>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="text-center">
                        <p className="text-gray-600 text-sm mb-3 font-medium">Seberapa puas Anda dengan layanan kami?</p>
                        
                        <div className="flex justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star} 
                                    type="button" 
                                    onClick={() => setRating(star)} 
                                    className="transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star 
                                        size={32} 
                                        className={`transition-colors duration-200 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-300"}`} 
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-xs font-bold text-blue-600 animate-pulse">
                            {rating === 5 ? "Sangat Puas!" 
                                : rating === 4 ? "Puas" 
                                : rating === 3 ? "Cukup" 
                                : "Kurang"
                            }
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Ceritakan Pengalaman Anda
                        </label>
                        
                        <textarea 
                            required 
                            value={ulasan} 
                            onChange={(e) => setUlasan(e.target.value)}
                            placeholder="Contoh: Layanan sangat cepat, admin ramah..."
                            className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[120px] text-sm resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Kirim Ulasan</>}
                    </button>
                </form>
            </div>
        </div>
    );
}