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
  BookOpen, 
  Award,
  Eye,
  X,
  Download,
  GraduationCap,
  FileText
} from "lucide-react";
import { 
  dataDosen, 
  daftarFakultasDosen, 
  daftarJabatanFungsional,
  daftarBidangKeahlian,
  prodiPerFakultasDosen,
  getStatusColor,
  dataPublikasi,
  dataPenelitian
} from "@/lib/mockDataDosen";

const LecturerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFakultas, setSelectedFakultas] = useState<string>("all");
  const [selectedProdi, setSelectedProdi] = useState<string>("all");
  const [selectedJabatan, setSelectedJabatan] = useState<string>("all");
  const [selectedBidang, setSelectedBidang] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Get available prodi based on selected fakultas
  const availableProdi = useMemo(() => {
    if (selectedFakultas === "all") {
      return [...new Set(dataDosen.map(d => d.prodi))].sort();
    }
    return prodiPerFakultasDosen[selectedFakultas] || [];
  }, [selectedFakultas]);

  // Reset prodi when fakultas changes
  const handleFakultasChange = (value: string) => {
    setSelectedFakultas(value);
    setSelectedProdi("all");
  };

  // Filter dosen
  const filteredDosen = useMemo(() => {
    return dataDosen.filter((d) => {
      const matchesSearch = 
        d.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.nidn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFakultas = selectedFakultas === "all" || d.fakultas === selectedFakultas;
      const matchesProdi = selectedProdi === "all" || d.prodi === selectedProdi;
      const matchesJabatan = selectedJabatan === "all" || d.jabatanFungsional === selectedJabatan;
      const matchesBidang = selectedBidang === "all" || d.bidangKeahlian.includes(selectedBidang);
      const matchesStatus = selectedStatus === "all" || d.status === selectedStatus;

      return matchesSearch && matchesFakultas && matchesProdi && matchesJabatan && matchesBidang && matchesStatus;
    });
  }, [searchQuery, selectedFakultas, selectedProdi, selectedJabatan, selectedBidang, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredDosen.length;
    const aktif = filteredDosen.filter(d => d.status === 'Aktif').length;
    const sertifikasi = filteredDosen.filter(d => d.sertifikasi).length;
    const guruBesar = filteredDosen.filter(d => d.jabatanFungsional === 'Guru Besar').length;
    
    // Count total publications and research
    let totalPublikasi = 0;
    let totalPenelitian = 0;
    filteredDosen.forEach(d => {
      totalPublikasi += (dataPublikasi[d.id] || []).length;
      totalPenelitian += (dataPenelitian[d.id] || []).length;
    });

    return { total, aktif, sertifikasi, guruBesar, totalPublikasi, totalPenelitian };
  }, [filteredDosen]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFakultas("all");
    setSelectedProdi("all");
    setSelectedJabatan("all");
    setSelectedBidang("all");
    setSelectedStatus("all");
  };

  const hasActiveFilters = searchQuery || selectedFakultas !== "all" || selectedProdi !== "all" || selectedJabatan !== "all" || selectedBidang !== "all" || selectedStatus !== "all";

  const getFullName = (d: typeof dataDosen[0]) => {
    const parts = [];
    if (d.gelarDepan) parts.push(d.gelarDepan);
    parts.push(d.nama);
    if (d.gelarBelakang) parts.push(d.gelarBelakang);
    return parts.join(" ");
  };

  return (
    <DashboardLayout title="Daftar Dosen" subtitle="Data lengkap dosen UNPATTI">
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
                  <p className="text-xs text-muted-foreground">Total Dosen</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.sertifikasi}</p>
                  <p className="text-xs text-muted-foreground">Bersertifikasi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.guruBesar}</p>
                  <p className="text-xs text-muted-foreground">Guru Besar</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalPublikasi}</p>
                  <p className="text-xs text-muted-foreground">Total Publikasi</p>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama, NIDN, atau email..."
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
                    {daftarFakultasDosen.map((f) => (
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

                {/* Jabatan Fungsional */}
                <Select value={selectedJabatan} onValueChange={setSelectedJabatan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Jabatan Fungsional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jabatan</SelectItem>
                    {daftarJabatanFungsional.map((j) => (
                      <SelectItem key={j} value={j}>{j}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Bidang Keahlian */}
                <Select value={selectedBidang} onValueChange={setSelectedBidang}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bidang Keahlian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Bidang</SelectItem>
                    {daftarBidangKeahlian.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
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
                    variant={selectedStatus === "Tugas Belajar" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus("Tugas Belajar")}
                  >
                    Tugas Belajar
                  </Badge>
                  <Badge
                    variant={selectedStatus === "Pensiun" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStatus("Pensiun")}
                  >
                    Pensiun
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
                    <TableHead>Dosen</TableHead>
                    <TableHead>NIDN</TableHead>
                    <TableHead>Fakultas / Prodi</TableHead>
                    <TableHead>Jabatan Fungsional</TableHead>
                    <TableHead>Bidang Keahlian</TableHead>
                    <TableHead className="text-center">Sertifikasi</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDosen.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        Tidak ada dosen yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDosen.map((d, index) => (
                      <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/lecturer/${d.id}`)}>
                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={d.foto} />
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {d.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{getFullName(d)}</p>
                              <p className="text-xs text-muted-foreground">{d.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{d.nidn}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{d.fakultas}</p>
                            <p className="text-xs text-muted-foreground">{d.prodi}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {d.jabatanFungsional}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {d.bidangKeahlian.slice(0, 2).map((b, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {b}
                              </Badge>
                            ))}
                            {d.bidangKeahlian.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{d.bidangKeahlian.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {d.sertifikasi ? (
                            <Badge className="bg-green-100 text-green-800">Ya</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">Tidak</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getStatusColor(d.status)}>{d.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/lecturer/${d.id}`);
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
          Menampilkan {filteredDosen.length} dari {dataDosen.length} dosen
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LecturerList;
