export interface Dosen {
  id: string;
  nidn: string;
  nip: string;
  nama: string;
  gelarDepan: string;
  gelarBelakang: string;
  email: string;
  telepon: string;
  fakultas: string;
  prodi: string;
  jabatanFungsional: string;
  pangkatGolongan: string;
  pendidikanTerakhir: string;
  bidangKeahlian: string[];
  tanggalLahir: string;
  tempatLahir: string;
  jenisKelamin: string;
  alamat: string;
  status: 'Aktif' | 'Cuti' | 'Tugas Belajar' | 'Pensiun';
  foto: string;
  tanggalMasuk: string;
  sertifikasi: boolean;
  scopusId?: string;
  googleScholarId?: string;
  orcidId?: string;
}

export interface MataKuliahDiajar {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  kelas: string;
  semester: string;
  tahunAkademik: string;
  jumlahMahasiswa: number;
  jadwal: string;
  ruangan: string;
}

export interface Penelitian {
  id: string;
  judul: string;
  tahun: number;
  skema: string;
  sumberDana: string;
  jumlahDana: number;
  peran: 'Ketua' | 'Anggota';
  status: 'Selesai' | 'Berjalan' | 'Diajukan';
}

export interface Publikasi {
  id: string;
  judul: string;
  jurnal: string;
  tahun: number;
  volume: string;
  halaman: string;
  doi?: string;
  kategori: 'Internasional' | 'Nasional Terakreditasi' | 'Nasional' | 'Prosiding';
  sitasi: number;
}

export interface Pengabdian {
  id: string;
  judul: string;
  tahun: number;
  lokasi: string;
  sumberDana: string;
  jumlahDana: number;
  peran: 'Ketua' | 'Anggota';
}

export interface BimbinganMahasiswa {
  id: string;
  nimMahasiswa: string;
  namaMahasiswa: string;
  jenisBimbingan: 'Skripsi' | 'Tesis' | 'Disertasi' | 'Akademik';
  judul?: string;
  status: 'Selesai' | 'Berjalan';
  tahun: number;
}

// Mock Data Dosen
export const dataDosen: Dosen[] = [
  {
    id: "1",
    nidn: "1201098501",
    nip: "198501122010011001",
    nama: "Ahmad Fauzi",
    gelarDepan: "Dr.",
    gelarBelakang: "S.Kom., M.T.",
    email: "ahmad.fauzi@unpatti.ac.id",
    telepon: "081234567890",
    fakultas: "Fakultas Teknik",
    prodi: "Teknik Informatika",
    jabatanFungsional: "Lektor Kepala",
    pangkatGolongan: "Pembina / IV-a",
    pendidikanTerakhir: "S3 Teknik Informatika - ITB",
    bidangKeahlian: ["Machine Learning", "Data Mining", "Artificial Intelligence"],
    tanggalLahir: "1985-01-12",
    tempatLahir: "Ambon",
    jenisKelamin: "Laki-laki",
    alamat: "Jl. Dr. Kayadoe No. 15, Ambon",
    status: "Aktif",
    foto: "",
    tanggalMasuk: "2010-01-01",
    sertifikasi: true,
    scopusId: "57201234567",
    googleScholarId: "ABC123XYZ",
    orcidId: "0000-0001-2345-6789"
  },
  {
    id: "2",
    nidn: "1215088701",
    nip: "198708152012012002",
    nama: "Maria Saptenno",
    gelarDepan: "",
    gelarBelakang: "S.Pd., M.Pd.",
    email: "maria.saptenno@unpatti.ac.id",
    telepon: "081298765432",
    fakultas: "FKIP",
    prodi: "Pendidikan Matematika",
    jabatanFungsional: "Lektor",
    pangkatGolongan: "Penata Tk. I / III-d",
    pendidikanTerakhir: "S2 Pendidikan Matematika - UNY",
    bidangKeahlian: ["Pendidikan Matematika", "Kurikulum", "Evaluasi Pembelajaran"],
    tanggalLahir: "1987-08-15",
    tempatLahir: "Ambon",
    jenisKelamin: "Perempuan",
    alamat: "Jl. Pattimura No. 20, Ambon",
    status: "Aktif",
    foto: "",
    tanggalMasuk: "2012-01-01",
    sertifikasi: true
  }
];

// Mock Mata Kuliah yang Diajar
export const dataMataKuliahDiajar: Record<string, MataKuliahDiajar[]> = {
  "1": [
    { id: "1", kode: "TI2101", nama: "Algoritma dan Pemrograman", sks: 3, kelas: "A", semester: "Ganjil", tahunAkademik: "2024/2025", jumlahMahasiswa: 45, jadwal: "Senin 08:00-10:30", ruangan: "Lab Komputer 1" },
    { id: "2", kode: "TI3201", nama: "Kecerdasan Buatan", sks: 3, kelas: "A", semester: "Ganjil", tahunAkademik: "2024/2025", jumlahMahasiswa: 38, jadwal: "Rabu 13:00-15:30", ruangan: "R. 301" },
    { id: "3", kode: "TI4101", nama: "Machine Learning", sks: 3, kelas: "A", semester: "Ganjil", tahunAkademik: "2024/2025", jumlahMahasiswa: 32, jadwal: "Jumat 08:00-10:30", ruangan: "Lab AI" },
    { id: "4", kode: "TI4201", nama: "Data Mining", sks: 3, kelas: "A", semester: "Ganjil", tahunAkademik: "2024/2025", jumlahMahasiswa: 28, jadwal: "Selasa 10:00-12:30", ruangan: "R. 302" },
  ],
  "2": [
    { id: "1", kode: "PM2101", nama: "Kalkulus I", sks: 4, kelas: "A", semester: "Ganjil", tahunAkademik: "2024/2025", jumlahMahasiswa: 50, jadwal: "Senin 08:00-11:00", ruangan: "R. 101" },
    { id: "2", kode: "PM3101", nama: "Statistika Pendidikan", sks: 3, kelas: "B", semester: "Ganjil", tahunAkademik: "2024/2025", jumlahMahasiswa: 42, jadwal: "Kamis 13:00-15:30", ruangan: "R. 102" },
  ]
};

// Mock Penelitian
export const dataPenelitian: Record<string, Penelitian[]> = {
  "1": [
    { id: "1", judul: "Pengembangan Model Deep Learning untuk Deteksi Penyakit Tanaman Sagu", tahun: 2024, skema: "Penelitian Dasar", sumberDana: "Kemenristekdikti", jumlahDana: 150000000, peran: "Ketua", status: "Berjalan" },
    { id: "2", judul: "Implementasi Machine Learning untuk Prediksi Cuaca Maritim di Maluku", tahun: 2023, skema: "Penelitian Terapan", sumberDana: "LPDP", jumlahDana: 200000000, peran: "Ketua", status: "Selesai" },
    { id: "3", judul: "Sistem Rekomendasi Berbasis AI untuk E-Learning", tahun: 2023, skema: "Penelitian Dasar", sumberDana: "Internal UNPATTI", jumlahDana: 50000000, peran: "Anggota", status: "Selesai" },
    { id: "4", judul: "Analisis Sentimen Media Sosial untuk Pariwisata Maluku", tahun: 2022, skema: "Penelitian Terapan", sumberDana: "Pemprov Maluku", jumlahDana: 75000000, peran: "Ketua", status: "Selesai" },
    { id: "5", judul: "Big Data Analytics untuk Smart Campus UNPATTI", tahun: 2022, skema: "Penelitian Pengembangan", sumberDana: "Kemenristekdikti", jumlahDana: 180000000, peran: "Anggota", status: "Selesai" },
  ],
  "2": [
    { id: "1", judul: "Pengembangan Media Pembelajaran Interaktif Matematika Berbasis Kearifan Lokal Maluku", tahun: 2024, skema: "Penelitian Terapan", sumberDana: "Internal UNPATTI", jumlahDana: 40000000, peran: "Ketua", status: "Berjalan" },
    { id: "2", judul: "Analisis Kemampuan Berpikir Kritis Siswa dalam Pembelajaran Matematika", tahun: 2023, skema: "Penelitian Dasar", sumberDana: "Kemenristekdikti", jumlahDana: 80000000, peran: "Ketua", status: "Selesai" },
  ]
};

// Mock Publikasi
export const dataPublikasi: Record<string, Publikasi[]> = {
  "1": [
    { id: "1", judul: "Deep Learning Approach for Sago Plant Disease Detection", jurnal: "Journal of Agricultural Informatics", tahun: 2024, volume: "15(2)", halaman: "123-135", doi: "10.1234/jai.2024.001", kategori: "Internasional", sitasi: 5 },
    { id: "2", judul: "Maritime Weather Prediction Using LSTM Networks", jurnal: "IEEE Access", tahun: 2023, volume: "11", halaman: "45678-45690", doi: "10.1109/ACCESS.2023.001", kategori: "Internasional", sitasi: 12 },
    { id: "3", judul: "Sentiment Analysis of Tourism Reviews Using BERT", jurnal: "Jurnal Ilmu Komputer dan Informasi", tahun: 2023, volume: "16(1)", halaman: "45-56", kategori: "Nasional Terakreditasi", sitasi: 8 },
    { id: "4", judul: "Implementasi Random Forest untuk Klasifikasi Data Kelautan", jurnal: "Prosiding SEMNASTIKA", tahun: 2022, volume: "2022", halaman: "112-118", kategori: "Prosiding", sitasi: 3 },
    { id: "5", judul: "Smart Campus Analytics: A Case Study at UNPATTI", jurnal: "Jurnal Teknologi Informasi", tahun: 2022, volume: "8(2)", halaman: "78-89", kategori: "Nasional Terakreditasi", sitasi: 6 },
    { id: "6", judul: "Machine Learning untuk Prediksi Hasil Panen", jurnal: "Jurnal Informatika Pertanian", tahun: 2021, volume: "5(1)", halaman: "23-34", kategori: "Nasional", sitasi: 4 },
  ],
  "2": [
    { id: "1", judul: "Pengembangan E-Modul Matematika Berbasis Etnomatematika", jurnal: "Jurnal Pendidikan Matematika", tahun: 2024, volume: "12(1)", halaman: "34-45", kategori: "Nasional Terakreditasi", sitasi: 2 },
    { id: "2", judul: "Critical Thinking Skills in Mathematics Learning", jurnal: "International Journal of Mathematics Education", tahun: 2023, volume: "8(3)", halaman: "156-168", doi: "10.5678/ijme.2023.045", kategori: "Internasional", sitasi: 7 },
  ]
};

// Mock Pengabdian
export const dataPengabdian: Record<string, Pengabdian[]> = {
  "1": [
    { id: "1", judul: "Pelatihan Pemrograman Python untuk Guru SMK se-Kota Ambon", tahun: 2024, lokasi: "SMKN 1 Ambon", sumberDana: "Internal UNPATTI", jumlahDana: 25000000, peran: "Ketua" },
    { id: "2", judul: "Workshop Machine Learning untuk Mahasiswa se-Maluku", tahun: 2023, lokasi: "UNPATTI", sumberDana: "Hibah Dikti", jumlahDana: 35000000, peran: "Ketua" },
    { id: "3", judul: "Pendampingan Digitalisasi UMKM Kota Ambon", tahun: 2023, lokasi: "Kota Ambon", sumberDana: "Pemprov Maluku", jumlahDana: 50000000, peran: "Anggota" },
  ],
  "2": [
    { id: "1", judul: "Pelatihan Pembelajaran Matematika Inovatif untuk Guru SD", tahun: 2024, lokasi: "SD se-Kota Ambon", sumberDana: "Internal UNPATTI", jumlahDana: 20000000, peran: "Ketua" },
  ]
};

// Mock Bimbingan Mahasiswa
export const dataBimbingan: Record<string, BimbinganMahasiswa[]> = {
  "1": [
    { id: "1", nimMahasiswa: "2019710001", namaMahasiswa: "Rizky Pratama", jenisBimbingan: "Skripsi", judul: "Implementasi CNN untuk Klasifikasi Gambar Satelit", status: "Berjalan", tahun: 2024 },
    { id: "2", nimMahasiswa: "2019710015", namaMahasiswa: "Siti Aminah", jenisBimbingan: "Skripsi", judul: "Analisis Sentimen Twitter Menggunakan BERT", status: "Berjalan", tahun: 2024 },
    { id: "3", nimMahasiswa: "2018710008", namaMahasiswa: "Ahmad Dahlan", jenisBimbingan: "Skripsi", judul: "Sistem Prediksi Cuaca Berbasis LSTM", status: "Selesai", tahun: 2023 },
    { id: "4", nimMahasiswa: "2018710022", namaMahasiswa: "Putri Amelia", jenisBimbingan: "Skripsi", judul: "Chatbot FAQ Menggunakan NLP", status: "Selesai", tahun: 2023 },
    { id: "5", nimMahasiswa: "2020710001", namaMahasiswa: "Budi Santoso", jenisBimbingan: "Akademik", status: "Berjalan", tahun: 2024 },
    { id: "6", nimMahasiswa: "2020710012", namaMahasiswa: "Diana Putri", jenisBimbingan: "Akademik", status: "Berjalan", tahun: 2024 },
  ],
  "2": [
    { id: "1", nimMahasiswa: "2019720005", namaMahasiswa: "Andi Wijaya", jenisBimbingan: "Skripsi", judul: "Pengembangan Media Pembelajaran Geometri Interaktif", status: "Berjalan", tahun: 2024 },
    { id: "2", nimMahasiswa: "2019720018", namaMahasiswa: "Novi Rahmawati", jenisBimbingan: "Skripsi", judul: "Analisis Kesulitan Belajar Matematika Siswa SMP", status: "Selesai", tahun: 2023 },
  ]
};

// Helper functions
export const getDosenById = (id: string): Dosen | undefined => {
  return dataDosen.find(d => d.id === id);
};

export const getMataKuliahDosen = (dosenId: string): MataKuliahDiajar[] => {
  return dataMataKuliahDiajar[dosenId] || [];
};

export const getPenelitianDosen = (dosenId: string): Penelitian[] => {
  return dataPenelitian[dosenId] || [];
};

export const getPublikasiDosen = (dosenId: string): Publikasi[] => {
  return dataPublikasi[dosenId] || [];
};

export const getPengabdianDosen = (dosenId: string): Pengabdian[] => {
  return dataPengabdian[dosenId] || [];
};

export const getBimbinganDosen = (dosenId: string): BimbinganMahasiswa[] => {
  return dataBimbingan[dosenId] || [];
};

export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Aktif':
    case 'Selesai':
      return 'bg-green-100 text-green-800';
    case 'Berjalan':
      return 'bg-blue-100 text-blue-800';
    case 'Cuti':
    case 'Diajukan':
      return 'bg-yellow-100 text-yellow-800';
    case 'Tugas Belajar':
      return 'bg-purple-100 text-purple-800';
    case 'Pensiun':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getKategoriPublikasiColor = (kategori: string): string => {
  switch (kategori) {
    case 'Internasional':
      return 'bg-purple-100 text-purple-800';
    case 'Nasional Terakreditasi':
      return 'bg-blue-100 text-blue-800';
    case 'Nasional':
      return 'bg-green-100 text-green-800';
    case 'Prosiding':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
