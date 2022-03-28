// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./User.sol";

contract Main {

    mapping(address => User) public users;    

    event new_user_added(string, address);
    event main_deployed(string);

    constructor(){
        emit main_deployed('Main is deployed');
    }


    function register(string memory _name) public payable returns(User){

        require(bytes(_name).length != 0,"Name cannot be empty");

        //Create a new user
        User newUser = new User(_name);
        users[msg.sender] = newUser;

        emit new_user_added(_name, address(newUser));
        
        //Return the user
        return newUser;
    }

}
