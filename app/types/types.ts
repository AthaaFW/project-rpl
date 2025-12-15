export interface PerawatanType {
  id_perawatan: string;
  nik_pasien: string;
  nama_pasien: string;
  id_staff?: string | null;
  nama_staff?: string | null;
  id_ruangan?: string | null;
  nama_ruangan?: string | null;
  tgl_masuk?: string | null;
  tgl_keluar?: string | null;
  status?: string;
}
