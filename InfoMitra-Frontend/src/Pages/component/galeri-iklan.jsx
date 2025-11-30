import { sebelum, sesudah } from "@/assets/logo";

import { 
    BrosurVip, BrosurKecil, KomentarBox,
    ScrollToTop, TitlePages
} from "@/Components";

export function GaleriIklan() {
    TitlePages('');
    ScrollToTop();

    return (
        <>
            {/* Main kontent */}
            <div className="main_brosur overflow-x-hidden" id="main_brosur">
                <BrosurVip />
            </div>
            {/* Akhir Main Kontent */}
 
            {/* Brosur kecil */}
            <div>
                <BrosurKecil />
            </div>
            {/* Akhir Brosur kecil */}

            {/* Komentar Pengguna */}
            <div className="bg-[#ececec] py-5">
                <KomentarBox />
            </div>
            {/* Akhir Komentar Pengguna */}
        </>
    );
}