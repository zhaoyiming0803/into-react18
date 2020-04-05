import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

// bug:
// export default function SetTimeoutDemo() {
//   const [count, setCount] = useState(0);

//   setTimeout(() => {
//     setCount(count + 1);
//   }, 1000);

//   console.log("count: ", count);
//   return <div>1</div>;
// }

interface Props {
  count: number;
}
function Child(props: Props) {
  return <div>{props.count}</div>;
}

export default function SetTimeoutDemo() {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState({ a: 1, b: 2 });

  useEffect(() => {
    let timer = setTimeout(() => {
      // setCount(count + 1);
      setObj({
        ...obj,
        b: obj.b + 1,
      });
    }, 2000);
    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, []);

  // console.log("count: ", count);
  console.log("obj: ", obj);

  return (
    <div>
      <Child count={count}></Child>
    </div>
  );
}
