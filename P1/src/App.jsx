import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let localCount = localStorage.getItem("count");
    setCount(localCount ? Number(localCount) : 0);
  }, []);

  return (
    <>
      <nav className="navbar">
        <h1>React Counter App</h1>
      </nav>
      <div className="content">
        <p className="description">
          Welcome to the Counter App! This app allows you to keep track of a count, save it
          to local storage, and reset it anytime. Refresh the page, and your count will still be here.
        </p>
        <div className="card">
          <button
            className="btn increment-btn"
            onClick={() => {
              localStorage.setItem("count", count + 1);
              setCount((count) => count + 1);
            }}
          >
            Total count is <span>{count}</span>
          </button>
          <button
            className="btn reset-btn"
            onClick={() => {
              localStorage.setItem("count", 0);
              setCount(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
