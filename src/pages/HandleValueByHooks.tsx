import * as React from "react";
import { useState, useCallback } from "react";

function HandleValueByHooks() {
  const [count, setCount] = useState(0);

  function changeCount() {
    setCount(count + 1);
    // hooks 和 this.setState 一样，更新数据和视图都是异步的
    // 而 Vue，更新数据是同步的，更新视图是异步的
    console.log("count: ", count);
  }

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={changeCount}>click me</button>
    </div>
  );
}

export default HandleValueByHooks;
