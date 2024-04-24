import { run, ethers } from "hardhat";

async function main() {
    await run("compile");

    const [owner, sharer] = await ethers.getSigners();
    const addresses = [owner.address, sharer.address];

    const Contract = await ethers.getContractFactory("Partnership");
    const contract = await Contract.deploy(addresses);

    const deployment = contract.deploymentTransaction();

    await deployment?.wait();

    await console.log("Contract deployed to:", await contract.addresses(0));
}

main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });
