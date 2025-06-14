const dotenv = require("dotenv");
const inquirer = require("inquirer").default;
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const solasidoLogo = require("./logo.js");
const cronABI = require("../abi/chronos.json"); 
const targetABI = require("../artifacts/contracts/GmContract.sol/GmContract.json");
const logPath = path.join(__dirname, "../gm-log.json");

dotenv.config();

async function deploy() {
  if (!fs.existsSync(logPath)) {
    console.error("❌ Tidak ada gm-log.json ditemukan. Deploy GM dulu!");
    return;
  }

  console.log(solasidoLogo);

  const [deployer] = await hre.ethers.getSigners();

  // Helios Chronos precompile
  const cronAddress = "0x0000000000000000000000000000000000000830"; 
  const cronContract = new ethers.Contract(cronAddress, cronABI.abi, deployer);

  const logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
  const last = logs[logs.length - 1];

  if (!last) {
    console.error("❌ Tidak ada log GM yang tersedia.");
    return;
  }

  // ambil contract address terakhir
  const contractAddress = last.address;

  const tx = await cronContract.createCron(
    contractAddress,
    JSON.stringify(targetABI.abi),
    "increment", // fungsi yang mau dipanggil
    [],          // argumen jika ada
    60,          // frequency: setiap 60 block (sekitar 3 menit)
    0,           // no expiration
    400_000,     // gas limit
    ethers.parseUnits("2", "gwei"), // maxGasPrice
    ethers.parseEther("0.1")          // deposit 0.5 HLS
  );

  await tx.wait();
  console.log("Scheduled task created, transaction hash:", tx.hash);
}

deploy().catch(err => {
  console.error("❌ Deployment error:", err);
  process.exit(1);
});