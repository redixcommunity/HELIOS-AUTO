// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GmContract {
    string public gmMessage;
    uint public deployedAt;

    constructor(string memory _msg) {
        gmMessage = _msg;
        deployedAt = block.timestamp;
    }

    function updateMessage(string memory _newMessage) public {
        gmMessage = _newMessage;
    }
}
