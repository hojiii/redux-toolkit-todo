import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __getTodos } from "../redux/modules/todos";

function List({ isDone }) {
  // const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const { isLoding, error, todos } = useSelector((state) => {
    return state.todos;
  });
  const totodos = JSON.stringify(todos);

  useEffect(() => {
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
