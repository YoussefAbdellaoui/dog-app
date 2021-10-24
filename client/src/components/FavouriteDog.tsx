import React from "react";

interface Props {
  favouriteDogs: Array<string>;
}

const FavouriteDog: React.FC<Props> = ({ favouriteDogs }) => {
  return (
    <section id="favourite">
      <h1 className="header__title favourite__title">
        <span className="pink">Favourite</span> Dogs
      </h1>

      <div className="dog__fav">
        {favouriteDogs.map((dog) => (
          <figure key={dog} className="dog__fav--wrapper">
            <img src={dog} alt="" className="dog__img dog__fav--img" />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default FavouriteDog;
