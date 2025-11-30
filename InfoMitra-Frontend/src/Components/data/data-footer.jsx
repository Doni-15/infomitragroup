export const termsData = [
    {
        id: 'bab1',
        title: '1. Tanggung Jawab Pengguna',
        description: 'Sebagai pengguna Layanan InfoMitra ("Pengguna"), Anda bertanggung jawab penuh atas semua materi, teks, gambar, video, dan informasi lainnya ("Konten") yang Anda unggah, publikasikan, atau tampilkan melalui platform kami. Anda menjamin bahwa Anda memiliki semua hak, lisensi, dan izin yang diperlukan untuk menggunakan dan mendistribusikan Konten tersebut.',
        listItems: []
    },
    {
        id: 'bab2',
        title: '2. Konten yang Dilarang',
        description: 'Anda setuju untuk tidak mengunggah atau mempromosikan Konten yang, menurut kebijakan tunggal kami, termasuk dalam salah satu kategori berikut:',
        listItems: [
            { bold: 'Ujaran Kebencian dan Diskriminasi (SARA):', text: 'Konten yang menyerang, mengancam, merendahkan, atau mendiskriminasi individu atau kelompok berdasarkan suku, agama, ras, etnis, orientasi seksual, identitas gender, disabilitas, atau status lainnya.' },
            { bold: 'Konten Ilegal:', text: 'Konten yang mempromosikan aktivitas ilegal, termasuk namun tidak terbatas pada narkotika, obat-obatan terlarang, barang curian, atau layanan ilegal lainnya' },
            { bold: 'Konten Politik yang Bersifat Menyerang:', text: 'Konten kampanye politik yang mengandung fitnah, serangan pribadi, disinformasi, atau bertujuan untuk memecah belah persatuan dan memprovokasi kebencian.' },
            { bold: 'Pornografi dan Konten Dewasa:', text: 'Konten yang secara eksplisit menggambarkan aktivitas seksual, ketelanjangan, atau materi lain yang dianggap tidak pantas untuk audiens umum.' },
            { bold: 'Penipuan dan Skema Finansial yang Menyesatkan:', text: 'Konten yang mempromosikan skema cepat kaya, money games, penipuan phishing, atau klaim finansial yang tidak realistis dan tidak dapat dibuktikan.' },
            { bold: 'Pelanggaran Hak Kekayaan Intelektual:', text: 'Konten yang melanggar hak cipta, merek dagang, paten, atau rahasia dagang milik pihak ketiga. Anda tidak boleh menggunakan logo, gambar, atau materi orang lain tanpa izin.' },
            { bold: 'Kekerasan dan Konten Sadis:', text: 'Konten yang menggambarkan kekerasan grafis, sadisme, melukai diri sendiri, atau kekejaman terhadap manusia atau hewan.' },
            { bold: 'Informasi Palsu dan Menyesatkan (Hoax):', text: 'Konten yang berisi klaim palsu, teori konspirasi yang tidak berdasar, atau "obat ajaib" yang terbukti tidak ilmiah dan dapat membahayakan publik.' },
            { bold: 'Senjata dan Bahan Berbahaya:', text: 'Konten yang mempromosikan penjualan senjata api, amunisi, bahan peledak, atau zat berbahaya lainnya.' },
        ]
    },
    {
        id: 'bab3',
        title: '3. Hak InfoMitra untuk Meninjau dan Menindak',
        description: 'Kami berhak untuk meninjau Konten apa pun yang diunggah ke platform kami. InfoMitra, atas kebijakan mutlaknya, dapat menolak, menghapus, atau menonaktifkan Konten apa pun yang kami yakini melanggar Syarat dan Ketentuan ini tanpa pemberitahuan sebelumnya.',
        listItems: []
    },
    {
        id: 'bab4',
        title: '4. Sanksi Pelanggaran',
        description: 'Pelanggaran terhadap kebijakan konten ini dapat mengakibatkan tindakan, termasuk namun tidak terbatas pada:',
        listItems: [
            'Peringatan resmi.',
            'Penghapusan Konten yang melanggar.',
            'Penangguhan (suspensi) sementara akun Anda.',
            'Penghentian (terminasi) permanen akun Anda dan pemblokiran akses ke Layanan kami.',
        ]
    }
];


export const privacyData = [
    {
        id: 'bab1',
        title: '1. Pendahuluan',
        description: [
            'Selamat datang di InfoMitra ("kami"). Kebijakan Privasi ini menjelaskan bagaimana InfoMitra, pemilik dan operator InfoMitra, mengumpulkan, menggunakan, membagikan, dan melindungi informasi Anda saat Anda menggunakan platform, situs web, dan layanan kami (secara kolektif disebut "Layanan").',
            'Dengan mendaftar atau menggunakan Layanan kami, Anda mengakui bahwa Anda telah membaca, memahami, dan menyetujui praktik pengumpulan dan penggunaan informasi Anda sebagaimana dijelaskan dalam Kebijakan Privasi ini.'
        ],
        listItems: []
    },
    {
        id: 'bab2',
        title: '2. Informasi yang Kami Kumpulkan',
        description: 'Kami mengumpulkan berbagai jenis informasi untuk menyediakan dan meningkatkan Layanan kami. Jenis informasi tersebut terbagi menjadi:',
        listItems: [],
        subSections: [
            {
                id: 'sub2.1',
                title: '2.1. Informasi yang Kami Kumpulkan',
                description: 'Kami mengumpulkan berbagai jenis informasi untuk menyediakan dan meningkatkan Layanan kami. Jenis informasi tersebut terbagi menjadi:',
                className: 'pt-2 md:pt-3 ml-5 md:ml-6',
                titleClassName: 'md:text-xl font-bold',
                pClassName: 'md:text-lg text-base ml-8 md:ml-10',
                ulClassName: 'list-disc ml-8 md:ml-10 font-normal md:text-lg text-base mt-2 list-inside',
                listItems: [
                    { bold: 'Informasi Akun:', text: ' Saat Anda mendaftar, kami mengumpulkan nama, alamat email, nomor telepon, nama perusahaan, dan kata sandi Anda.' },
                    { bold: 'Informasi Profil:', text: ' Anda dapat menambahkan informasi lebih lanjut pada profil Anda, seperti alamat bisnis dan detail kontak lainnya.' },
                    { bold: 'Informasi Pembayaran:', text: ' Untuk memproses transaksi, kami (atau penyedia layanan pembayaran pihak ketiga kami) dapat mengumpulkan detail pembayaran Anda, seperti informasi kartu kredit atau rekening bank.' },
                    { bold: 'Komunikasi:', text: ' Kami menyimpan catatan komunikasi saat Anda menghubungi kami untuk dukungan pelanggan atau tujuan lain.' },
                ]
            },
            {
                id: 'sub2.2',
                title: '2.2. Informasi yang Kami Kumpulkan Secara Otomatis (Data Pengguna Akhir & Pengguna Platform)',
                description: null,
                className: 'pt-2 md:pt-5 ml-5 md:ml-6',
                titleClassName: 'md:text-xl font-bold flex flex-row',
                pClassName: '',
                ulClassName: 'list-disc ml-8 md:ml-10 font-normal md:text-lg text-base my-2 list-inside',
                listItems: [
                    { bold: 'Data Log dan Perangkat:', text: ' Kami secara otomatis mencatat informasi seperti alamat IP, jenis browser, sistem operasi, ID perangkat, dan halaman yang Anda kunjungi.' },
                    { bold: 'Informasi Cookie dan Teknologi Pelacakan:', text: ' Kami menggunakan cookie, pixel, dan teknologi serupa untuk mengumpulkan informasi tentang interaksi Anda dengan Layanan kami dan iklan yang ditampilkan melalui platform kami.' },
                ]
            }
        ]
    },
    {
        id: 'bab3',
        title: '3. Tujuan Penggunaan Informasi Anda',
        description: 'Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, antara lain:',
        listItems: [
            { bold: 'Menyediakan dan Mengelola Layanan:', text: ' Untuk membuat dan mengelola akun Anda, memproses pembayaran, dan menyediakan fungsionalitas inti dari platform periklanan kami.' },
            { bold: 'Penayangan dan Optimasi Iklan:', text: ' Untuk menayangkan iklan kepada audiens yang relevan, mengukur efektivitas kampanye, dan menyediakan laporan analitik kepada pengiklan.' },
            { bold: 'Personalisasi dan Peningkatan Layanan:', text: ' Untuk memahami bagaimana pengguna berinteraksi dengan platform kami guna meningkatkan fitur, fungsionalitas, dan pengalaman pengguna.' },
            { bold: 'Komunikasi:', text: ' Untuk mengirimkan informasi penting terkait layanan, pembaruan, notifikasi keamanan, dan materi pemasaran (dengan opsi berhenti berlangganan).' },
            { bold: 'Keamanan dan Kepatuhan Hukum:', text: ' Untuk melindungi platform dari penipuan, penyalahgunaan, serta mematuhi kewajiban hukum yang berlaku.' },
        ]
    },
    {
        id: 'bab4',
        title: '4. Bagaimana Kami Membagikan Informasi Anda',
        description: 'Kami tidak menjual informasi pribadi Anda. Kami hanya membagikan informasi Anda kepada pihak ketiga dalam situasi berikut:',
        listItems: [
            { bold: 'Penyedia Layanan:', text: ' Untuk mendukung operasional seperti pemrosesan pembayaran, hosting, dan analisis data. Mereka terikat pada kewajiban kerahasiaan.' },
            { bold: 'Kewajiban Hukum:', text: ' Jika diwajibkan oleh hukum, panggilan pengadilan, atau proses hukum lainnya.' },
            { bold: 'Transfer Bisnis:', text: ' Dalam hal merger, akuisisi, atau penjualan aset, informasi Anda dapat dialihkan.' },
        ]
    },
    {
        id: 'bab5',
        title: '5. Cookie dan Teknologi Pelacakan',
        description: 'Cookie adalah file data kecil yang disimpan di perangkat Anda. Kami menggunakan cookie untuk:',
        listItems: [
            { bold: 'Fungsionalitas Esensial:', text: ' Mengingat status login dan preferensi akun Anda.' },
            { bold: 'Analitik:', text: ' Membantu kami memahami lalu lintas dan pola penggunaan di platform kami.' },
            { bold: 'Periklanan:', text: ' Mengumpulkan data untuk penargetan iklan dan mengukur performa kampanye.' },
        ],
        closingDescription: 'Anda dapat mengontrol atau menolak penggunaan cookie melalui pengaturan browser Anda. Namun, hal ini dapat membatasi fitur tertentu pada Layanan kami.'
    },
    {
        id: 'bab6',
        title: '6. Hak Anda Atas Data Pribadi Anda',
        description: 'Sesuai dengan peraturan yang berlaku, Anda memiliki hak-hak berikut terkait data pribadi Anda:',
        listItems: [
            { bold: 'Hak Akses:', text: ' Meminta salinan informasi pribadi yang kami simpan.' },
            { bold: 'Hak Perbaikan:', text: ' Meminta perbaikan atas data yang tidak akurat.' },
            { bold: 'Hak Penghapusan:', text: ' Meminta penghapusan data dalam kondisi tertentu.' },
            { bold: 'Hak Pembatasan:', text: ' Menolak penggunaan data untuk tujuan pemasaran langsung.' },
        ],
        closingDescription: 'Untuk menggunakan hak-hak ini, silakan hubungi kami melalui kontak yang tersedia di bawah.'
    },
    {
        id: 'bab7',
        title: '7. Keamanan Data',
        description: 'Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi informasi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Ini termasuk penggunaan enkripsi (misalnya, SSL) dan kontrol akses internal. Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.',
        listItems: []
    },
    {
        id: 'bab8',
        title: '8. Privasi Anak',
        description: 'Layanan kami tidak ditujukan untuk individu di bawah usia 18 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak. Jika kami mengetahui bahwa kami telah melakukannya, kami akan mengambil langkah-langkah untuk menghapus informasi tersebut.',
        listItems: []
    },
    {
        id: 'bab9',
        title: '9. Perubahan pada Kebijakan Privasi Ini',
        description: 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan signifikan dengan memposting kebijakan baru di halaman ini dan/atau melalui email. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.',
        listItems: []
    },
];