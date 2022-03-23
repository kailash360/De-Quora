// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./User.sol";

contract Main {

    uint public total_users;
    mapping(uint => User) public users;
    // Question[] public all_questions;
    

    constructor() {
        total_users = 0;
        // all_questions = [];
    }

    function register(string memory _name) public returns(User){
        require(bytes(_name).length != 0,"Name cannot be empty");

        //Create a new user
        User newUser = new User(_name);
        users[total_users] = newUser;
        total_users++;

        //Return the user
        return newUser;
    }
}
