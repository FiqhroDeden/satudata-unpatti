import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const facultyPerformance = [
  { fakultas: 'FKIP', ipk: 85, kelulusan: 78, penelitian: 72, kehadiran: 89 },
  { fakultas: 'FEB', ipk: 82, kelulusan: 75, penelitian: 68, kehadiran: 87 },
  { fakultas: 'FT', ipk: 88, kelulusan: 82, penelitian: 85, kehadiran: 88 },
  { fakultas: 'FMIPA', ipk: 90, kelulusan: 85, penelitian: 92, kehadiran: 90 },
  { fakultas: 'FK', ipk: 94, kelulusan: 94, penelitian: 88, kehadiran: 93 },
];

const radarData = [
  { metric: 'IPK', value: 85 },
  { metric: 'Kelulusan', value: 78 },
  { metric: 'Penelitian', value: 75 },
  { metric: 'Kehadiran', value: 87 },
  { metric: 'Publikasi', value: 68 },
  { metric: 'Kepuasan', value: 82 },
];

const Analytics = () => {
  return (
    <DashboardLayout title="Analitik Terintegrasi" subtitle="Analisis lintas sistem data warehouse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Skor Performa" value="82.5" subtitle="Rata-rata universitas" icon={<BarChart3 className="h-6 w-6" />} variant="primary" />
        <StatCard title="Tren Positif" value="+5.2%" subtitle="vs tahun lalu" icon={<TrendingUp className="h-6 w-6" />} />
        <StatCard title="Korelasi IPK-Kehadiran" value="0.78" subtitle="Koefisien korelasi" icon={<Target className="h-6 w-6" />} />
        <StatCard title="Retensi Mahasiswa" value="94.2%" subtitle="Tingkat bertahan" icon={<Users className="h-6 w-6" />} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Radar Performa Universitas" subtitle="Metrik kunci performa">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <Radar dataKey="value" stroke="hsl(217, 100%, 34%)" fill="hsl(217, 100%, 34%)" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Perbandingan Fakultas" subtitle="Metrik performa per fakultas">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Fakultas</th>
                  <th className="text-right py-2 px-3">IPK</th>
                  <th className="text-right py-2 px-3">Kelulusan</th>
                  <th className="text-right py-2 px-3">Penelitian</th>
                  <th className="text-right py-2 px-3">Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {facultyPerformance.map((f) => (
                  <tr key={f.fakultas} className="border-b border-border/50">
                    <td className="py-2 px-3 font-medium">{f.fakultas}</td>
                    <td className="py-2 px-3 text-right">{f.ipk}</td>
                    <td className="py-2 px-3 text-right">{f.kelulusan}%</td>
                    <td className="py-2 px-3 text-right">{f.penelitian}</td>
                    <td className="py-2 px-3 text-right">{f.kehadiran}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
