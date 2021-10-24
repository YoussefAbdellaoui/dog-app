import React from "react";
import Dog from "./components/Dog";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <header>
        <Dog />
      </header>
    </div>
  );
}

export default App;
