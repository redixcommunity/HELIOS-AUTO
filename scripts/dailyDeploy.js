const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const solasidoLogo = require("./logo.js");

async function deployGmContract() {
  console.log(solasidoLogo);
  
  const now = new Date();
  const gmMessage = `GM 🌞 ${now.toDateString()} - ${now.toLocaleTimeString()}`;

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying gSAD 🌞 from ${deployer.address}`);

  const GmContract = await hre.ethers.getContractFactory("GmContract");
  const contract = await GmContract.deploy(gmMessage);
  await contract.waitForDeployment(); 

  const contractAddress = await contract.getAddress();
  const explorerURL = `https://explorer.helioschainlabs.org/address/${contractAddress}`;

  const logEntry = {
    message: gmMessage,
    address: contractAddress,
    timestamp: now.toISOString(),
  };

  // Simpan log ke gm-log.json
  const logPath = path.join(__dirname, "../gm-log.json");
  let logs = [];
  if (fs.existsSync(logPath)) {
    logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
  }
  logs.push(logEntry);
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  console.log("✅ GM Contract deployed!");
  console.log("📍 Address:", contractAddress);
  console.log("🔗 Explorer:", explorerURL);
}

deployGmContract().catch(err => {
  console.error("❌ Deployment error:", err);
  process.exit(1);
});
