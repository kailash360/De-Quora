// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeQuora {

    struct User{
        uint id;
        address account;
        string name;
        uint[] questions;
        uint[] answered_questions;
        uint[] answers;
        uint256 joined_on;
    }

    struct Question{
        uint id;
        string question;
        string author_name;
        address author_address;
        uint total_answers;
        uint likes;
        address[] liked_by;
        uint256 created_on;
    }

    struct Answer{
        uint id;
        uint question_id;
        string answer;
        string author_name;
        address author_address;
        uint256 likes;
        address[] liked_by;
        uint256 created_on;
    }

    struct QuestionAnswer{
        Question question;
        Answer[] answers;
    }

    uint public total_users;
    uint public total_questions;
    mapping(address => User) public users;    
    mapping(uint => Answer[]) public answers; //question id to answers
    Question[] public questions; // user address to question
    Answer[] answers_array;
    uint[] arr;

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
        User memory newUser = User(total_users, msg.sender, _name, arr, arr, arr, block.timestamp);
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
        Question memory newQuestion = Question(total_questions, _question, users[msg.sender].name ,msg.sender, 0, 0, new address[](0), block.timestamp);
        questions.push(newQuestion);
        total_questions++;

        answers[newQuestion.id] = answers_array;
        users[msg.sender].questions.push(newQuestion.id);

        emit question_added(newQuestion);

        //return the question
        return newQuestion;
    }

    function get_all_questions() public view returns(Question[] memory){
        return questions;
    }

    function get_question(uint _question_id) public view returns(Question memory, Answer[] memory, User memory){

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
        User memory _author = users[question.author_address];
        Answer[] memory _answers = answers[question.id];
        return (question, _answers, _author);
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

    function add_answer(uint _question_id,string memory _answer) public payable returns(Answer memory){

        require(bytes(_answer).length != 0,"Answer cannot be empty");

        //Get the question from all the questions
        (Question memory question,,) = get_question(_question_id);

        require(question.author_address != msg.sender,"Author cannot answer his/her own question");

        //Create the answer
        address[] memory address_arr;
        Answer memory answer = Answer(question.total_answers, _question_id, _answer, users[msg.sender].name, msg.sender,0,address_arr, block.timestamp);

        //Add the answer to records
        answers[_question_id].push(answer);
        question.total_answers++;

        //add the answer to user details
        users[msg.sender].answered_questions.push(_question_id);
        users[msg.sender].answers.push(answer.id);

        //update the question in the array
        set_question(question, _question_id);
        return answer;
    }        

    function get_answer(uint _question_id, uint _answer_id) public view returns(Answer memory){

        //Get the question
        (Question memory question,,)= get_question(_question_id);

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
        (Question memory question,,)= get_question(_question_id);

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
        (Question memory question,,)= get_question(_question_id);

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
