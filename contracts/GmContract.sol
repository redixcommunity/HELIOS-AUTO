// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GmContract {
    string public gmMessage;
    uint public deployedAt;
    uint public counter;

    constructor(string memory _msg) {
        gmMessage = _msg;
        deployedAt = block.timestamp;
    }

    function increment() external {
        counter += 1;
    }
}
