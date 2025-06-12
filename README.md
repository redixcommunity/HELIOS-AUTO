# helios-daily-gm 🌓

Skrip Node.js untuk **deploy smart contract berisi pesan "GM" harian** ke jaringan Helios EVM.  
Semua kontrak disimpan log dan kamu bisa baca kembali pesan GM yang sudah dideploy sebelumnya.

---

## 🔧 Setup Awal

1. **Clone repositori & install dependensi:**

```bash
npm install
```

2. **Atur `.env` file:**

Buat file `.env` di root:

```
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://testnet1.helioschainlabs.org
```


3. **Pastikan kamu sudah memiliki saldo HLS di wallet tersebut.**

---

## 🚀 Deploy Pesan GM

Jalankan:

```bash
npm run deploy:gm
```

Ini akan:
- Deploy kontrak baru berisi pesan `"gm 🌞 <tanggal> - <jam>"`.
- Simpan address & timestamp ke `gm-log.json`.
- Tampilkan link explorer Helios.

Contoh output:

```
✅ GM Contract deployed!
📍 Address: 0xabc123...
🔗 Explorer: https://explorer.helioschainlabs.org/address/0xabc123...
```

---

## 📖 Baca GM Terakhir yang Dideploy

Jalankan:

```bash
npm run read:gm
```

Contoh output:

```
📍 GM dari kontrak terakhir:
🆔 Address  : 0xabc123...
🕒 Waktu    : 6/12/2025, 07:00:00
💬 Pesan GM : gm 🌞 Thu Jun 12 2025 - 07:00:00
🔗 Explorer : https://explorer.helioschainlabs.org/address/0xabc123...
```

---

## 📂 Struktur Proyek

```
.
├── contracts/
│   └── GmContract.sol
├── scripts/
│   ├── dailyDeploy.js       # Untuk deploy GM
│   └── readLastGm.js        # Untuk baca GM terakhir
├── gm-log.json              # Log GM yang sudah dideploy
├── .env                     # Private key & RPC
├── .gitignore
├── hardhat.config.js
└── package.json
```

---

