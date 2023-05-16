// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoffeeShop {
    address payable public shopOwner;

    event CoffeeBought(address indexed buyer, uint256 amount);

    constructor() {
        shopOwner = payable(msg.sender);
    }

    function buyCoffee() external payable {
        require(msg.value > 0, "Insufficient payment");

        // Calculate the coffee price or any other logic
        uint256 coffeePrice = 1 ether;

        require(msg.value >= coffeePrice, "Not enough Ether sent");

        // Transfer the coffee price to the shop owner
        shopOwner.transfer(coffeePrice);

        // Refund any excess amount to the buyer
        if (msg.value > coffeePrice) {
            payable(msg.sender).transfer(msg.value - coffeePrice);
        }

        emit CoffeeBought(msg.sender, coffeePrice);
    }
}
