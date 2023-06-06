// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTContract is ERC721URIStorage {
    uint256 private totalSupply;

    constructor() ERC721("MyNFT", "MNFT") {}

    function createNFT(string memory tokenURI) external returns (uint256) {
        uint256 tokenId = totalSupply + 1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        totalSupply++;
        return tokenId;
    }
}
