//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Partnership {
    string private deploymentMessage = "Contract is deployed";
    uint256 private partnerAmount = 2;
    address public partner1;
    address public partner2;

    constructor(address _partner1, address _partner2) {
        require(
            _partner1 != address(0) && _partner2 != address(0),
            "Invalid partner address"
        );
        partner1 = _partner1;
        partner2 = _partner2;

        console.log(deploymentMessage);
    }
}
