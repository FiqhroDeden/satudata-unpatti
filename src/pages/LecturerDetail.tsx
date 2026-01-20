import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award,
  BookOpen,
  Users,
  FileText,
  Briefcase,
  ExternalLink,
  Clock,
  TrendingUp
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import {
  getDosenById,
  getMataKuliahDosen,
  getPenelitianDosen,
  getPublikasiDosen,
  getPengabdianDosen,
  getBimbinganDosen,
  formatRupiah,
  getStatusColor,
  getKategoriPublikasiColor
} from "@/lib/mockDataDosen";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const LecturerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dosen = getDosenById(id || "1");
  const mataKuliah = getMataKuliahDosen(id || "1");
  const penelitian = getPenelitianDosen(id || "1");
  const publikasi = getPublikasiDosen(id || "1");
  const pengabdian = getPengabdianDosen(id || "1");
  const bimbingan = getBimbinganDosen(id || "1");

  if (!dosen) {
    return (
      <DashboardLayout title="Dosen Tidak Ditemukan">
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-muted-foreground mb-4">Data dosen tidak ditemukan</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate statistics
  const totalSKS = mataKuliah.reduce((sum, mk) => sum + mk.sks, 0);
  const totalMahasiswaDiajar = mataKuliah.reduce((sum, mk) => sum + mk.jumlahMahasiswa, 0);
  const totalPenelitian = penelitian.length;
  const penelitianBerjalan = penelitian.filter(p => p.status === 'Berjalan').length;
  const totalPublikasi = publikasi.length;
  const publikasiInternasional = publikasi.filter(p => p.kategori === 'Internasional').length;
  const totalSitasi = publikasi.reduce((sum, p) => sum + p.sitasi, 0);
  const totalDanaPenelitian = penelitian.reduce((sum, p) => sum + p.jumlahDana, 0);
  const bimbinganSkripsi = bimbingan.filter(b => b.jenisBimbingan === 'Skripsi').length;
  const bimbinganAkademik = bimbingan.filter(b => b.jenisBimbingan === 'Akademik').length;

  // Chart data
  const publikasiPerTahun = [2021, 2022, 2023, 2024].map(tahun => ({
    tahun: tahun.toString(),
    publikasi: publikasi.filter(p => p.tahun === tahun).length,
    sitasi: publikasi.filter(p => p.tahun === tahun).reduce((sum, p) => sum + p.sitasi, 0)
  }));

  const penelitianPerTahun = [2021, 2022, 2023, 2024].map(tahun => ({
    tahun: tahun.toString(),
    jumlah: penelitian.filter(p => p.tahun === tahun).length,
    dana: penelitian.filter(p => p.tahun === tahun).reduce((sum, p) => sum + p.jumlahDana, 0) / 1000000
  }));

  const distribusiPublikasi = [
    { name: 'Internasional', value: publikasi.filter(p => p.kategori === 'Internasional').length },
    { name: 'Nasional Terakreditasi', value: publikasi.filter(p => p.kategori === 'Nasional Terakreditasi').length },
    { name: 'Nasional', value: publikasi.filter(p => p.kategori === 'Nasional').length },
    { name: 'Prosiding', value: publikasi.filter(p => p.kategori === 'Prosiding').length },
  ].filter(d => d.value > 0);

  const namaLengkap = `${dosen.gelarDepan} ${dosen.nama}, ${dosen.gelarBelakang}`.trim();
  const initials = dosen.nama.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <DashboardLayout title="Detail Dosen" subtitle={namaLengkap}>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={dosen.foto} />
                  <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Badge className={`mt-3 ${getStatusColor(dosen.status)}`}>
                  {dosen.status}
                </Badge>
                {dosen.sertifikasi && (
                  <Badge variant="outline" className="mt-2 border-green-500 text-green-600">
                    <Award className="h-3 w-3 mr-1" /> Sertifikasi Dosen
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{namaLengkap}</h2>
                  <p className="text-muted-foreground">NIDN: {dosen.nidn} | NIP: {dosen.nip}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>{dosen.fakultas} - {dosen.prodi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span>{dosen.jabatanFungsional} ({dosen.pangkatGolongan})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{dosen.pendidikanTerakhir}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{dosen.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{dosen.telepon}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Bergabung: {new Date(dosen.tanggalMasuk).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</span>
                    </div>
                  </div>
                </div>

                {/* Bidang Keahlian */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Bidang Keahlian:</p>
                  <div className="flex flex-wrap gap-2">
                    {dosen.bidangKeahlian.map((keahlian, idx) => (
                      <Badge key={idx} variant="secondary">{keahlian}</Badge>
                    ))}
                  </div>
                </div>

                {/* External Links */}
                {(dosen.scopusId || dosen.googleScholarId || dosen.orcidId) && (
                  <div className="flex flex-wrap gap-2">
                    {dosen.scopusId && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" /> Scopus
                      </Button>
                    )}
                    {dosen.googleScholarId && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" /> Google Scholar
                      </Button>
                    )}
                    {dosen.orcidId && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" /> ORCID
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 md:w-64">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{totalSKS}</p>
                    <p className="text-xs text-muted-foreground">SKS Mengajar</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{totalPublikasi}</p>
                    <p className="text-xs text-muted-foreground">Publikasi</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{totalPenelitian}</p>
                    <p className="text-xs text-muted-foreground">Penelitian</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-orange-600">{totalSitasi}</p>
                    <p className="text-xs text-muted-foreground">Total Sitasi</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="mengajar" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
            <TabsTrigger value="mengajar" className="text-xs md:text-sm">
              <BookOpen className="h-4 w-4 mr-1 hidden md:inline" /> Mengajar
            </TabsTrigger>
            <TabsTrigger value="penelitian" className="text-xs md:text-sm">
              <FileText className="h-4 w-4 mr-1 hidden md:inline" /> Penelitian
            </TabsTrigger>
            <TabsTrigger value="publikasi" className="text-xs md:text-sm">
              <TrendingUp className="h-4 w-4 mr-1 hidden md:inline" /> Publikasi
            </TabsTrigger>
            <TabsTrigger value="pengabdian" className="text-xs md:text-sm">
              <Users className="h-4 w-4 mr-1 hidden md:inline" /> Pengabdian
            </TabsTrigger>
            <TabsTrigger value="bimbingan" className="text-xs md:text-sm">
              <GraduationCap className="h-4 w-4 mr-1 hidden md:inline" /> Bimbingan
            </TabsTrigger>
            <TabsTrigger value="profil" className="text-xs md:text-sm">
              <MapPin className="h-4 w-4 mr-1 hidden md:inline" /> Profil
            </TabsTrigger>
          </TabsList>

          {/* Tab: Mengajar */}
          <TabsContent value="mengajar" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mataKuliah.length}</p>
                      <p className="text-xs text-muted-foreground">Mata Kuliah</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalSKS}</p>
                      <p className="text-xs text-muted-foreground">Total SKS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalMahasiswaDiajar}</p>
                      <p className="text-xs text-muted-foreground">Mahasiswa Diajar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{bimbinganSkripsi}</p>
                      <p className="text-xs text-muted-foreground">Bimbingan Skripsi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ChartCard title="Daftar Mata Kuliah yang Diampu" subtitle="Semester Ganjil 2024/2025">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead className="text-center">SKS</TableHead>
                    <TableHead className="text-center">Kelas</TableHead>
                    <TableHead>Jadwal</TableHead>
                    <TableHead>Ruangan</TableHead>
                    <TableHead className="text-center">Mahasiswa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mataKuliah.map((mk) => (
                    <TableRow key={mk.id}>
                      <TableCell className="font-medium">{mk.kode}</TableCell>
                      <TableCell>{mk.nama}</TableCell>
                      <TableCell className="text-center">{mk.sks}</TableCell>
                      <TableCell className="text-center">{mk.kelas}</TableCell>
                      <TableCell>{mk.jadwal}</TableCell>
                      <TableCell>{mk.ruangan}</TableCell>
                      <TableCell className="text-center">{mk.jumlahMahasiswa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ChartCard>
          </TabsContent>

          {/* Tab: Penelitian */}
          <TabsContent value="penelitian" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalPenelitian}</p>
                      <p className="text-xs text-muted-foreground">Total Penelitian</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{penelitianBerjalan}</p>
                      <p className="text-xs text-muted-foreground">Sedang Berjalan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formatRupiah(totalDanaPenelitian)}</p>
                      <p className="text-xs text-muted-foreground">Total Dana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartCard title="Trend Penelitian" subtitle="Per Tahun">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={penelitianPerTahun}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [name === 'dana' ? `Rp ${value} Juta` : value, name === 'dana' ? 'Dana (Juta)' : 'Jumlah']} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="jumlah" name="Jumlah" fill="hsl(var(--chart-1))" />
                    <Bar yAxisId="right" dataKey="dana" name="Dana (Juta)" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Daftar Penelitian">
                <div className="space-y-3 max-h-[280px] overflow-y-auto">
                  {penelitian.map((p) => (
                    <div key={p.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm line-clamp-2">{p.judul}</h4>
                        <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{p.tahun}</span>
                        <span>•</span>
                        <span>{p.skema}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">{p.peran}</Badge>
                      </div>
                      <p className="text-sm font-medium text-primary mt-1">{formatRupiah(p.jumlahDana)}</p>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </TabsContent>

          {/* Tab: Publikasi */}
          <TabsContent value="publikasi" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalPublikasi}</p>
                      <p className="text-xs text-muted-foreground">Total Publikasi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{publikasiInternasional}</p>
                      <p className="text-xs text-muted-foreground">Internasional</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalSitasi}</p>
                      <p className="text-xs text-muted-foreground">Total Sitasi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{(totalSitasi / totalPublikasi || 0).toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">Rata-rata Sitasi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartCard title="Trend Publikasi & Sitasi" subtitle="Per Tahun">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={publikasiPerTahun}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="publikasi" name="Publikasi" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="sitasi" name="Sitasi" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Distribusi Kategori Publikasi">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={distribusiPublikasi}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {distribusiPublikasi.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <ChartCard title="Daftar Publikasi">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Jurnal</TableHead>
                    <TableHead className="text-center">Tahun</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-center">Sitasi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {publikasi.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="font-medium text-sm line-clamp-2">{p.judul}</p>
                          {p.doi && (
                            <p className="text-xs text-muted-foreground mt-1">DOI: {p.doi}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{p.jurnal}</p>
                          <p className="text-xs text-muted-foreground">Vol. {p.volume}, hal. {p.halaman}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{p.tahun}</TableCell>
                      <TableCell>
                        <Badge className={getKategoriPublikasiColor(p.kategori)}>{p.kategori}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">{p.sitasi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ChartCard>
          </TabsContent>

          {/* Tab: Pengabdian */}
          <TabsContent value="pengabdian" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pengabdian.length}</p>
                      <p className="text-xs text-muted-foreground">Total Pengabdian</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pengabdian.filter(p => p.peran === 'Ketua').length}</p>
                      <p className="text-xs text-muted-foreground">Sebagai Ketua</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{formatRupiah(pengabdian.reduce((sum, p) => sum + p.jumlahDana, 0))}</p>
                      <p className="text-xs text-muted-foreground">Total Dana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ChartCard title="Daftar Kegiatan Pengabdian Masyarakat">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead className="text-center">Tahun</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Sumber Dana</TableHead>
                    <TableHead className="text-right">Dana</TableHead>
                    <TableHead className="text-center">Peran</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pengabdian.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium max-w-md">
                        <p className="line-clamp-2">{p.judul}</p>
                      </TableCell>
                      <TableCell className="text-center">{p.tahun}</TableCell>
                      <TableCell>{p.lokasi}</TableCell>
                      <TableCell>{p.sumberDana}</TableCell>
                      <TableCell className="text-right">{formatRupiah(p.jumlahDana)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={p.peran === 'Ketua' ? 'default' : 'secondary'}>{p.peran}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ChartCard>
          </TabsContent>

          {/* Tab: Bimbingan */}
          <TabsContent value="bimbingan" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{bimbinganSkripsi}</p>
                      <p className="text-xs text-muted-foreground">Bimbingan Skripsi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{bimbinganAkademik}</p>
                      <p className="text-xs text-muted-foreground">Bimbingan Akademik</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{bimbingan.filter(b => b.status === 'Selesai').length}</p>
                      <p className="text-xs text-muted-foreground">Sudah Lulus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ChartCard title="Daftar Mahasiswa Bimbingan">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NIM</TableHead>
                    <TableHead>Nama Mahasiswa</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead className="text-center">Tahun</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bimbingan.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.nimMahasiswa}</TableCell>
                      <TableCell>{b.namaMahasiswa}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{b.jenisBimbingan}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="line-clamp-2 text-sm">{b.judul || '-'}</p>
                      </TableCell>
                      <TableCell className="text-center">{b.tahun}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(b.status)}>{b.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ChartCard>
          </TabsContent>

          {/* Tab: Profil */}
          <TabsContent value="profil" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Pribadi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                      <p className="font-medium">{namaLengkap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                      <p className="font-medium">{dosen.jenisKelamin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tempat Lahir</p>
                      <p className="font-medium">{dosen.tempatLahir}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                      <p className="font-medium">{new Date(dosen.tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alamat</p>
                    <p className="font-medium">{dosen.alamat}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Kepegawaian</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">NIDN</p>
                      <p className="font-medium">{dosen.nidn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NIP</p>
                      <p className="font-medium">{dosen.nip}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Jabatan Fungsional</p>
                      <p className="font-medium">{dosen.jabatanFungsional}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pangkat/Golongan</p>
                      <p className="font-medium">{dosen.pangkatGolongan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pendidikan Terakhir</p>
                      <p className="font-medium">{dosen.pendidikanTerakhir}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status Sertifikasi</p>
                      <p className="font-medium">{dosen.sertifikasi ? 'Sudah Sertifikasi' : 'Belum Sertifikasi'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{dosen.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{dosen.telepon}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{dosen.alamat}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ID Peneliti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dosen.scopusId && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Scopus ID</span>
                      <span className="font-medium">{dosen.scopusId}</span>
                    </div>
                  )}
                  {dosen.googleScholarId && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Google Scholar</span>
                      <span className="font-medium">{dosen.googleScholarId}</span>
                    </div>
                  )}
                  {dosen.orcidId && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">ORCID</span>
                      <span className="font-medium">{dosen.orcidId}</span>
                    </div>
                  )}
                  {!dosen.scopusId && !dosen.googleScholarId && !dosen.orcidId && (
                    <p className="text-muted-foreground text-sm">Belum ada ID peneliti terdaftar</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LecturerDetail;
