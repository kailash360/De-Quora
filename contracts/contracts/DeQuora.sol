// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeQuora {

    struct User{
        uint id;
        address account;
        string name;
        uint[] questions;
        uint[] answers;
    }

    struct Question{
        uint id;
        string question;
        address author;
        uint total_answers;
        uint likes;
        address[] liked_by;
    }

    struct Answer{
        uint id;
        string answer;
        address author;
        uint256 likes;
        address[] liked_by;
    }


    uint total_users;
    uint total_questions;
    mapping(address => User) public users;    
    mapping(uint => Question) public questions; // struct address to question
    mapping(uint => mapping (uint=>Answer)) answers; // question address to mapping to answers

    event new_user_added(User);
    event main_deployed(string);
    event question_added(Question);


    constructor(){
        total_users = 0;
        total_questions = 0;
        emit main_deployed('Main is deployed');
    }

    function create_user(string memory _name) public payable returns(User memory){

        require(bytes(_name).length != 0,"Name cannot be empty");

        //Create a new user
        uint[] memory arr;
        User memory newUser = User(total_users, msg.sender, _name, arr, arr);
        users[msg.sender] = newUser;
        total_users++;
        emit new_user_added(newUser);
        
        //Return the user
        return newUser;
    }

    function get_user_details(address _user_address) public view returns(User memory){
        User memory user = users[_user_address];
        return user;
    }

    function add_question(string memory _question) public payable returns(Question memory){
        require(bytes(_question).length != 0,"Question cannot be empty");
        
        //Create the question
        address[] memory arr;
        Question memory newQuestion = Question(total_questions, _question, msg.sender, 0, 0, arr);
        questions[total_questions] = newQuestion;
        total_questions++;

        emit question_added(newQuestion);

        //return the question
        return newQuestion;
    }

    function add_answer(uint _question_id,string memory _answer) public returns(Answer memory){

        require(bytes(_answer).length != 0,"Answer cannot be empty");

        Question memory question = questions[_question_id];
        require(question.author != msg.sender,"Author cannot answer his/her own question");

        //Create the answer
        address[] memory arr;
        Answer memory answer = Answer(question.total_answers, _answer, msg.sender,0,arr);

        //Add the answer to records
        answers[_question_id][question.total_answers] = answer;
        question.total_answers++;

        questions[_question_id] = question;
        return answer;
    }

    function get_answers(uint _question_id) public view returns(Answer[] memory){
        
        Question memory question = questions[_question_id];

        Answer[] memory _answers;
        for(uint i=0;i<question.total_answers;i++){
            _answers[i] = answers[_question_id][i];
        }

        return _answers;
    }
        
        
    function like_answer( uint _question_id, uint _answer_number, address _user_address) public returns(Answer memory){

        //Get the question
        Question memory question = questions[_question_id];

        // Get the answeer form the mapping
        Answer memory answer = answers[_question_id][_answer_number];
        
        for(uint i=0; i<answer.liked_by.length; i++){
            require(answer.liked_by[i] != _user_address, "You have already liked this answer") ;
        }

        // Increase the likes and update the mapping
        answer.liked_by[answer.likes] = _user_address;
        answer.likes++;

        //Update the answer
        answers[_question_id][_answer_number] = answer;

        //update the question
        questions[_question_id] = question;

        //Return the updated likes
        return answer;
    } 

}
