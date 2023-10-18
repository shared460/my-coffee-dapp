//SPDX-License-Identefier: MIT

pragma solidity^ 0.8.0;

contract buyMeCoffee{

    //Event to emit when a memo is created
    event NewMemo(address indexed from, uint256 timestamp, string name, string message);

    //Memo struct
    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //list of all memo recieved from friend
    Memo[] public memos;

    //address of contract deployer -> this is where from we withdrawn tips from contract
    address payable owner;

    //only runs on deployed time
    constructor() payable{
        owner = payable(msg.sender);  //it is deployer address as it only runs only one time on deploying time
    }

    //buy a coffee for contract
    //due to the payable we can pay the function
    function buyCoffee(string memory _name, string memory _message) public payable{
        //it this condition is not fullfill then transaction cancrels
        require(msg.value > 0,"you keep your money!, I don't need it");
        //pushjing the memo into memos array or list
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        //emit the log evenet when new memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    //send the entire balace to owner
    function withDrawnTips() public{
        //this is the balance of the contract address
        //address(this).balance;

        //sending the money to the owner
        require(owner.send(address(this).balance));
    }

    //retrive all the memos to the frontend from blockchain
    function getMemos() public view returns(Memo[] memory){
        return(memos);
    }
}