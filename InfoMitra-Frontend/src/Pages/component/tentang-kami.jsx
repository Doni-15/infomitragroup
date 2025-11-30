import { 
    TitlePages, ScrollToTop,
    HeroSection, NilaiNilai,
    containerVariants, itemVariants
} from "@/Components";

import { motion } from 'framer-motion';

export function TentangKami(){
    TitlePages("Tentang Kami | ");
    ScrollToTop();

    return(
        <>
            <HeroSection beranda={false} />
            <NilaiNilai />
            <TujuanKami />
        </>
    );
}

const isiTujuan = [
    {
        id : 1,
        judul : "Tujuan kami",
        isi : "Kami percaya pada kekuatan transformatif dari teknologi dan ingin memberdayakan setiap bisnis untuk berkembang dengan menyediakan platform untuk menghubungkan pesan dan produk mereka dengan komunitas audiens yang tepat."
    },
    {
        id : 2,
        judul : "Posisi Kami",
        isi : "Untuk semua skala bisnis di seluruh Indonesia, InfoMitra menawarkan solusi periklanan digital yang menyeluruh, dari kemudahan dalam pembuatan kampanye, sampai ke teknologi penargetan audiens yang akurat, dan laporan performa yang transparan untuk mendukung pertumbuhan bisnis tanpa henti."
    }
]

export const TujuanKami = () => {
    return(
        <>
            <motion.section className="flex flex-wrap md:flex-nowrap px-3 md:px-10 pb-26 bg-[#ececec] justify-center gap-10 md:gap-x-10" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {isiTujuan.map((item) => (
                    <motion.div key={item.id} className="w-full md:w-1/2 p-2 bg-white md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-justify md:text-center rounded-lg" variants={itemVariants}>
                        <h1 className="text-center font-bold md:text-2xl text-xl mb-2 mt-0">{item.judul}</h1>
                        <p className="text-base md:text-lg">{item.isi}</p>
                    </motion.div>
                ))}
            </motion.section>
        </>
    );
};