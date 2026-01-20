import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import {
  anggaranPerUnit,
  pendapatanPengeluaran,
  kategoriPengeluaran,
  statusPembayaranUKT,
  formatRupiah,
  formatAngka,
} from '@/lib/mockData';
import { Wallet, TrendingUp, PieChart as PieChartIcon, CreditCard } from 'lucide-react';
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
  Cell,
  PieChart,
  Pie,
  Legend,
  ComposedChart,
  Line,
} from 'recharts';
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
  'hsl(28, 80%, 52%)',
  'hsl(280, 65%, 60%)',
  'hsl(180, 50%, 45%)',
];

const Finance = () => {
  const totalAnggaran = anggaranPerUnit.reduce((sum, item) => sum + item.anggaran, 0);
  const totalRealisasi = anggaranPerUnit.reduce((sum, item) => sum + item.realisasi, 0);
  const persentaseRealisasi = ((totalRealisasi / totalAnggaran) * 100).toFixed(1);

  const totalPendapatan = pendapatanPengeluaran.reduce((sum, item) => sum + item.pendapatan, 0);
  const totalPengeluaran = pendapatanPengeluaran.reduce((sum, item) => sum + item.pengeluaran, 0);

  // Calculate budget utilization for gauge
  const budgetData = anggaranPerUnit.map((item) => ({
    ...item,
    realisasiPersen: ((item.realisasi / item.anggaran) * 100).toFixed(1),
  }));

  return (
    <DashboardLayout
      title="Dashboard Keuangan"
      subtitle="Data dari Sistem Informasi Keuangan (SIMKEU)"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Anggaran"
          value={formatRupiah(totalAnggaran).replace('Rp', 'Rp ')}
          subtitle="Tahun Anggaran 2024"
          icon={<Wallet className="h-6 w-6" />}
        />
        <StatCard
          title="Total Realisasi"
          value={formatRupiah(totalRealisasi).replace('Rp', 'Rp ')}
          subtitle={`${persentaseRealisasi}% dari anggaran`}
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: parseFloat(persentaseRealisasi) - 85, label: 'vs target' }}
        />
        <StatCard
          title="Pendapatan YTD"
          value={`Rp ${(totalPendapatan / 1000).toFixed(0)}M`}
          subtitle="Januari - Desember"
          icon={<PieChartIcon className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Pembayaran UKT"
          value="86.2%"
          subtitle="Sudah lunas"
          icon={<CreditCard className="h-6 w-6" />}
          variant="accent"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue vs Expenses */}
        <ChartCard
          title="Pendapatan vs Pengeluaran"
          subtitle="Tren bulanan (dalam jutaan Rupiah)"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={pendapatanPengeluaran}>
                <defs>
                  <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`Rp ${formatAngka(value)} Juta`, '']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="pendapatan"
                  stroke="hsl(142, 71%, 45%)"
                  fillOpacity={1}
                  fill="url(#colorPendapatan)"
                  name="Pendapatan"
                />
                <Line
                  type="monotone"
                  dataKey="pengeluaran"
                  stroke="hsl(0, 84%, 60%)"
                  strokeWidth={2}
                  name="Pengeluaran"
                  dot={{ fill: 'hsl(0, 84%, 60%)' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Expense Categories */}
        <ChartCard title="Kategori Pengeluaran" subtitle="Distribusi anggaran berdasarkan kategori">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={kategoriPengeluaran}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="jumlah"
                  nameKey="kategori"
                >
                  {kategoriPengeluaran.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatRupiah(value), '']}
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Budget per Unit */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Anggaran per Unit"
            subtitle="Perbandingan anggaran dan realisasi per fakultas/unit"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000000).toFixed(0)}M`} />
                  <YAxis type="category" dataKey="unit" tick={{ fontSize: 11 }} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatRupiah(value), '']}
                  />
                  <Legend />
                  <Bar dataKey="anggaran" fill="hsl(217, 100%, 34%)" name="Anggaran" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="realisasi" fill="hsl(142, 71%, 45%)" name="Realisasi" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* UKT Payment Status */}
        <ChartCard title="Status Pembayaran UKT" subtitle="Tahun akademik 2024/2025">
          <div className="space-y-6 py-4">
            {statusPembayaranUKT.map((item, index) => (
              <div key={item.status} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.status}</span>
                  <span className="text-muted-foreground">
                    {formatAngka(item.jumlah)} ({item.persentase}%)
                  </span>
                </div>
                <Progress
                  value={item.persentase}
                  className={cn(
                    'h-3',
                    index === 0 && '[&>div]:bg-emerald-500',
                    index === 1 && '[&>div]:bg-amber-500',
                    index === 2 && '[&>div]:bg-red-500'
                  )}
                />
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{formatAngka(24892)}</p>
                <p className="text-sm text-muted-foreground">Total Mahasiswa</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Budget Utilization Table */}
      <ChartCard
        title="Realisasi Anggaran per Unit"
        subtitle="Detail penyerapan anggaran setiap fakultas dan unit kerja"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Unit</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Anggaran</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Realisasi</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sisa</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Penyerapan</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row) => {
                const sisa = row.anggaran - row.realisasi;
                const persen = parseFloat(row.realisasiPersen);
                return (
                  <tr key={row.unit} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{row.unit}</td>
                    <td className="py-3 px-4 text-right">{formatRupiah(row.anggaran)}</td>
                    <td className="py-3 px-4 text-right text-primary font-medium">{formatRupiah(row.realisasi)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{formatRupiah(sisa)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-32">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${persen}%`,
                              backgroundColor:
                                persen >= 90
                                  ? 'hsl(142, 71%, 45%)'
                                  : persen >= 75
                                  ? 'hsl(217, 100%, 34%)'
                                  : persen >= 50
                                  ? 'hsl(38, 92%, 50%)'
                                  : 'hsl(0, 84%, 60%)',
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-medium w-12 text-right"
                          style={{
                            color:
                              persen >= 90
                                ? 'hsl(142, 71%, 45%)'
                                : persen >= 75
                                ? 'hsl(217, 100%, 34%)'
                                : persen >= 50
                                ? 'hsl(38, 92%, 50%)'
                                : 'hsl(0, 84%, 60%)',
                          }}
                        >
                          {persen}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-secondary/50 font-semibold">
                <td className="py-3 px-4">Total</td>
                <td className="py-3 px-4 text-right">{formatRupiah(totalAnggaran)}</td>
                <td className="py-3 px-4 text-right text-primary">{formatRupiah(totalRealisasi)}</td>
                <td className="py-3 px-4 text-right">{formatRupiah(totalAnggaran - totalRealisasi)}</td>
                <td className="py-3 px-4">
                  <span className="text-primary">{persentaseRealisasi}%</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </ChartCard>
    </DashboardLayout>
  );
};

export default Finance;
