pragma solidity ^0.8.9;

contract SpiderManSecuritySystem {
    
    address public spiderMan;
    uint256 secretKey;
    mapping(address => bool) hasAccess;
    mapping(address => bool) insideHome;
    mapping(address => bool) isAdmin;

    event WebShot(address target);
    event WallClimbed(address climber);

    constructor() {
        spiderMan = msg.sender;
        secretKey = 123456;
        isAdmin[msg.sender] = true;
        hasAccess[msg.sender] = true;
        insideHome[msg.sender] = false;
    }

    modifier onlySpiderMan() {
        require(msg.sender == spiderMan, "Only Spiderman can perform this action");
        _;
    }

    function changeSecretKey(uint256 prevKey, uint256 newKey) public onlySpiderMan {
        require(prevKey == secretKey, "Previous secret key doesn't match");
        require(newKey >= 100000 && newKey <= 999999, "Secret key should be a 6-digit number");

        secretKey = newKey;
    }

    function giveAdminAccess(address addr) public onlySpiderMan {
        isAdmin[addr] = true;
        hasAccess[addr] = true;
    }

    function giveAccess(address addr) public {
        require(isAdmin[msg.sender], "Only Spiderman or an admin can grant access");
        insideHome[addr] = false;
        hasAccess[addr] = true;
    }

    function openDoor(uint256 key) public {
        require(hasAccess[msg.sender], "You don't have access to enter the home");
        require(key == secretKey, "Secret key doesn't match");

        insideHome[msg.sender] = !insideHome[msg.sender];
    }

    function webShot(address target) public onlySpiderMan {
        require(target != address(0), "Invalid target address");
        emit WebShot(target);
    }

    function climbWall() public {
        require(hasAccess[msg.sender], "You don't have access to climb walls");
        require(!insideHome[msg.sender], "You can't climb walls while inside the home");
        emit WallClimbed(msg.sender);
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }
}
