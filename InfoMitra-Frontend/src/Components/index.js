import { coreValuesData, faqData, heroDescription} from "./data/data-beranda.jsx";
import { containerVariants, itemVariants } from './data/data-animasi.jsx';
import { caraKerjaData } from "./data/data-cara-kerja.jsx";
import { privacyData } from './data/data-footer.jsx';
import { termsData } from "./data/data-footer.jsx";
import { footerLink1, footerLink2, contactInfo } from './data/data-link-footer.jsx';


// Export data 
export {
    coreValuesData, faqData, heroDescription,
    containerVariants, itemVariants, caraKerjaData,
    privacyData, termsData,
    footerLink1, footerLink2, contactInfo
}

// Export component
import { ScrollToTop } from "./component/scroll-top.jsx";
import { TitlePages } from "./component/title-pages.jsx";

import { BrosurVip } from "./component/vip-brosur.jsx";
import { BrosurKecil } from "./component/brosur-kecil.jsx";
import { KomentarBox } from "./component/komentar-box.jsx";
import { LogoUsaha, LaptopNavigasi, MobileMenu, LogIn, UserProfile } from './component/component-kecil-header.jsx';

import { Header } from "./component/header.jsx"
import { MainLayout } from "./component/main-layout.jsx"
import { Footer } from "./component/footer.jsx"

import { CaraKerja } from '../Pages/component/cara-kerja.jsx';

import { PricingCard } from './component/PricingCard';
import { PlanDetails } from './component/PlanDetails';
import { HeroSection, NilaiNilai } from "./component/hero-section.jsx";
import { SearchingBrosur } from "./component/search-kategori.jsx";
import { InputBox } from "./component/form-input.jsx";
import { SideBarAunt } from "./component/sidebar-auth.jsx";

import GuestRoute from "./protected/GuestRoute.jsx";
import AdminRoute from "./protected/AdminRoute.jsx";
import ProtectedRoute from "./protected/UserRoute.jsx";
import TestimoniModal from "./component/TestimoniModal.jsx";

export {
    ScrollToTop, TitlePages, CaraKerja,
    BrosurVip, BrosurKecil, KomentarBox,
    LogoUsaha, LaptopNavigasi, MobileMenu,
    Header, MainLayout, Footer,
    PricingCard, PlanDetails, 
    HeroSection, NilaiNilai, SearchingBrosur, LogIn, UserProfile,
    InputBox, SideBarAunt, GuestRoute, AdminRoute, ProtectedRoute,
    TestimoniModal
    
}