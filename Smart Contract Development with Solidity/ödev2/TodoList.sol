// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TodoList {
    struct Todo {
        string text;
        bool completed;
    }
    Todo[] public todos;

    //creating todos and storing in todos array
    function create(string calldata _text) external {
        todos.push(Todo({text: _text, completed: false}));
    }
    //reaching todos index and changing the text data
    function updateText(uint256 _index, string calldata _text) external {
        todos[_index].text = _text;
    }

    //getting the todos which is actually not necessary
    function get(uint256 _index) external view returns (string memory, bool) {
        Todo memory todo = todos[_index];
        return (todo.text, todo.completed);
    }

    //reaching todos index changing the completed status on the struct
    function toogleCompleted(uint256 _index) external {
        todos[_index].completed = !todos[_index].completed;
    }
}
