import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

function List({ isDone }) {
  const todos = useSelector((state) => state.todos);
  console.log({ isDone });
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
