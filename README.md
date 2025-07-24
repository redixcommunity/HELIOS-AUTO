# HELIOS AUTO 🔁 - oleh Redix Community

Alat otomatisasi untuk **deploy kontrak pintar di jaringan Helios EVM** menggunakan Hardhat.  
Dikembangkan oleh komunitas terbuka: [Redix Community](https://t.me/redixairdropp)

---

## 🛠️ Persiapan Awal

1. **Install dependensi:**

```bash
git clone https://github.com/redixcommunity/HELIOS-AUTO.git
cd HELIOS-AUTO
```
```bash
npm install
```

2. **Buat file `.env` di root proyek:**

```
PRIVATE_KEY=masukkan_private_key_wallet_anda
RPC_URL=https://testnet1.helioschainlabs.org
```

3. **Pastikan wallet Anda memiliki saldo HLS.**

---

## 🚀 Deploy Pesan GM Otomatis

Jalankan perintah:

```bash
npm run deploy:gm
```

Fungsinya:
- Deploy kontrak dengan pesan `"gm 🌞 <tanggal> - <jam>"`.
- Menyimpan address kontrak ke `gm-log.json`.
- Menampilkan link menuju Helios Explorer.

---

## 🚀 Deploy Token Kustom

Jalankan:

```bash
npm run deploy:token
```

Masukkan informasi token seperti:

```bash
✔ Nama token: ZORABAG
✔ Symbol     : ZRB
✔ Total supply: 100000000
✔ Decimals   : 18
```

Hasil jika sukses:

```bash
✅ Token berhasil dideploy!
📍 Address : 0xabc...
🔗 Explorer: https://explorer.helioschainlabs.org/address/0xabc...
```

---

## 📖 Lihat GM Terakhir

```bash
npm run read:gm
```

Output:

```
📍 GM terakhir:
🆔 Address  : 0xabc...
🕒 Tanggal  : 24 Juli 2025
💬 Pesan GM : gm 🌞 Thu Jul 24 2025 - 07:00:00
🔗 Explorer : https://explorer.helioschainlabs.org/address/0xabc...
```

---

## ⏰ Deploy Cron (Penjadwalan)

Jalankan:

```bash
npm run deploy:cron
```

Jika sukses:

```
⏱️ Jadwal berhasil dibuat, tx hash: 0x123abc...
```

---

## 📂 Struktur Folder

```
.
├── contracts/
│   ├── Token.sol
│   └── GmContract.sol
├── scripts/
│   ├── dailyDeploy.js
│   ├── deployToken.js
│   └── readLastGm.js
├── gm-log.json
├── .env
├── hardhat.config.cjs
├── package.json
└── README.md
```

---

## 🤝 Tentang Redix Community

Komunitas pengembang independen yang berfokus pada:
- Infrastruktur Web3
- Automasi blockchain
- Proyek terbuka & kolaboratif

> Kunjungi kami di: [https://github.com/redixcommunity](https://t.me/redixairdropp)

---

## ⚖️ Lisensi

Proyek ini dilisensikan oleh Redix Community
