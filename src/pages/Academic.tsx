import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import {
  statistikRingkas,
  trendMahasiswa,
  distribusiMahasiswaFakultas,
  distribusiIPK,
  tingkatKelulusan,
  kehadiranMahasiswa,
  fakultas,
  tahunAkademik,
  formatAngka,
} from '@/lib/mockData';
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Filter,
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
  Cell,
  PieChart,
  Pie,
  Legend,
  ComposedChart,
  Area,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const CHART_COLORS = [
  'hsl(217, 100%, 34%)',
  'hsl(217, 80%, 50%)',
  'hsl(38, 92%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(262, 83%, 58%)',
  'hsl(0, 84%, 60%)',
  'hsl(199, 89%, 48%)',
];

const Academic = () => {
  const [selectedTahun, setSelectedTahun] = useState('2024-1');
  const [selectedFakultas, setSelectedFakultas] = useState('all');

  return (
    <DashboardLayout
      title="Dashboard Akademik"
      subtitle="Data dari Sistem Informasi Akademik (SIAKAD)"
    >
      {/* Filter Bar */}
      <div className="filter-bar mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filter:</span>
        </div>
        <Select value={selectedTahun} onValueChange={setSelectedTahun}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tahun Akademik" />
          </SelectTrigger>
          <SelectContent>
            {tahunAkademik.map((ta) => (
              <SelectItem key={ta.id} value={ta.id}>
                {ta.tahun} - {ta.semester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedFakultas} onValueChange={setSelectedFakultas}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Fakultas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Fakultas</SelectItem>
            {fakultas.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          Reset Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Mahasiswa Aktif"
          value={formatAngka(statistikRingkas.mahasiswaAktif)}
          icon={<GraduationCap className="h-6 w-6" />}
          trend={{ value: 3.2, label: 'vs semester lalu' }}
        />
        <StatCard
          title="Mahasiswa Baru"
          value={formatAngka(4800)}
          subtitle="Semester Ganjil 2024/2025"
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 6.7, label: 'vs tahun lalu' }}
        />
        <StatCard
          title="Tingkat Kelulusan"
          value="78%"
          subtitle="Tepat waktu"
          icon={<Award className="h-6 w-6" />}
          trend={{ value: 2.6, label: 'vs tahun lalu' }}
          variant="primary"
        />
        <StatCard
          title="Rata-rata IPK"
          value="3.24"
          subtitle="Semua mahasiswa aktif"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="accent"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Enrollment Trends */}
        <ChartCard
          title="Tren Pendaftaran Mahasiswa"
          subtitle="Mahasiswa aktif, baru, dan lulus per semester"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendMahasiswa}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="semester" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}rb`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}rb`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatAngka(value)}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="aktif"
                  fill="hsl(217, 100%, 34%, 0.1)"
                  stroke="hsl(217, 100%, 34%)"
                  name="Aktif"
                />
                <Bar yAxisId="right" dataKey="baru" fill="hsl(142, 71%, 45%)" name="Baru" barSize={20} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="lulus"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={2}
                  name="Lulus"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* GPA Distribution */}
        <ChartCard
          title="Distribusi IPK Mahasiswa"
          subtitle="Histogram sebaran Indeks Prestasi Kumulatif"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribusiIPK}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}rb`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Mahasiswa']}
                />
                <Bar dataKey="jumlah" radius={[4, 4, 0, 0]}>
                  {distribusiIPK.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index >= 5
                          ? 'hsl(142, 71%, 45%)'
                          : index >= 3
                          ? 'hsl(217, 100%, 34%)'
                          : 'hsl(38, 92%, 50%)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Graduation Rate */}
        <ChartCard title="Tingkat Kelulusan" subtitle="Persentase kelulusan per tahun">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tingkatKelulusan}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tepatWaktu"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={2}
                  name="Tepat Waktu"
                />
                <Line
                  type="monotone"
                  dataKey="terlambat"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={2}
                  name="Terlambat"
                />
                <Line
                  type="monotone"
                  dataKey="dropout"
                  stroke="hsl(0, 84%, 60%)"
                  strokeWidth={2}
                  name="Dropout"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Attendance by Faculty */}
        <ChartCard title="Tingkat Kehadiran" subtitle="Persentase kehadiran per fakultas">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-muted-foreground">Rata-rata Universitas</span>
              <span className="font-semibold text-lg">{kehadiranMahasiswa.rataRata}%</span>
            </div>
            {kehadiranMahasiswa.perFakultas.map((item) => (
              <div key={item.fakultas} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.fakultas}</span>
                  <span className="font-medium">{item.kehadiran}%</span>
                </div>
                <Progress
                  value={item.kehadiran}
                  className={cn(
                    'h-2',
                    item.kehadiran >= 90 && '[&>div]:bg-emerald-500',
                    item.kehadiran >= 85 && item.kehadiran < 90 && '[&>div]:bg-primary',
                    item.kehadiran < 85 && '[&>div]:bg-amber-500'
                  )}
                />
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Faculty Distribution Pie */}
        <ChartCard title="Distribusi per Fakultas" subtitle="Proporsi mahasiswa aktif">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribusiMahasiswaFakultas}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="mahasiswa"
                  nameKey="fakultas"
                >
                  {distribusiMahasiswaFakultas.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Mahasiswa']}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Top Programs Table */}
      <ChartCard title="Program Studi Terbaik" subtitle="Berdasarkan rata-rata IPK dan tingkat kelulusan">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Peringkat</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Program Studi</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fakultas</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Mahasiswa</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Rata-rata IPK</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Kelulusan</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prodi: 'Pendidikan Dokter', fakultas: 'FK', mhs: 245, ipk: 3.67, lulus: 94 },
                { prodi: 'Teknik Informatika', fakultas: 'FT', mhs: 412, ipk: 3.52, lulus: 89 },
                { prodi: 'Akuntansi', fakultas: 'FEB', mhs: 378, ipk: 3.48, lulus: 87 },
                { prodi: 'Matematika', fakultas: 'FMIPA', mhs: 189, ipk: 3.45, lulus: 85 },
                { prodi: 'Ilmu Hukum', fakultas: 'FH', mhs: 567, ipk: 3.41, lulus: 83 },
              ].map((row, index) => (
                <tr key={row.prodi} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                        index === 0 && 'bg-amber-100 text-amber-700',
                        index === 1 && 'bg-slate-100 text-slate-700',
                        index === 2 && 'bg-orange-100 text-orange-700',
                        index > 2 && 'bg-secondary text-muted-foreground'
                      )}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{row.prodi}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.fakultas}</td>
                  <td className="py-3 px-4 text-right">{formatAngka(row.mhs)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">{row.ipk.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                        row.lulus >= 90 && 'bg-emerald-100 text-emerald-700',
                        row.lulus >= 80 && row.lulus < 90 && 'bg-blue-100 text-blue-700',
                        row.lulus < 80 && 'bg-amber-100 text-amber-700'
                      )}
                    >
                      {row.lulus}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </DashboardLayout>
  );
};

export default Academic;
