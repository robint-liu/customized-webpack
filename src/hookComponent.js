import React, { useState, useEffect, useContext } from "react";
import { TestContext } from "./context";

export default function HookComponent() {
  // useState 是state hook，不限制使用次数。
  const [count, setCount] = useState(0);
  
  // useEffect 是effect hook(相当于componentDidMount、相当于componentDidUpdate、相当于componentWillUnmount)，支持返回一个函数用来指定如何清空副作用，不限制使用次数。
  const effectFun = () =>{
    document.title = `you clicked ${count} times!`;
    return () => {document.title = ""}
  };
  useEffect(effectFun);
  
  
  // useContext 是context hook，用来获取context
  const context = useContext(TestContext);
  
  return (
    <div>
      <p>{context} clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
