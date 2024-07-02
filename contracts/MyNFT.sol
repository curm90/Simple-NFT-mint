// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(
        address initialOwner
    ) ERC721("KameHameHa", "KAME") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function createNFT() public onlyOwner {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter++;
    }
}
