import { useEffect, useRef, useState } from "react";
import { brosurService } from "@/services/brosurService"; 

const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export function BrosurVip() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    const banyakBanner = banners.length;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await brosurService.getVip();
                setBanners(data);
            } catch (error) {
                console.error("Gagal memuat banner VIP:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isHovered || banyakBanner === 0) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % banyakBanner);
        }, 3000);

        return () => clearInterval(interval);
    }, [banyakBanner, isHovered]);

    useEffect(() => {
        if (banyakBanner === 0) return;

        let startX = 0;
        const container = containerRef.current;
        
        const handleTouchStart = (e) => (startX = e.touches[0].clientX);
        const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            if (endX < startX - 50) 
                setActiveIndex((prev) => (prev + 1) % banyakBanner);

            if (endX > startX + 50) 
                setActiveIndex((prev) => (prev - 1 + banyakBanner) % banyakBanner);
        };

        if (container) {
            container.addEventListener("touchstart", handleTouchStart);
            container.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (container) {
                container.removeEventListener("touchstart", handleTouchStart);
                container.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, [banyakBanner]);

    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + banyakBanner) % banyakBanner);
    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % banyakBanner);

    if (loading) return (
        <div className="w-full h-[300px] flex items-center justify-center text-gray-400 bg-[var(--warna-netral-abu)]">
            <div className="animate-pulse">Memuat Brosur VIP...</div>
        </div>
    );
    
    if (banners.length === 0) {
        return (
            <>
                <div className="bg-gray-100 h-70 py-15 mb-10">
                    <div className=" mx-17 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-10 select-none h-full">
                        <p className="text-gray-500 font-medium text-lg">Brosur VIP tidak ditemukan.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="w-full min-h-screnn py-10 overflow-hidden relative group mb-5 bg-[var(--warna-netral-abu)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
        
            <div className="relative w-full max-w-[1200px] mx-auto h-[350px] md:h-[450px] flex items-center justify-center" ref={containerRef}>
                <div
                    className="flex transition-transform duration-700 ease-out h-full items-center"
                    style={{ transform: `translateX(calc(-${activeIndex * 70}% + 15%))` }}
                >
                    {banners.map((banner, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <div
                                key={banner.id}
                                className={`flex-shrink-0 w-[70vw] md:w-[70%] px-4 transition-all duration-700 ease-out 
                                ${isActive ? "scale-100 opacity-100 z-10 blur-0" : "scale-85 opacity-50 blur-[1px] grayscale-[30%]"}`}
                            >
                                <a 
                                    href={banner.link_tujuan || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`block relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer ${isActive ? 'shadow-blue-900/20 pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                    <img
                                        src={banner.gambar_url} 
                                        alt={banner.nama_mitra}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <span className="text-white font-semibold px-5 py-2 bg-blue-600/80 rounded-full text-sm backdrop-blur-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            Kunjungi {banner.nama_mitra}
                                        </span>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {banyakBanner > 1 && (
                <>
                    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none">
                        <button
                            onClick={prevSlide}
                            className="pointer-events-auto bg-white/80 hover:bg-white text-blue-950 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50"
                        >
                            <ArrowLeft />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="pointer-events-auto bg-white/80 hover:bg-white text-blue-950 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50"
                        >
                            <ArrowRight />
                        </button>
                    </div>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                        {banners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`transition-all duration-300 rounded-full shadow-sm border border-white/20
                                ${activeIndex === idx ? 
                                    "w-8 h-2 bg-blue-950" : 
                                    "w-2 h-2 bg-gray-200 hover:bg-blue-400"}`
                                }
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}