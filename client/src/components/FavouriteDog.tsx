import React from "react";

interface Props {
  favouriteDogs: Array<string>;
  removeFav: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const FavouriteDog: React.FC<Props> = ({ favouriteDogs, removeFav }) => {
  return (
    <section id="favourite">
      <h1 className="header__title favourite__title">
        <span className="pink">Favourite</span> Dogs
      </h1>

      <div className="dog__fav">
        {/* better to use forEach since we're not using map's value? */}
        {favouriteDogs.map((dog) => (
          <figure key={dog} className="dog__fav--wrapper">
            <img
              src={dog}
              alt=""
              className="dog__img dog__fav--img"
              onClick={() => removeFav}
            />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default FavouriteDog;
