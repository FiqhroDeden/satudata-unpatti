import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";
import { 
  Users, 
  TrendingUp,
  BarChart3,
  X,
  Check
} from "lucide-react";
import { 
  dataDosen, 
  daftarFakultasDosen,
  dataPublikasi,
  dataPenelitian,
  dataMataKuliahDiajar,
  dataBimbingan,
  dataPengabdian,
  formatRupiah
} from "@/lib/mockDataDosen";

// Colors for charts
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const LecturerComparison = () => {
  const [selectedFakultas, setSelectedFakultas] = useState<string>("all");
  const [selectedDosenIds, setSelectedDosenIds] = useState<string[]>(["1", "2"]);

  // Filter dosen by fakultas
  const availableDosen = useMemo(() => {
    if (selectedFakultas === "all") return dataDosen;
    return dataDosen.filter(d => d.fakultas === selectedFakultas);
  }, [selectedFakultas]);

  // Get selected dosen data
  const selectedDosen = useMemo(() => {
    return dataDosen.filter(d => selectedDosenIds.includes(d.id));
  }, [selectedDosenIds]);

  // Toggle dosen selection
  const toggleDosen = (id: string) => {
    if (selectedDosenIds.includes(id)) {
      if (selectedDosenIds.length > 1) {
        setSelectedDosenIds(prev => prev.filter(i => i !== id));
      }
    } else if (selectedDosenIds.length < 5) {
      setSelectedDosenIds(prev => [...prev, id]);
    }
  };

  // Calculate performance metrics for each dosen
  const performanceData = useMemo(() => {
    return selectedDosen.map((d, index) => {
      const publikasi = dataPublikasi[d.id] || [];
      const penelitian = dataPenelitian[d.id] || [];
      const mataKuliah = dataMataKuliahDiajar[d.id] || [];
      const bimbingan = dataBimbingan[d.id] || [];
      const pengabdian = dataPengabdian[d.id] || [];

      const totalPublikasi = publikasi.length;
      const totalSitasi = publikasi.reduce((sum, p) => sum + p.sitasi, 0);
      const publikasiInternasional = publikasi.filter(p => p.kategori === 'Internasional').length;
      const totalPenelitian = penelitian.length;
      const danaPenelitian = penelitian.reduce((sum, p) => sum + p.jumlahDana, 0);
      const totalSKS = mataKuliah.reduce((sum, m) => sum + m.sks, 0);
      const totalMahasiswaBimbingan = bimbingan.length;
      const totalPengabdian = pengabdian.length;

      return {
        id: d.id,
        nama: d.nama,
        color: COLORS[index % COLORS.length],
        totalPublikasi,
        totalSitasi,
        publikasiInternasional,
        totalPenelitian,
        danaPenelitian,
        totalSKS,
        totalMahasiswaBimbingan,
        totalPengabdian,
      };
    });
  }, [selectedDosen]);

  // Bar chart data for comparison
  const barChartData = useMemo(() => {
    const metrics = [
      { key: 'totalPublikasi', label: 'Publikasi' },
      { key: 'totalSitasi', label: 'Sitasi' },
      { key: 'totalPenelitian', label: 'Penelitian' },
      { key: 'totalSKS', label: 'Beban SKS' },
      { key: 'totalMahasiswaBimbingan', label: 'Bimbingan' },
      { key: 'totalPengabdian', label: 'Pengabdian' },
    ];

    return metrics.map(metric => {
      const data: Record<string, string | number> = { metric: metric.label };
      performanceData.forEach(p => {
        data[p.nama] = p[metric.key as keyof typeof p] as number;
      });
      return data;
    });
  }, [performanceData]);

  // Radar chart data
  const radarData = useMemo(() => {
    // Normalize values for radar chart (0-100 scale)
    const maxValues = {
      totalPublikasi: Math.max(...performanceData.map(p => p.totalPublikasi), 1),
      totalSitasi: Math.max(...performanceData.map(p => p.totalSitasi), 1),
      totalPenelitian: Math.max(...performanceData.map(p => p.totalPenelitian), 1),
      totalSKS: Math.max(...performanceData.map(p => p.totalSKS), 1),
      totalMahasiswaBimbingan: Math.max(...performanceData.map(p => p.totalMahasiswaBimbingan), 1),
      totalPengabdian: Math.max(...performanceData.map(p => p.totalPengabdian), 1),
    };

    const categories = [
      { key: 'totalPublikasi', label: 'Publikasi' },
      { key: 'totalSitasi', label: 'Sitasi' },
      { key: 'totalPenelitian', label: 'Penelitian' },
      { key: 'totalSKS', label: 'Beban SKS' },
      { key: 'totalMahasiswaBimbingan', label: 'Bimbingan' },
      { key: 'totalPengabdian', label: 'Pengabdian' },
    ];

    return categories.map(cat => {
      const data: Record<string, string | number> = { category: cat.label };
      performanceData.forEach(p => {
        const value = p[cat.key as keyof typeof maxValues] as number;
        const maxVal = maxValues[cat.key as keyof typeof maxValues];
        data[p.nama] = Math.round((value / maxVal) * 100);
      });
      return data;
    });
  }, [performanceData]);

  // Publication trend by year
  const publicationTrendData = useMemo(() => {
    const years = [2021, 2022, 2023, 2024];
    return years.map(year => {
      const data: Record<string, string | number> = { year: year.toString() };
      selectedDosen.forEach(d => {
        const publikasi = dataPublikasi[d.id] || [];
        data[d.nama] = publikasi.filter(p => p.tahun === year).length;
      });
      return data;
    });
  }, [selectedDosen]);

  // Research funding comparison
  const fundingData = useMemo(() => {
    return performanceData.map(p => ({
      nama: p.nama.split(' ')[0],
      danaPenelitian: p.danaPenelitian / 1000000, // Convert to millions
    }));
  }, [performanceData]);

  const getFullName = (d: typeof dataDosen[0]) => {
    const parts = [];
    if (d.gelarDepan) parts.push(d.gelarDepan);
    parts.push(d.nama);
    if (d.gelarBelakang) parts.push(d.gelarBelakang);
    return parts.join(" ");
  };

  return (
    <DashboardLayout title="Perbandingan Kinerja Dosen" subtitle="Analisis komparatif kinerja dosen UNPATTI">
      <div className="space-y-6">
        {/* Selection Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pilih Dosen untuk Dibandingkan
              </CardTitle>
              <Badge variant="outline">{selectedDosenIds.length}/5 dipilih</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Fakultas Filter */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Filter Fakultas:</span>
                <Select value={selectedFakultas} onValueChange={setSelectedFakultas}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Pilih Fakultas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Fakultas</SelectItem>
                    {daftarFakultasDosen.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dosen Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {availableDosen.map((d) => {
                  const isSelected = selectedDosenIds.includes(d.id);
                  const colorIndex = selectedDosenIds.indexOf(d.id);
                  return (
                    <div
                      key={d.id}
                      onClick={() => toggleDosen(d.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'border-border hover:border-muted-foreground/50'
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={d.foto} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {d.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {isSelected && (
                          <div 
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: COLORS[colorIndex % COLORS.length] }}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{d.nama}</p>
                        <p className="text-xs text-muted-foreground truncate">{d.jabatanFungsional}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Dosen Summary */}
              {selectedDosen.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Terpilih:</span>
                  {selectedDosen.map((d, index) => (
                    <Badge 
                      key={d.id} 
                      variant="secondary"
                      className="flex items-center gap-1"
                      style={{ borderLeft: `3px solid ${COLORS[index % COLORS.length]}` }}
                    >
                      {d.nama}
                      {selectedDosenIds.length > 1 && (
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDosen(d.id);
                          }}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {performanceData.map((p, index) => (
            <Card key={p.id} style={{ borderTop: `3px solid ${p.color}` }}>
              <CardContent className="p-4">
                <p className="font-medium text-sm truncate mb-2">{p.nama}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Publikasi</span>
                    <span className="font-medium">{p.totalPublikasi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sitasi</span>
                    <span className="font-medium">{p.totalSitasi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Penelitian</span>
                    <span className="font-medium">{p.totalPenelitian}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beban SKS</span>
                    <span className="font-medium">{p.totalSKS}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Perbandingan Metrik Kinerja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="metric" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  {selectedDosen.map((d, index) => (
                    <Bar 
                      key={d.id} 
                      dataKey={d.nama} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Profil Kinerja (Normalized)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  {selectedDosen.map((d, index) => (
                    <Radar
                      key={d.id}
                      name={d.nama}
                      dataKey={d.nama}
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.2}
                    />
                  ))}
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Publication Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tren Publikasi per Tahun</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={publicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedDosen.map((d, index) => (
                    <Line
                      key={d.id}
                      type="monotone"
                      dataKey={d.nama}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ fill: COLORS[index % COLORS.length] }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Research Funding Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Perbandingan Dana Penelitian (Juta Rp)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={fundingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nama" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`Rp ${value.toFixed(0)} Juta`, 'Dana Penelitian']}
                  />
                  <Bar dataKey="danaPenelitian" fill="hsl(var(--chart-1))">
                    {fundingData.map((entry, index) => (
                      <Bar key={`bar-${index}`} fill={COLORS[index % COLORS.length]} dataKey="danaPenelitian" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tabel Perbandingan Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Metrik</th>
                    {selectedDosen.map((d, index) => (
                      <th 
                        key={d.id} 
                        className="text-center py-3 px-4 font-medium"
                        style={{ borderBottom: `3px solid ${COLORS[index % COLORS.length]}` }}
                      >
                        {d.nama}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-muted-foreground">Jabatan Fungsional</td>
                    {selectedDosen.map((d) => (
                      <td key={d.id} className="text-center py-3 px-4">{d.jabatanFungsional}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground">Total Publikasi</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4 font-medium">{p.totalPublikasi}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-muted-foreground">Publikasi Internasional</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4">{p.publikasiInternasional}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground">Total Sitasi</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4 font-medium">{p.totalSitasi}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-muted-foreground">Total Penelitian</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4">{p.totalPenelitian}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground">Dana Penelitian</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4">{formatRupiah(p.danaPenelitian)}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-muted-foreground">Beban Mengajar (SKS)</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4">{p.totalSKS}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground">Mahasiswa Bimbingan</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4">{p.totalMahasiswaBimbingan}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-muted-foreground">Pengabdian Masyarakat</td>
                    {performanceData.map((p) => (
                      <td key={p.id} className="text-center py-3 px-4">{p.totalPengabdian}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4 text-muted-foreground">Sertifikasi</td>
                    {selectedDosen.map((d) => (
                      <td key={d.id} className="text-center py-3 px-4">
                        {d.sertifikasi ? (
                          <Badge className="bg-green-100 text-green-800">Ya</Badge>
                        ) : (
                          <Badge variant="outline">Tidak</Badge>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LecturerComparison;
