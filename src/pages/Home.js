import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  function handleClick() {
    history.push("/dashboard");
  }
  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => handleClick()}>to dashboard</button>
    </div>
  );
}

export default Home;
