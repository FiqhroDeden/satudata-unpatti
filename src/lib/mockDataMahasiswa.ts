// Mock Data Detail Mahasiswa

export interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  foto: string;
  email: string;
  telepon: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'L' | 'P';
  agama: string;
  alamat: string;
  kota: string;
  provinsi: string;
  kodePos: string;
  fakultas: string;
  prodi: string;
  angkatan: number;
  semester: number;
  status: 'Aktif' | 'Cuti' | 'Lulus' | 'Drop Out';
  jalurMasuk: string;
  dosenWali: string;
  nidnDosenWali: string;
  ipk: number;
  totalSks: number;
  sksLulus: number;
  beasiswa?: string;
}

export interface NilaiMataKuliah {
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  tahunAkademik: string;
  nilai: string;
  angkaMutu: number;
  status: 'Lulus' | 'Tidak Lulus' | 'Sedang Diambil';
}

export interface RiwayatAkademik {
  semester: number;
  tahunAkademik: string;
  sksAmbil: number;
  sksLulus: number;
  ips: number;
  ipk: number;
}

export interface Kehadiran {
  mataKuliah: string;
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  persentase: number;
}

export interface Aktivitas {
  tanggal: string;
  jenis: 'Akademik' | 'Organisasi' | 'Prestasi' | 'Perpustakaan';
  deskripsi: string;
}

// Sample mahasiswa data
export const daftarMahasiswa: Mahasiswa[] = [
  {
    id: '1',
    nim: '2021710001',
    nama: 'Muhammad Rizky Pratama',
    foto: '/placeholder.svg',
    email: 'rizky.pratama@student.unpatti.ac.id',
    telepon: '081234567890',
    tempatLahir: 'Ambon',
    tanggalLahir: '2003-05-15',
    jenisKelamin: 'L',
    agama: 'Islam',
    alamat: 'Jl. Dr. Kayadoe No. 45',
    kota: 'Ambon',
    provinsi: 'Maluku',
    kodePos: '97128',
    fakultas: 'Fakultas Teknik',
    prodi: 'Teknik Informatika',
    angkatan: 2021,
    semester: 7,
    status: 'Aktif',
    jalurMasuk: 'SNMPTN',
    dosenWali: 'Dr. Ir. Ahmad Latupeirissa, M.T.',
    nidnDosenWali: '0012057801',
    ipk: 3.67,
    totalSks: 144,
    sksLulus: 124,
    beasiswa: 'KIP-Kuliah'
  },
  {
    id: '2',
    nim: '2021720015',
    nama: 'Sarah Amelia Putri',
    foto: '/placeholder.svg',
    email: 'sarah.amelia@student.unpatti.ac.id',
    telepon: '082198765432',
    tempatLahir: 'Masohi',
    tanggalLahir: '2002-11-22',
    jenisKelamin: 'P',
    agama: 'Kristen',
    alamat: 'Jl. Pattimura No. 78',
    kota: 'Ambon',
    provinsi: 'Maluku',
    kodePos: '97124',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    prodi: 'Akuntansi',
    angkatan: 2021,
    semester: 7,
    status: 'Aktif',
    jalurMasuk: 'SBMPTN',
    dosenWali: 'Dr. Christina Leuwol, S.E., M.Si.',
    nidnDosenWali: '0015068502',
    ipk: 3.82,
    totalSks: 144,
    sksLulus: 128,
    beasiswa: 'PPA'
  },
  {
    id: '3',
    nim: '2020730042',
    nama: 'Yohannes Waileruny',
    foto: '/placeholder.svg',
    email: 'yohannes.w@student.unpatti.ac.id',
    telepon: '085312345678',
    tempatLahir: 'Tual',
    tanggalLahir: '2001-08-10',
    jenisKelamin: 'L',
    agama: 'Katolik',
    alamat: 'Jl. A.M. Sangaji No. 12',
    kota: 'Ambon',
    provinsi: 'Maluku',
    kodePos: '97127',
    fakultas: 'Fakultas Hukum',
    prodi: 'Ilmu Hukum',
    angkatan: 2020,
    semester: 9,
    status: 'Aktif',
    jalurMasuk: 'Mandiri',
    dosenWali: 'Prof. Dr. Hendrik Salmon, S.H., M.H.',
    nidnDosenWali: '0008076301',
    ipk: 3.45,
    totalSks: 144,
    sksLulus: 140
  },
  {
    id: '4',
    nim: '2022740028',
    nama: 'Fatimah Zahra',
    foto: '/placeholder.svg',
    email: 'fatimah.z@student.unpatti.ac.id',
    telepon: '087854321098',
    tempatLahir: 'Namlea',
    tanggalLahir: '2004-02-28',
    jenisKelamin: 'P',
    agama: 'Islam',
    alamat: 'Jl. Rijali No. 56',
    kota: 'Ambon',
    provinsi: 'Maluku',
    kodePos: '97126',
    fakultas: 'Fakultas Kedokteran',
    prodi: 'Pendidikan Dokter',
    angkatan: 2022,
    semester: 5,
    status: 'Aktif',
    jalurMasuk: 'SNMPTN',
    dosenWali: 'dr. Bertha Loupatty, Sp.PD., M.Kes.',
    nidnDosenWali: '0021097503',
    ipk: 3.91,
    totalSks: 160,
    sksLulus: 78,
    beasiswa: 'Bidikmisi'
  },
  {
    id: '5',
    nim: '2023750019',
    nama: 'Daniel Pattipeilohy',
    foto: '/placeholder.svg',
    email: 'daniel.p@student.unpatti.ac.id',
    telepon: '081387654321',
    tempatLahir: 'Ambon',
    tanggalLahir: '2005-07-03',
    jenisKelamin: 'L',
    agama: 'Kristen',
    alamat: 'Jl. W.R. Supratman No. 89',
    kota: 'Ambon',
    provinsi: 'Maluku',
    kodePos: '97125',
    fakultas: 'FMIPA',
    prodi: 'Matematika',
    angkatan: 2023,
    semester: 3,
    status: 'Aktif',
    jalurMasuk: 'SBMPTN',
    dosenWali: 'Dr. Yopi Andry Lesnussa, M.Si.',
    nidnDosenWali: '0025088001',
    ipk: 3.55,
    totalSks: 144,
    sksLulus: 42
  }
];

// Detail nilai mata kuliah untuk mahasiswa pertama
export const nilaiMahasiswa: Record<string, NilaiMataKuliah[]> = {
  '1': [
    { kode: 'TIF101', nama: 'Pengantar Teknologi Informasi', sks: 3, semester: 1, tahunAkademik: '2021/2022 Ganjil', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF102', nama: 'Algoritma dan Pemrograman', sks: 4, semester: 1, tahunAkademik: '2021/2022 Ganjil', nilai: 'A-', angkaMutu: 3.75, status: 'Lulus' },
    { kode: 'MAT101', nama: 'Kalkulus I', sks: 3, semester: 1, tahunAkademik: '2021/2022 Ganjil', nilai: 'B+', angkaMutu: 3.5, status: 'Lulus' },
    { kode: 'FIS101', nama: 'Fisika Dasar', sks: 3, semester: 1, tahunAkademik: '2021/2022 Ganjil', nilai: 'A-', angkaMutu: 3.75, status: 'Lulus' },
    { kode: 'ENG101', nama: 'Bahasa Inggris I', sks: 2, semester: 1, tahunAkademik: '2021/2022 Ganjil', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'PKN101', nama: 'Pendidikan Pancasila', sks: 2, semester: 1, tahunAkademik: '2021/2022 Ganjil', nilai: 'B+', angkaMutu: 3.5, status: 'Lulus' },
    { kode: 'TIF201', nama: 'Struktur Data', sks: 4, semester: 2, tahunAkademik: '2021/2022 Genap', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF202', nama: 'Basis Data', sks: 4, semester: 2, tahunAkademik: '2021/2022 Genap', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'MAT102', nama: 'Kalkulus II', sks: 3, semester: 2, tahunAkademik: '2021/2022 Genap', nilai: 'B+', angkaMutu: 3.5, status: 'Lulus' },
    { kode: 'TIF203', nama: 'Sistem Operasi', sks: 3, semester: 2, tahunAkademik: '2021/2022 Genap', nilai: 'A-', angkaMutu: 3.75, status: 'Lulus' },
    { kode: 'TIF301', nama: 'Pemrograman Berorientasi Objek', sks: 4, semester: 3, tahunAkademik: '2022/2023 Ganjil', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF302', nama: 'Jaringan Komputer', sks: 3, semester: 3, tahunAkademik: '2022/2023 Ganjil', nilai: 'B+', angkaMutu: 3.5, status: 'Lulus' },
    { kode: 'TIF303', nama: 'Rekayasa Perangkat Lunak', sks: 3, semester: 3, tahunAkademik: '2022/2023 Ganjil', nilai: 'A-', angkaMutu: 3.75, status: 'Lulus' },
    { kode: 'TIF401', nama: 'Pemrograman Web', sks: 4, semester: 4, tahunAkademik: '2022/2023 Genap', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF402', nama: 'Pemrograman Mobile', sks: 3, semester: 4, tahunAkademik: '2022/2023 Genap', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF403', nama: 'Kecerdasan Buatan', sks: 3, semester: 4, tahunAkademik: '2022/2023 Genap', nilai: 'A-', angkaMutu: 3.75, status: 'Lulus' },
    { kode: 'TIF501', nama: 'Machine Learning', sks: 3, semester: 5, tahunAkademik: '2023/2024 Ganjil', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF502', nama: 'Keamanan Sistem Informasi', sks: 3, semester: 5, tahunAkademik: '2023/2024 Ganjil', nilai: 'B+', angkaMutu: 3.5, status: 'Lulus' },
    { kode: 'TIF601', nama: 'Data Mining', sks: 3, semester: 6, tahunAkademik: '2023/2024 Genap', nilai: 'A', angkaMutu: 4.0, status: 'Lulus' },
    { kode: 'TIF602', nama: 'Proyek Perangkat Lunak', sks: 4, semester: 6, tahunAkademik: '2023/2024 Genap', nilai: 'A-', angkaMutu: 3.75, status: 'Lulus' },
    { kode: 'TIF701', nama: 'Kerja Praktik', sks: 2, semester: 7, tahunAkademik: '2024/2025 Ganjil', nilai: '-', angkaMutu: 0, status: 'Sedang Diambil' },
    { kode: 'TIF702', nama: 'Metodologi Penelitian', sks: 2, semester: 7, tahunAkademik: '2024/2025 Ganjil', nilai: '-', angkaMutu: 0, status: 'Sedang Diambil' },
    { kode: 'TIF703', nama: 'Cloud Computing', sks: 3, semester: 7, tahunAkademik: '2024/2025 Ganjil', nilai: '-', angkaMutu: 0, status: 'Sedang Diambil' },
  ]
};

// Riwayat akademik per semester
export const riwayatAkademik: Record<string, RiwayatAkademik[]> = {
  '1': [
    { semester: 1, tahunAkademik: '2021/2022 Ganjil', sksAmbil: 17, sksLulus: 17, ips: 3.71, ipk: 3.71 },
    { semester: 2, tahunAkademik: '2021/2022 Genap', sksAmbil: 18, sksLulus: 18, ips: 3.78, ipk: 3.74 },
    { semester: 3, tahunAkademik: '2022/2023 Ganjil', sksAmbil: 20, sksLulus: 20, ips: 3.65, ipk: 3.71 },
    { semester: 4, tahunAkademik: '2022/2023 Genap', sksAmbil: 20, sksLulus: 20, ips: 3.85, ipk: 3.74 },
    { semester: 5, tahunAkademik: '2023/2024 Ganjil', sksAmbil: 18, sksLulus: 18, ips: 3.61, ipk: 3.72 },
    { semester: 6, tahunAkademik: '2023/2024 Genap', sksAmbil: 18, sksLulus: 18, ips: 3.78, ipk: 3.73 },
    { semester: 7, tahunAkademik: '2024/2025 Ganjil', sksAmbil: 13, sksLulus: 0, ips: 0, ipk: 3.67 },
  ]
};

// Kehadiran semester berjalan
export const kehadiranMahasiswa: Record<string, Kehadiran[]> = {
  '1': [
    { mataKuliah: 'Kerja Praktik', hadir: 12, izin: 1, sakit: 0, alpa: 1, persentase: 92.9 },
    { mataKuliah: 'Metodologi Penelitian', hadir: 11, izin: 2, sakit: 1, alpa: 0, persentase: 100 },
    { mataKuliah: 'Cloud Computing', hadir: 10, izin: 1, sakit: 1, alpa: 2, persentase: 85.7 },
  ]
};

// Aktivitas terbaru mahasiswa
export const aktivitasMahasiswa: Record<string, Aktivitas[]> = {
  '1': [
    { tanggal: '2025-01-18', jenis: 'Akademik', deskripsi: 'Mengumpulkan laporan Kerja Praktik BAB III' },
    { tanggal: '2025-01-15', jenis: 'Perpustakaan', deskripsi: 'Meminjam buku "Cloud Computing: Concepts, Technology & Architecture"' },
    { tanggal: '2025-01-12', jenis: 'Akademik', deskripsi: 'Konsultasi proposal skripsi dengan dosen pembimbing' },
    { tanggal: '2025-01-10', jenis: 'Organisasi', deskripsi: 'Mengikuti rapat pengurus Himpunan Mahasiswa Teknik Informatika' },
    { tanggal: '2025-01-08', jenis: 'Prestasi', deskripsi: 'Juara 2 Lomba UI/UX Design tingkat Provinsi Maluku' },
    { tanggal: '2025-01-05', jenis: 'Akademik', deskripsi: 'Menyelesaikan tugas presentasi Cloud Computing' },
    { tanggal: '2024-12-20', jenis: 'Akademik', deskripsi: 'Ujian Akhir Semester Ganjil 2024/2025' },
    { tanggal: '2024-12-15', jenis: 'Perpustakaan', deskripsi: 'Mengembalikan buku "Machine Learning with Python"' },
    { tanggal: '2024-11-28', jenis: 'Prestasi', deskripsi: 'Finalis Hackathon Digital Innovation Challenge 2024' },
    { tanggal: '2024-11-15', jenis: 'Organisasi', deskripsi: 'Panitia Seminar Nasional Teknologi Informasi UNPATTI' },
  ]
};

// Helper function untuk mendapatkan mahasiswa berdasarkan ID
export const getMahasiswaById = (id: string): Mahasiswa | undefined => {
  return daftarMahasiswa.find(m => m.id === id);
};

// Helper function untuk mendapatkan nilai mahasiswa
export const getNilaiMahasiswa = (id: string): NilaiMataKuliah[] => {
  return nilaiMahasiswa[id] || [];
};

// Helper function untuk mendapatkan riwayat akademik
export const getRiwayatAkademik = (id: string): RiwayatAkademik[] => {
  return riwayatAkademik[id] || [];
};

// Helper function untuk mendapatkan kehadiran
export const getKehadiran = (id: string): Kehadiran[] => {
  return kehadiranMahasiswa[id] || [];
};

// Helper function untuk mendapatkan aktivitas
export const getAktivitas = (id: string): Aktivitas[] => {
  return aktivitasMahasiswa[id] || [];
};

// Warna badge berdasarkan nilai
export const getColorByNilai = (nilai: string): string => {
  switch (nilai) {
    case 'A': return 'bg-green-500';
    case 'A-': return 'bg-green-400';
    case 'B+': return 'bg-blue-500';
    case 'B': return 'bg-blue-400';
    case 'B-': return 'bg-blue-300';
    case 'C+': return 'bg-yellow-500';
    case 'C': return 'bg-yellow-400';
    case 'D': return 'bg-orange-500';
    case 'E': return 'bg-red-500';
    default: return 'bg-muted';
  }
};

// Status warna
export const getStatusColor = (status: Mahasiswa['status']): string => {
  switch (status) {
    case 'Aktif': return 'bg-green-500';
    case 'Cuti': return 'bg-yellow-500';
    case 'Lulus': return 'bg-blue-500';
    case 'Drop Out': return 'bg-red-500';
    default: return 'bg-muted';
  }
};
