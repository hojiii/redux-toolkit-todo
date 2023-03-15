import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/modules/todos";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const newitem = { title, comment };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addTodo(newitem));
          setTitle("");
          setComment("");
          navigate("/");
        }}
      >
        <header>할 일 기록하기</header>
        <label>제목</label>
        <input
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>내용</label>
        <input
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit">작성하기</Button>
      </form>
    </div>
  );
}

export default Form;
