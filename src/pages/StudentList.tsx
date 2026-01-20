import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Users, 
  GraduationCap, 
  TrendingUp,
  Eye,
  X,
  Download
} from "lucide-react";
import { 
  daftarMahasiswa, 
  daftarFakultas, 
  prodiPerFakultas, 
  daftarAngkatan,
  getStatusColor 
} from "@/lib/mockDataMahasiswa";

const StudentList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFakultas, setSelectedFakultas] = useState<string>("all");
  const [selectedProdi, setSelectedProdi] = useState<string>("all");
  const [selectedAngkatan, setSelectedAngkatan] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Get available prodi based on selected fakultas
  const availableProdi = useMemo(() => {
    if (selectedFakultas === "all") {
      return [...new Set(daftarMahasiswa.map(m => m.prodi))].sort();
    }
    return prodiPerFakultas[selectedFakultas] || [];
  }, [selectedFakultas]);

  // Reset prodi when fakultas changes
  const handleFakultasChange = (value: string) => {
    setSelectedFakultas(value);
    setSelectedProdi("all");
  };

  // Filter mahasiswa
  const filteredMahasiswa = useMemo(() => {
    return daftarMahasiswa.filter((m) => {
      const matchesSearch = 
        m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFakultas = selectedFakultas === "all" || m.fakultas === selectedFakultas;
      const matchesProdi = selectedProdi === "all" || m.prodi === selectedProdi;
      const matchesAngkatan = selectedAngkatan === "all" || m.angkatan === parseInt(selectedAngkatan);
      const matchesStatus = selectedStatus === "all" || m.status === selectedStatus;

      return matchesSearch && matchesFakultas && matchesProdi && matchesAngkatan && matchesStatus;
    });
  }, [searchQuery, selectedFakultas, selectedProdi, selectedAngkatan, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredMahasiswa.length;
    const aktif = filteredMahasiswa.filter(m => m.status === 'Aktif').length;
    const avgIpk = filteredMahasiswa.length > 0 
      ? (filteredMahasiswa.reduce((sum, m) => sum + m.ipk, 0) / filteredMahasiswa.length).toFixed(2)
      : '0.00';
    const beasiswa = filteredMahasiswa.filter(m => m.beasiswa).length;
    return { total, aktif, avgIpk, beasiswa };
  }, [filteredMahasiswa]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFakultas("all");
    setSelectedProdi("all");
    setSelectedAngkatan("all");
    setSelectedStatus("all");
  };

  const hasActiveFilters = searchQuery || selectedFakultas !== "all" || selectedProdi !== "all" || selectedAngkatan !== "all" || selectedStatus !== "all";

  return (
    <DashboardLayout title="Daftar Mahasiswa" subtitle="Data lengkap mahasiswa UNPATTI">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Mahasiswa</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.aktif}</p>
                  <p className="text-xs text-muted-foreground">Mahasiswa Aktif</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.avgIpk}</p>
                  <p className="text-xs text-muted-foreground">Rata-rata IPK</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.beasiswa}</p>
                  <p className="text-xs text-muted-foreground">Penerima Beasiswa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter & Pencarian</span>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                    <X className="h-4 w-4 mr-1" /> Reset
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama, NIM, atau email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Fakultas */}
                <Select value={selectedFakultas} onValueChange={handleFakultasChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Fakultas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Fakultas</SelectItem>
                    {daftarFakultas.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Prodi */}
                <Select value={selectedProdi} onValueChange={setSelectedProdi}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Prodi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Prodi</SelectItem>
                    {availableProdi.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Angkatan */}
                <Select value={selectedAngkatan} onValueChange={setSelectedAngkatan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Angkatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Angkatan</SelectItem>
                    {daftarAngkatan.map((a) => (
                      <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                {/* Status Filter as Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedStatus === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus("all")}
                  >
                    Semua Status
                  </Badge>
                  <Badge
                    variant={selectedStatus === "Aktif" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus("Aktif")}
                  >
                    Aktif
                  </Badge>
                  <Badge
                    variant={selectedStatus === "Cuti" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus("Cuti")}
                  >
                    Cuti
                  </Badge>
                  <Badge
                    variant={selectedStatus === "Lulus" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus("Lulus")}
                  >
                    Lulus
                  </Badge>
                </div>

                <div className="ml-auto">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Mahasiswa</TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Fakultas / Prodi</TableHead>
                    <TableHead className="text-center">Angkatan</TableHead>
                    <TableHead className="text-center">Semester</TableHead>
                    <TableHead className="text-center">IPK</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMahasiswa.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        Tidak ada mahasiswa yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMahasiswa.map((m, index) => (
                      <TableRow key={m.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/student/${m.id}`)}>
                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={m.foto} />
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {m.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{m.nama}</p>
                              <p className="text-xs text-muted-foreground">{m.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{m.nim}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{m.fakultas}</p>
                            <p className="text-xs text-muted-foreground">{m.prodi}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{m.angkatan}</TableCell>
                        <TableCell className="text-center">{m.semester}</TableCell>
                        <TableCell className="text-center">
                          <span className={`font-medium ${m.ipk >= 3.5 ? 'text-green-600' : m.ipk >= 3.0 ? 'text-blue-600' : m.ipk >= 2.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {m.ipk.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getStatusColor(m.status)}>{m.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/student/${m.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="text-sm text-muted-foreground text-center">
          Menampilkan {filteredMahasiswa.length} dari {daftarMahasiswa.length} mahasiswa
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentList;
