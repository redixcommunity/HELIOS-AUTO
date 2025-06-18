const dotenv = require("dotenv");
const inquirer = require("inquirer").default;
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const solasidoLogo = require("./logo.js");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

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

  // generate token contract
  const contractName = name.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
  generateTokenContract(contractName, ticker, decimals);
  
  console.log(` `);
  console.log("🔧 Compiling solidity...");
  await execPromise("npx hardhat compile");

  console.log(` `);
  console.log(`🚀 Deploying token: ${name} (${ticker})`);
  console.log(`📦 Supply: ${supply}`);
  console.log(`🔢 Decimals: ${decimals}`);

  const [deployer] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory(contractName);
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

function generateTokenContract(tokenName, symbol, decimals = 18) {
  const contractName = tokenName.replace(/\s+/g, ""); // Hilangkan spasi
  const className = contractName.replace(/[^a-zA-Z0-9]/g, ""); // Hapus karakter aneh

  const sourceCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ${className} is ERC20 {
    uint8 private _customDecimals;

    constructor(string memory name_, string memory symbol_, uint256 initialSupply_, uint8 decimals_) 
        ERC20(name_, symbol_)
    {
        _customDecimals = decimals_;
        _mint(msg.sender, initialSupply_ * 10 ** decimals_);
    }

    function decimals() public view override returns (uint8) {
        return _customDecimals;
    }
}
  `.trim();

  const outputPath = path.join(__dirname, `../contracts/${className}.sol`);
  fs.writeFileSync(outputPath, sourceCode);
  console.log(`✅ Contract ${className}.sol generated at contracts/`);
}

main().catch((err) => {
  console.error("❌ Token deployment error:", err);
  process.exit(1);
});