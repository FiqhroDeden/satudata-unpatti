import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import {
  organisasiMahasiswa,
  distribusiBeasiswa,
  prestasiMahasiswa,
  formatAngka,
} from '@/lib/mockData';
import { Award, Users, Medal, Trophy } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Badge } from '@/components/ui/badge';

const CHART_COLORS = [
  'hsl(217, 100%, 34%)',
  'hsl(217, 80%, 50%)',
  'hsl(38, 92%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(262, 83%, 58%)',
];

const StudentAffairs = () => {
  const totalAnggotaOrganisasi = organisasiMahasiswa.reduce((sum, org) => sum + org.anggota, 0);
  const totalPenerimaBeasiswa = distribusiBeasiswa.reduce((sum, b) => sum + b.penerima, 0);
  const totalPrestasi = prestasiMahasiswa.reduce(
    (sum, p) => sum + p.emas + p.perak + p.perunggu,
    0
  );
  const totalEmas = prestasiMahasiswa.reduce((sum, p) => sum + p.emas, 0);

  return (
    <DashboardLayout
      title="Dashboard Kemahasiswaan"
      subtitle="Data dari Sistem Informasi Kemahasiswaan (SIMAWA)"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Organisasi Aktif"
          value={organisasiMahasiswa.length}
          subtitle={`${formatAngka(totalAnggotaOrganisasi)} anggota total`}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Penerima Beasiswa"
          value={formatAngka(totalPenerimaBeasiswa)}
          subtitle="Tahun akademik berjalan"
          icon={<Award className="h-6 w-6" />}
          trend={{ value: 8.5, label: 'vs tahun lalu' }}
        />
        <StatCard
          title="Total Prestasi"
          value={formatAngka(totalPrestasi)}
          subtitle="Penghargaan diraih"
          icon={<Trophy className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Medali Emas"
          value={totalEmas}
          subtitle="Prestasi tertinggi"
          icon={<Medal className="h-6 w-6" />}
          variant="accent"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Scholarship Distribution */}
        <ChartCard
          title="Distribusi Beasiswa"
          subtitle="Penerima beasiswa berdasarkan jenis"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribusiBeasiswa}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="penerima"
                  nameKey="jenis"
                  label={({ jenis, persentase }) => `${persentase}%`}
                >
                  {distribusiBeasiswa.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Penerima']}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Achievement by Category */}
        <ChartCard
          title="Prestasi per Kategori"
          subtitle="Medali yang diraih berdasarkan kategori kompetisi"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prestasiMahasiswa}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="kategori" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="emas" fill="hsl(38, 92%, 50%)" name="Emas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="perak" fill="hsl(0, 0%, 70%)" name="Perak" radius={[4, 4, 0, 0]} />
                <Bar dataKey="perunggu" fill="hsl(28, 80%, 52%)" name="Perunggu" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Organizations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Organisasi Mahasiswa"
          subtitle="Daftar organisasi kemahasiswaan aktif"
        >
          <div className="space-y-3">
            {organisasiMahasiswa.map((org, index) => (
              <div
                key={org.nama}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                    style={{
                      backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}20`,
                      color: CHART_COLORS[index % CHART_COLORS.length],
                    }}
                  >
                    {org.nama.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{org.nama}</p>
                    <p className="text-sm text-muted-foreground">{formatAngka(org.anggota)} anggota</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {org.status}
                </Badge>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Ringkasan Beasiswa"
          subtitle="Detail penerima beasiswa per jenis"
        >
          <div className="space-y-4">
            {distribusiBeasiswa.map((beasiswa, index) => (
              <div key={beasiswa.jenis} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span className="font-medium">{beasiswa.jenis}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{formatAngka(beasiswa.penerima)}</span>
                    <span className="text-muted-foreground ml-2">({beasiswa.persentase}%)</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${beasiswa.persentase}%`,
                      backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Penerima</span>
                <span className="text-2xl font-bold text-primary">{formatAngka(totalPenerimaBeasiswa)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Kategori Prestasi Tertinggi</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-2">
                  <Medal className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-2xl font-bold">{totalEmas}</p>
                <p className="text-xs text-muted-foreground">Emas</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-2">
                  <Medal className="h-6 w-6 text-slate-500" />
                </div>
                <p className="text-2xl font-bold">
                  {prestasiMahasiswa.reduce((sum, p) => sum + p.perak, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Perak</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-2">
                  <Medal className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold">
                  {prestasiMahasiswa.reduce((sum, p) => sum + p.perunggu, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Perunggu</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default StudentAffairs;
