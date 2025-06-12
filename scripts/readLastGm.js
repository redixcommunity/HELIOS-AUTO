require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function readLastGm() {
  const logPath = path.join(__dirname, "../gm-log.json");

  if (!fs.existsSync(logPath)) {
    console.error("❌ Tidak ada gm-log.json ditemukan.");
    return;
  }

  const logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
  const last = logs[logs.length - 1];

  if (!last) {
    console.error("❌ Tidak ada log yang tersedia.");
    return;
  }

  const contractAddress = last.address;
  const timestamp = new Date(last.timestamp).toLocaleString();

  const GmContract = await ethers.getContractFactory("GmContract");
  const contract = GmContract.attach(contractAddress);
  const gmMessage = await contract.gmMessage();

  console.log("📍 GM dari kontrak terakhir:");
  console.log("🆔 Address  :", contractAddress);
  console.log("🕒 Waktu    :", timestamp);
  console.log("💬 Pesan GM :", gmMessage);
  console.log(`🔗 Explorer : https://explorer.helioschainlabs.org/address/${contractAddress}`);
}

readLastGm().catch((err) => {
  console.error("❌ Error membaca GM:", err);
  process.exit(1);
});
