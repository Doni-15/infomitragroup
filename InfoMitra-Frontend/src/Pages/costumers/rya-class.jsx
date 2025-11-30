import { useState } from "react";
import "../../Components/style-global/RyaClass.css";
import { bannerrya } from "../../assets/banner/index.js";

export function RyaClass() {
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

        <div className="rya-class-page">
            <div className="header">
            <div className="kiri">
                <div className="container-foto">
                <img
                    src={bannerrya}
                    alt="Foto Rya Class"
                    className="foto"
                    onClick={() => bukaGambarBesar(bannerrya)}
                />
                </div>
            </div>

            <div className="kanan">
                <div className="detail-brosur">
                <span className="judul">Bimbingan Belajar RYA CLASS</span>
                <span className="tagline">Belajar Bersama Mas Ripki dan Kawan-kawan</span>
                <span className="deskripsi-singkat">
                    Program bimbingan belajar khusus mahasiswa semester 1 Ilmu Komputer & Informatika.
                </span>

                <ul className="poin-utama">
                    <li>Dasar Pemrograman (Pascal & Python)</li>
                    <li>Logika Matematika</li>
                    <li>Organisasi & Arsitektur Komputer</li>
                    <li>Matematika Dasar (Kalkulus)</li>
                    <li>Pengantar Ilmu Komputer</li>
                    <li>Jasa Pembuatan Desain</li>
                </ul>

                <a
                    href="https://wa.me/6282273875270"
                    target="_blank"
                    className="contact"
                >
                    Hubungi Kami
                </a>
                </div>
            </div>
            </div>

            <div className="main">
            <div className="profil">
                <h2>Tentang Kami</h2>
                <p>
                Kami adalah mahasiswa Ilmu Komputer USU yang menyediakan bimbingan
                belajar untuk membantu adik tingkat memahami materi semester 1
                secara lebih mudah.
                </p>
            </div>

            <div className="fitur">
                <h2>Layanan Kami</h2>
                <ul>
                <li>Belajar Python dari dasar + latihan soal</li>
                <li>Jasa pengerjaan tugas & penjelasan materi</li>
                <li>Mentoring & tips belajar efektif</li>
                <li>Jasa pembuatan desain (poster, logo, brosur)</li>
                </ul>
            </div>

            <div className="harga">
                <h2>Paket & Harga</h2>
                <ul>
                <li>Biaya per modul pembelajaran</li>
                <li>Akses penuh ke semua modul</li>
                <li>Paket tambahan persiapan UTS/UAS</li>
                <li>Paket kelas kelompok</li>
                </ul>
            </div>

            <div className="kontak">
                <h2>Kontak & Pendaftaran</h2>
                <p>WhatsApp:<a href="https://wa.me/6282273875270">+62 822-7387-5270</a></p>
                <p>Lokasi: Medan, Sumatera Utara, FASILKOM - TI USU Gedung D</p>
                <p>Sosial Media: Instagram, TikTok, YouTube</p>
            </div>
            </div>
        </div>
        </div>
    );
}
