// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandMarketplace is ERC721URIStorage, Ownable{
    struct Land {
        uint256 id;
        string location;
        uint256 area;
        address currentOwner;
        uint256 price;
        bool isForSale;
        bool inEscrow;
        uint256 initialPaymentPercentage;  
    }

    struct Installment {
        uint256 totalPrice;
        uint256 amountPaid;
        uint256 installmentInterval;
        uint256 nextPaymentDue;
        address buyer;
        bool isCompleted;
    }

    uint256 public landCounter;
    mapping(uint256 => Land) public lands;
    mapping(uint256 => Installment) public installmentPlans;
    mapping(uint256 => address) public landEscrow;

    event LandRegistered(uint256 indexed landId, address indexed owner);
    event LandForSale(uint256 indexed landId, uint256 price, uint256 initialPaymentPercentage);
    event LandSold(uint256 indexed landId, address indexed newOwner, uint256 price);
    event InstallmentPayment(uint256 indexed landId, address indexed buyer, uint256 amountPaid, uint256 remaining);

    constructor() ERC721("LandVOwnershipNFT", "LRN") {
        landCounter = 0;
    }

    function registerLand(
        string memory _location,
        uint256 _area,
        uint256 _price,
        uint256 _initialPaymentPercentage,
        string memory _tokenURI
    ) external onlyOwner {
        require(_initialPaymentPercentage > 0 && _initialPaymentPercentage <= 100, "Invalid initial payment percentage");

        landCounter++;
        _mint(msg.sender, landCounter);
        _setTokenURI(landCounter, _tokenURI);

        lands[landCounter] = Land({
            id: landCounter,
            location: _location,
            area: _area,
            currentOwner: msg.sender,
            price: _price,
            isForSale: false,
            inEscrow: false,
            initialPaymentPercentage: _initialPaymentPercentage
        });

        emit LandRegistered(landCounter, msg.sender);
    }

    function verifyLand(uint256 _landId) external view returns (bool) {
        try this.ownerOf(_landId) returns (address owner) {
            return owner == lands[_landId].currentOwner;
        } catch {
            return false;
        }
    }

    function listLandForSale(
        uint256 _landId,
        uint256 _price,
        uint256 _initialPaymentPercentage
    ) external {
        require(ownerOf(_landId) == msg.sender, "Not the owner of the land");
        require(_initialPaymentPercentage > 0 && _initialPaymentPercentage <= 100, "Invalid initial payment percentage");

        lands[_landId].isForSale = true;
        lands[_landId].price = _price;
        lands[_landId].initialPaymentPercentage = _initialPaymentPercentage;

        emit LandForSale(_landId, _price, _initialPaymentPercentage);
    }

    function purchaseLandFullPayment(uint256 _landId) external payable {
        require(lands[_landId].isForSale, "Land not for sale");
        uint256 price = lands[_landId].price;
        require(msg.value >= price, "Full payment amount required");

        address seller = lands[_landId].currentOwner;
        lands[_landId].isForSale = false;
        lands[_landId].inEscrow = false;
        lands[_landId].currentOwner = msg.sender;

        _transfer(ownerOf(_landId), msg.sender, _landId);

        (bool sent, ) = payable(seller).call{value: price}("");
        require(sent, "Failed to send Ether");

        emit LandSold(_landId, msg.sender, price);
    }

    function purchaseLandWithInstallments(uint256 _landId, uint256 _installmentInterval) external payable {
        require(lands[_landId].isForSale, "Land not for sale");

        uint256 minInitialPayment = (lands[_landId].price * lands[_landId].initialPaymentPercentage) / 100;
        require(msg.value >= minInitialPayment, "Initial payment is less than required minimum");

        uint256 price = lands[_landId].price;

        installmentPlans[_landId] = Installment({
            totalPrice: price,
            amountPaid: msg.value,
            installmentInterval: _installmentInterval,
            nextPaymentDue: block.timestamp + _installmentInterval,
            buyer: msg.sender,
            isCompleted: false
        });

        lands[_landId].isForSale = false;
        lands[_landId].inEscrow = true;
        landEscrow[_landId] = msg.sender;

        emit LandSold(_landId, msg.sender, price);
        emit InstallmentPayment(_landId, msg.sender, msg.value, price - msg.value);
    }

    function makeInstallmentPayment(uint256 _landId) external payable {
        Installment storage installment = installmentPlans[_landId];
        require(installment.buyer == msg.sender, "Not the buyer of this land");
        require(!installment.isCompleted, "Installment plan is already completed");
        require(block.timestamp <= installment.nextPaymentDue, "Payment is overdue");

        installment.amountPaid += msg.value;
        installment.nextPaymentDue = block.timestamp + installment.installmentInterval;

        emit InstallmentPayment(_landId, msg.sender, msg.value, installment.totalPrice - installment.amountPaid);

        if (installment.amountPaid >= installment.totalPrice) {
            finalizePurchase(_landId);
        }
    }

    function finalizePurchase(uint256 _landId) internal {
        Installment storage installment = installmentPlans[_landId];
        require(installment.amountPaid >= installment.totalPrice, "Installments not fully paid");

        lands[_landId].currentOwner = installment.buyer;
        lands[_landId].inEscrow = false;
        installment.isCompleted = true;

        delete landEscrow[_landId];

        _transfer(ownerOf(_landId), installment.buyer, _landId);
    }

    function releaseEscrow(uint256 _landId) external {
        require(lands[_landId].inEscrow, "Land not in escrow");
        require(installmentPlans[_landId].isCompleted, "Installment plan not completed");

        address payable seller = payable(lands[_landId].currentOwner);
        uint256 price = lands[_landId].price;

        (bool sent, ) = seller.call{value: price}("");
        require(sent, "Failed to send Ether");
    }
}
