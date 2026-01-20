import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import {
  statistikRingkas,
  distribusiDosenPendidikan,
  distribusiStafPosisi,
  distribusiUsia,
  rasioDosenMahasiswa,
  trendPegawai,
  formatAngka,
} from '@/lib/mockData';
import { Users, GraduationCap, Award, Briefcase } from 'lucide-react';
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
  LineChart,
  Line,
} from 'recharts';

const CHART_COLORS = [
  'hsl(217, 100%, 34%)',
  'hsl(217, 80%, 50%)',
  'hsl(38, 92%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(262, 83%, 58%)',
  'hsl(0, 84%, 60%)',
  'hsl(199, 89%, 48%)',
];

const HR = () => {
  // Data gender
  const dataGender = [
    { gender: 'Pria', jumlah: 1022, persentase: 47.8 },
    { gender: 'Wanita', jumlah: 1117, persentase: 52.2 },
  ];

  // Data sertifikasi
  const dataSertifikasi = [
    { status: 'Tersertifikasi', jumlah: 892, persentase: 71.5 },
    { status: 'Belum Sertifikasi', jumlah: 355, persentase: 28.5 },
  ];

  return (
    <DashboardLayout
      title="Dashboard Sumber Daya Manusia"
      subtitle="Data dari Sistem Informasi Kepegawaian (SIMPEG)"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Dosen"
          value={formatAngka(statistikRingkas.totalDosen)}
          icon={<GraduationCap className="h-6 w-6" />}
          trend={{ value: 2.6, label: 'vs tahun lalu' }}
        />
        <StatCard
          title="Tenaga Kependidikan"
          value={formatAngka(statistikRingkas.totalTenagaKependidikan)}
          icon={<Briefcase className="h-6 w-6" />}
          trend={{ value: 3.0, label: 'vs tahun lalu' }}
        />
        <StatCard
          title="Dosen S3 (Doktor)"
          value={formatAngka(287)}
          subtitle="23% dari total dosen"
          icon={<Award className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Rasio Dosen:Mahasiswa"
          value="1:20"
          subtitle="Rata-rata universitas"
          icon={<Users className="h-6 w-6" />}
          variant="accent"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Education Level Pie */}
        <ChartCard
          title="Pendidikan Dosen"
          subtitle="Distribusi berdasarkan jenjang pendidikan"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribusiDosenPendidikan}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="jumlah"
                  nameKey="pendidikan"
                  label={({ pendidikan, persentase }) => `${pendidikan}: ${persentase}%`}
                  labelLine={false}
                >
                  {distribusiDosenPendidikan.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Dosen']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {distribusiDosenPendidikan.map((item, index) => (
              <div key={item.pendidikan} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[index] }}
                />
                <span className="text-xs text-muted-foreground">{item.pendidikan}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Staff Position Bar */}
        <ChartCard
          title="Distribusi Staf"
          subtitle="Berdasarkan posisi/jabatan"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribusiStafPosisi} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="posisi" tick={{ fontSize: 11 }} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Orang']}
                />
                <Bar dataKey="jumlah" fill="hsl(217, 100%, 34%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Gender & Certification */}
        <div className="space-y-6">
          <ChartCard title="Rasio Gender" subtitle="Seluruh pegawai">
            <div className="flex items-center justify-around py-4">
              {dataGender.map((item, index) => (
                <div key={item.gender} className="text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: index === 0 ? 'hsl(217, 100%, 34%, 0.1)' : 'hsl(338, 100%, 65%, 0.1)' }}
                  >
                    <span
                      className="text-xl font-bold"
                      style={{ color: index === 0 ? 'hsl(217, 100%, 34%)' : 'hsl(338, 100%, 65%)' }}
                    >
                      {item.persentase}%
                    </span>
                  </div>
                  <p className="font-medium">{item.gender}</p>
                  <p className="text-sm text-muted-foreground">{formatAngka(item.jumlah)} orang</p>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Sertifikasi Dosen" subtitle="Status sertifikasi pendidik">
            <div className="space-y-3 py-2">
              {dataSertifikasi.map((item, index) => (
                <div key={item.status} className="flex items-center gap-3">
                  <div
                    className="w-full h-8 rounded-lg relative overflow-hidden bg-secondary"
                  >
                    <div
                      className="h-full rounded-lg transition-all duration-500"
                      style={{
                        width: `${item.persentase}%`,
                        backgroundColor: index === 0 ? 'hsl(142, 71%, 45%)' : 'hsl(38, 92%, 50%)',
                      }}
                    />
                    <span className="absolute inset-0 flex items-center px-3 text-sm font-medium">
                      {item.status}: {item.persentase}% ({formatAngka(item.jumlah)})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Age Distribution */}
        <ChartCard
          title="Distribusi Usia Pegawai"
          subtitle="Piramida usia berdasarkan gender"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribusiUsia} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="kelompok" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatAngka(value), 'Orang']}
                />
                <Legend />
                <Bar dataKey="pria" fill="hsl(217, 100%, 34%)" name="Pria" radius={[0, 4, 4, 0]} />
                <Bar dataKey="wanita" fill="hsl(338, 100%, 65%)" name="Wanita" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Employee Growth Trend */}
        <ChartCard
          title="Tren Pertumbuhan Pegawai"
          subtitle="Jumlah dosen dan staf per tahun"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendPegawai}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
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
                <Line
                  type="monotone"
                  dataKey="dosen"
                  stroke="hsl(217, 100%, 34%)"
                  strokeWidth={3}
                  name="Dosen"
                  dot={{ fill: 'hsl(217, 100%, 34%)' }}
                />
                <Line
                  type="monotone"
                  dataKey="staf"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={3}
                  name="Staf"
                  dot={{ fill: 'hsl(38, 92%, 50%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Lecturer to Student Ratio Table */}
      <ChartCard
        title="Rasio Dosen-Mahasiswa per Fakultas"
        subtitle="Perbandingan jumlah dosen dengan mahasiswa di setiap fakultas"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fakultas</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Jumlah Dosen</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Jumlah Mahasiswa</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Rasio</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Indikator</th>
              </tr>
            </thead>
            <tbody>
              {rasioDosenMahasiswa.map((row) => {
                const rasioNum = parseInt(row.rasio.split(':')[1]);
                return (
                  <tr key={row.fakultas} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{row.fakultas}</td>
                    <td className="py-3 px-4 text-right">{formatAngka(row.dosen)}</td>
                    <td className="py-3 px-4 text-right">{formatAngka(row.mahasiswa)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{row.rasio}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-24">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(100, (30 - rasioNum) * 5)}%`,
                              backgroundColor:
                                rasioNum <= 15
                                  ? 'hsl(142, 71%, 45%)'
                                  : rasioNum <= 20
                                  ? 'hsl(217, 100%, 34%)'
                                  : rasioNum <= 25
                                  ? 'hsl(38, 92%, 50%)'
                                  : 'hsl(0, 84%, 60%)',
                            }}
                          />
                        </div>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              rasioNum <= 15
                                ? 'hsl(142, 71%, 45%)'
                                : rasioNum <= 20
                                ? 'hsl(217, 100%, 34%)'
                                : rasioNum <= 25
                                ? 'hsl(38, 92%, 50%)'
                                : 'hsl(0, 84%, 60%)',
                          }}
                        >
                          {rasioNum <= 15 ? 'Ideal' : rasioNum <= 20 ? 'Baik' : rasioNum <= 25 ? 'Cukup' : 'Perlu Perhatian'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </DashboardLayout>
  );
};

export default HR;
