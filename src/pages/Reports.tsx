import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const reports = [
  { nama: 'Laporan Akademik Semester', kategori: 'Akademik', terakhir: '15 Jan 2025', format: 'PDF' },
  { nama: 'Ringkasan SDM Bulanan', kategori: 'SDM', terakhir: '10 Jan 2025', format: 'Excel' },
  { nama: 'Laporan Keuangan Tahunan', kategori: 'Keuangan', terakhir: '05 Jan 2025', format: 'PDF' },
  { nama: 'Statistik Perpustakaan', kategori: 'Perpustakaan', terakhir: '12 Jan 2025', format: 'PDF' },
  { nama: 'Rekapitulasi Beasiswa', kategori: 'Kemahasiswaan', terakhir: '08 Jan 2025', format: 'Excel' },
];

const Reports = () => {
  return (
    <DashboardLayout title="Laporan" subtitle="Generator dan manajemen laporan data warehouse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {['Akademik', 'Keuangan', 'SDM'].map((cat) => (
          <div key={cat} className="stat-card cursor-pointer hover:border-primary transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg"><FileText className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="font-semibold">Template {cat}</p>
                <p className="text-sm text-muted-foreground">Buat laporan {cat.toLowerCase()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChartCard title="Laporan Tersedia" subtitle="Laporan yang dapat diunduh">
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.nama} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{r.nama}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> {r.terakhir}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{r.kategori}</Badge>
                <Badge>{r.format}</Badge>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-4 w-4" /> Unduh
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </DashboardLayout>
  );
};

export default Reports;
