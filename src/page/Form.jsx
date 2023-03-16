import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addTodo } from "../redux/modules/todos";
import { Link, useNavigate } from "react-router-dom";
import Button from "../component/Button";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState({
    title: "",
    comment: "",
    isDone: false,
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(__addTodo(newTodo));
          setNewTodo({
            title: "",
            comment: "",
            isDone: false,
          });
          navigate("/");
        }}
      >
        <header>할 일 기록하기</header>
        <label>제목</label>
        <input
          value={newTodo.title}
          required
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <label>내용</label>
        <input
          value={newTodo.comment}
          required
          onChange={(e) => setNewTodo({ ...newTodo, comment: e.target.value })}
        />
        <Button type="submit">작성하기</Button>
      </form>
      <Link to="/">
        <Button>이전으로</Button>
      </Link>
    </div>
  );
}

export default Form;
