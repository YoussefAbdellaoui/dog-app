import React, { useEffect, useState } from "react";
import FavouriteDog from "./FavouriteDog";
import Picture from "./ui/Picture";

const Dog = () => {
  // Generic dog state used to display the current dog
  const [newDog, setNewDog] = useState(Object);

  // Loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Array states for keeping track of dogs & favourite dogs
  const [dogArray, setDogArray] = useState<string[]>([]);
  const [favDogArray, setFavDogArray] = useState<string[]>([]);

  // Error states for showing in the UI
  const [prevDogError, setPrevDogError] = useState(false);
  const [favDogError, setFavDogError] = useState(false);

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
    // Show loading state on screen
    setLoading(true);

    const dog = await getDog();
    setNewDog(dog.message);

    // Check if there are 10 dogs stored in the array & remove the first index
    if (dogArray.length > 10) {
      // Remove the first index from the array
      setDogArray(dogArray.splice(0, 1));

      // Add the current dog to the array
      setDogArray([...dogArray, dog.message]);
      setLoading(false);
      return;
    }

    // Otherwise just add the current dog to the array
    setDogArray([...dogArray, dog.message]);
    setLoading(false);
  };

  const favDog = () => {
    // Check if the favourite dog already exists
    const checkFav = favDogArray.find((element) => newDog === element);

    // If we find the current dog in the array already
    if (checkFav) {
      setFavDogError(true);
      return;
    }

    // Add the dog to the favourite dog array
    setFavDogArray([...favDogArray, newDog]);
  };

  const removeFav = () => {
    console.log("testing");
  };

  const prevDog = () => {
    // Get the index of the previous dog
    const previousDogIndex = dogArray.indexOf(newDog) - 1;

    // If we're below the index of 0 then show that there is no previous dog
    if (previousDogIndex < 0) {
      setPrevDogError(true);
      return;
    }

    // Remove the the favDogError from the UI if it exists
    if (favDogError) {
      setFavDogError(false);
    }

    // Otherwise set the previous dog to the current dog so we can show it on screen
    setNewDog(dogArray[previousDogIndex]);
  };

  const nextDog = () => {
    // If we're showing the previous dog error then remove it
    if (prevDogError) {
      setPrevDogError(false);
    }

    // Remove the the favDogError from the UI if it exists
    if (favDogError) {
      setFavDogError(false);
    }

    // Get the index of the next dog
    const nextDogIndex = dogArray.indexOf(newDog) + 1;

    // If the next index exists we've already fetched a dog, therefore set it to the current dog
    if (nextDogIndex in dogArray) {
      return setNewDog(dogArray[nextDogIndex]);
    }

    // Otherwise just fetch a new dog
    fetchDog();
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
            {favDogError && (
              <span className="error fav__error">
                Favourite already exists!
              </span>
            )}
          </div>

          <div className="dog__main">
            <div className="previous">
              <div className="previous--wrapper">
                <button className="btn btn--prev" onClick={prevDog}>
                  Previous
                </button>
              </div>
              {prevDogError && (
                <span className="error previous__error">No Previous Dog!</span>
              )}
            </div>

            <div className="picture">
              {<Picture currentDog={newDog} loading={loading} />}
            </div>

            <div className="next">
              <div className="next--wrapper">
                <button className="btn btn--next" onClick={nextDog}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="separator"></div>
      <FavouriteDog favouriteDogs={favDogArray} removeFav={() => removeFav} />
    </>
  );
};

export default Dog;
