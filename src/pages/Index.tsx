import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  statistikRingkas, 
  trendMahasiswa, 
  distribusiMahasiswaFakultas,
  etlStatus,
  formatAngka,
  formatTanggal 
} from '@/lib/mockData';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CHART_COLORS = [
  'hsl(217, 100%, 34%)',
  'hsl(217, 80%, 50%)',
  'hsl(38, 92%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(262, 83%, 58%)',
  'hsl(0, 84%, 60%)',
  'hsl(199, 89%, 48%)',
  'hsl(28, 80%, 52%)',
  'hsl(280, 65%, 60%)',
];

const Index = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Sukses</Badge>;
      case 'warning': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Peringatan</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Gagal</Badge>;
      default: return <Badge variant="secondary">Tidak Diketahui</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Dashboard Utama" 
      subtitle="Selamat datang di Data Warehouse Universitas Pattimura"
    >
      {/* Welcome Banner */}
      <div className="dashboard-header mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Universitas Pattimura
            </h2>
            <p className="text-primary-foreground/80">
              Sistem Data Warehouse Terintegrasi • Ambon, Maluku, Indonesia
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
            <Clock className="h-4 w-4" />
            <span>Terakhir diperbarui: {formatTanggal(statistikRingkas.lastUpdate)}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Mahasiswa Aktif"
          value={formatAngka(statistikRingkas.mahasiswaAktif)}
          subtitle={`Dari ${formatAngka(statistikRingkas.totalMahasiswa)} terdaftar`}
          icon={<GraduationCap className="h-6 w-6" />}
          trend={{ value: 3.2, label: 'vs semester lalu' }}
        />
        <StatCard
          title="Total Dosen"
          value={formatAngka(statistikRingkas.totalDosen)}
          subtitle={`+ ${formatAngka(statistikRingkas.totalTenagaKependidikan)} tenaga kependidikan`}
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 2.6, label: 'vs tahun lalu' }}
        />
        <StatCard
          title="Program Studi"
          value={statistikRingkas.jumlahProdi}
          subtitle={`Di ${statistikRingkas.jumlahFakultas} fakultas`}
          icon={<BookOpen className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Tahun Akademik"
          value={statistikRingkas.tahunAkademikAktif}
          subtitle={`Semester ${statistikRingkas.semesterAktif}`}
          icon={<Building2 className="h-6 w-6" />}
          variant="accent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Trend Mahasiswa */}
        <ChartCard
          title="Tren Mahasiswa Aktif"
          subtitle="Perkembangan jumlah mahasiswa per semester"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendMahasiswa}>
                <defs>
                  <linearGradient id="colorAktif" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 100%, 34%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(217, 100%, 34%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="semester" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}rb`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), '']}
                />
                <Area
                  type="monotone"
                  dataKey="aktif"
                  stroke="hsl(217, 100%, 34%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAktif)"
                  name="Mahasiswa Aktif"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Distribusi per Fakultas */}
        <ChartCard
          title="Distribusi Mahasiswa per Fakultas"
          subtitle="Jumlah mahasiswa aktif di setiap fakultas"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribusiMahasiswaFakultas} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}rb`}
                />
                <YAxis 
                  type="category" 
                  dataKey="fakultas" 
                  tick={{ fontSize: 12 }}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Mahasiswa']}
                />
                <Bar dataKey="mahasiswa" radius={[0, 4, 4, 0]}>
                  {distribusiMahasiswaFakultas.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* ETL Status & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ETL Status */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Status Proses ETL"
            subtitle="Pemantauan proses Extract-Transform-Load dari sistem sumber"
            actions={
              <Link to="/etl">
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  Lihat Detail <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            }
          >
            <div className="space-y-3">
              {etlStatus.map((item) => (
                <div 
                  key={item.sistem}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-lg border',
                    item.status === 'failed' && 'border-red-200 bg-red-50/50',
                    item.status === 'warning' && 'border-amber-200 bg-amber-50/50',
                    item.status === 'success' && 'border-border bg-secondary/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="font-medium">{item.sistem}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatAngka(item.recordsProcessed)} record • {item.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Terakhir: {formatTanggal(item.lastRun).split(',')[1]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Quick Links */}
        <ChartCard title="Akses Cepat" subtitle="Dashboard dan fitur utama">
          <div className="space-y-2">
            {[
              { label: 'Dashboard Akademik', path: '/academic', icon: GraduationCap, color: 'bg-blue-100 text-blue-700' },
              { label: 'Dashboard SDM', path: '/hr', icon: Users, color: 'bg-emerald-100 text-emerald-700' },
              { label: 'Dashboard Keuangan', path: '/finance', icon: Building2, color: 'bg-amber-100 text-amber-700' },
              { label: 'Dashboard Perpustakaan', path: '/library', icon: BookOpen, color: 'bg-purple-100 text-purple-700' },
              { label: 'Analitik Terintegrasi', path: '/analytics', icon: Building2, color: 'bg-rose-100 text-rose-700' },
            ].map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
              >
                <div className={cn('p-2 rounded-lg', item.color)}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm flex-1">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default Index;
