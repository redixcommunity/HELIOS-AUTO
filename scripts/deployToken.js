const dotenv = require("dotenv");
const inquirer = require("inquirer").default;
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const solasidoLogo = require("./logo.js");

dotenv.config();

async function main() {

  console.log(solasidoLogo);
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "📝 Nama token:",
      default: "MyToken"
    },
    {
      type: "input",
      name: "ticker",
      message: "🔠 Ticker (symbol):",
      default: "MTK"
    },
    {
      type: "number",
      name: "supply",
      message: "📦 Jumlah total supply:",
      default: 1000000
    },
    {
      type: "number",
      name: "decimals",
      message: "🔢 Berapa decimals?",
      default: 18
    }
  ]);

  const { name, ticker, supply, decimals } = answers;

  console.log(` `);
  console.log(`🚀 Deploying token: ${name} (${ticker})`);
  console.log(`📦 Supply: ${supply}`);
  console.log(`🔢 Decimals: ${decimals}`);

  const [deployer] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(name, ticker, supply, decimals);
  await token.waitForDeployment();

  const address = await token.getAddress();
  const explorerURL = `https://explorer.helioschainlabs.org/address/${address}`; // Assuming this explorer URL is correct for Helios Testnet
  const now = new Date();

  // log ke file
  const logPath = path.join(__dirname, "../token-log.json");
  let logs = [];
  if (fs.existsSync(logPath)) {
    logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
  }

  logs.push({
    name,
    ticker,
    supply,
    decimals,
    address,
    timestamp: now.toISOString()
  });

  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  console.log("✅ Token deployed!");
  console.log("📍 Address :", address);
  console.log("🔗 Explorer:", explorerURL);
}

main().catch((err) => {
  console.error("❌ Token deployment error:", err);
  process.exit(1);
});