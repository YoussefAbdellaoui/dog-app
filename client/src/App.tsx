import React from "react";
import Dog from "./components/Dog";
import FavouriteDog from "./components/FavouriteDog";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />

      <header>
        <Dog />
        <div className="separator"></div>
        <FavouriteDog />
      </header>
    </div>
  );
}

export default App;
