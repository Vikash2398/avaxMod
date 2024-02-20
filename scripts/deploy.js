
const hrdhat = require("hardhat");

async function startFunction() {
  const home = await hrdhat.ethers.getContractFactory("SpiderManSecuritySystem");
  const SpiderManSecurity = await home.deploy();
  await SpiderManSecurity.deployed();

}


startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
