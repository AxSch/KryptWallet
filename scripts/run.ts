import { run, ethers } from "hardhat";

async function main() {
    await run("compile");

    const [partner1, partner2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Partnership");
    const contract = await Contract.deploy(partner1.address, partner2.address);

    const deployment = contract.deploymentTransaction();

    await deployment?.wait();

    await console.log("Contract deployed to:", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });
