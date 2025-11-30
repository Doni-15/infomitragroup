import { GaleriIklan } from "./component/galeri-iklan.jsx";
import { KebijakanPrivasi } from "./component/kebijakan-privasi.jsx";
import { SyaratDanKetentuan } from "./component/syarat-ketentuan.jsx";

import { Beranda } from "./component/beranda.jsx";
import { CaraKerja } from "./component/cara-kerja.jsx";
import { PaketDanHarga } from "./component/paket-dan-harga.jsx";
import { TentangKami } from "./component/tentang-kami.jsx";
import { SignIn } from "./auth/sign-in.jsx";
import { SignUp } from "./auth/sign-up.jsx";

import { KosWanitaAzka } from "./costumers/kos-wanita-azka.jsx";

import NotFound from "../Pages/error-handling/NotFound.jsx";
import ServerError from "../Pages/error-handling/ServerError.jsx";

import AdminDashboard from "./admin/AdminDashboard.jsx";
import { TableVip } from "./admin/components/tabel-vip.jsx";
import { HargaIklan } from "./admin/components/harga-iklan.jsx";
import { TableBiasa } from "./admin/components/tabel-biasa.jsx";
import { UserDetailProfil } from "./component/profil-user.jsx";
import { KomentarUser } from "./admin/components/komentar-user.jsx";
import { RyaClass } from "./costumers/rya-class.jsx";


export {
    GaleriIklan, Beranda,
    KebijakanPrivasi, SyaratDanKetentuan,  CaraKerja, PaketDanHarga,
    TentangKami, KosWanitaAzka, RyaClass,
    SignIn, SignUp,
    NotFound, ServerError, 
    AdminDashboard, TableVip, HargaIklan, TableBiasa, UserDetailProfil, KomentarUser
}
