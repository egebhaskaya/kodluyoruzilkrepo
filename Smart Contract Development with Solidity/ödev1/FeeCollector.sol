// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//ethereum storage contract

contract FeeCollector {
    address public owner;
    uint256 public balance;

    constructor() {
        owner = msg.sender;
    }

    //for contract to receive eth
    receive() external payable {
        balance += msg.value;
    }

    //for contract to witdraw that is stored in the contract
    function withdraw(uint256 amount, address payable destAddr) public {
        require(msg.sender == owner, "You are not authorized");
        require(amount <= balance, "Insuffieient funds");
        destAddr.transfer(amount);
        balance -= amount;
    }
}
