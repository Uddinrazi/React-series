import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(5);

  const addValue = () => {
    console.log("counter added", Math.random());
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeVal = () => {
    if (counter == 0) return;
    setCounter(counter - 1);
  };

  return (
    <>
      <h1>react serues</h1>
      <h3>counter value: {counter}</h3>
      <button onClick={addValue}>Add value: {counter}</button>
      <br />
      <button onClick={removeVal}>Remove Value: {counter}</button>
    </>
  );
}

export default App;
