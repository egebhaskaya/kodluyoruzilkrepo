import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import styled from "styled-components";

const USER_NAME_KEY = "user_name";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const userNameRef = useRef();
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getData = () => {
      fetch("https://63187deaece2736550cb717b.mockapi.io/todos", {
        method: "GET",
      })
        .then((responce) => responce.json())
        .then((responce) => setTodos(responce))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  const toggleTodo = async (id, iscompleted) => {
    let isCompleted = iscompleted;
    await fetch(`https://63187deaece2736550cb717b.mockapi.io/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    })
      .then((responce) => responce.json())
      .catch((err) => console.log(err));

    await fetch("https://63187deaece2736550cb717b.mockapi.io/todos", {
      method: "GET",
    })
      .then((responce) => responce.json())
      .then((responce) => setTodos(responce))
      .catch((err) => console.log(err));
  };

  const handleAddTodo = async () => {
    const name = todoNameRef.current.value;
    if (name.length < 3) {
      setMessage("Please enter more than 3 characters");
    } else {
      setMessage("");
      await fetch("https://63187deaece2736550cb717b.mockapi.io/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: name,
          isCompleted: false,
        }),
      })
        .then((responce) => responce.json())
        .catch((err) => console.log(err));

      await fetch("https://63187deaece2736550cb717b.mockapi.io/todos", {
        method: "GET",
      })
        .then((responce) => responce.json())
        .then((responce) => setTodos(responce))
        .catch((err) => console.log(err));
    }

    todoNameRef.current.value = null;
  };

  const handleClearTodos = async () => {
    const newTodos = todos.filter((todo) => todo.isCompleted);
    newTodos.map((completedTodos) => {
      const clearCompleted = async () => {
        if (newTodos) {
          await fetch(
            `https://63187deaece2736550cb717b.mockapi.io/todos/${completedTodos.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((responce) => responce.json())
            .catch((err) => console.log(err));

          await fetch("https://63187deaece2736550cb717b.mockapi.io/todos", {
            method: "GET",
          })
            .then((responce) => responce.json())
            .then((responce) => setTodos(responce))
            .catch((err) => console.log(err));
        }
      };
      clearCompleted();
      return true;
    });
  };

  const handleUsername = () => {
    const userName = userNameRef.current.value;
    if (!userName) {
      setMessage("Please enter a valid username!");
      return;
    } else {
      setMessage("");
      localStorage.setItem(USER_NAME_KEY, userName);
      setUserName(userName);
      userNameRef.current.value = null;
    }
  };

  return (
    <Screen>
      <MainContainer>
        <Container>
          <WelcomeTextContainer>
            <WelcomeText>Hello {` ${userName}`}! </WelcomeText>
          </WelcomeTextContainer>
          <UserNameInputBox>
            <StyledInput
              type="text"
              ref={userNameRef}
              placeholder="Benim Adım..."
            />
            <StyledButton onClick={handleUsername}>
              Submit Username
            </StyledButton>
          </UserNameInputBox>
        </Container>
        <Container>
          <WelcomeText>To Do List!</WelcomeText>
          <TodoContainer>
            <StyledInput
              type="text"
              ref={todoNameRef}
              placeholder="React çalışmak..."
            />
            <ButtonGroup>
              <StyledButton onClick={handleAddTodo}>Add To Do</StyledButton>
              <StyledButton onClick={handleClearTodos}>
                Clear Completed
              </StyledButton>
            </ButtonGroup>
          </TodoContainer>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <ErrorMessage>{message} </ErrorMessage>
        </Container>
      </MainContainer>
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  justfiy-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #ebfff5;
`;

const StyledInput = styled.input`
  outline: none;
  height: 32px;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 600;
  color: #8ddbe0;
  border: 5px solid #8ddbe0;
  border-radius: 5px;

  ::-moz-placeholder {
    color: #8ddbe0;
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #8ddbe0;
  }
`;

const StyledButton = styled.button`
  padding: 5px;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 600;
  height: 42px;
  cursor: pointer;
  background-color: #8ddbe0;
  border: none;
  border-radius: 8px;
  padding: 5px;
  color: white;
  :hover {
    background-color: gray;
  }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  gap: 20px;
  background-color: #8ddbe0;
  border-radius: 20px;
  margin-top: 100px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #ddf3e8;
  border-radius: 20px;
`;

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 20px;
  width: 100%;
`;

const WelcomeText = styled.h3`
  font-family: "Roboto";
  font-size: 30px;
  font-weight: 700;
  color: gray;
`;

const WelcomeTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

const UserNameInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.h3`
  font-family: "Roboto";
  font-size: 30px;
  font-weight: 700;
  color: gray;
`;

export default App;
