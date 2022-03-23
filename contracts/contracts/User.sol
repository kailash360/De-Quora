// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Question.sol";

contract User{

    string public name;
    Question[] public my_questions;
    Question.Answer[] public my_answers;
    
    constructor(string memory _name){
        name = _name;
    }

    function add_question(string memory _question) public returns(Question){
        require(bytes(_question).length != 0,"Question cannot be empty");
        
        //Create the question
        Question newQuestion = new Question(_question);
        my_questions.push(newQuestion);
        // Main.all_questions.push(newQuestion);

        //return the question
        return newQuestion;
    }
}
