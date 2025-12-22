import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchBar";
import ScrollToTopButton from "@/components/scrollToTop";
import Link from "next/link";


export default function Home() {

  const nikArray = [
    "3173010911990018",
    "3174091205010001",
    "3175080504010008",
    "3175101502010013",
    "3276011404990016",
    "3276012203980002",
    "3277050710990010",
    "3279011911990009",
    "3374011105990004",
    "3374052909990012",
    "3471060103000006",
    "3471080101010019",
    "3472010805000014",
    "3578033105000020",
    "3579012107980015",
    "3579022008010005",
    "3671021712000017",
    "3671062506000007",
    "3674060212000011",
    "3674091507000003"
  ];
  

    const handleSearch = (text: string) => {
      console.log("Cari:", text);
    };
  
    return (
      <div className="pl-72 pt-25">
        <Navbar />
        <Sidebar />
        <div className="flex flex-col items-start gap-5"> 
            <h1 className="text-2xl font-bold">Langkah-langkah testing</h1>
            <h1 className="">Klik icon pada bagian kiri navbar untuk kembali ke halaman ini</h1>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">A. Page Pasien</h1>
                <h1 className="text-md">1. Untuk melakukan add pasien, klik tombol add lalu isi kolom nik dengan data yang disediakan (dipaling bawah) atau masukan nik acak 13 digit dan masukan sisa datanya secara manual sesuai format</h1>
                <h1 className="text-md">2. Anda bisa mengubah detail perawatan pasien dengan merubah beberapa opsi pada tabel (tanggal keluar, ruangan, status)</h1>
                <h1 className="text-md">3. Klik tombol dengan icon manusia untuk melihat dan mengedit bio pasien</h1>
                <h1 className="text-md">4. Hapus data atau tidakpun tidak masalah</h1>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">B. Page Ruangan</h1>
                <h1 className="text-md">1. Untuk melakukan add ruangan, klik tombol add ruangan dan isi form sesuai format</h1>
                <h1 className="text-md">2. Anda bisa mengubah detail ruangan dengan klik tombol dengan icon pensil</h1>
                <h1 className="text-md">3. Hapus data atau tidakpun tidak masalah</h1>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">C. Page Staff</h1>
                <h1 className="text-md">1. Untuk melakukan add staff, klik tombol add lalu isi kolom nik dengan data yang disediakan (dipaling bawah) atau masukan nik acak 13 digit dan masukan sisa datanya secara manual sesuai format</h1>
                <h1 className="text-md">2. Anda bisa mengubah detail staff dengan klik tombol dengan icon pensil</h1>
                <h1 className="text-md">3. Hapus data atau tidakpun tidak masalah</h1>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">D. Data Dummy NIK</h1>
                {nikArray.map((nik, index) => (
                <h1 className="text-md" key={index}>{nik}</h1>
                ))}
            </div>
        </div>
        <ScrollToTopButton />
      </div>
    );
  }