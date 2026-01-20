import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { etlStatus, formatTanggal, formatAngka } from '@/lib/mockData';
import { CheckCircle2, AlertCircle, XCircle, Clock, RefreshCw, Database, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ETL = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout title="ETL Monitor" subtitle="Pemantauan proses Extract-Transform-Load">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="stat-card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold">{etlStatus.filter(e => e.status === 'success').length}</p>
          <p className="text-sm text-muted-foreground">Sukses</p>
        </div>
        <div className="stat-card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-3xl font-bold">{etlStatus.filter(e => e.status === 'warning').length}</p>
          <p className="text-sm text-muted-foreground">Peringatan</p>
        </div>
        <div className="stat-card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-3xl font-bold">{etlStatus.filter(e => e.status === 'failed').length}</p>
          <p className="text-sm text-muted-foreground">Gagal</p>
        </div>
      </div>

      <ChartCard title="Status Proses ETL" subtitle="Detail proses dari setiap sistem sumber">
        <div className="space-y-4">
          {etlStatus.map((item) => (
            <div key={item.sistem} className={cn(
              'p-4 rounded-lg border',
              item.status === 'failed' && 'border-red-200 bg-red-50/50',
              item.status === 'warning' && 'border-amber-200 bg-amber-50/50',
              item.status === 'success' && 'border-border'
            )}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-semibold">{item.sistem}</p>
                    <p className="text-sm text-muted-foreground">{formatAngka(item.recordsProcessed)} record diproses</p>
                  </div>
                </div>
                <Badge className={cn(
                  item.status === 'success' && 'bg-emerald-100 text-emerald-700',
                  item.status === 'warning' && 'bg-amber-100 text-amber-700',
                  item.status === 'failed' && 'bg-red-100 text-red-700'
                )}>
                  {item.status === 'success' ? 'Sukses' : item.status === 'warning' ? 'Peringatan' : 'Gagal'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Terakhir: {formatTanggal(item.lastRun)}</span>
                <span>Durasi: {item.duration}</span>
                <span>Berikutnya: {formatTanggal(item.nextRun)}</span>
              </div>
              {item.status === 'failed' && (
                <Button size="sm" className="mt-3 gap-2">
                  <RefreshCw className="h-4 w-4" /> Jalankan Ulang
                </Button>
              )}
            </div>
          ))}
        </div>
      </ChartCard>

      <div className="mt-6">
        <ChartCard title="Alur Data ETL" subtitle="Diagram proses integrasi data warehouse">
          <div className="flex flex-wrap items-center justify-center gap-4 py-8">
            {['SIAKAD', 'SIMPEG', 'SIMKEU', 'SIMPUS', 'SIMAWA'].map((sys, i) => (
              <div key={sys} className="flex items-center gap-2">
                <div className="px-4 py-2 bg-primary/10 rounded-lg text-primary font-medium">{sys}</div>
                {i < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />}
              </div>
            ))}
            <ArrowRight className="h-5 w-5 text-primary" />
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2">
              <Database className="h-5 w-5" /> Data Warehouse
            </div>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default ETL;
