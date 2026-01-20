import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import {
  koleksiBuku,
  trendPeminjaman,
  bukuTerpopuler,
  statistikPerpustakaan,
  formatAngka,
} from '@/lib/mockData';
import { BookOpen, Users, TrendingUp, Database } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

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

const Library = () => {
  const memberData = [
    { status: 'Aktif', jumlah: statistikPerpustakaan.anggotaAktif },
    { status: 'Tidak Aktif', jumlah: statistikPerpustakaan.anggotaTidakAktif },
  ];

  const collectionData = [
    { jenis: 'Fisik', jumlah: statistikPerpustakaan.koleksiFisik },
    { jenis: 'Digital', jumlah: statistikPerpustakaan.koleksiDigital },
  ];

  return (
    <DashboardLayout
      title="Dashboard Perpustakaan"
      subtitle="Data dari Sistem Informasi Perpustakaan (SIMPUS)"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Koleksi"
          value={formatAngka(statistikPerpustakaan.totalKoleksi)}
          subtitle="Buku dan sumber digital"
          icon={<BookOpen className="h-6 w-6" />}
          trend={{ value: 5.2, label: 'vs tahun lalu' }}
        />
        <StatCard
          title="Anggota Aktif"
          value={formatAngka(statistikPerpustakaan.anggotaAktif)}
          subtitle={`Dari ${formatAngka(statistikPerpustakaan.anggotaAktif + statistikPerpustakaan.anggotaTidakAktif)} total`}
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 3.8, label: 'vs semester lalu' }}
        />
        <StatCard
          title="Peminjaman/Bulan"
          value={formatAngka(statistikPerpustakaan.rataRataPeminjaman)}
          subtitle="Rata-rata bulanan"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Koleksi Digital"
          value={formatAngka(statistikPerpustakaan.koleksiDigital)}
          subtitle="E-book & E-journal"
          icon={<Database className="h-6 w-6" />}
          variant="accent"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Borrowing Trends */}
        <ChartCard
          title="Tren Peminjaman & Pengembalian"
          subtitle="Data bulanan tahun 2024"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendPeminjaman}>
                <defs>
                  <linearGradient id="colorPinjam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 100%, 34%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 100%, 34%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorKembali" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), '']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="peminjaman"
                  stroke="hsl(217, 100%, 34%)"
                  fillOpacity={1}
                  fill="url(#colorPinjam)"
                  name="Peminjaman"
                />
                <Area
                  type="monotone"
                  dataKey="pengembalian"
                  stroke="hsl(142, 71%, 45%)"
                  fillOpacity={1}
                  fill="url(#colorKembali)"
                  name="Pengembalian"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Collection by Category */}
        <ChartCard
          title="Koleksi per Kategori"
          subtitle="Distribusi buku berdasarkan kategori ilmu"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={koleksiBuku}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="kategori" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}rb`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Buku']}
                />
                <Bar dataKey="jumlah" radius={[4, 4, 0, 0]}>
                  {koleksiBuku.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Collection Type Pie */}
        <ChartCard title="Jenis Koleksi" subtitle="Fisik vs Digital">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={collectionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="jumlah"
                  nameKey="jenis"
                >
                  <Cell fill="hsl(217, 100%, 34%)" />
                  <Cell fill="hsl(38, 92%, 50%)" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Item']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{formatAngka(statistikPerpustakaan.koleksiFisik)}</p>
              <p className="text-xs text-muted-foreground">Koleksi Fisik</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{formatAngka(statistikPerpustakaan.koleksiDigital)}</p>
              <p className="text-xs text-muted-foreground">Koleksi Digital</p>
            </div>
          </div>
        </ChartCard>

        {/* Member Status */}
        <ChartCard title="Status Anggota" subtitle="Aktif vs Tidak Aktif">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={memberData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="jumlah"
                  nameKey="status"
                >
                  <Cell fill="hsl(142, 71%, 45%)" />
                  <Cell fill="hsl(0, 84%, 60%)" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Anggota']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: 'hsl(142, 71%, 45%)' }}>
                {((statistikPerpustakaan.anggotaAktif / (statistikPerpustakaan.anggotaAktif + statistikPerpustakaan.anggotaTidakAktif)) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">Tingkat Aktif</p>
            </div>
          </div>
        </ChartCard>

        {/* Quick Stats */}
        <ChartCard title="Statistik Cepat" subtitle="Ringkasan data perpustakaan">
          <div className="space-y-4">
            {[
              { label: 'Total Koleksi', value: statistikPerpustakaan.totalKoleksi, color: 'hsl(217, 100%, 34%)' },
              { label: 'Buku Fisik', value: statistikPerpustakaan.koleksiFisik, color: 'hsl(217, 80%, 50%)' },
              { label: 'E-Resources', value: statistikPerpustakaan.koleksiDigital, color: 'hsl(38, 92%, 50%)' },
              { label: 'Anggota Aktif', value: statistikPerpustakaan.anggotaAktif, color: 'hsl(142, 71%, 45%)' },
              { label: 'Peminjaman/Bulan', value: statistikPerpustakaan.rataRataPeminjaman, color: 'hsl(262, 83%, 58%)' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-semibold">{formatAngka(item.value)}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Most Popular Books */}
      <ChartCard title="Buku Terpopuler" subtitle="10 buku dengan peminjaman terbanyak">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">No</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Judul Buku</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Penulis</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Peminjaman</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Popularitas</th>
              </tr>
            </thead>
            <tbody>
              {bukuTerpopuler.map((buku, index) => (
                <tr key={buku.judul} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        index < 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{buku.judul}</td>
                  <td className="py-3 px-4 text-muted-foreground">{buku.penulis}</td>
                  <td className="py-3 px-4 text-right font-semibold">{formatAngka(buku.peminjaman)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-24">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(buku.peminjaman / bukuTerpopuler[0].peminjaman) * 100}%` }}
                        />
                      </div>
                    </div>
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

export default Library;
