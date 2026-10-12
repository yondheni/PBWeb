var daftarPilihan = [];

var namaPengguna = "";
var emailPengguna = "";
var jumlahPilihan = 0;

var inputNama = document.getElementById("nama");
var inputJumlah = document.getElementById("jumlah");
var inputEmail = document.getElementById("email");

var bagianPilihan = document.getElementById("bagianPilihan");
var bagianMetode = document.getElementById("bagianMetode");
var bagianEmail = document.getElementById("bagianEmail");
var bagianHasil = document.getElementById("bagianHasil");

// Memeriksa data pengisi
document.getElementById("btnNama").addEventListener("click", function () {
  namaPengguna = inputNama.value.trim();
  jumlahPilihan = Number(inputJumlah.value);

  if (namaPengguna === "") {
    document.getElementById("pesanAwal").textContent =
      "Nama lengkap harus diisi.";
    inputNama.focus();
  } else if (
    inputJumlah.value === "" ||
    jumlahPilihan < 1 ||
    jumlahPilihan > 10 ||
    jumlahPilihan % 1 !== 0
  ) {
    document.getElementById("pesanAwal").textContent =
      "Masukkan jumlah opsi berupa bilangan bulat dari 1 sampai 10.";
    inputJumlah.focus();
  } else {
    document.getElementById("pesanAwal").textContent = "";

    bagianPilihan.classList.add("sembunyi");
    bagianMetode.classList.add("sembunyi");
    bagianEmail.classList.add("sembunyi");
    bagianHasil.classList.add("sembunyi");

    buatInputPilihan(jumlahPilihan);
    bagianPilihan.classList.remove("sembunyi");
  }
});

// Membuat kolom untuk nama makanan atau minuman
function buatInputPilihan(jumlah) {
  var tempatInput = document.getElementById("inputPilihan");

  tempatInput.innerHTML = "";

  for (var i = 0; i < jumlah; i++) {
    var label = document.createElement("label");
    label.textContent = "Makanan atau minuman ke-" + (i + 1);

    var input = document.createElement("input");
    input.type = "text";
    input.id = "pilihan" + i;
    input.className = "input-pilihan";
    input.placeholder = "Contoh: nasi goreng atau es teh";

    tempatInput.appendChild(label);
    tempatInput.appendChild(input);
  }
}
document.getElementById("btnPilihan").addEventListener("click", function () {
  daftarPilihan = [];

  var semuaTerisi = true;

  for (var i = 0; i < jumlahPilihan; i++) {
    var teks = document.getElementById("pilihan" + i).value.trim();

    if (teks === "") {
      semuaTerisi = false;
    }

    daftarPilihan.push(teks);
  }

  if (semuaTerisi === false) {
    document.getElementById("pesanPilihan").textContent =
      "Semua nama makanan atau minuman harus diisi.";
  } else {
    document.getElementById("pesanPilihan").textContent = "";

    buatPilihanUtama();
    buatPilihanTambahan();
    buatDaftarOpsi();

    bagianMetode.classList.remove("sembunyi");
  }
});

// Membuat pilihan favorit utama
function buatPilihanUtama() {
  var tempat = document.getElementById("radioPilihan");

  tempat.innerHTML = "";

  for (var i = 0; i < daftarPilihan.length; i++) {
    var label = document.createElement("label");
    label.className = "opsi";

    var input = document.createElement("input");
    input.type = "radio";
    input.name = "pilihanUtama";
    input.value = daftarPilihan[i];

    label.appendChild(input);
    label.appendChild(document.createTextNode(daftarPilihan[i]));

    tempat.appendChild(label);
  }
}

// Membuat daftar makanan atau minuman favorit lainnya
function buatPilihanTambahan() {
  var tempat = document.getElementById("checkboxPilihan");

  tempat.innerHTML = "";

  for (var i = 0; i < daftarPilihan.length; i++) {
    var label = document.createElement("label");
    label.className = "opsi";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "pilihanTambahan";
    input.value = daftarPilihan[i];

    label.appendChild(input);
    label.appendChild(document.createTextNode(daftarPilihan[i]));

    tempat.appendChild(label);
  }
}

// Mmbuat daftar pilihan makanan atau minuman
function buatDaftarOpsi() {
  var dropdown = document.getElementById("dropdownPilihan");

  dropdown.innerHTML = "";

  var pilihanAwal = document.createElement("option");
  pilihanAwal.value = "";
  pilihanAwal.textContent = "Pilih makanan atau minuman";

  dropdown.appendChild(pilihanAwal);

  for (var i = 0; i < daftarPilihan.length; i++) {
    var pilihan = document.createElement("option");

    pilihan.value = daftarPilihan[i];
    pilihan.textContent = daftarPilihan[i];

    dropdown.appendChild(pilihan);
  }
}

// Memeriksa kelengkapan pilihan
document.getElementById("btnMetode").addEventListener("click", function () {
  var pilihanUtama = document.querySelector(
    'input[name="pilihanUtama"]:checked',
  );

  var pilihanTambahan = document.querySelectorAll(
    'input[name="pilihanTambahan"]:checked',
  );

  var daftarOpsi = document.getElementById("dropdownPilihan");

  if (pilihanUtama === null) {
    document.getElementById("pesanMetode").textContent =
      "Tentukan makanan atau minuman yang kamu sukai.";
  } else if (pilihanTambahan.length === 0) {
    document.getElementById("pesanMetode").textContent =
      "Pilih minimal satu makanan atau minuman favorit lainnya.";
  } else if (daftarOpsi.value === "") {
    document.getElementById("pesanMetode").textContent =
      "Pilih makanan atau minuman dari daftar.";
  } else {
    document.getElementById("pesanMetode").textContent = "";
    bagianEmail.classList.remove("sembunyi");
  }
});

// Memeriksa format alamat email
document.getElementById("btnEmail").addEventListener("click", function () {
  emailPengguna = inputEmail.value.trim();

  var polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (polaEmail.test(emailPengguna)) {
    document.getElementById("pesanEmail").textContent = "";

    tampilkanHasil();
    bagianHasil.classList.remove("sembunyi");
  } else {
    alert("Format alamat email belum benar. Silakan coba lagi.");

    document.getElementById("pesanEmail").textContent =
      "Contoh format email yang benar: nama@email.com";

    inputEmail.focus();
  }
});

// Menambahkan informasi ke dalam ringkasan
function tambahHasil(judul, isi) {
  var paragraf = document.createElement("p");
  var teksJudul = document.createElement("strong");

  teksJudul.textContent = judul + ": ";

  paragraf.appendChild(teksJudul);
  paragraf.appendChild(document.createTextNode(isi));

  document.getElementById("hasil").appendChild(paragraf);
}

// Menampilkan hasil pengisian formulir
function tampilkanHasil() {
  var tempatHasil = document.getElementById("hasil");

  tempatHasil.innerHTML = "";

  var pilihanUtama = document.querySelector(
    'input[name="pilihanUtama"]:checked',
  );

  var pilihanTambahan = document.querySelectorAll(
    'input[name="pilihanTambahan"]:checked',
  );

  var daftarOpsi = document.getElementById("dropdownPilihan");
  var hasilTambahan = [];

  for (var i = 0; i < pilihanTambahan.length; i++) {
    hasilTambahan.push(pilihanTambahan[i].value);
  }

  tambahHasil("Nama pengisi", namaPengguna);
  tambahHasil("Alamat email", emailPengguna);
  tambahHasil("Jumlah opsi", String(jumlahPilihan));
  tambahHasil("Makanan atau minuman favorit", pilihanUtama.value);
  tambahHasil("Favorit lainnya", hasilTambahan.join(", "));
  tambahHasil("Pilihan dari daftar", daftarOpsi.value);

  var judulDaftar = document.createElement("p");
  var teksJudul = document.createElement("strong");

  teksJudul.textContent = "Daftar makanan dan minuman:";

  judulDaftar.appendChild(teksJudul);
  tempatHasil.appendChild(judulDaftar);

  var daftar = document.createElement("ul");

  daftarPilihan.forEach(function (teksPilihan) {
    var item = document.createElement("li");

    item.textContent = teksPilihan;
    daftar.appendChild(item);
  });

  tempatHasil.appendChild(daftar);
}

//  Mengosongkan formulir
document.getElementById("btnUlang").addEventListener("click", function () {
  inputNama.value = "";
  inputJumlah.value = "";
  inputEmail.value = "";

  daftarPilihan = [];
  namaPengguna = "";
  emailPengguna = "";
  jumlahPilihan = 0;

  document.getElementById("pesanAwal").textContent = "";
  document.getElementById("pesanPilihan").textContent = "";
  document.getElementById("pesanMetode").textContent = "";
  document.getElementById("pesanEmail").textContent = "";

  bagianPilihan.classList.add("sembunyi");
  bagianMetode.classList.add("sembunyi");
  bagianEmail.classList.add("sembunyi");
  bagianHasil.classList.add("sembunyi");

  inputNama.focus();
});
