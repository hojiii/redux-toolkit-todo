import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleTodo, finTodo, fixTodo } from "../redux/modules/todos";
import Button from "./Button";

const Stbox = styled.div`
  width: 250px;
  height: 150px;
  border: 1px solid red;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: pink;
  border-radius: 10px;
`;

const Cardbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  text-align: left;
`;

function Card(props) {
  const todo = props.todo;
  const dispatch = useDispatch();
  const [fix, setFix] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editComment, setEditComment] = useState(todo.comment);
  const updates = { editTitle, editComment };
  return (
    <Stbox>
      {fix ? (
        <Cardbox>
          <div>
            <label>제목:</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <br />
            <label>내용:</label>
            <input
              type="text"
              value={editComment}
              onChange={(e) => {
                setEditComment(e.target.value);
              }}
            />
          </div>
          <button
            onClick={(e) => {
              dispatch(fixTodo([todo, updates]));
              setFix((fix) => !fix);
            }}
          >
            수정완료
          </button>
        </Cardbox>
      ) : (
        <Cardbox key={todo.id}>
          <div>{todo.title}</div>
          <div>{todo.comment}</div>
          <div>
            <button
              onClick={(e) => {
                setFix((fix) => !fix);
              }}
            >
              수정
            </button>
            <Button color={"red"} onClick={(e) => dispatch(deleTodo(todo))}>
              삭제
            </Button>
            <Button color={"blue"} onClick={(e) => dispatch(finTodo(todo))}>
              {todo.isDone ? "취소" : "완료"}
            </Button>
          </div>
        </Cardbox>
      )}
    </Stbox>
  );
}

export default Card;
