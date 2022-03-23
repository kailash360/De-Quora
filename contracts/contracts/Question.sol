// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Question {

    struct Answer{
        string answer;
        address author;
        uint256 likes;
        address[] liked_by;
    }

    string public question;
    address public author;
    uint public total_answers;
    mapping(uint => Answer) public answers;
    uint public likes;
    address[] public liked_by;

    constructor(string memory _question){
        question = _question;
        author = msg.sender;
        total_answers = 0;
        likes = 0;
    }

    function add_answer(string memory _answer) public returns(Answer memory){
        require(bytes(_answer).length != 0,"Answer cannot be empty");
        require(author != msg.sender,"Author cannot answer his/her own question");

        //Create the answer
        address[] memory arr;
        Answer memory answer = Answer(_answer, msg.sender,0,arr);

        //Add the answer to records
        answers[total_answers] = answer;
        total_answers++;

        return answer;
    }

    function get_answers() public view returns(Answer[] memory){
        
        Answer[] memory _answers;
        for(uint i=0;i<total_answers;i++){
            _answers[i] = answers[i];
        }

        return _answers;
    }
        
        
    function like_answer(uint _answer_number,address _user_address) public returns(Answer memory){


        // Get the answeer form the mapping
        Answer memory answer = answers[_answer_number];
        
        for(uint i=0; i<answer.liked_by.length; i++){
            require(answer.liked_by[i] != _user_address, "You have already liked this answer") ;
        }

        // Increase the likes and update the mapping
        answer.liked_by[answer.likes] = _user_address;
        answer.likes++;

        //Update the answer
        answers[_answer_number] = answer;

        //Return the updated likes
        return answer;
    } 
}
