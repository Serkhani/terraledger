// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is Ownable, ReentrancyGuard {
    struct Listing {
        uint256 tokenId;
        address nftContract;
        address seller;
        uint256 price;
        bool isListed;
    }


    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public pendingWithdrawals;

    event Listed(uint256 indexed tokenId, address indexed nftContract, address indexed seller, uint256 price);
    event Unlisted(uint256 indexed tokenId, address indexed nftContract, address indexed seller);
    event Sold(uint256 indexed tokenId, address indexed nftContract, address indexed buyer, uint256 price);


    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external nonReentrant {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You must own the NFT to list it");
        require(_price > 0, "Price must be greater than zero");
        require(nft.getApproved(_tokenId) == address(this), "Marketplace is not approved to transfer this NFT");

        nft.transferFrom(msg.sender, address(this), _tokenId);

        listings[_nftContract][_tokenId] = Listing({
            tokenId: _tokenId,
            nftContract: _nftContract,
            seller: msg.sender,
            price: _price,
            isListed: true
        });

        emit Listed(_tokenId, _nftContract, msg.sender, _price);
    }

    function unlistNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isListed, "NFT is not listed");
        require(listing.seller == msg.sender, "Only the seller can unlist the NFT");

        IERC721 nft = IERC721(_nftContract);
        nft.transferFrom(address(this), msg.sender, _tokenId);

        delete listings[_nftContract][_tokenId];

        emit Unlisted(_tokenId, _nftContract, msg.sender);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external payable nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isListed, "NFT is not listed");
        require(msg.value == listing.price, "Incorrect price");

        listing.isListed = false;

        IERC721 nft = IERC721(_nftContract);
        nft.transferFrom(address(this), msg.sender, _tokenId);

        pendingWithdrawals[listing.seller] += msg.value;

        emit Sold(_tokenId, _nftContract, msg.sender, msg.value);
    }


    function withdraw() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds to withdraw");

        pendingWithdrawals[msg.sender] = 0;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}