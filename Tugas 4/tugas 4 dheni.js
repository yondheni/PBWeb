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

document.getElementById("btnNama").addEventListener("click", function () {
  namaPengguna = inputNama.value.trim();
  jumlahPilihan = Number(inputJumlah.value);  })