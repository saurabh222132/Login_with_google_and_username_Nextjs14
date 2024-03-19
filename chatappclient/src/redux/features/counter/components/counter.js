"use client";

import { useSelector, useDispatch } from "react-redux";
import { addValue, countAsync, seeCountvalue } from "../counterSlice";

export const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(seeCountvalue);

  return (
    <div className=" text-center">
      <h1>This is the counter component</h1>

      <button onClick={() => dispatch(addValue())}>-</button>
      {count}
      <button>+</button>
      <span>
        <button onClick={() => dispatch(countAsync(100))}> add async</button>
      </span>
    </div>
  );
};
