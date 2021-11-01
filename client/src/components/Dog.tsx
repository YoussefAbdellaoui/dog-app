import axios from "axios";
import React, { useEffect, useState } from "react";
import FavouriteDog from "./FavouriteDog";
import Picture from "./ui/Picture";

interface Dog {
  message: string;
  status?: string;
}

const Dog: React.FC = () => {
  // Generic dog state used to display the current dog
  const [newDog, setNewDog] = useState<string>("");

  // Loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Array states for keeping track of dogs & favourite dogs
  const [dogArray, setDogArray] = useState<string[]>([]);
  const [favDogArray, setFavDogArray] = useState<string[]>([]);

  // Error states for showing in the UI
  const [prevDogError, setPrevDogError] = useState<boolean>(false);
  const [favDogError, setFavDogError] = useState<boolean>(false);

  // Query the database for our dogs
  const getDatabaseDogs = async (): Promise<Array<Object> | undefined> => {
    try {
      const response = await axios.get("http://localhost:8080/favourites");
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch the data from the query
  const fetchDatabaseDogs = async (): Promise<void> => {
    const databaseDogs = (await getDatabaseDogs()) as [];

    // Map the favourite dogs from the database to its own variable
    // Better than setting state in a loop continously
    const databaseFavouritesArray = databaseDogs.map(
      (element: { breed: string; id: string }) =>
        `https://images.dog.ceo/breeds/${element.breed}/${element.id}.jpg`
    );
    setFavDogArray([...databaseFavouritesArray]);
  };

  // Query the API for a dog
  const getDog = async (): Promise<Dog | undefined> => {
    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );

      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch a new dog from the API
  const fetchDog = async (): Promise<void> => {
    // Show loading state on screen
    setLoading(true);

    const dog: Dog | undefined = await getDog();

    if (!dog) {
      return;
    }

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
    // We use a callback on setState to wait for the previous state to finish first
    setDogArray((prevDogs) => {
      return [...prevDogs, dog.message];
    });

    setLoading(false);
  };

  // Utility function to format the dog link into two values (Breed & ID)
  const formatDogLink = (link: string): Array<string> => {
    // Slice the link all the way to the parameters so we can get the breed & id of the dog
    const sliceDog = link.slice(30);

    // Get the breed
    const dogBreed = sliceDog.substr(0, sliceDog.indexOf("/"));

    // Get the ID & remove the .jpg at the end of the string
    const getDogId = sliceDog.substr(sliceDog.indexOf("/") + 1);
    const dogId = getDogId.substr(0, getDogId.indexOf("."));

    return [dogBreed, dogId];
  };

  const favDog = async (): Promise<void> => {
    // Check if the favourite dog already exists in the array
    const checkFav = favDogArray.find((element) => newDog === element);
    // If we find the current dog in the array already then disable the button
    if (checkFav) {
      setFavDogError(true);
      return;
    }

    // Format the link so we can get the breed & ID seperately
    const [dogBreed, dogId] = formatDogLink(newDog);

    // Post it to the API
    const postFavDog = { breed: dogBreed, id: dogId };
    try {
      await axios.post("http://localhost:8080/newFavourite", postFavDog);
    } catch (e) {
      console.error(e);
    }

    // We could use the response from the API but its easier to just add the newDog variable
    // Add the dog to the favourite dog array
    setFavDogArray([...favDogArray, newDog]);

    // Disable the favourite button once we add it to the array
    setFavDogError(true);
  };

  const removeFav = async (
    e: React.MouseEvent<HTMLImageElement>
  ): Promise<void> => {
    // Format the link so we can get the breed & ID seperately
    const [_, dogId] = formatDogLink(e.currentTarget.src);

    try {
      // Set the fav dog array by filtering out the selected dog to remote
      setFavDogArray(favDogArray.filter((dog) => dog !== e.currentTarget.src));

      // Remove the disabled button if the favourite removed is the current dog
      if (e.currentTarget.src === newDog) {
        setFavDogError(false);
      }

      // Remove the favourite dog from the database
      await axios.delete(`http://localhost:8080/deleteFavourite/${dogId}`);
    } catch (e) {
      console.error(e);
    }
  };

  // Get the previous dog on "previous" button press
  const prevDog = (): void => {
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

  // Get a new dog on "next" button press
  const nextDog = (): void => {
    // Remove the the prevDogError from the UI if it exists
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
    const loadDogs = async () => {
      await fetchDatabaseDogs();
      await fetchDog();
    };

    loadDogs();
  }, []);

  return (
    <>
      <section id="dog">
        <h1 className="header__title">
          The best place to find your next <span className="pink">Dog.</span>
        </h1>

        <div className="dog--wrapper">
          <div className="fav__btn--wrapper">
            {favDogError ? (
              <>
                <button className="btn--disabled btn--fav btn" onClick={favDog}>
                  Favourite
                </button>
                <span className="error fav__error">
                  Favourite already exists!
                </span>
              </>
            ) : (
              <button className="btn btn--fav" onClick={favDog}>
                Favourite
              </button>
            )}
          </div>

          <div className="dog__main">
            <div className="previous">
              <div className="previous--wrapper">
                {prevDogError ? (
                  <>
                    <button
                      className="btn--disabled btn--prev btn"
                      onClick={prevDog}
                    >
                      Previous
                    </button>
                    <span className="error previous__error">
                      No Previous Dog!
                    </span>
                  </>
                ) : (
                  <button className="btn btn--prev" onClick={prevDog}>
                    Previous
                  </button>
                )}
              </div>
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
      <FavouriteDog favouriteDogs={favDogArray} removeFav={removeFav} />
    </>
  );
};

export default Dog;
