// Sistem Absensi Mahasiswa - Contoh Enkapsulasi Kotlin

class Mahasiswa {
    private var nim: String = ""
    private var nama: String = ""

    fun setNim(nim: String) {
        require(nim.isNotBlank()) { "NIM tidak boleh kosong" }
        this.nim = nim
    }

    fun getNim() = nim

    fun setNama(nama: String) {
        require(nama.isNotBlank()) { "Nama tidak boleh kosong" }
        this.nama = nama
    }

    fun getNama() = nama
}

class Absensi {
    private var tanggal = ""
    private var jam = ""
    private var status = ""

    fun setTanggal(tanggal: String) { this.tanggal = tanggal }
    fun getTanggal() = tanggal

    fun setJam(jam: String) { this.jam = jam }
    fun getJam() = jam

    fun setStatus(status: String) {
        require(status in listOf("Hadir", "Izin", "Sakit")) {
            "Status harus Hadir, Izin, atau Sakit"
        }
        this.status = status
    }

    fun getStatus() = status
}

class RiwayatAbsensi {
    private val daftarAbsensi = mutableListOf<Absensi>()

    fun tambah(absensi: Absensi) {
        daftarAbsensi.add(absensi)
    }

    fun lihatRiwayat(): List<Absensi> = daftarAbsensi
}

fun main() {
    val mahasiswa = Mahasiswa()
    mahasiswa.setNim("04231094")
    mahasiswa.setNama("Zuda Ersa Hidayat")

    val absensi = Absensi()
    absensi.setTanggal("04-07-2026")
    absensi.setJam("08:00")
    absensi.setStatus("Hadir")

    val riwayat = RiwayatAbsensi()
    riwayat.tambah(absensi)

    println("=== SISTEM ABSENSI MAHASISWA ===")
    println("NIM    : ${mahasiswa.getNim()}")
    println("Nama   : ${mahasiswa.getNama()}")
    println("Status : ${absensi.getStatus()}")
    println("Jumlah Riwayat : ${riwayat.lihatRiwayat().size}")
}

