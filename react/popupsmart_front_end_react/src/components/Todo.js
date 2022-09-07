import React from "react";
import styled from "styled-components";

const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id, todo.isCompleted);
  };

  return (
    <Container>
      <StyledCheckbox
        type="checkbox"
        checked={todo.isCompleted}
        onChange={handleTodoClick}
      />
      <StyledText>
        {todo.id}. {todo.content}
      </StyledText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 85%;
  height: 100%;
  background-color: #8ddbe0;
  border-radius: 20px;
  margin-bottom: 10px;
  height: 50px;
`;

const StyledCheckbox = styled.input`
  flex: 1;
  height: 70%;
  width: 100px;
  accent-color: #ddf3e8;
  outline: none;
  border: none;
  cursor: pointer;
`;

const StyledText = styled.h3`
  display: flex;
  flex: 3;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 600;
`;

export default Todo;
