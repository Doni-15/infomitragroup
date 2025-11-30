import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import api from "@/config/api"; 
import { authService } from "@/services/authService";

import { 
  MainLayout, GuestRoute, AdminRoute, ProtectedRoute
} from '@/Components';

import { 
  GaleriIklan, Beranda, PaketDanHarga, RyaClass,
  KebijakanPrivasi, SyaratDanKetentuan, CaraKerja, TentangKami,
  KosWanitaAzka, SignIn, SignUp, NotFound, ServerError,
  AdminDashboard, TableVip, HargaIklan, TableBiasa, UserDetailProfil, KomentarUser
} from '@/Pages';

function AnimatedRoutes({ user, setUser, loading }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/Pages" element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="galeri-iklan" element={<GaleriIklan />} />
          <Route path="beranda" element={<Beranda />} />
          <Route path="cara-kerja" element={<CaraKerja pages={true} />} />
          <Route path="paket-dan-harga" element={<PaketDanHarga />} />
          <Route path="tentang-kami" element={<TentangKami />} />
          <Route path="kebijakan-privasi" element={<KebijakanPrivasi />} />
          <Route path="syarat-dan-ketentuan" element={<SyaratDanKetentuan />} />
          
          <Route index element={<Navigate to="/Pages/galeri-iklan" />} />
        </Route>

        <Route path="/mitra" element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="kos-azka" element={<KosWanitaAzka />} />
          <Route path="rya-class" element={<RyaClass />} />
          <Route index element={<Navigate to="/mitra/kos-azka" />} />
        </Route>

        <Route path="/mitra/user-profil" element={
          <ProtectedRoute user={user} loading={loading}>
            <UserDetailProfil user={user} setUser={setUser} />
          </ProtectedRoute>
        }/> 
        
        <Route 
          path="/admin" 
          element={
            <AdminRoute user={user} loading={loading}>
              <AdminDashboard user={user} setUser={setUser} />
            </AdminRoute>
        }>
          <Route path="brosur-mitra-vip" element={<TableVip />} />
          <Route path="brosur-mitra-biasa" element={<TableBiasa />} />
          <Route path="harga-iklan" element={<HargaIklan />} />
          <Route path="komentar-user" element={<KomentarUser />} />
          <Route index element={<Navigate to="/admin/brosur-mitra-vip" />} />
        </Route>

        <Route path="/auth/sign-in" element={
          <GuestRoute user={user} loading={loading}>
            <SignIn setUser={setUser} />
          </GuestRoute>
        } />
        
        <Route path="/auth/sign-up" element={
          <GuestRoute user={user} loading={loading}>
            <SignUp />
          </GuestRoute>
        } />

        <Route path="/unauthorized" element={<NotFound />} />
        
        <Route path="/" element={<Navigate to="/Pages/galeri-iklan" replace />} />
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />
      
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        await api.get('/brosur/vip'); 
      } 
      catch (error) {
        if (!error.response) {
          setIsServerError(true);
        } 
        else if (error.response.status >= 500) {
          setIsServerError(true);
        }
      } 
      finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  if (isServerError) {
    return <ServerError />;
  }

  return (
    <Router> 
      <Toaster position="top-center" reverseOrder={false} />
      <AnimatedRoutes user={user} setUser={setUser} loading={loading} />
    </Router>
  );
}