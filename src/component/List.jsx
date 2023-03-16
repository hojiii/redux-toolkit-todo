import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __getTodos } from "../redux/modules/todos";
import api from "../axios/api";

function List({ isDone }) {
  // const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const { isLoding, error, todos } = useSelector((state) => {
    return state.todos;
  });
  const totodos = JSON.stringify([...todos]);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log("결과 => ", res.data);
      })
      .catch((err) => {
        console.log("오류가 발생하였습니다!");
      });
    dispatch(__getTodos());
  }, [totodos]);

  if (isLoding) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h3>{isDone ? "Done" : "working"}</h3>
      <div>
        {todos.map((item) => {
          return item.isDone === isDone && <Card key={item.id} todo={item} />;
        })}
      </div>
    </>
  );
}
export default List;
