// ===========================
// SISTEM ABSENSI MAHASISWA
// File : script.js
// ===========================

// Login
function login() {
  let nama = document.getElementById("nama").value.trim();
  let nim = document.getElementById("nim").value.trim();

  if (nama === "" || nim === "") {
    alert("Nama dan NIM harus diisi!");
    return;
  }

  localStorage.setItem("nama", nama);
  localStorage.setItem("nim", nim);
  tampilDashboard();
}

// Menampilkan Dashboard
function tampilDashboard() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboardPage").classList.remove("hidden");

  document.getElementById("namaMahasiswa").textContent = localStorage.getItem("nama");
  document.getElementById("nimMahasiswa").textContent = localStorage.getItem("nim");

  updateJam();
}

// Jam dan Tanggal
function updateJam() {
  let sekarang = new Date();
  document.getElementById("tanggal").innerHTML = sekarang.toLocaleDateString("id-ID");
  document.getElementById("jam").innerHTML = sekarang.toLocaleTimeString("id-ID");
}
setInterval(updateJam, 1000);

// Absen
function absen(status) {
  let sekarang = new Date();
  let tanggal = sekarang.toLocaleDateString("id-ID");
  let jam = sekarang.toLocaleTimeString("id-ID");
  let nimSaatIni = localStorage.getItem("nim");

  let data = JSON.parse(localStorage.getItem("riwayat")) || [];

  // FIX: cek apakah MAHASISWA INI (bukan sembarang mahasiswa) sudah absen HARI INI.
  // Sebelumnya pengecekan hanya berdasarkan tanggal, tanpa memeriksa NIM,
  // sehingga jika mahasiswa lain sudah absen hari itu, mahasiswa berikutnya
  // yang login di perangkat yang sama akan salah dianggap "sudah absen".
  let sudahAbsen = data.find(
    (item) => item.nim === nimSaatIni && item.tanggal === tanggal
  );

  if (sudahAbsen) {
    alert("Anda sudah melakukan absensi hari ini.");
    return;
  }

  data.push({
    nama: localStorage.getItem("nama"),
    nim: nimSaatIni,
    tanggal: tanggal,
    jam: jam,
    status: status,
  });

  localStorage.setItem("riwayat", JSON.stringify(data));
  alert("Absensi berhasil disimpan!");
}

// Riwayat
function lihatRiwayat() {
  document.getElementById("dashboardPage").classList.add("hidden");
  document.getElementById("riwayatPage").classList.remove("hidden");

  let tabel = document.getElementById("dataRiwayat");
  tabel.innerHTML = "";

  let nimSaatIni = localStorage.getItem("nim");
  let data = JSON.parse(localStorage.getItem("riwayat")) || [];

  // FIX: hanya tampilkan riwayat milik mahasiswa yang sedang login,
  // bukan riwayat semua mahasiswa yang pernah absen di perangkat ini.
  let dataSaya = data.filter((item) => item.nim === nimSaatIni);

  dataSaya.forEach(function (item) {
    tabel.innerHTML += `
      <tr>
        <td>${item.tanggal}</td>
        <td>${item.jam}</td>
        <td>${item.status}</td>
      </tr>
    `;
  });
}

// Kembali ke Dashboard
function kembaliDashboard() {
  document.getElementById("riwayatPage").classList.add("hidden");
  document.getElementById("dashboardPage").classList.remove("hidden");
}

// Logout
function logout() {
  localStorage.removeItem("nama");
  localStorage.removeItem("nim");

  document.getElementById("dashboardPage").classList.add("hidden");
  document.getElementById("riwayatPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");

  document.getElementById("nama").value = "";
  document.getElementById("nim").value = "";
}

// Login otomatis jika data masih ada
window.onload = function () {
  if (localStorage.getItem("nama") && localStorage.getItem("nim")) {
    tampilDashboard();
  }
};
