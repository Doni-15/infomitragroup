import { useState } from "react";
import "../../Components/style-global/KosWanitaAzka.css";
import { fotoTeras, fotoRumah, fotoRumah1, fotoKamar } from "@/assets/KosWanitaAzka";

export function KosWanitaAzka() {
  const [gambarBesar, setGambarBesar] = useState(null);

  const bukaGambarBesar = (img) => {
    setGambarBesar(img);
  };

  const tutupGambarBesar = () => {
    setGambarBesar(null);
  };

  return (
    <div>

      {
        gambarBesar
          ? (
            <div className="gambar-besar-bg" onClick={tutupGambarBesar}>
              <img src={gambarBesar} alt="Zoom" className="gambar-besar" />
            </div>
          )
          : null
      }

      <div className="kos-wanita-azka-page">
        <div className="header">
          <div className="kiri">
            <div className="container-foto">
              <img
                src={fotoRumah}
                alt="Foto Utama Kos"
                className="foto"
                onClick={() => bukaGambarBesar(fotoRumah)}
              />
            </div>
          </div>

          <div className="kanan">
            <div className="detail-brosur">
              <span className="judul">Kos Wanita Azka</span>
              <span className="tagline">Nyaman, Aman, Murah</span>

              <span className="deskripsi-singkat">
                Kos Wanita untuk mahasiswa dan pekerja dengan fasilitas lengkap
                serta suasana tenang di pusat kota.
              </span>

              <ul className="poin-utama">
                <li>Kamar luas dan bersih</li>
                <li>Wi-Fi cepat dan gratis</li>
                <li>Dapur dan area jemur bersama</li>
                <li>Parkiran motor & CCTV 24 jam</li>
                <li>Lokasi Strategis</li>
              </ul>

              <a href="https://wa.me/628126522375" target="_blank" className="contact">
                Hubungi Pemilik
              </a>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="baris-1">
            <div className="card">
              <h2>Tentang Kos</h2>
              <p>Kos Wanita Azka menyediakan lingkungan yang nyaman dan tenang.</p>
              <br />
              <p>Lokasi strategis dekat kampus, minimarket, SPBU, dan 50 meter dari jalan besar.</p>
            </div>

            <div className="card">
              <h2>Fasilitas</h2>
              <ul>
                <li>Kasur, lemari</li>
                <li>Kamar mandi dalam</li>
                <li>Wi-Fi gratis</li>
                <li>Area parkir & CCTV</li>
              </ul>
            </div>

            <div className="card">
              <h2>Harga Sewa</h2>
              <ul>
                <li>Kamar Mandi luar : Rp450.000/bulan</li>
                <li>Kamar Mandi dalam: Rp600.000/bulan</li>
                <li>Sudah termasuk listrik dan air</li>
                <li>Diskon khusus untuk sewa tahunan</li>
              </ul>
            </div>
          </div>

          <div className="baris-2">
            <h2>Galeri Kos</h2>
            <div className="foto-galeri">
              <img src={fotoRumah1} alt="Foto Kos 1" onClick={() => bukaGambarBesar(fotoRumah1)} />
              <img src={fotoKamar} alt="Foto Kos 2" onClick={() => bukaGambarBesar(fotoKamar)} />
              <img src={fotoTeras} alt="Foto Kos 3" onClick={() => bukaGambarBesar(fotoTeras)} />
            </div>
          </div>

          <div className="baris-3">
            <h2>Kontak & Lokasi</h2>
            <p>WhatsApp: <a href="https://wa.me/628126522375">+62 812-6522-375</a></p>
            <p>Alamat: Jl. Jamin Ginting GG Nangka I, Medan</p>
            <p>Dekat dengan kampus, minimarket, dan halte bus</p>
          </div>
        </div>
      </div>
    </div>
  );
}
