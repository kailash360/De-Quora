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


    uint public total_users;
    uint public total_questions;
    mapping(address => User) public users;    
    mapping(uint => Answer[]) public answers; //question id to answers
    Question[] public questions; // user address to question
    Answer[] answers_array;

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
        Question memory newQuestion = Question(total_questions, _question, msg.sender, 0, 0, new address[](0));
        questions.push(newQuestion);
        total_questions++;

        answers[newQuestion.id] = answers_array;

        emit question_added(newQuestion);

        //return the question
        return newQuestion;
    }

    function get_all_questions() public view returns(Question[] memory){
        return questions;
    }

    function get_question(uint _question_id) public view returns(Question memory){

        Question memory question;

        //iterate over all the questions
        for(uint i=0; i<total_questions; i++){
            // check for the question with the given id
            if(questions[i].id == _question_id){
                //return the question with the given id, and corresponding author    
                question = questions[i];
                break;
            }
        }
        return question;
    }

    function set_question(Question memory _question, uint _question_id) public {
        
        //iterate over all the questions
        for(uint i=0; i<total_questions; i++){

            // check for the question to be updated usign the id
            if(questions[i].id == _question_id){

                //update the question when found
                questions[i] = _question;
                break;
            }
        }
    }

    function add_answer(uint _question_id,string memory _answer) public returns(Answer memory){

        require(bytes(_answer).length != 0,"Answer cannot be empty");

        //Get the question from all the questions
        Question memory question= get_question(_question_id);

        require(question.author != msg.sender,"Author cannot answer his/her own question");

        //Create the answer
        address[] memory arr;
        Answer memory answer = Answer(question.total_answers, _answer, msg.sender,0,arr);

        //Add the answer to records
        answers[_question_id][question.total_answers] = answer;
        question.total_answers++;

        //update the question in the array
        set_question(question, _question_id);
        return answer;
    }        

    function get_answer(uint _question_id, uint _answer_id) public view returns(Answer memory){

        //Get the question
        Question memory question = get_question(_question_id);

        Answer memory answer;

        for(uint i=0; i<question.total_answers; i++){
            if(answers[_question_id][i].id == _answer_id){
                answer = answers[_question_id][i];
            }
        }

        return answer;
    }

    function set_answer(uint _question_id, uint _answer_id, Answer memory _answer) public returns(Question memory){

        //Get the question
        Question memory question = get_question(_question_id);

        for(uint i=0; i<question.total_answers; i++){
            if(answers[_question_id][i].id == _answer_id){
                answers[_question_id][i] = _answer;
                break;
            }
        }

        return question;
    }
        
    function like_answer( uint _question_id, uint _answer_id, address _user_address) public returns(Answer memory){

        //Get the question
        Question memory question = get_question(_question_id);

        // Get the answeer form the mapping
        Answer memory answer = get_answer(_question_id, _answer_id);
        
        for(uint i=0; i<answer.liked_by.length; i++){
            require(answer.liked_by[i] != _user_address, "You have already liked this answer") ;
        }

        // Increase the likes and update the mapping
        answer.liked_by[answer.likes] = _user_address;
        answer.likes++;

        //Update the answer
        question = set_answer(_question_id, _answer_id ,answer);

        //update the question
        set_question(question, _question_id);

        //Return the updated likes
        return answer;
    } 

}