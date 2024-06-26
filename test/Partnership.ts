import { ethers } from "hardhat";
import { expect } from "chai";
import { Partnership } from "../typechain-types";

describe("Partnership", () => {
    it("can be deployed by providing 2 addresses", async () => {
        const Contract = await ethers.getContractFactory("Partnership");
        const [partner1, partner2] = await ethers.getSigners();

        const contract = await Contract.deploy(partner1.address, partner2.address);

        const deployment = contract.deploymentTransaction();

        await deployment?.wait();

        expect(await contract.partner1()).to.equal(partner1.address);
        expect(await contract.partner2()).to.equal(partner2.address);

        const deployedContract = contract as Partnership;

        expect(await deployedContract.partner1()).to.equal(partner1.address);
        expect(await deployedContract.partner2()).to.equal(partner2.address);
    });

    it("should throw an error with invalid partners", async () => {
        const Contract = await ethers.getContractFactory("Partnership");
        const [partner1] = await ethers.getSigners();

        await expect(Contract.deploy(partner1.address, ethers.ZeroAddress)).to.be.revertedWith("Invalid partner address");
        await expect(Contract.deploy(ethers.ZeroAddress, partner1.address)).to.be.revertedWith("Invalid partner address");
    });
})
