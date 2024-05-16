const readline = require('readline');

class Siswa {
    constructor(nama, nilai) {
        this.nama = nama;
        this.nilai = nilai;
    }
}

let daftarSiswa = [];
function clearScreen() {
    console.clear();
}

function tampilkanMenu() {
    console.log("=== Menu ===");
    console.log("1. Tampilkan Daftar Siswa");
    console.log("2. Tambah Siswa Baru");
    console.log("3. Hapus Siswa");
    console.log("4. Ubah Nilai Siswa");
    console.log("5. Hitung Nilai Rata-Rata Kelas");
    console.log("6. Tampilkan Siswa dengan Nilai Tertinggi dan Terendah");
    console.log("7. Selesai");
}

function tampilkanDaftarSiswa() {
    console.log("=== Daftar Siswa ===");
    daftarSiswa.forEach(siswa => {
        console.log(`${siswa.nama}: ${siswa.nilai}`);
    });
}

function tambahSiswa(rl, callback) {
    rl.question("Masukkan nama siswa: ", (nama) => {
        rl.question("Masukkan nilai siswa: ", (nilai) => {
            let siswaBaru = new Siswa(nama, parseFloat(nilai));
            daftarSiswa.push(siswaBaru);
            callback();
        });
    });
}

function hapusSiswa(rl, callback) {
    rl.question("Masukkan nama siswa yang ingin dihapus: ", (nama) => {
        let index = daftarSiswa.findIndex(siswa => siswa.nama === nama);
        if (index !== -1) {
            daftarSiswa.splice(index, 1);
            console.log(`${nama} berhasil dihapus dari daftar siswa.`);
        } else {
            console.log(`${nama} tidak ditemukan dalam daftar siswa.`);
        }
        callback();
    });
}

function ubahNilaiSiswa(rl, callback) {
    rl.question("Masukkan nama siswa yang ingin diubah nilainya: ", (nama) => {
        let index = daftarSiswa.findIndex(siswa => siswa.nama === nama);
        if (index !== -1) {
            rl.question(`Masukkan nilai baru untuk ${nama}: `, (nilaiBaru) => {
                daftarSiswa[index].nilai = parseFloat(nilaiBaru);
                console.log(`Nilai ${nama} berhasil diubah menjadi ${nilaiBaru}.`);
                callback();
            });
        } else {
            console.log(`${nama} tidak ditemukan dalam daftar siswa.`);
            callback();
        }
    });
}

function hitungRataRataKelas() {
    let totalNilai = 0;
    daftarSiswa.forEach(siswa => {
        totalNilai += siswa.nilai;
    });
    let rataRata = totalNilai / daftarSiswa.length;
    console.log(`Rata-rata nilai kelas adalah: ${rataRata.toFixed(2)}`);
}

function tampilkanNilaiTertinggiTerendah() {
    let nilaiTertinggi = Math.max(...daftarSiswa.map(siswa => siswa.nilai));
    let siswaTertinggi = daftarSiswa.find(siswa => siswa.nilai === nilaiTertinggi);
    let nilaiTerendah = Math.min(...daftarSiswa.map(siswa => siswa.nilai));
    let siswaTerendah = daftarSiswa.find(siswa => siswa.nilai === nilaiTerendah);
    console.log(`Siswa dengan nilai tertinggi: ${siswaTertinggi.nama} (${nilaiTertinggi})`);
    console.log(`Siswa dengan nilai terendah: ${siswaTerendah.nama} (${nilaiTerendah})`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    clearScreen();
    tampilkanMenu();

    rl.question("Masukkan pilihan menu: ", (pilihan) => {
        clearScreen();
        switch (parseInt(pilihan)) {
            case 1:
                tampilkanDaftarSiswa();
                break;

            case 2:
                tambahSiswa(rl, mainMenu);
                return;

            case 3:
                hapusSiswa(rl, mainMenu);
                return;

            case 4:
                ubahNilaiSiswa(rl, mainMenu);
                return;

            case 5:
                hitungRataRataKelas();
                break;

            case 6:
                tampilkanNilaiTertinggiTerendah();
                break;

            case 7:
                console.log("Terima kasih!");
                rl.close();
                return;

            default:
                console.log("Pilihan tidak valid. Silakan masukkan pilihan yang benar.");

        }
        rl.question("\nTekan Enter untuk kembali ke menu...", () => {
            mainMenu();
        });
    });

}

mainMenu();