import React from "react";

interface FavouriteDogProps {
  favouriteDogs: Array<string>;
  removeFav(e: React.MouseEvent<HTMLImageElement>): void;
}

const FavouriteDog: React.FC<FavouriteDogProps> = ({
  favouriteDogs,
  removeFav,
}) => {
  return (
    <section id="favourite">
      <h1 className="header__title favourite__title">
        <span className="pink">Favourite</span> Dogs
      </h1>

      <div className="dog__fav">
        {favouriteDogs.map((dog) => (
          <figure key={dog} className="dog__fav--wrapper">
            <img
              src={dog}
              alt=""
              className="dog__img dog__fav--img"
              onClick={(e) => removeFav(e)}
            />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default FavouriteDog;
