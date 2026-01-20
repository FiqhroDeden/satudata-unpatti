// Mock Data untuk Data Warehouse UNPATTI

// Fakultas
export const fakultas = [
  { id: 'fkip', nama: 'FKIP', namaLengkap: 'Fakultas Keguruan dan Ilmu Pendidikan' },
  { id: 'feb', nama: 'FEB', namaLengkap: 'Fakultas Ekonomi dan Bisnis' },
  { id: 'ft', nama: 'FT', namaLengkap: 'Fakultas Teknik' },
  { id: 'fmipa', nama: 'FMIPA', namaLengkap: 'Fakultas Matematika dan IPA' },
  { id: 'fh', nama: 'FH', namaLengkap: 'Fakultas Hukum' },
  { id: 'fisip', nama: 'FISIP', namaLengkap: 'Fakultas Ilmu Sosial dan Politik' },
  { id: 'fp', nama: 'FP', namaLengkap: 'Fakultas Pertanian' },
  { id: 'fpik', nama: 'FPIK', namaLengkap: 'Fakultas Perikanan dan Ilmu Kelautan' },
  { id: 'fk', nama: 'FK', namaLengkap: 'Fakultas Kedokteran' },
];

// Tahun Akademik
export const tahunAkademik = [
  { id: '2022-1', tahun: '2022/2023', semester: 'Ganjil' },
  { id: '2022-2', tahun: '2022/2023', semester: 'Genap' },
  { id: '2023-1', tahun: '2023/2024', semester: 'Ganjil' },
  { id: '2023-2', tahun: '2023/2024', semester: 'Genap' },
  { id: '2024-1', tahun: '2024/2025', semester: 'Ganjil' },
  { id: '2024-2', tahun: '2024/2025', semester: 'Genap' },
];

// Statistik Ringkas
export const statistikRingkas = {
  totalMahasiswa: 28547,
  mahasiswaAktif: 24892,
  totalDosen: 1247,
  totalTenagaKependidikan: 892,
  jumlahProdi: 78,
  jumlahFakultas: 9,
  tahunAkademikAktif: '2024/2025',
  semesterAktif: 'Ganjil',
  lastUpdate: '2025-01-20T08:30:00',
};

// Data Trend Mahasiswa per Semester
export const trendMahasiswa = [
  { semester: '2022 Ganjil', aktif: 22450, baru: 4200, lulus: 3100 },
  { semester: '2022 Genap', aktif: 23100, baru: 850, lulus: 2800 },
  { semester: '2023 Ganjil', aktif: 24200, baru: 4500, lulus: 3200 },
  { semester: '2023 Genap', aktif: 24800, baru: 900, lulus: 2900 },
  { semester: '2024 Ganjil', aktif: 25600, baru: 4800, lulus: 3400 },
  { semester: '2024 Genap', aktif: 24892, baru: 780, lulus: 3100 },
];

// Distribusi Mahasiswa per Fakultas
export const distribusiMahasiswaFakultas = [
  { fakultas: 'FKIP', mahasiswa: 5420, persentase: 21.8 },
  { fakultas: 'FEB', mahasiswa: 4180, persentase: 16.8 },
  { fakultas: 'FT', mahasiswa: 3250, persentase: 13.1 },
  { fakultas: 'FMIPA', mahasiswa: 2890, persentase: 11.6 },
  { fakultas: 'FH', mahasiswa: 2340, persentase: 9.4 },
  { fakultas: 'FISIP', mahasiswa: 2180, persentase: 8.8 },
  { fakultas: 'FP', mahasiswa: 1920, persentase: 7.7 },
  { fakultas: 'FPIK', mahasiswa: 1580, persentase: 6.3 },
  { fakultas: 'FK', mahasiswa: 1132, persentase: 4.5 },
];

// Distribusi IPK
export const distribusiIPK = [
  { range: '0.00 - 1.00', jumlah: 120 },
  { range: '1.01 - 1.50', jumlah: 280 },
  { range: '1.51 - 2.00', jumlah: 890 },
  { range: '2.01 - 2.50', jumlah: 3420 },
  { range: '2.51 - 3.00', jumlah: 6580 },
  { range: '3.01 - 3.50', jumlah: 8920 },
  { range: '3.51 - 4.00', jumlah: 4682 },
];

// Tingkat Kelulusan
export const tingkatKelulusan = [
  { tahun: '2020', tepatWaktu: 68, terlambat: 24, dropout: 8 },
  { tahun: '2021', tepatWaktu: 71, terlambat: 22, dropout: 7 },
  { tahun: '2022', tepatWaktu: 74, terlambat: 20, dropout: 6 },
  { tahun: '2023', tepatWaktu: 76, terlambat: 19, dropout: 5 },
  { tahun: '2024', tepatWaktu: 78, terlambat: 18, dropout: 4 },
];

// Kehadiran Mahasiswa
export const kehadiranMahasiswa = {
  rataRata: 87.5,
  perFakultas: [
    { fakultas: 'FKIP', kehadiran: 89.2 },
    { fakultas: 'FEB', kehadiran: 86.8 },
    { fakultas: 'FT', kehadiran: 88.5 },
    { fakultas: 'FMIPA', kehadiran: 90.1 },
    { fakultas: 'FH', kehadiran: 85.4 },
    { fakultas: 'FISIP', kehadiran: 84.9 },
    { fakultas: 'FP', kehadiran: 87.3 },
    { fakultas: 'FPIK', kehadiran: 86.2 },
    { fakultas: 'FK', kehadiran: 92.8 },
  ],
};

// Data SDM (SIMPEG)
export const distribusiDosenPendidikan = [
  { pendidikan: 'S3 (Doktor)', jumlah: 287, persentase: 23.0 },
  { pendidikan: 'S2 (Magister)', jumlah: 842, persentase: 67.5 },
  { pendidikan: 'S1 (Sarjana)', jumlah: 118, persentase: 9.5 },
];

export const distribusiStafPosisi = [
  { posisi: 'Administrasi', jumlah: 342 },
  { posisi: 'Teknisi', jumlah: 156 },
  { posisi: 'Pustakawan', jumlah: 48 },
  { posisi: 'Laboran', jumlah: 89 },
  { posisi: 'Satpam', jumlah: 124 },
  { posisi: 'Kebersihan', jumlah: 87 },
  { posisi: 'Driver', jumlah: 46 },
];

export const distribusiUsia = [
  { kelompok: '< 30 tahun', pria: 145, wanita: 178 },
  { kelompok: '30-40 tahun', pria: 312, wanita: 289 },
  { kelompok: '41-50 tahun', pria: 278, wanita: 234 },
  { kelompok: '51-60 tahun', pria: 198, wanita: 167 },
  { kelompok: '> 60 tahun', pria: 89, wanita: 49 },
];

export const rasioDosenMahasiswa = [
  { fakultas: 'FKIP', dosen: 245, mahasiswa: 5420, rasio: '1:22' },
  { fakultas: 'FEB', dosen: 156, mahasiswa: 4180, rasio: '1:27' },
  { fakultas: 'FT', dosen: 178, mahasiswa: 3250, rasio: '1:18' },
  { fakultas: 'FMIPA', dosen: 189, mahasiswa: 2890, rasio: '1:15' },
  { fakultas: 'FH', dosen: 87, mahasiswa: 2340, rasio: '1:27' },
  { fakultas: 'FISIP', dosen: 92, mahasiswa: 2180, rasio: '1:24' },
  { fakultas: 'FP', dosen: 124, mahasiswa: 1920, rasio: '1:15' },
  { fakultas: 'FPIK', dosen: 98, mahasiswa: 1580, rasio: '1:16' },
  { fakultas: 'FK', dosen: 78, mahasiswa: 1132, rasio: '1:15' },
];

export const trendPegawai = [
  { tahun: '2020', dosen: 1089, staf: 745 },
  { tahun: '2021', dosen: 1124, staf: 782 },
  { tahun: '2022', dosen: 1178, staf: 834 },
  { tahun: '2023', dosen: 1215, staf: 867 },
  { tahun: '2024', dosen: 1247, staf: 892 },
];

// Data Keuangan (SIMKEU)
export const anggaranPerUnit = [
  { unit: 'FKIP', anggaran: 28500000000, realisasi: 24820000000 },
  { unit: 'FEB', anggaran: 22400000000, realisasi: 19560000000 },
  { unit: 'FT', anggaran: 31200000000, realisasi: 27890000000 },
  { unit: 'FMIPA', anggaran: 26800000000, realisasi: 23450000000 },
  { unit: 'FH', anggaran: 15600000000, realisasi: 13240000000 },
  { unit: 'FISIP', anggaran: 14200000000, realisasi: 12180000000 },
  { unit: 'FP', anggaran: 19800000000, realisasi: 17650000000 },
  { unit: 'FPIK', anggaran: 21400000000, realisasi: 18920000000 },
  { unit: 'FK', anggaran: 35800000000, realisasi: 32140000000 },
  { unit: 'Rektorat', anggaran: 45000000000, realisasi: 38750000000 },
];

export const pendapatanPengeluaran = [
  { bulan: 'Jan', pendapatan: 42500, pengeluaran: 38200 },
  { bulan: 'Feb', pendapatan: 38900, pengeluaran: 35600 },
  { bulan: 'Mar', pendapatan: 45200, pengeluaran: 41800 },
  { bulan: 'Apr', pendapatan: 41300, pengeluaran: 39100 },
  { bulan: 'Mei', pendapatan: 39800, pengeluaran: 36500 },
  { bulan: 'Jun', pendapatan: 52400, pengeluaran: 48200 },
  { bulan: 'Jul', pendapatan: 38200, pengeluaran: 34800 },
  { bulan: 'Agu', pendapatan: 56800, pengeluaran: 42100 },
  { bulan: 'Sep', pendapatan: 48500, pengeluaran: 44200 },
  { bulan: 'Okt', pendapatan: 43200, pengeluaran: 39800 },
  { bulan: 'Nov', pendapatan: 41800, pengeluaran: 38500 },
  { bulan: 'Des', pendapatan: 47600, pengeluaran: 52400 },
];

export const kategoriPengeluaran = [
  { kategori: 'Gaji & Tunjangan', jumlah: 185400000000, persentase: 45.2 },
  { kategori: 'Operasional', jumlah: 82300000000, persentase: 20.1 },
  { kategori: 'Pemeliharaan', jumlah: 45600000000, persentase: 11.1 },
  { kategori: 'Penelitian', jumlah: 38200000000, persentase: 9.3 },
  { kategori: 'Pengabdian', jumlah: 24800000000, persentase: 6.1 },
  { kategori: 'Kemahasiswaan', jumlah: 18500000000, persentase: 4.5 },
  { kategori: 'Lainnya', jumlah: 15200000000, persentase: 3.7 },
];

export const statusPembayaranUKT = [
  { status: 'Lunas', jumlah: 21450, persentase: 86.2 },
  { status: 'Cicilan', jumlah: 2340, persentase: 9.4 },
  { status: 'Belum Bayar', jumlah: 1102, persentase: 4.4 },
];

// Data Perpustakaan (SIMPUS)
export const koleksiBuku = [
  { kategori: 'Teknik', jumlah: 12450 },
  { kategori: 'Ekonomi', jumlah: 9870 },
  { kategori: 'Sosial', jumlah: 8540 },
  { kategori: 'Sains', jumlah: 11230 },
  { kategori: 'Pendidikan', jumlah: 14680 },
  { kategori: 'Hukum', jumlah: 6780 },
  { kategori: 'Kedokteran', jumlah: 8920 },
  { kategori: 'Pertanian', jumlah: 5430 },
  { kategori: 'Umum', jumlah: 7650 },
];

export const trendPeminjaman = [
  { bulan: 'Jan', peminjaman: 2340, pengembalian: 2180 },
  { bulan: 'Feb', peminjaman: 2560, pengembalian: 2420 },
  { bulan: 'Mar', peminjaman: 3120, pengembalian: 2890 },
  { bulan: 'Apr', peminjaman: 2890, pengembalian: 2780 },
  { bulan: 'Mei', peminjaman: 2450, pengembalian: 2340 },
  { bulan: 'Jun', peminjaman: 1890, pengembalian: 2120 },
  { bulan: 'Jul', peminjaman: 1240, pengembalian: 1450 },
  { bulan: 'Agu', peminjaman: 1680, pengembalian: 1420 },
  { bulan: 'Sep', peminjaman: 3450, pengembalian: 2890 },
  { bulan: 'Okt', peminjaman: 3280, pengembalian: 3120 },
  { bulan: 'Nov', peminjaman: 2980, pengembalian: 2850 },
  { bulan: 'Des', peminjaman: 2120, pengembalian: 2540 },
];

export const bukuTerpopuler = [
  { judul: 'Pengantar Ilmu Ekonomi', penulis: 'Dr. Ahmad Suryadi', peminjaman: 342 },
  { judul: 'Dasar-dasar Pemrograman', penulis: 'Prof. Budi Santoso', peminjaman: 298 },
  { judul: 'Metodologi Penelitian', penulis: 'Dr. Siti Aminah', peminjaman: 276 },
  { judul: 'Hukum Perdata Indonesia', penulis: 'Prof. Hartono', peminjaman: 254 },
  { judul: 'Fisika Dasar', penulis: 'Dr. Wahyu Pratama', peminjaman: 231 },
  { judul: 'Kalkulus Lanjut', penulis: 'Prof. Susanto', peminjaman: 218 },
  { judul: 'Anatomi Manusia', penulis: 'Dr. Dewi Sartika', peminjaman: 205 },
  { judul: 'Kimia Organik', penulis: 'Prof. Rahman', peminjaman: 189 },
  { judul: 'Manajemen Keuangan', penulis: 'Dr. Andi Wijaya', peminjaman: 178 },
  { judul: 'Psikologi Pendidikan', penulis: 'Dr. Maya Putri', peminjaman: 165 },
];

export const statistikPerpustakaan = {
  totalKoleksi: 85550,
  koleksiFisik: 72340,
  koleksiDigital: 13210,
  anggotaAktif: 18450,
  anggotaTidakAktif: 10097,
  rataRataPeminjaman: 2650,
};

// Data Kemahasiswaan (SIMAWA)
export const organisasiMahasiswa = [
  { nama: 'BEM Universitas', anggota: 156, status: 'Aktif' },
  { nama: 'DPM Universitas', anggota: 45, status: 'Aktif' },
  { nama: 'UKM Olahraga', anggota: 342, status: 'Aktif' },
  { nama: 'UKM Seni', anggota: 234, status: 'Aktif' },
  { nama: 'UKM Kerohanian', anggota: 189, status: 'Aktif' },
  { nama: 'UKM Pecinta Alam', anggota: 167, status: 'Aktif' },
  { nama: 'UKM Jurnalistik', anggota: 78, status: 'Aktif' },
  { nama: 'Himpunan Mahasiswa Prodi', anggota: 1890, status: 'Aktif' },
];

export const distribusiBeasiswa = [
  { jenis: 'Bidikmisi/KIP-K', penerima: 3420, persentase: 42.8 },
  { jenis: 'PPA', penerima: 1890, persentase: 23.7 },
  { jenis: 'BBM', penerima: 1240, persentase: 15.5 },
  { jenis: 'Daerah', penerima: 890, persentase: 11.1 },
  { jenis: 'Swasta', penerima: 550, persentase: 6.9 },
];

export const prestasiMahasiswa = [
  { kategori: 'Akademik', emas: 12, perak: 24, perunggu: 38 },
  { kategori: 'Olahraga', emas: 8, perak: 15, perunggu: 22 },
  { kategori: 'Seni', emas: 5, perak: 11, perunggu: 18 },
  { kategori: 'Kewirausahaan', emas: 3, perak: 8, perunggu: 12 },
  { kategori: 'PKM', emas: 6, perak: 14, perunggu: 21 },
];

// ETL Status
export const etlStatus = [
  { 
    sistem: 'SIAKAD', 
    lastRun: '2025-01-20T06:00:00', 
    status: 'success', 
    recordsProcessed: 45780,
    duration: '12m 34s',
    nextRun: '2025-01-20T18:00:00'
  },
  { 
    sistem: 'SIMPEG', 
    lastRun: '2025-01-20T06:15:00', 
    status: 'success', 
    recordsProcessed: 2139,
    duration: '3m 21s',
    nextRun: '2025-01-20T18:15:00'
  },
  { 
    sistem: 'SIMKEU', 
    lastRun: '2025-01-20T06:20:00', 
    status: 'success', 
    recordsProcessed: 12450,
    duration: '5m 45s',
    nextRun: '2025-01-20T18:20:00'
  },
  { 
    sistem: 'SIMPUS', 
    lastRun: '2025-01-20T06:25:00', 
    status: 'warning', 
    recordsProcessed: 8920,
    duration: '4m 12s',
    nextRun: '2025-01-20T18:25:00'
  },
  { 
    sistem: 'SIMAWA', 
    lastRun: '2025-01-20T06:30:00', 
    status: 'success', 
    recordsProcessed: 6780,
    duration: '2m 56s',
    nextRun: '2025-01-20T18:30:00'
  },
  { 
    sistem: 'E-Learning', 
    lastRun: '2025-01-19T23:45:00', 
    status: 'failed', 
    recordsProcessed: 0,
    duration: '-',
    nextRun: '2025-01-20T11:45:00'
  },
];

// Format Rupiah
export const formatRupiah = (angka: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

// Format Angka
export const formatAngka = (angka: number): string => {
  return new Intl.NumberFormat('id-ID').format(angka);
};

// Format Tanggal
export const formatTanggal = (tanggal: string): string => {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
