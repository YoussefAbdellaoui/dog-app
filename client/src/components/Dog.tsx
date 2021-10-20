import React, { useCallback, useState } from "react";
import Picture from "./Picture";

const Dog = () => {
  const [newDog, setNewDog] = useState(Object);
  // const dogArray: Array<String> = [];

  const getDog = useCallback(() => {
    console.log("Called New Dog");
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((result) => {
        setNewDog(result.message);
      });
  }, []);

  // useEffect? Empty object on initial page load, unsure how to show an image on first load
  // Find a way to push the value to an array

  return (
    <section id="dog">
      <h1 className="header__title">
        The best place to find your next <span className="pink">Dog.</span>
      </h1>

      <div className="dog--wrapper">
        <div className="previous">
          <div className="previous--wrapper">
            <button className="btn btn--prev">Previous</button>
          </div>
        </div>

        <div className="picture">
          {newDog ? (
            <Picture currentDog={newDog} />
          ) : (
            <div className="loading">
              <span className="pink">loading</span>
            </div>
          )}
        </div>

        <div className="next">
          <div className="next--wrapper">
            <button className="btn btn--next" onClick={getDog}>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dog;
