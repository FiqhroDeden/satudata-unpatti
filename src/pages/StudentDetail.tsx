import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap,
  BookOpen,
  Award,
  User,
  TrendingUp,
  Clock,
  FileText,
  Download,
  Printer
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  daftarMahasiswa,
  getMahasiswaById, 
  getNilaiMahasiswa, 
  getRiwayatAkademik, 
  getKehadiran, 
  getAktivitas,
  getColorByNilai,
  getStatusColor
} from '@/lib/mockDataMahasiswa';

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Default to first student if no ID provided
  const mahasiswa = getMahasiswaById(id || '1') || daftarMahasiswa[0];
  const nilaiList = getNilaiMahasiswa(mahasiswa?.id || '1');
  const riwayatList = getRiwayatAkademik(mahasiswa?.id || '1');
  const kehadiranList = getKehadiran(mahasiswa?.id || '1');
  const aktivitasList = getAktivitas(mahasiswa?.id || '1');

  if (!mahasiswa) {
    return (
      <DashboardLayout title="Mahasiswa Tidak Ditemukan">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-muted-foreground mb-4">Data mahasiswa tidak ditemukan</p>
          <Button onClick={() => navigate('/academic')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard Akademik
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = riwayatList.map(r => ({
    semester: `Sem ${r.semester}`,
    ips: r.ips,
    ipk: r.ipk
  }));

  const nilaiPerSemester = nilaiList.reduce((acc, n) => {
    if (!acc[n.semester]) {
      acc[n.semester] = [];
    }
    acc[n.semester].push(n);
    return acc;
  }, {} as Record<number, typeof nilaiList>);

  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getJenisAktivitasIcon = (jenis: string) => {
    switch (jenis) {
      case 'Akademik': return <BookOpen className="h-4 w-4" />;
      case 'Organisasi': return <User className="h-4 w-4" />;
      case 'Prestasi': return <Award className="h-4 w-4" />;
      case 'Perpustakaan': return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getJenisAktivitasColor = (jenis: string) => {
    switch (jenis) {
      case 'Akademik': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'Organisasi': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'Prestasi': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'Perpustakaan': return 'bg-green-500/10 text-green-600 border-green-200';
      default: return 'bg-muted';
    }
  };

  return (
    <DashboardLayout 
      title="Detail Mahasiswa" 
      subtitle={`${mahasiswa.nim} - ${mahasiswa.nama}`}
    >
      {/* Header Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Cetak KHS
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Ekspor Transkrip
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={mahasiswa.foto} alt={mahasiswa.nama} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {mahasiswa.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{mahasiswa.nama}</h2>
                <p className="text-lg text-muted-foreground">{mahasiswa.nim}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={`${getStatusColor(mahasiswa.status)} text-white`}>
                    {mahasiswa.status}
                  </Badge>
                  {mahasiswa.beasiswa && (
                    <Badge variant="outline" className="border-primary text-primary">
                      <Award className="mr-1 h-3 w-3" />
                      {mahasiswa.beasiswa}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Info */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground">IPK</p>
                <p className="text-3xl font-bold text-primary">{mahasiswa.ipk.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm text-muted-foreground">SKS Lulus</p>
                <p className="text-3xl font-bold">{mahasiswa.sksLulus}</p>
                <p className="text-xs text-muted-foreground">dari {mahasiswa.totalSks} SKS</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="text-3xl font-bold">{mahasiswa.semester}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-sm text-muted-foreground">Angkatan</p>
                <p className="text-3xl font-bold">{mahasiswa.angkatan}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress Studi</span>
              <span className="font-medium">{Math.round((mahasiswa.sksLulus / mahasiswa.totalSks) * 100)}%</span>
            </div>
            <Progress value={(mahasiswa.sksLulus / mahasiswa.totalSks) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="akademik" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="akademik" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Akademik</span>
          </TabsTrigger>
          <TabsTrigger value="nilai" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Nilai</span>
          </TabsTrigger>
          <TabsTrigger value="kehadiran" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Kehadiran</span>
          </TabsTrigger>
          <TabsTrigger value="profil" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="aktivitas" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Aktivitas</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Akademik */}
        <TabsContent value="akademik" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* IPS/IPK Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trend IPS & IPK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="semester" className="text-xs" />
                    <YAxis domain={[0, 4]} className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ips" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-1))' }}
                      name="IPS"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ipk" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-2))' }}
                      name="IPK"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Riwayat Akademik Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Riwayat Akademik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semester</TableHead>
                      <TableHead className="text-center">SKS</TableHead>
                      <TableHead className="text-center">IPS</TableHead>
                      <TableHead className="text-center">IPK</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riwayatList.map((r) => (
                      <TableRow key={r.semester}>
                        <TableCell>
                          <div>
                            <p className="font-medium">Semester {r.semester}</p>
                            <p className="text-xs text-muted-foreground">{r.tahunAkademik}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{r.sksLulus}/{r.sksAmbil}</TableCell>
                        <TableCell className="text-center font-medium">{r.ips > 0 ? r.ips.toFixed(2) : '-'}</TableCell>
                        <TableCell className="text-center font-medium text-primary">{r.ipk.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Info Akademik */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akademik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Fakultas</p>
                  <p className="font-medium">{mahasiswa.fakultas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Program Studi</p>
                  <p className="font-medium">{mahasiswa.prodi}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jalur Masuk</p>
                  <p className="font-medium">{mahasiswa.jalurMasuk}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dosen Wali</p>
                  <p className="font-medium">{mahasiswa.dosenWali}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NIDN Dosen Wali</p>
                  <p className="font-medium">{mahasiswa.nidnDosenWali}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(mahasiswa.status)} text-white mt-1`}>
                    {mahasiswa.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Nilai */}
        <TabsContent value="nilai" className="space-y-4">
          {Object.entries(nilaiPerSemester).map(([semester, nilai]) => (
            <Card key={semester}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Semester {semester} - {nilai[0]?.tahunAkademik}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Mata Kuliah</TableHead>
                      <TableHead className="text-center">SKS</TableHead>
                      <TableHead className="text-center">Nilai</TableHead>
                      <TableHead className="text-center">Angka Mutu</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nilai.map((n) => (
                      <TableRow key={n.kode}>
                        <TableCell className="font-mono text-sm">{n.kode}</TableCell>
                        <TableCell className="font-medium">{n.nama}</TableCell>
                        <TableCell className="text-center">{n.sks}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${getColorByNilai(n.nilai)} text-white`}>
                            {n.nilai}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{n.angkaMutu > 0 ? n.angkaMutu.toFixed(2) : '-'}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={n.status === 'Lulus' ? 'default' : n.status === 'Sedang Diambil' ? 'secondary' : 'destructive'}>
                            {n.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tab Kehadiran */}
        <TabsContent value="kehadiran" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kehadiran Semester Berjalan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {kehadiranList.map((k, i) => (
                  <div key={i} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">{k.mataKuliah}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: {k.hadir + k.izin + k.sakit + k.alpa} pertemuan
                        </p>
                      </div>
                      <Badge variant={k.persentase >= 80 ? 'default' : 'destructive'}>
                        {k.persentase.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={k.persentase} className="h-2 mb-3" />
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        Hadir: {k.hadir}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        Izin: {k.izin}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        Sakit: {k.sakit}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        Alpa: {k.alpa}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Kehadiran Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Kehadiran</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={kehadiranList}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mataKuliah" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="hadir" stackId="a" fill="hsl(var(--chart-1))" name="Hadir" />
                  <Bar dataKey="izin" stackId="a" fill="hsl(var(--chart-2))" name="Izin" />
                  <Bar dataKey="sakit" stackId="a" fill="hsl(var(--chart-3))" name="Sakit" />
                  <Bar dataKey="alpa" stackId="a" fill="hsl(var(--chart-4))" name="Alpa" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Profil */}
        <TabsContent value="profil" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Pribadi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tempat Lahir</p>
                    <p className="font-medium">{mahasiswa.tempatLahir}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                    <p className="font-medium">{formatTanggal(mahasiswa.tanggalLahir)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                    <p className="font-medium">{mahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Agama</p>
                    <p className="font-medium">{mahasiswa.agama}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{mahasiswa.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium">{mahasiswa.telepon}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Alamat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{mahasiswa.alamat}</p>
                    <p className="text-muted-foreground">
                      {mahasiswa.kota}, {mahasiswa.provinsi} {mahasiswa.kodePos}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Aktivitas */}
        <TabsContent value="aktivitas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aktivitasList.map((a, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg ${getJenisAktivitasColor(a.jenis)} border`}>
                      {getJenisAktivitasIcon(a.jenis)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {a.jenis}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatTanggal(a.tanggal)}
                        </span>
                      </div>
                      <p className="text-sm">{a.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
