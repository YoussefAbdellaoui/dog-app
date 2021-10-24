import React, { useEffect, useState } from "react";
import FavouriteDog from "./FavouriteDog";
import Picture from "./ui/Picture";

const Dog = () => {
  const [newDog, setNewDog] = useState(Object);
  const [loading, setLoading] = useState<boolean>(true);
  const [dogArray, setDogArray] = useState<string[]>([]);
  const [favDogArray, setFavDogArray] = useState<string[]>([]);

  // Query the API for a dog
  const getDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch a new dog from the API
  const fetchDog = async () => {
    setLoading(true);
    const dog = await getDog();
    setNewDog(dog.message);
    setDogArray([...dogArray, dog.message]);
    setLoading(false);
  };

  // Favourite dog
  const favDog = () => {
    // Check if the favourite dog already exists
    const checkFav = favDogArray.find((element) => newDog === element);
    if (checkFav) {
      return console.log("Favourite already exists");
    }
    setFavDogArray([...favDogArray, newDog]);
  };

  // Previous dog
  const prevDog = () => {
    // -2 as the last index of the array is the current dog shown on screen
    const lastIndex = dogArray.length - 2;

    if (!dogArray[lastIndex]) {
      return console.log("No previous dog");
    }

    setNewDog(dogArray[lastIndex]);
  };

  // Load the dog on initial page load
  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <>
      <section id="dog">
        <h1 className="header__title">
          The best place to find your next <span className="pink">Dog.</span>
        </h1>

        <div className="dog--wrapper">
          <div className="fav__btn--wrapper">
            <button className="btn btn--fav" onClick={favDog}>
              Favourite
            </button>
          </div>

          <div className="dog__main">
            <div className="previous">
              <div className="previous--wrapper">
                <button className="btn btn--prev" onClick={prevDog}>
                  Previous
                </button>
              </div>
            </div>

            <div className="picture">
              {<Picture currentDog={newDog} loading={loading} />}
            </div>

            <div className="next">
              <div className="next--wrapper">
                <button className="btn btn--next" onClick={fetchDog}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="separator"></div>
      <FavouriteDog favouriteDogs={favDogArray} />
    </>
  );
};

export default Dog;
